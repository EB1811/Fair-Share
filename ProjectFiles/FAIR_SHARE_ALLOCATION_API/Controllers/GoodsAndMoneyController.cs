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
            Console.WriteLine("Goods & Money Share Requested at " + DateTime.Now.ToString("h:mm:ss tt"));
            int[][] valueMatrix = givenValue.valueMatrix;
            int moneyAmount = givenValue.moneyAmount;
            if(moneyAmount > 0 && valueMatrix.Length == 2 && valueMatrix[0].Length > 0) {
                GoodsAndMoney_Allocation[] result = _goodsAndMoneyRepository.GetGoodsAndMoneyAllocation(valueMatrix, moneyAmount);
                return Ok(JsonConvert.SerializeObject(result));
            } else {
                Console.WriteLine("Incorrect Format Entered\n");
                Error e = new Error{Message = "Incorrect Format Entered"};
                return Ok(JsonConvert.SerializeObject(e));
            }
        }


    }
}