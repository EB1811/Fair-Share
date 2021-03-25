using FAIR_SHARE_ALLOCATION_API.Models;
using System.Collections.Generic;
using System;

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

            Goods_Allocation[] goodsAllo = ImplementedGoodsRepo.RoundRobinAlg(valueMatrix);
            GoodsAndMoney_Allocation[] result = EFM_Alg(valueMatrix);

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

        private static GoodsAndMoney_Allocation[] EFM_Alg(int[,] matrix) {

            return new GoodsAndMoney_Allocation[1];
        }
    }
}