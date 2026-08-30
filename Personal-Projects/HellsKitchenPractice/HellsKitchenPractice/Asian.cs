using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    internal class Asian : Contestants
    {
        public Asian(int contestantNumber, string contestantName, int contestantAge, int contestantCookingExpiernce, string contestantTeam) : base(contestantNumber, contestantName, contestantAge, contestantCookingExpiernce, contestantTeam)
        {
        }

        public override void Specialty()
        {
            Console.WriteLine($"#{ContestantNumber} | Name: {ContestantName} | Age: {ContestantAge} | Years of Expiernce: {ContestantCookingExpiernce} | Team: {ContestantTeam} | Specialty: Asian");
        }
    }
}
