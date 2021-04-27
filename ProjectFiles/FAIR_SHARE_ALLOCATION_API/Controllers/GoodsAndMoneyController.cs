using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using FAIR_SHARE_ALLOCATION_API.Models;
using FAIR_SHARE_ALLOCATION_API.Data;
using System;
using Newtonsoft.Json;

namespace FAIR_SHARE_ALLOCATION_API.Controllers
{
    [ApiController]
    [Route("api/getGoodsAndMoneyAllocation")]
    public class GoodsAndMoneyController : ControllerBase
    {
        private readonly ImplementedGoodsMoneyRepo _goodsAndMoneyRepository = new ImplementedGoodsMoneyRepo();
        [HttpPost]
        public ActionResult <GoodsAndMoney_Allocation> postGetGoodsAndMoneyAllocation(GetGoodsAndMoneyCommand givenValue)
        {
            Console.WriteLine("\nGoods & Money Share Requested at " + DateTime.Now.ToString("h:mm:ss tt"));
            try {
                int[][] valueMatrix = givenValue.valueMatrix;
                int moneyAmount = givenValue.moneyAmount;

                // Money available to share must be greater than 0, need 2 players and at least 1 good.
                if(moneyAmount > -1 && valueMatrix.Length == 2 && valueMatrix[0].Length > 0) {
                    GoodsAndMoney_Allocation[] result = _goodsAndMoneyRepository.GetGoodsAndMoneyAllocation(valueMatrix, moneyAmount);
                    return Ok(JsonConvert.SerializeObject(result));
                } else {
                    Console.WriteLine("Incorrect Format Entered\n");
                    Error e = new Error{Message = "Incorrect Format Entered"};
                    return Ok(JsonConvert.SerializeObject(e));
                }
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                Error err = new Error{Message = "Error!"};
                return Ok(JsonConvert.SerializeObject(err));
            }
        }


    }
}