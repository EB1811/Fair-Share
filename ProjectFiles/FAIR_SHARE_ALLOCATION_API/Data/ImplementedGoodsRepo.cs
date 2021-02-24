using FAIR_SHARE_ALLOCATION_API.Models;
using System.Collections.Generic;
using System;

namespace FAIR_SHARE_ALLOCATION_API.Data
{
    public class ImplementedGoodsRepo : IGoodsRepo
    {
        public Goods_Allocation[] getGoodsAllocation(int[][] jagValueMatrix)
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

            Goods_Allocation[] result = RoundRobinAlg(valueMatrix);

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

        private static Goods_Allocation[] RoundRobinAlg(int[,] matrix) {
            int[,] costMatrix = matrix;
            // Rows = players, columns = goods.
            int rowCount = costMatrix.GetLength(0);
            int colCount = costMatrix.GetLength(1);
            // Order is row 1 to n.
            // Amount of goods left to give.
            int goodsAmount = colCount; 
            // Matrix determining who has what. 1 = user recieved good represented by column.
            int[,] allocationMatrix = new int[rowCount, colCount];
            // colAllocated[i] = 1 means that good in column i is removed from the goods pile.
            int [] colAllocated = new int[colCount];

            // Loop until no goods left to give.
            while (goodsAmount > 0) {
                // Go through each user and give them their most valuable item.
                for (int row = 0; row < rowCount; row++) {
                    // Find index of max value in the remaining goods pile and updating allocationMatrix in that row and column.
                    int maxVal = int.MinValue;
                    
                    for(int col = 0; col < colCount; col++) {
                        if (colAllocated[col] == 0) {
                            if (maxVal < costMatrix[row, col]) {
                                maxVal = costMatrix[row, col];
                            }
                        }
                    }
                    for (int col = 0; col < colCount; col++) {
                        if (colAllocated[col] == 0) {
                            if (costMatrix[row, col] == maxVal) {
                                allocationMatrix[row, col] = 1;
                                colAllocated[col] = 1;
                                goodsAmount--;
                                break;
                            }
                        }
                    }
                }
            }

            /*
            for(int row = 0; row < rowCount; row++) {
                for(int col = 0; col < colCount; col++) {
                    Console.WriteLine(allocationMatrix[row, col]);
                }
            }
            */

            Goods_Allocation[] result = new Goods_Allocation[rowCount];
            for(int row = 0; row < rowCount; row++) {
                List<int> goodsList = new List<int>();
                result[row].who = row;
                for(int col = 0; col < colCount; col++) {
                    if(allocationMatrix[row, col] == 1) {
                        goodsList.Add(col);
                    }
                }
                result[row].goodsList = goodsList;
            }
            return result;
        }
    }
}