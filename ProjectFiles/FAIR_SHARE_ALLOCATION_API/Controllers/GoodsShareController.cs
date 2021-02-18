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
        public ActionResult <Allocation> postGetGoodsAllocation(Command givenValue)
        {
            int[][] valueMatrix = givenValue.valueMatrix;
            Allocation[] result = _goodsRepository.getGoodsAllocation(valueMatrix);

            return Ok(JsonConvert.SerializeObject(result));
        }


    }
}