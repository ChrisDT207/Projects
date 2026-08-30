using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    abstract class Contestants
    {
        private int contestantNumber;
        private string contestantName;
        private int contestantAge;
        private int contestantCookingExpiernce;
        private string contestantTeam;

        public Contestants(int contestantNumber, string contestantName, int contestantAge, int contestantCookingExpiernce, string contestantTeam)
        {
            this.ContestantNumber = contestantNumber;
            this.ContestantName = contestantName;
            this.ContestantAge = contestantAge;
            this.ContestantCookingExpiernce = contestantCookingExpiernce;
            this.ContestantTeam = contestantTeam;
        }

        public int ContestantNumber { get => contestantNumber; set => contestantNumber = value; }
        public string ContestantName { get => contestantName; set => contestantName = value; }
        public int ContestantAge { get => contestantAge; set => contestantAge = value; }
        public int ContestantCookingExpiernce { get => contestantCookingExpiernce; set => contestantCookingExpiernce = value; }
        public string ContestantTeam { get => contestantTeam; set => contestantTeam = value; }

        public abstract void Specialty();
    }
}
