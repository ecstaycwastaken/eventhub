interface Member {
    fullName: string;
    role: string;
    email: string;
    location: string;
    image?: string;
    facebookLink?: string;
    githubLink?: string;
    linkedinLink?: string;
    portfolioLink?: string;
}

export const teamMembers: Member[] = [
    {
        fullName: "Marcus Jenne C. Gutierrez",
        role: "Project Lead & Frontend Developer",
        email: "mjcgutierrez21@gmail.com",
        location: "Metro Manila, Philippines",
        image: "https://jbjffbyxglqkciogwcug.supabase.co/storage/v1/object/public/eventhub-storage/assets/cus.jpg",
        facebookLink: "https://www.facebook.com/mrcs.gtrrz",
        githubLink: "https://github.com/ecstaycwastaken",
        linkedinLink: "https://www.linkedin.com/in/marcusgutierrez21/",
    },
    {
        fullName: "Mark Allen G. Bobadilla",
        role: "Full Stack Developer",
        email: "markallengatchalian@gmail.com",
        location: "Metro Manila, Philippines",
        image: "https://jbjffbyxglqkciogwcug.supabase.co/storage/v1/object/public/eventhub-storage/assets/bobadilla.jpeg",
        facebookLink: "https://www.facebook.com/markallengbobadilla",
        githubLink: "https://github.com/mgachiee",
        linkedinLink: "https://www.linkedin.com/in/markallenbobadilla/?locale=en",
        portfolioLink: "https://markallenbobadilla.vercel.app/"
    },
    {
        fullName: "Sharwyn C. Degulacion",
        role: "UI/UX Designer & Frontend Developer",
        email: "sharwyn06@gmail.com",
        location: "Metro Manila, Philippines",
        image: "https://jbjffbyxglqkciogwcug.supabase.co/storage/v1/object/public/eventhub-storage/assets/DEGULACION.png",
        facebookLink: "https://www.facebook.com/shar.wyyynxx",
        githubLink: "https://github.com/wynnn06",
        linkedinLink: "https://www.linkedin.com/in/sharwyn-degulacion-8b5165190/",
    },
    {
        fullName: "Karl Joseph M. Logdat",
        role: "Frontend Developer",
        email: "logdatk@gmail.com",
        location: "Metro Manila, Philippines",
        image: "https://jbjffbyxglqkciogwcug.supabase.co/storage/v1/object/public/eventhub-storage/assets/logdat.jpeg",
        facebookLink: "https://www.facebook.com/karljoseph.logdat.5",
        githubLink: "https://github.com/karllogdat",
        linkedinLink: "https://www.linkedin.com/in/karl-joseph-logdat/",
    }
];