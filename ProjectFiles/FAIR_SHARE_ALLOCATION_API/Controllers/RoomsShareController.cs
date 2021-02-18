using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using FAIR_SHARE_ALLOCATION_API.Models;
using FAIR_SHARE_ALLOCATION_API.Data;
using System;
using Newtonsoft.Json;

namespace FAIR_SHARE_ALLOCATION_API.Controllers
{
    [ApiController]
    [Route("api/getRoomsAllocation")]
    public class RoomsShareController : ControllerBase
    {
        private readonly ImplementedRoomsRepo _goodsRepository = new ImplementedRoomsRepo();
        [HttpPost]
        public ActionResult <Allocation> postGetRoomsAllocation(Command givenValue)
        {
            int[][] valueMatrix = givenValue.valueMatrix;
            Allocation[] result = _goodsRepository.getRoomsAllocation(valueMatrix);

            return Ok(JsonConvert.SerializeObject(result));
        }


    }
}