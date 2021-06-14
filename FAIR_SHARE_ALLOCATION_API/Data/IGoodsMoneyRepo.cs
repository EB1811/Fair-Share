using FAIR_SHARE_ALLOCATION_API.Models;

namespace FAIR_SHARE_ALLOCATION_API.Data
{
    public interface IGoodsMoneyRepo
    {
        GoodsAndMoney_Allocation[] GetGoodsAndMoneyAllocation(int[][] valueMatrix, int moneyAmount);
    }
}
