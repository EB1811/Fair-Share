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
        private readonly ImplementedRoomsRepo _roomsRepository = new ImplementedRoomsRepo();
        [HttpPost]
        public ActionResult <Allocation> postGetRoomsAllocation(Command givenValue)
        {
            Console.WriteLine("Rooms Share Requested");
            int[][] valueMatrix = givenValue.valueMatrix;
            Allocation[] result = _roomsRepository.getRoomsAllocation(valueMatrix);

            return Ok(JsonConvert.SerializeObject(result));
        }


    }
}