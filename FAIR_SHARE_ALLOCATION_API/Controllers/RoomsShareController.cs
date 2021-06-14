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
        public ActionResult <Room_Allocation> postGetRoomsAllocation(GetRoomCommand givenValue)
        {
            Console.WriteLine("\nRooms Share Requested " + DateTime.Now.ToString("h:mm:ss tt"));
            try {
                int totalCost = givenValue.totalCost;
                int[][] valueMatrix = givenValue.valueMatrix;
                
                // Cost must be greater than 0, need at least 2 players and 2 rooms, and matrix must be square.
                if(totalCost > 0 && valueMatrix.Length > 1 && valueMatrix[0].Length > 1 && valueMatrix[0].Length == valueMatrix.Length) {
                    Room_Allocation[] result = _roomsRepository.getRoomsAllocation(valueMatrix, totalCost);
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