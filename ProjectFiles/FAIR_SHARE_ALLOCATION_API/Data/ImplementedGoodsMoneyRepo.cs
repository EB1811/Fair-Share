using FAIR_SHARE_ALLOCATION_API.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace FAIR_SHARE_ALLOCATION_API.Data
{
    public class ImplementedGoodsMoneyRepo : IGoodsMoneyRepo
    {
        public GoodsAndMoney_Allocation[] GetGoodsAndMoneyAllocation(int[][] jagValueMatrix, int moneyAmount)
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
            GoodsAndMoney_Allocation[] result = EFM_Alg(valueMatrix, moneyAmount);

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

        private static GoodsAndMoney_Allocation[] EFM_Alg(int[,] valueMatrix, int moneyAmount) {
            //* Algorithm developed by Bei et al. https://arxiv.org/abs/1911.07048, implemented by Emmanuils Borovikovs.
            //* Simplified use case as number of agents is always 2.
            // 1. Find an envy free up to 1 good (EF1) allocation.
            // 2. Assess whether any agent is jealous of the other agent. To do this, create an envy assessment matrix where [i,j] is player i's assessment of the value of player j's bundle.
            // 3. 

            //TODO: [A301212-115] Develop EMF algorith.
            
            //* 1. Get envy free up to 1 good (EF1) allocation for the set of goods.
            Goods_Allocation[] goodsAllo = ImplementedGoodsRepo.RoundRobinAlg(valueMatrix);

            //* 2. Create an envy assessment matrix where [i,j] is player i's assessment of the value of player j's bundle.
            // With the simplified use case, the matrix will be [[V1(A1), V1(A2)], [V2(A1), V2(A2)]] where Vx(Ay) denotes agent x's value of agent y's bundle.
            int[,] assessmentMatrix = new int[2, 2];
            // Loop through matrix and sum the values in that agent's value matrix.
            for(int i = 0; i < 2; i++) {
                for(int j = 0; j < 2; j++) {
                    int bundleValue = 0;
                    // Find goods list of agent j.
                    int agentIndex = Array.FindIndex(goodsAllo, allo => allo.who == j);

                    // Get i's value of j's bundle.
                    foreach(int valueMIndex in goodsAllo[agentIndex].goodsList) {
                        bundleValue += valueMatrix[i, valueMIndex];
                    }

                    assessmentMatrix[i, j] = bundleValue;
                }
            }

            for(int i = 0; i < 2; i++) {
                for(int j = 0; j < 2; j++) {
                    Console.WriteLine("V" + (i+1) + "(A" + (j+1) + ") = " + assessmentMatrix[i, j]);
                }
            }
            
            return new GoodsAndMoney_Allocation[1];
        }
    }
}