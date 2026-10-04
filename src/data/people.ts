/**
 * The roster, mirrored from https://bist.edu.bd/all-teachers and the
 * administrative officer listing.
 *
 * ONE row per person. Several people hold both a teaching and an administrative
 * role, so roles live in `person.roles` rather than in two separate arrays —
 * that is why 39 faculty + 8 officers resolves to 39 people, not 47.
 *
 * `FACULTY_MEMBERS` and `ADMINISTRATIVE_OFFICERS` below are lossless projections
 * of this array, kept so the existing components keep working unchanged. New code
 * should read `PEOPLE` directly.
 *
 * Snapshot: 30 September 2026. Nothing here is inferred — every field is either
 * published on the live site or absent.
 */

import { FacultyMember, AdministrativeOfficer } from '../types';
import { Person, PersonRoleRecord } from '../types/person';

export const PEOPLE: Person[] = [
  {
    id: "prof-nurul-amin",
    slug: "prof-nurul-amin",
    name: {
      en: "Prof. Nurul Amin",
      bn: "প্রফেসর নুরুল আমিন"
    },
    qualifications: "M.Sc In Mathematics, Diploma In Education",
    photo: "./images/teachers/prof-nurul-amin.jpeg",
    email: "namin1199011949@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/prof-nurul-amin",
    roles: [
      {
        legacyId: "prof-nurul-amin",
        unitCode: "ADMIN",
        role: "faculty",
        designation: {
          en: "Vice-Principal",
          bn: "উপাধ্যক্ষ"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      },
      {
        legacyId: "off-vice-principal",
        unitCode: "academy-admin-and-hr",
        role: "officer",
        designation: {
          en: "Vice-Principal",
          bn: "উপাধ্যক্ষ"
        },
        unitName: {
          en: "Academy, Admin & HR",
          bn: "একাডেমি, প্রশাসন ও এইচআর"
        },
        displayOrder: 2
      }
    ]
  },
  {
    id: "md-robiul-islam",
    slug: "md-robiul-islam",
    name: {
      en: "MD Robiul Islam",
      bn: "মোঃ রবিউল ইসলাম"
    },
    qualifications: "M.Sc Engg. in Electrical Engineering, Hohai University, Nanjing, China. M.Sc in ECE, Islamic University, Kushtia. B.Sc in ECE, National University, Gazipur.",
    photo: "./images/teachers/md-robiul-islam.jpg",
    email: "robiul.islamapece1691@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-robiul-islam",
    roles: [
      {
        legacyId: "md-robiul-islam",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Asst. Professor & Head of Department",
          bn: "সহকারী অধ্যাপক ও বিভাগীয় প্রধান"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "nasima-akter-roqsana",
    slug: "nasima-akter-roqsana",
    name: {
      en: "Nasima Akter Roqsana",
      bn: "নাসিমা আক্তার রোকসানা"
    },
    qualifications: "B.Sc In Fashion Design",
    photo: "./images/teachers/nasima-akter-roqsana.jpg",
    email: "roqsanaakter@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/nasima-akter-roqsana",
    roles: [
      {
        legacyId: "nasima-akter-roqsana",
        unitCode: "FDT",
        role: "faculty",
        designation: {
          en: "Assistant Professor",
          bn: "সহকারী অধ্যাপক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "md-aminur-islam",
    slug: "md-aminur-islam",
    name: {
      en: "MD. Aminur Islam",
      bn: "মোঃ আমিনুর ইসলাম"
    },
    qualifications: "M.Sc. & B.Sc. in Textile Engineering (DUET)",
    photo: "./images/teachers/md-aminur-islam.jpg",
    email: "duetexaminur@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-aminur-islam",
    roles: [
      {
        legacyId: "md-aminur-islam",
        unitCode: "AMT",
        role: "faculty",
        designation: {
          en: "Acting Coordinator",
          bn: "ভারপ্রাপ্ত সমন্বয়ক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "esrat-jahan-nipa",
    slug: "esrat-jahan-nipa",
    name: {
      en: "Esrat Jahan Nipa",
      bn: "এছরাত জাহান নিপা"
    },
    qualifications: "BBA & MBA in Management at National University, Gazipur",
    photo: "./images/teachers/esrat-jahan-nipa.jpg",
    email: "esratjahannipa113@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/esrat-jahan-nipa",
    roles: [
      {
        legacyId: "esrat-jahan-nipa",
        unitCode: "BBA",
        role: "faculty",
        designation: {
          en: "Assistant Professor & Coordinator",
          bn: "সহকারী অধ্যাপক ও সমন্বয়ক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "md-shohidul-islam",
    slug: "md-shohidul-islam",
    name: {
      en: "Engr. MD. Shohidul Islam",
      bn: "প্রকৌশলী মোঃ শহীদুল ইসলাম"
    },
    qualifications: "PGD in Advance Computer Technology & B.Sc in CSE",
    photo: "./images/teachers/md-shohidul-islam.jpg",
    email: "registerinfo.bist@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-shohidul-islam",
    roles: [
      {
        legacyId: "md-shohidul-islam",
        unitCode: "ADMIN",
        role: "faculty",
        designation: {
          en: "Registrar",
          bn: "রেজিস্ট্রার"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      },
      {
        legacyId: "off-registrar",
        unitCode: "office-of-the-registrar",
        role: "officer",
        designation: {
          en: "Registrar",
          bn: "রেজিস্ট্রার"
        },
        unitName: {
          en: "Office of the Registrar",
          bn: "রেজিস্ট্রার শাখা"
        },
        displayOrder: 1
      }
    ]
  },
  {
    id: "nowkisa-tabassum-raiyan",
    slug: "nowkisa-tabassum-raiyan",
    name: {
      en: "Nowkisa Tabassum Raiyan",
      bn: "নওকিসা তাবাসসুম রাইয়ান"
    },
    qualifications: "MBA in Product & Fashion Merchandising",
    photo: "./images/teachers/nowkisa-tabassum-raiyan.jpeg",
    email: "nowkisa1104@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/nowkisa-tabassum-raiyan",
    roles: [
      {
        legacyId: "nowkisa-tabassum-raiyan",
        unitCode: "FDT",
        role: "faculty",
        designation: {
          en: "Assistant Professor",
          bn: "সহকারী অধ্যাপক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "jahir-ahmed-rifat",
    slug: "jahir-ahmed-rifat",
    name: {
      en: "Jahir Ahmed Rifat",
      bn: "জহির আহমেদ রিফাত"
    },
    qualifications: "MBA, BBA in Finance and Banking from Jatiya Kabi Kazi Nazrul Islam University",
    photo: "./images/teachers/jahir-ahmed-rifat.jpeg",
    email: "jahirahmedrifat.fnb@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/jahir-ahmed-rifat",
    roles: [
      {
        legacyId: "jahir-ahmed-rifat",
        unitCode: "BBA",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "m-m-abdul-kader",
    slug: "m-m-abdul-kader",
    name: {
      en: "M. M. Abdul Kader",
      bn: "এম. এম. আব্দুল কাদের"
    },
    qualifications: "BSc in Textile Engineering (Apparel Manufacturing) from DUET",
    photo: "./images/teachers/m-m-abdul-kader.jpg",
    email: "mm.abdul610@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/m-m-abdul-kader",
    roles: [
      {
        legacyId: "m-m-abdul-kader",
        unitCode: "AMT",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "shabnom-mustary",
    slug: "shabnom-mustary",
    name: {
      en: "Shabnom Mustary",
      bn: "শাবনম মুস্তারি"
    },
    qualifications: "Ph.D (On going), DUET; M.Sc in CSE, Friendship University of Russia",
    photo: "./images/teachers/shabnom-mustary.jpg",
    email: "shobnom93717@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/shabnom-mustary",
    roles: [
      {
        legacyId: "shabnom-mustary",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Assistant Professor & Coordinator",
          bn: "সহকারী অধ্যাপক ও সমন্বয়ক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "mohammad-naderuzzaman",
    slug: "mohammad-naderuzzaman",
    name: {
      en: "MD Naderuzzaman",
      bn: "মোঃ নাদেরুজ্জামান"
    },
    qualifications: "Ph.D (On going), DUET; M.Sc in CSE, DUET",
    photo: "./images/teachers/mohammad-naderuzzaman.jpg",
    email: "nader_u@yahoo.com",
    profileUrl: "https://bist.edu.bd/teacher-details/mohammad-naderuzzaman",
    roles: [
      {
        legacyId: "mohammad-naderuzzaman",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Assistant Professor",
          bn: "সহকারী অধ্যাপক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "rahat-kanon",
    slug: "rahat-kanon",
    name: {
      en: "Rahat Kanon",
      bn: "রাহাত কানন"
    },
    qualifications: "MBA major in Finance & Banking",
    photo: "./images/teachers/rahat-kanon.jpeg",
    email: "meraj.rahat001@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/rahat-kanon",
    roles: [
      {
        legacyId: "rahat-kanon",
        unitCode: "BBA",
        role: "faculty",
        designation: {
          en: "Assistant Professor",
          bn: "সহকারী অধ্যাপক"
        },
        employmentType: "Part-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "hasna-majury-tandra",
    slug: "hasna-majury-tandra",
    name: {
      en: "Hasna Majury Tandra",
      bn: "হাসনা মজুরী তন্দ্রা"
    },
    qualifications: "B.Sc & M.Sc in Mathematics from Shahjalal University of Science and Technology",
    photo: "./images/teachers/hasna-majury-tandra.jpg",
    email: "majurytandra@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/hasna-majury-tandra",
    roles: [
      {
        legacyId: "hasna-majury-tandra",
        unitCode: "AMT",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "abu-saeid",
    slug: "abu-saeid",
    name: {
      en: "Abu Saeid",
      bn: "আবু সাঈদ"
    },
    qualifications: "M.Sc. in CSE (On going), DUET & B.Sc. (Engg) in CSE, DUET",
    photo: "./images/teachers/abu-saeid.jpg",
    email: "saeid.duet@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/abu-saeid",
    roles: [
      {
        legacyId: "abu-saeid",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "imran-hossen",
    slug: "imran-hossen",
    name: {
      en: "Imran Hossen",
      bn: "ইমরান হোসেন"
    },
    qualifications: "B.Sc.(Engg) in CSE from DUET",
    photo: "./images/teachers/imran-hossen.jpg",
    email: "imranduet22@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/imran-hossen",
    roles: [
      {
        legacyId: "imran-hossen",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "israt-jahan-esha",
    slug: "israt-jahan-esha",
    name: {
      en: "Israt Jahan Esha",
      bn: "ইসরাত জাহান ঈশা"
    },
    qualifications: "MSS & BSS in Economics from Mawlana Bhashani Science & Technology University",
    photo: "./images/teachers/israt-jahan-esha.jpeg",
    email: "isratesha618746@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/israt-jahan-esha",
    roles: [
      {
        legacyId: "israt-jahan-esha",
        unitCode: "BBA",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "niger-sultana",
    slug: "niger-sultana",
    name: {
      en: "Niger Sultana",
      bn: "নাইজার সুলতানা"
    },
    qualifications: "Masters of Business Administration (MBA)",
    photo: "./images/teachers/niger-sultana.webp",
    email: "nigershelysultana1984@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/niger-sultana",
    roles: [
      {
        legacyId: "niger-sultana",
        unitCode: "BBA",
        role: "faculty",
        designation: {
          en: "Assistant Professor",
          bn: "সহকারী অধ্যাপক"
        },
        employmentType: "Part-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "salma-khatun",
    slug: "salma-khatun",
    name: {
      en: "Salma Khatun",
      bn: "সালমা খাতুন"
    },
    qualifications: "",
    photo: "./images/teachers/salma-khatun.webp",
    email: "salmakhatun4514@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/salma-khatun",
    roles: [
      {
        legacyId: "salma-khatun",
        unitCode: "FDT",
        role: "faculty",
        designation: {
          en: "Senior Lecturer",
          bn: "সিনিয়র প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "ak-azad",
    slug: "ak-azad",
    name: {
      en: "AK. Azad",
      bn: "এ.কে. আজাদ"
    },
    qualifications: "CFA, Pre-BFA, BFA (Hon's), MFA",
    photo: "./images/teachers/ak-azad.jpg",
    email: "ak.azad198421@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/aK-azad",
    roles: [
      {
        legacyId: "ak-azad",
        unitCode: "FDT",
        role: "faculty",
        designation: {
          en: "Assistant Professor",
          bn: "সহকারী অধ্যাপক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "afra-ibnath-tithy",
    slug: "afra-ibnath-tithy",
    name: {
      en: "Afra Ibnath Tithy",
      bn: "আফরা ইবনাত তিথি"
    },
    qualifications: "B.Sc.(Engg) in EEE from RUET",
    photo: "./images/teachers/afra-ibnath-tithy.jpeg",
    email: "afratithy5244@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/afra-ibnath-tithy",
    roles: [
      {
        legacyId: "afra-ibnath-tithy",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "md-monjurul-islam-pranto",
    slug: "md-monjurul-islam-pranto",
    name: {
      en: "Md. Monjurul Islam Pranto",
      bn: "মোঃ মনজুরুল ইসলাম প্রান্ত"
    },
    qualifications: "M.Sc (Ongoing) & B.Sc. in Textile Engineering at Dhaka University of Engineering & Technology (DUET), Gazipur",
    photo: "./images/teachers/md-monjurul-islam-pranto.jpg",
    email: "pranto.duet.te@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-monjurul-islam-pranto",
    roles: [
      {
        legacyId: "md-monjurul-islam-pranto",
        unitCode: "AMT",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "mr-uzzal-roy",
    slug: "mr-uzzal-roy",
    name: {
      en: "Uzzal Roy",
      bn: "উজ্জ্বল রায়"
    },
    qualifications: "M.Sc. (Ongoing) & B.Sc. in Textile Engineering (DUET)",
    photo: "./images/teachers/mr-uzzal-roy.jpg",
    email: "uroy6490@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/mr-uzzal-roy",
    roles: [
      {
        legacyId: "mr-uzzal-roy",
        unitCode: "TST",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "md-saukat-hossain",
    slug: "md-saukat-hossain",
    name: {
      en: "Md. Saukat Hossain",
      bn: "মোঃ সৌকত হোসেন"
    },
    qualifications: "Bachelor & Masters of Social Science (HSTU)",
    photo: "./images/teachers/md-saukat-hossain.jpg",
    email: "saukathstu@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-saukat-hossain",
    roles: [
      {
        legacyId: "md-saukat-hossain",
        unitCode: "BBA",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "azizul-islam",
    slug: "azizul-islam",
    name: {
      en: "Azizul Islam",
      bn: "আজিজুল ইসলাম"
    },
    qualifications: "B.Sc in CSE (Bangladesh University)",
    photo: "./images/teachers/azizul-islam.webp",
    email: "cseazizul@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/azizul-islam",
    roles: [
      {
        legacyId: "azizul-islam",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Software Developer",
          bn: "সফটওয়্যার ডেভেলপার"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      },
      {
        legacyId: "off-software-developer",
        unitCode: "computer-science-and-engineering-cse",
        role: "officer",
        designation: {
          en: "Software Developer",
          bn: "সফটওয়্যার ডেভেলপার"
        },
        unitName: {
          en: "Computer Science & Engineering (CSE)",
          bn: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE)"
        },
        displayOrder: 6
      }
    ]
  },
  {
    id: "md-shimuljoy-sobuj",
    slug: "md-shimuljoy-sobuj",
    name: {
      en: "Md. ShimulJoy Sobuj",
      bn: "মোঃ শিমুলজয় সবুজ"
    },
    qualifications: "Advance Computer Technology, BSS (Hon's), Diploma in DGT",
    photo: "./images/teachers/md-shimuljoy-sobuj.jpg",
    email: "bistshimul@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-shimulJoy-sobuj",
    roles: [
      {
        legacyId: "md-shimuljoy-sobuj",
        unitCode: "ADMIN",
        role: "faculty",
        designation: {
          en: "Graphics Designer",
          bn: "গ্রাফিক্স ডিজাইনার"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      },
      {
        legacyId: "off-graphics",
        unitCode: "computer-technology",
        role: "officer",
        designation: {
          en: "Graphics Designer",
          bn: "গ্রাফিক্স ডিজাইনার"
        },
        unitName: {
          en: "Computer Technology",
          bn: "কম্পিউটার টেকনোলজি"
        },
        displayOrder: 5
      }
    ]
  },
  {
    id: "alamgir-hossain",
    slug: "alamgir-hossain",
    name: {
      en: "Alamgir Hossain",
      bn: "আলমগীর হোসেন"
    },
    qualifications: "B.Sc In CSE (Southeast University)",
    photo: "./images/teachers/alamgir-hossain.webp",
    email: "smalamgirhossain9@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/alamgir-hossain",
    roles: [
      {
        legacyId: "alamgir-hossain",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Jr. Software Developer",
          bn: "জুনিয়র সফটওয়্যার ডেভেলপার"
        },
        employmentType: "Part-Time",
        isPrimary: true,
        displayOrder: 0
      },
      {
        legacyId: "off-jr-software-developer",
        unitCode: "computer-science-and-engineering-cse",
        role: "officer",
        designation: {
          en: "Jr. Software Developer",
          bn: "জুনিয়র সফটওয়্যার ডেভেলপার"
        },
        unitName: {
          en: "Computer Science & Engineering (CSE)",
          bn: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE)"
        },
        displayOrder: 7
      }
    ]
  },
  {
    id: "shalah-uddin-perbhez-shakil",
    slug: "shalah-uddin-perbhez-shakil",
    name: {
      en: "Shalah Uddin Perbhez Shakil",
      bn: "শালাহ উদ্দিন পরভেজ শাকিল"
    },
    qualifications: "M.Sc. in CSE",
    photo: "./images/teachers/shalah-uddin-perbhez-shakil.jpg",
    email: "shakilcse24@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/shalah-uddin-perbhez-shakil",
    roles: [
      {
        legacyId: "shalah-uddin-perbhez-shakil",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Senior Lecturer",
          bn: "সিনিয়র প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "md-yousuf-hossain",
    slug: "md-yousuf-hossain",
    name: {
      en: "Md. Yousuf Hossain",
      bn: "মোঃ ইউসুফ হোসেন"
    },
    qualifications: "Economics (BSS & MSS)",
    photo: "./images/teachers/md-yousuf-hossain.jpeg",
    email: "yousufshuvo169@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-yousuf-hossain",
    roles: [
      {
        legacyId: "md-yousuf-hossain",
        unitCode: "BBA",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Part-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "sumiayia-hashem",
    slug: "sumiayia-hashem",
    name: {
      en: "Sumiayia Hashem",
      bn: "সুমাইয়া হাশেম"
    },
    qualifications: "MSc in Fashion Design from BUFT & BSc in Textile Engineering (Major in Apparel Manufacturing) from AUST",
    photo: "./images/teachers/sumiayia-hashem.jpg",
    email: "sumaiya.hashem360@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/sumiayia-hashem",
    roles: [
      {
        legacyId: "sumiayia-hashem",
        unitCode: "FDT",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "md-azizur-rahman",
    slug: "md-azizur-rahman",
    name: {
      en: "Md. Azizur Rahman",
      bn: "মোঃ আজিজুর রহমান"
    },
    qualifications: "BSc In Textile Engineering",
    photo: "./images/teachers/md-azizur-rahman.jpg",
    email: "eng.arsumon@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-azizur-rahman",
    roles: [
      {
        legacyId: "md-azizur-rahman",
        unitCode: "ADMIN",
        role: "faculty",
        designation: {
          en: "Admission Officer",
          bn: "ভর্তি কর্মকর্তা"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      },
      {
        legacyId: "off-admission",
        unitCode: "academy-admin-and-hr",
        role: "officer",
        designation: {
          en: "Admission Officer",
          bn: "ভর্তি কর্মকর্তা"
        },
        unitName: {
          en: "Academy, Admin & HR",
          bn: "একাডেমি, প্রশাসন ও এইচআর"
        },
        displayOrder: 3
      }
    ]
  },
  {
    id: "g-m-rafi-ahamed",
    slug: "g-m-rafi-ahamed",
    name: {
      en: "G.M. Rafi Ahamed",
      bn: "জি.এম. রফি আহমেদ"
    },
    qualifications: "M.Sc in Physics",
    photo: "./images/teachers/g-m-rafi-ahamed.jpg",
    email: "gmrafiku43@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/g-m-rafi-ahamed",
    roles: [
      {
        legacyId: "g-m-rafi-ahamed",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "md-salauddin",
    slug: "md-salauddin",
    name: {
      en: "MD Salauddin",
      bn: "মোঃ সালাউদ্দিন"
    },
    qualifications: "B.Sc in Textile",
    photo: "./images/teachers/md-salauddin.jpeg",
    email: "salauddindorjoy69@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-salauddin",
    roles: [
      {
        legacyId: "md-salauddin",
        unitCode: "ADMIN",
        role: "faculty",
        designation: {
          en: "Acting Coordinator",
          bn: "ভারপ্রাপ্ত সমন্বয়ক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      },
      {
        legacyId: "off-project-coordinator",
        unitCode: "project",
        role: "officer",
        designation: {
          en: "Acting Coordinator (Project)",
          bn: "ভারপ্রাপ্ত সমন্বয়ক (প্রকল্প)"
        },
        unitName: {
          en: "Project",
          bn: "প্রকল্প"
        },
        displayOrder: 8
      }
    ]
  },
  {
    id: "shariful-haque",
    slug: "shariful-haque",
    name: {
      en: "Shariful Haque",
      bn: "শরিফুল হক"
    },
    qualifications: "B.Sc. in EEE",
    photo: "./images/teachers/shariful-haque.jpg",
    email: "sharifulhaqueeee@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/shariful-haque",
    roles: [
      {
        legacyId: "shariful-haque",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "anamul-haque",
    slug: "anamul-haque",
    name: {
      en: "Anamul Haque",
      bn: "আনামুল হক"
    },
    qualifications: "M.Sc in CSE (Running) & B.Sc. in CSE",
    photo: "./images/teachers/anamul-haque.jpeg",
    email: "anamulhasan2814@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/anamul-haque",
    roles: [
      {
        legacyId: "anamul-haque",
        unitCode: "CSE",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Part-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "md-firoz-hossain",
    slug: "md-firoz-hossain",
    name: {
      en: "Md. Firoz Hossain",
      bn: "মোঃ ফিরোজ হোসেন"
    },
    qualifications: "MSc in Textile Engineering (DUET); BSc in Textile Engineering (DUET)",
    photo: "./images/teachers/md-firoz-hossain.jpg",
    email: "firozhossain334@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-firoz-hossain",
    roles: [
      {
        legacyId: "md-firoz-hossain",
        unitCode: "TST",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "abu-asad",
    slug: "abu-asad",
    name: {
      en: "Abu Asad",
      bn: "আবু আসাদ"
    },
    qualifications: "B.Sc. in Textile Engineering",
    photo: "./images/teachers/abu-asad.jpg",
    email: "mdasad497@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/abu-asad",
    roles: [
      {
        legacyId: "abu-asad",
        unitCode: "TST",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "md-ismail-hossain",
    slug: "md-ismail-hossain",
    name: {
      en: "Md Ismail Hossain",
      bn: "মোঃ ইসমাইল হোসেন"
    },
    qualifications: "MA",
    photo: "./images/person-placeholder.png",
    email: "ismaillmaster@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-ismail-hossain",
    roles: [
      {
        legacyId: "md-ismail-hossain",
        unitCode: "ADMIN",
        role: "faculty",
        designation: {
          en: "Public Relations Officer",
          bn: "জনসংযোগ কর্মকর্তা"
        },
        employmentType: "Full-Time",
        isPrimary: true,
        displayOrder: 0
      },
      {
        legacyId: "off-public-relations",
        unitCode: "academy-admin-and-hr",
        role: "officer",
        designation: {
          en: "Public Relations Officer",
          bn: "জনসংযোগ কর্মকর্তা"
        },
        unitName: {
          en: "Academy, Admin & HR",
          bn: "একাডেমি, প্রশাসন ও এইচআর"
        },
        displayOrder: 4
      }
    ]
  },
  {
    id: "abu-bakkar-siddik",
    slug: "abu-bakkar-siddik",
    name: {
      en: "Abu Bakkar Siddik",
      bn: "আবু বক্কর সিদ্দিক"
    },
    qualifications: "B.Sc in AMT",
    photo: "./images/teachers/abu-bakkar-siddik.jpg",
    email: "abubakkarsiddik@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/abu-bakkar-siddik",
    roles: [
      {
        legacyId: "abu-bakkar-siddik",
        unitCode: "AMT",
        role: "faculty",
        designation: {
          en: "Lecturer",
          bn: "প্রভাষক"
        },
        employmentType: "Part-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  },
  {
    id: "md-manirul-islam",
    slug: "md-manirul-islam",
    name: {
      en: "Md. Manirul Islam",
      bn: "মোঃ মনিরুল ইসলাম"
    },
    qualifications: "BSc in Textile Engineering (University of Dhaka); MBA in Apparel Merchandising (National University)",
    photo: "./images/teachers/md-manirul-slam.webp",
    email: "manirdu92@gmail.com",
    profileUrl: "https://bist.edu.bd/teacher-details/md-manirul-slam",
    roles: [
      {
        legacyId: "md-manirul-islam",
        unitCode: "AMT",
        role: "faculty",
        designation: {
          en: "Assistant Professor",
          bn: "সহকারী অধ্যাপক"
        },
        employmentType: "Part-Time",
        isPrimary: true,
        displayOrder: 0
      }
    ]
  }
];

/** Legacy id for a role, falling back to a deterministic slug-based id. */
const roleId = (person: Person, role: PersonRoleRecord): string =>
  role.legacyId ?? `${person.slug}-${role.role}`;

/**
 * Faculty projections. Same shape as the previous FACULTY_MEMBERS array, so
 * FacultySection, FacultyPage and CareerSection consume it without changes.
 */
export const FACULTY_MEMBERS: FacultyMember[] = PEOPLE.flatMap((person) =>
  person.roles
    .filter((role) => role.role === 'faculty')
    .map((role) => ({
      id: roleId(person, role),
      name: person.name,
      designation: role.designation,
      department: role.unitCode,
      employmentType: role.employmentType ?? '',
      qualifications: person.qualifications ?? '',
      email: person.email ?? '',
      image: person.photo,
      ...(person.profileUrl ? { profileUrl: person.profileUrl } : {}),
    }))
);

/**
 * Officer projections, re-sorted by the published display order so the homepage
 * section renders in exactly the same sequence as before the migration.
 */
export const ADMINISTRATIVE_OFFICERS: AdministrativeOfficer[] = PEOPLE.flatMap((person) =>
  person.roles
    .filter((role) => role.role === 'officer')
    .map((role) => ({
      id: roleId(person, role),
      name: person.name,
      designation: role.designation,
      office: role.unitName ?? { en: role.unitCode, bn: role.unitCode },
      qualifications: person.qualifications ?? '',
      email: person.email ?? '',
      image: person.photo,
      order: role.displayOrder,
      ...(person.phone ? { phone: person.phone } : {}),
      ...(role.responsibilities ? { responsibilities: role.responsibilities } : {}),
      ...(person.roomNo ? { roomNo: person.roomNo } : {}),
    }))
).sort((a, b) => a.order - b.order);
