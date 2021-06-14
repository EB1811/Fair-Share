using FAIR_SHARE_ALLOCATION_API.Models;

namespace FAIR_SHARE_ALLOCATION_API.Data
{
    public interface IRoomsRepo
    {
        Room_Allocation[] getRoomsAllocation(int[][] valueMatrix, int totalCost);
    }
}