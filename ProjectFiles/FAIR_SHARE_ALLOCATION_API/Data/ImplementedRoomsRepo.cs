using FAIR_SHARE_ALLOCATION_API.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace FAIR_SHARE_ALLOCATION_API.Data
{
    public class ImplementedRoomsRepo : IRoomsRepo
    {
        //? Differentiate between algorithms with a third argument.

        public Room_Allocation[] getRoomsAllocation(int[][] jagValueMatrix, int totalCost)
        {
            //* Convert jagged array into 2d array.
            int[,] valueMatrix = new int[jagValueMatrix.Length, jagValueMatrix[0].Length];
            for(int i = 0; i < valueMatrix.GetLength(0); i++) {
                for(int j = 0; j < valueMatrix.GetLength(1); j++) {
                    valueMatrix[i,j] = jagValueMatrix[i][j];
                }
            }
            /*
            for(int row = 0; row < valueMatrix.GetLength(0); row++) {
                for(int col = 0; col < valueMatrix.GetLength(1); col++) {
                    Console.WriteLine(valueMatrix[row, col]);
                }
            }
            */

            //* Get Allocation Start.
            var watch = System.Diagnostics.Stopwatch.StartNew();

            // Get maxsum allocation then calculate envy free prices.
            int[,] allocationMatrix = FindMaxSum(valueMatrix);
            Room_Allocation[] result = FindEFPrices_CompensationProcedure(totalCost, valueMatrix, allocationMatrix);


            watch.Stop();
            var elapsedMs = watch.ElapsedMilliseconds;
            var elapsedTicks = watch.ElapsedTicks;
            Console.WriteLine("\nTime: " + elapsedMs + "ms");
            Console.WriteLine("Ticks: " + elapsedTicks);

            /*
            foreach (Allocation allo in result) {
                Console.WriteLine("\nUser at position " + allo.who + " gets:");
                foreach (int good in allo.goodsList) {
                    Console.WriteLine("Item at position: " + good);
                }
            }
            */

            return result;
        }

        private static Room_Allocation[] FindEFPrices_CompensationProcedure(int totalCost, int[,] valueMatrix, int[,] allocationMatrix) {
            //* Using the algorithm developed by Haake et al. https://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.26.8883.
            // 1. Assign bundles to players using the utilitarian assignment
            // 2. Calulate the assessment matrix. If all players are non-envious, skip to step 5.
            // 3. Perform a round of compensations.
            // 4. Perform additional compensation rounds until all envy is eliminated. At most n-1 rounds.
            // 5. The sum of the compensations made in Steps 3 and 4 is minimal and will never exceed the surplus. Therefore distribubte remaining surplus in a non-envious way.

            //* 1. Assign bundles.
            //* Each player pays the cost of their assignments, yielding a pool of size M. The cost C is subtracted from M.

            // Array holding the room price where roomPrice[i] is the price of room i. Used to allow the development of the assignment matrix.
            int[] roomPrice = new int[allocationMatrix.GetLength(1)];
            // Calculate M: If allocationMatrix[i,j] = 1, player i pays valueMatrix[i,j] for room j. Add price to roomPrice array.
            var M = 0;
            for(int r = 0; r < allocationMatrix.GetLength(0); r++) {
                for(int c = 0; c < allocationMatrix.GetLength(1); c++) {
                    if(allocationMatrix[r,c] == 1) {
                        int priceForRoom = valueMatrix[r,c];
                        M += priceForRoom;
                        roomPrice[c] = priceForRoom;
                    }
                }
            }
            M -= totalCost;
            // The remaining surplus M - C (if any) will be distributed among the players in the form of discounts to create envy-freeness.
            //*

            //* 2. Create assessment matrix.
            // Create empty n*n matrix where n = number of players.
            int[,] assesMatrix = new int[valueMatrix.GetLength(0), valueMatrix.GetLength(1)];

            var result = new Room_Allocation[2];
            return result;
        }

        private static int[,] FindMaxSum(int[,] matrix) {
            // Turn given maximiztion problem into minimization problem by substracting all the elements of the given matrix from the highest element.
            int[,] costMatrix = InverseMatrix(matrix);

            //* Hungarian algorithm *//

            // Lengths.
            int rowCount = costMatrix.GetLength(0);
            int colCount = costMatrix.GetLength(1);
            // Mask matrix has the same dimensions as the cost matrix. Used to star and prime zeros of the cost matrix.
            // if maskMatrix[i, j] = 1, then costMatrix[i,j] is a starred zero. if 2, it is a primed zero.
            int[,] maskMatrix = new int[rowCount, colCount];
            // Used to 'cover' rows and columns of the cost matrix.
            int[] rowCover = new int[rowCount];
            int[] colCover = new int[colCount];

            // Paths
            int[,] path = new int[rowCount * rowCount, 2];
            int pathRowStart = 0;
            int pathColStart = 0;

            bool done = false;
            int step = 1;
            //* Algorithm Loop
            while(!done) {
                switch (step) {
                    case 1:
                        step1(ref step, costMatrix, rowCount, colCount);
                        break;
                    case 2:
                        step2(ref step, costMatrix, maskMatrix, rowCover, colCover, rowCount, colCount);
                        break;
                    case 3:
                        step3(ref step, costMatrix, maskMatrix, rowCover, colCover, rowCount, colCount);
                        break;
                    case 4:
                        step4(ref step, costMatrix, maskMatrix, rowCover, colCover, rowCount, colCount, ref pathRowStart, ref pathColStart);
                        break;
                    case 5:
                        step5(ref step, costMatrix, maskMatrix, rowCover, colCover, rowCount, colCount, path, pathRowStart, pathColStart);
                        break;
                    case 6:
                        step6(ref step, costMatrix, maskMatrix, rowCover, colCover, rowCount, colCount, path, pathRowStart, pathColStart);
                        break;
                    case 7:
                        done = true;
                        break;
                }
            }

            return maskMatrix;
        }

        //* Matrix inversion.
        // First find maximum value, then subtract all values from this max value.
        private static int[,] InverseMatrix(int[,] matrix) {
            int maxValue = int.MinValue;
            int[,] inverseMatrix = new int[matrix.GetLength(0), matrix.GetLength(1)];

            for(int r = 0; r < matrix.GetLength(0); r++) {
                for(int c = 0; c < matrix.GetLength(1); c++) {
                    if(maxValue < matrix[r, c]) {
                        maxValue = matrix[r, c];
                    }
                }
            }
            for(int r = 0; r < matrix.GetLength(0); r++) {
                for(int c = 0; c < matrix.GetLength(1); c++) {
                    inverseMatrix[r, c] = maxValue - matrix[r, c];
                }
            }

            return inverseMatrix;
        }

        //* Step 1: For each row, find the smallest element and subtract it from every element in the row.
        private static void step1(ref int step, int[,] costMatrix, int rowCount, int colCount) {
            int rowMin;

            for(int row = 0; row < rowCount; row++) {
                rowMin = costMatrix[row, 0];

                // Find min.
                for(int col = 0; col < colCount; col++) {
                    if(costMatrix[row, col] < rowMin) {
                        rowMin = costMatrix[row, col];
                    }
                }
                // Subtract form each element in row.
                for(int col = 0; col < colCount; col++) {
                    costMatrix[row, col] -= rowMin;
                }
            }

            step = 2;
        }

        //* Step 2: For each element in costMatrix, check if it is a zero value and if its column or row is not already covererd i.e., in the cover arrays.
        // If so, star the zero (set mastMatrix[i, j] = 1) and cover its row and column (set rowCover[i] = 1, rowCover[j] = 1).
        // Uncover rows and columns before proceding to next step.
        private static void step2(ref int step, int[,] costMatrix, int[,] maskMatrix, int[] rowCover, int[] colCover, int rowCount, int colCount) {
            for(int row = 0; row < rowCount; row++) {
                for(int col = 0; col < colCount; col++) {
                    if(costMatrix[row, col] == 0 && rowCover[row] == 0 && colCover[col] == 0) {
                        maskMatrix[row, col] = 1;
                        rowCover[row] = 1;
                        colCover[col] = 1;
                    }
                }
            }

            for(int row = 0; row < rowCount; row++) {
                rowCover[row] = 0;
            }
            for(int col = 0; col < colCount; col++) {
                colCover[col] = 0;
            }

            step = 3;
        }

        //* Step 3: Cover each column (using colCover[col] = 1) that contains a starred zero (1 in mastMatrix). 
        // If all columns are covered, the starred zeros show the complete set of assignments. If not, go to step 4.
         private static void step3(ref int step, int[,] costMatrix, int[,] maskMatrix, int[] rowCover, int[] colCover, int rowCount, int colCount) {
            int coveredColCount;
            for(int row = 0; row < rowCount; row++) {
                for(int col = 0; col < colCount; col++) {
                    if(maskMatrix[row, col] == 1) {
                        colCover[col] = 1;
                    }
                }
            }

            coveredColCount = 0;
            for(int col = 0; col < colCount; col++) {
                if(colCover[col] == 1) {
                    coveredColCount += 1;
                }
            }

            //Console.WriteLine("Number of covered columns: " + coveredColCount);

            if(coveredColCount >= rowCount || coveredColCount >= colCount) {
                step = 7;
            } else {
                step = 4;
            }
        }

        //* Step 4: From the results of step 3 there will be covered zeros. Find a zero that is not covered and 'prime' it.
        // If there is no starred zero in the row containing the primed zero, go to step 5. 
        // (Use mask matrix array. If maskMatrix[i, j] = 1, then costMatrix[i,j] is a starred zero. if 2, it is a primed zero).
        // Loop until there are no uncovered zeros left, saving the smallest uncovered value and going to step 6.
        private static void step4(ref int step, int[,] costMatrix, int[,] maskMatrix, int[] rowCover, int[] colCover, int rowCount, int colCount, ref int pathRowStart, ref int pathColStart) {
            int row = -1;
            int col = -1;
            bool done;

            //* Supporting methods to keep code tidier.
            // Finding a zero in the matrix that is not covered.
            void findZero(ref int row, ref int col) {
                int localRow = 0;
                int localCol;
                bool localDone = false;
                row = -1;
                col = -1;

                // While loops going through each row, column.
                while(!localDone) {
                    localCol = 0;

                    while(true) {
                        if(costMatrix[localRow, localCol] == 0 && rowCover[localRow] == 0 && colCover[localCol] == 0) {
                            row = localRow;
                            col = localCol;
                            localDone = true;
                        }
                        localCol++;

                        if(localCol >= colCount || localDone) {
                            break;
                        }
                    }
                    localRow++;

                    if(localRow >= rowCount) {
                        localDone = true;
                    }
                }
            }
            // Return true if there is a starred zero in row.
            bool starInRow(int lRow) {
                bool starFound = false;

                for(int c = 0; c < colCount; c++) {
                    if(maskMatrix[lRow, c] == 1) {
                        starFound = true;
                    }
                }
                return starFound;
            }
            // Find the starred zero in a row. Set col to be that column.
            void findStarInRow(int lRow, ref int col) {
                col = -1;

                for(int c = 0; c < colCount; c++) {
                    if(maskMatrix[lRow, c] == 1) {
                        col = c;
                    }
                }
            }
            
            //* Step 4 loop.
            done = false;
            while(!done) {
                findZero(ref row, ref col);
                //// Console.WriteLine(row + "<-- Row | Col --> " + col);

                if(row == -1) {
                    done = true;
                    step = 6;
                } else {
                    // Prime a zero.
                    maskMatrix[row, col] = 2;

                    if(starInRow(row)) {
                        findStarInRow(row, ref col);
                        rowCover[row] = 1;
                        colCover[col] = 0;
                    } else {
                        done = true;
                        step = 5;
                        pathRowStart = row;
                        pathColStart = col;
                    }
                }
            }
        }

        //* Step 5: A series of alternating primed and starred zeros are made, stored in variable path.
        // Letting Z0 = the uncovered primed zero found in step 4 (in the else statement), Z1 = starred zero in the column of Z0 (if exists), Z2 = primed zero in the row of Z1.
        // Loop until the series ends at a prime zero that has no starred zero in its column.
        // After, unstar each starred zero of the series, star each primed zero in the series, erase all primes, and uncover every line in the matrix. Return to step 3.
        private static void step5(ref int step, int[,] costMatrix, int[,] maskMatrix, int[] rowCover, int[] colCover, int rowCount, int colCount, int[,] path, int pathRowStart, int pathColStart) {
            bool done;
            int row = -1;
            int col = -1;

            int pathCount = 1;
            path[pathCount - 1, 0] = pathRowStart;
            path[pathCount - 1, 1] = pathColStart;

            //* Supporting methods to keep code tidier.
            void findStarInCol(int c, ref int row) {
                row = -1;
                for(int r = 0; r < rowCount; r++) {
                    if(maskMatrix[r, c] == 1) {
                        row = r;
                    }
                }
            }
            void findPrimeInRow(int r, ref int col) {
                for(int c = 0; c < colCount; c++) {
                    if(maskMatrix[r, c] == 2) {
                        col = c;
                    }
                }   
            }
            // Change the mask matrix array based on the path.
            void augmentPath() {
                for(int p = 0; p < pathCount; p++) {
                    if(maskMatrix[path[p, 0], path[p, 1]] == 1) {
                        maskMatrix[path[p, 0], path[p, 1]] = 0;
                    } else {
                        maskMatrix[path[p, 0], path[p, 1]] = 1;
                    }
                }
            }
            // Clear the cover arrays.
            void clearCover() {
                for(int r = 0; r < rowCount; r++) {
                    rowCover[r] = 0;
                }
                for(int c = 0; c < colCount; c++) {
                    colCover[c] = 0;
                }
            }
            // Remove all primes in the mask matrix.
            void clearPrimes() {
                for(int r = 0; r < rowCount; r++) {
                    for(int c = 0; c < colCount; c++) {
                        if(maskMatrix[r, c] == 2) {
                            maskMatrix[r, c] = 0;
                        }
                    }
                }
            }

            //* Step 5 loop.
            done = false;
            while(!done) {
                findStarInCol(path[pathCount - 1, 1], ref row);
                if(row > -1) {
                    pathCount++;
                    path[pathCount - 1, 0] = row;
                    path[pathCount - 1, 1] = path[pathCount - 2, 1];
                } else {
                    done = true;
                }

                if(!done) {
                    findPrimeInRow(path[pathCount - 1, 0], ref col);
                    pathCount++;
                    path[pathCount - 1, 0] = path[pathCount - 2, 0];
                    path[pathCount - 1, 1] = col;
                }
            }

            // Ends sequence.
            augmentPath();
            clearCover();
            clearPrimes();
            step = 3;
        }

        //* Step 6: Add value found in step 4 (which is found in this step) to every element of each covered row, and subtract it from every element from each uncovered column.
        // Using the smallest uncovered value in the cost matrix.
        private static void step6(ref int step, int[,] costMatrix, int[,] maskMatrix, int[] rowCover, int[] colCover, int rowCount, int colCount, int[,] path, int pathRowStart, int pathColStart) {
            int minValue = int.MaxValue;

            //* Supporting methods to keep code tidier.
            void findSmallestUncovered(ref int minValue) {
                for(int r = 0; r < rowCount; r++) {
                    for(int c = 0; c < colCount; c++) {
                        if(rowCover[r] == 0 && colCover[c] == 0) {
                            if(minValue > costMatrix[r, c]) {
                                minValue = costMatrix[r, c];
                            }
                        }
                    }
                }
            }

            //* step 6 proccess.
            findSmallestUncovered(ref minValue);
            for(int r = 0; r < rowCount; r++) {
                for(int c = 0; c < colCount; c++) {
                    if(rowCover[r] == 1) {
                        costMatrix[r, c] += minValue;
                    }
                    if(colCover[c] == 0) {
                        costMatrix[r, c] -= minValue;
                    }
                }
            }

            step = 4;
        }
    }
}