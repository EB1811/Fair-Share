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
            // 2. Assess whether any agent is envious of the other agent. To do this, create an envy assessment matrix where [i,j] is player i's assessment of the value of player j's bundle.
            // 3. If there is no envy, just split the money in two.
            // 4. If j is envious of i, give money to agent j until i is indifferent between the two bundles. If we run out of money during this step, we are done.
            // 5. If at the point that agent i is indifferent between the two bundles, j is also not envious of i, then split the remaining money in two we are done.
            // 6. Otherwise, j is envious of i, but since i is indifferent between the two bundles, swap the bundles; i gets j's bundle, and j gets i bundle.
            // Worth noting that in this simplified case (where N = 2), there will be at most 1 swap.
            // 7. Repeat the process having swapped the bundles, and with a reduced money amount.
            // 8. When we run out of money we are done and the final allocation is EFM; this means, envy-free up to 1 good with respect to an agent that gets only goods, and envy-free with respect to an agent that also gets money.

            //TODO: [A301212-115] Develop EMF algorith.
            
            int numOfAgents = 2;
            float money = moneyAmount;
            GoodsAndMoney_Allocation[] result = new GoodsAndMoney_Allocation[numOfAgents];
            //* 1. Get envy free up to 1 good (EF1) allocation for the set of goods.
            Goods_Allocation[] goodsAllo = ImplementedGoodsRepo.RoundRobinAlg(valueMatrix);
            // Update result.
            for(int i = 0; i < numOfAgents; i++) {
                Goods_Allocation allo = goodsAllo[i];
                GoodsAndMoney_Allocation newAllo = new GoodsAndMoney_Allocation();
                newAllo.who = allo.who;
                newAllo.goodsList = allo.goodsList;
                newAllo.money = 0;

                result[i] = newAllo;
            }

            //* 2. Create an envy assessment matrix where [i,j] is player i's assessment of the value of player j's bundle.
            // With the simplified use case, the matrix will be [[V1(A1), V1(A2)], [V2(A1), V2(A2)]] where Vx(Ay) denotes agent x's value of agent y's bundle.
            int[,] assessmentMatrix = new int[numOfAgents, numOfAgents];
            // Loop through matrix and sum the values in that agent's value matrix.
            for(int i = 0; i < numOfAgents; i++) {
                for(int j = 0; j < numOfAgents; j++) {
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
            // Store difference in values. Can use a simple array where [i] is agent's i valuation of his own bundle minus the other agent's bundle.
            int[] valDiff = new int[numOfAgents]; // Envious if negative.
            for(int i = 0; i < numOfAgents; i++) {
                for(int j = 0; j < numOfAgents; j++) {
                    valDiff[i] = Math.Abs(assessmentMatrix[i, i] - assessmentMatrix[i, j]) > Math.Abs(valDiff[i]) ? assessmentMatrix[i, i] - assessmentMatrix[i, j] : valDiff[i];
                }
            }
            // This valDiff array can also show how much money can be given to the envious agent to make the non-envious agent indifferent between the two values.

            // Loop until there is no money left.
            while(money > 0) {
                // Determining how to proceed.
                //* 3. If there is no envy, split the money in two.
                if (!valDiff.Any(value => value < 0)) {
                    // Split remaining money equally.
                    float moneySlice = money / numOfAgents;
                    for(int i = 0; i < numOfAgents; i++) {
                        result[i].money += moneySlice;
                    }
                    money -= money;
                } else {
                    //* 4. If j is envious of i, give money to agent j until i is indifferent between the two bundles. If we run out of money during this step, we are done.
                    // First we need the indexes of the envious and non-envious agents.
                    int nonEvniousA = Array.FindIndex(valDiff, value => value >= 0);
                    int evniousA = Array.FindIndex(valDiff, value => value < 0);

                    // If there is not enough money left to make the non-envious agent indifferent, give all of the money to the envious agent.
                    int indifferenceAmount = valDiff[nonEvniousA]; // Money given to the other agent to make the non-envious agent indifferent between the two bundles.
                    if (money - indifferenceAmount < 0) {
                        // Give all the money to envious agent.
                        result[Array.FindIndex(result, allo => allo.who == evniousA)].money += money;
                        money -= money;
                    } else {
                        // Give the amount of money that will make the non-envious agent indifferent.
                        money -=  indifferenceAmount;
                        result[Array.FindIndex(result, allo => allo.who == evniousA)].money += indifferenceAmount;
                        // We can update the vallDiff array instead of recalculating it and the assessment matrix.
                        valDiff[nonEvniousA] -= indifferenceAmount;
                        valDiff[evniousA] += indifferenceAmount;

                        //* 5. and 6.
                        // If the envious agent is now not envious, split the remaining money (if any) and finish.
                        // Otherwise, the evnious agent is still envious, but since the non-envious agent is indifferent, swap the bundles.
                        if (valDiff[evniousA] >= 0) {
                            // Split remaining money equally.
                            float moneySlice = money / numOfAgents;
                            for(int i = 0; i < numOfAgents; i++) {
                                result[i].money += moneySlice;
                            }
                            money -= money;
                        } else {
                            // Swap the bundles.
                            int enviousIndex = Array.FindIndex(result, allo => allo.who == evniousA);
                            int nonEnviousIndex = Array.FindIndex(result, allo => allo.who == nonEvniousA);
                            List<int> tempGoods = result[enviousIndex].goodsList;
                            float tempMoney = result[enviousIndex].money;

                            result[enviousIndex].goodsList = result[nonEnviousIndex].goodsList;
                            result[enviousIndex].money = result[nonEnviousIndex].money;
                            result[nonEnviousIndex].goodsList = tempGoods;
                            result[nonEnviousIndex].money = tempMoney;

                            // We can update the vallDiff array instead of recalculating it and the assessment matrix.
                            // Can get the new valDiff's by negating valDiff (swap of V1(A1) - V1(A2) is V1(A2) - V1(A1)).
                            for(int i = 0; i < numOfAgents; i++) {
                                valDiff[i] = -valDiff[i];
                            }
                        }
                    }
                }
                //* 7. Repeat the process.
            }

            /* DEBUG
            for(int i = 0; i < numOfAgents; i++) {
                Console.WriteLine("Who: " + result[i].who + ", money: " + result[i].money);
                for(int j = 0; j < numOfAgents; j++) {
                    Console.WriteLine("V" + (i+1) + "(A" + (j+1) + ") = " + assessmentMatrix[i, j]);
                }
                Console.WriteLine("Value difference of agent " + (i+1) + " is " + valDiff[i]);
            }
            */
            
            return result;
        }
    }
}