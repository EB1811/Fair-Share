using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using FAIR_SHARE_ALLOCATION_API.Models;
using FAIR_SHARE_ALLOCATION_API.Data;
using System;
using Newtonsoft.Json;

namespace FAIR_SHARE_ALLOCATION_API.Controllers
{
    [ApiController]
    [Route("api/getGoodsAllocation")]
    public class GoodsShareController : ControllerBase
    {
        private readonly ImplementedGoodsRepo _goodsRepository = new ImplementedGoodsRepo();
        [HttpPost]
        public ActionResult <Goods_Allocation> postGetGoodsAllocation(GetGoodsCommand givenValue)
        {
            Console.WriteLine("\nGoods Share Requested " + DateTime.Now.ToString("h:mm:ss tt"));
            try {
                int[][] valueMatrix = givenValue.valueMatrix;

                // Need at least 2 players and 1 good.
                if(valueMatrix.Length > 1 && valueMatrix[0].Length > 0) {
                    Goods_Allocation[] result = _goodsRepository.getGoodsAllocation(valueMatrix);
                    return Ok(JsonConvert.SerializeObject(result));
                } else {
                    Console.WriteLine("Incorrect Format Entered.\n");
                    Error e = new Error{Message = "Incorrect Format Entered."};
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