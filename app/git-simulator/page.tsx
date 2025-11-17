'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

type FileStatus = 'untracked' | 'modified' | 'staged' | 'committed';

interface SimFile {
  name: string;
  content: string;
  status: FileStatus;
}

interface Commit {
  hash: string;
  message: string;
  timestamp: string;
  files: string[];
  author: string;
}

interface Branch {
  name: string;
  commits: Commit[];
  remote?: boolean;
}

interface PullRequest {
  id: number;
  title: string;
  from: string;
  to: string;
  status: 'open' | 'merged' | 'closed';
  description: string;
}

const TUTORIAL_STEPS = [
  {
    id: 1,
    title: 'Git 초기화',
    description: '프로젝트를 Git으로 관리하기 위해 먼저 초기화해야 합니다.',
    command: 'git init',
    hint: '💡 git init 명령어를 입력하면 현재 폴더가 Git 저장소로 변환됩니다.',
    aiGuide: '안녕하세요! 👋 Git 여행을 시작해볼까요? 먼저 `git init`을 입력해서 Git 저장소를 만들어보세요!',
  },
  {
    id: 2,
    title: '파일 상태 확인',
    description: '파일들의 현재 상태를 확인해봅시다.',
    command: 'git status',
    hint: '💡 git status로 현재 작업 디렉토리의 상태를 확인할 수 있습니다.',
    aiGuide: '잘했어요! 🎉 이제 `git status`로 파일들의 상태를 확인해보세요. 어떤 파일들이 있는지 볼 수 있어요!',
  },
  {
    id: 'gitignore',
    title: '.gitignore 설정 (중요!)',
    description: 'Git에 올리면 안 되는 파일들을 지정합니다.',
    command: 'gitignore',
    hint: '💡 .env, node_modules, API 키 등은 절대 Git에 올리면 안 됩니다!',
    aiGuide: '⚠️ 잠깐! Git에 올리면 안 되는 파일들이 있어요. .gitignore 파일을 만들어서 보호해야 할 파일들을 지정해보세요!',
  },
  {
    id: 3,
    title: '스테이징 영역에 추가',
    description: '변경된 파일을 스테이징 영역에 추가합니다.',
    command: 'git add',
    hint: '💡 git add <파일명> 또는 git add . (모든 파일)',
    aiGuide: '파일들을 발견했네요! 📦 이제 `git add .`로 모든 파일을 스테이징 영역에 올려보세요. 커밋 준비 단계예요! (.gitignore에 있는 파일은 자동으로 제외돼요)',
  },
  {
    id: 4,
    title: '커밋 생성',
    description: '스테이징된 변경사항을 커밋으로 저장합니다.',
    command: 'git commit',
    hint: '💡 git commit -m "커밋 메시지"',
    aiGuide: '좋아요! 💾 이제 `git commit -m "첫 커밋"`처럼 의미있는 메시지와 함께 저장해보세요!',
  },
  {
    id: 5,
    title: '브랜치 생성',
    description: '새로운 기능 개발을 위한 브랜치를 만듭니다.',
    command: 'git branch',
    hint: '💡 git branch <브랜치명>',
    aiGuide: '완벽해요! 🌿 실제 개발에서는 기능별로 브랜치를 만들어요. `git branch feature/login`으로 새 브랜치를 만들어보세요!',
  },
  {
    id: 6,
    title: '브랜치 이동',
    description: '다른 브랜치로 이동합니다.',
    command: 'git checkout',
    hint: '💡 git checkout <브랜치명> 또는 git switch <브랜치명>',
    aiGuide: '브랜치가 생겼네요! 🚀 `git checkout feature/login`으로 새 브랜치로 이동해보세요!',
  },
  {
    id: 7,
    title: '브랜치 병합',
    description: '개발한 기능을 메인 브랜치에 합칩니다.',
    command: 'git merge',
    hint: '💡 git merge <브랜치명>',
    aiGuide: '이제 합치는 방법을 배울 차례예요! 🔀 먼저 `git checkout main`으로 돌아간 뒤 `git merge feature/login`으로 병합해보세요!',
  },
  {
    id: 8,
    title: 'GitHub에 푸시',
    description: '로컬 변경사항을 원격 저장소에 업로드합니다.',
    command: 'git push',
    hint: '💡 git push origin <브랜치명>',
    aiGuide: '드디어 GitHub에 올릴 시간이에요! ☁️ `git push origin main`으로 코드를 공유해보세요!',
  },
  {
    id: 9,
    title: 'Pull Request 생성',
    description: '코드 리뷰를 위한 Pull Request를 만듭니다.',
    command: 'pr create',
    hint: '💡 pr create <제목>',
    aiGuide: '협업의 꽃, PR이에요! 🌸 `pr create "로그인 기능 추가"`로 리뷰 요청을 보내보세요!',
  },
  {
    id: 10,
    title: 'Pull Request 병합',
    description: 'PR을 검토하고 메인 브랜치에 병합합니다.',
    command: 'pr merge',
    hint: '💡 pr merge <PR번호>',
    aiGuide: '마지막 단계예요! 🎊 `pr merge 1`로 PR을 병합하면 여러분의 코드가 메인에 합류해요!',
  },
];

export default function GitSimulator() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [files, setFiles] = useState<SimFile[]>([
    { name: 'index.html', content: '<h1>Hello World</h1>', status: 'untracked' },
    { name: 'style.css', content: 'body { margin: 0; }', status: 'untracked' },
    { name: 'script.js', content: 'console.log("Hello");', status: 'untracked' },
  ]);
  const [branches, setBranches] = useState<Branch[]>([
    { name: 'main', commits: [] },
    { name: 'origin/main', commits: [], remote: true },
  ]);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [commandInput, setCommandInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '🎮 Git & GitHub 시뮬레이터에 오신 것을 환영합니다!',
    '📚 AI 가이드와 함께 Git과 GitHub를 배워보세요.',
    '',
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<(number | string)[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [showAiRobot, setShowAiRobot] = useState(true);

  // Compute aiMessage directly from currentStep instead of using state
  const aiMessage = currentStep < TUTORIAL_STEPS.length 
    ? TUTORIAL_STEPS[currentStep].aiGuide 
    : TUTORIAL_STEPS[0].aiGuide;

  const addOutput = (text: string | string[]) => {
    const lines = Array.isArray(text) ? text : [text];
    setTerminalOutput((prev) => [...prev, ...lines, '']);
  };

  const generateCommitHash = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const updateAiMessage = (_message?: string) => {
    // Message parameter available for future use
    setShowAiRobot(true);
    setTimeout(() => setShowAiRobot(false), 10000);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    addOutput(`$ ${trimmedCmd}`);

    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const subCommand = parts[1];
    const args = parts.slice(2);

    switch (command) {
      case 'git':
        handleGitCommand(subCommand, args);
        break;
      case 'gitignore':
        handleGitignoreCommand();
        break;
      case 'pr':
        handlePRCommand(subCommand, args);
        break;
      case 'clear':
        setTerminalOutput([]);
        break;
      case 'help':
        showHelp();
        break;
      default:
        addOutput(`❌ 알 수 없는 명령어: ${command}`);
        updateAiMessage('🤔 명령어를 찾을 수 없어요. `help`를 입력해서 사용 가능한 명령어를 확인해보세요!');
    }

    setCommandInput('');
  };

  const handleGitCommand = (subCommand: string, args: string[]) => {
    switch (subCommand) {
      case 'init':
        if (!isInitialized) {
          setIsInitialized(true);
          addOutput([
            '✅ Initialized empty Git repository',
            '🎉 Git 저장소가 초기화되었습니다!',
          ]);
          checkStepCompletion(1);
          updateAiMessage('축하해요! 🎊 Git 저장소가 만들어졌어요. 이제 다음 단계로 가볼까요?');
        } else {
          addOutput('⚠️  이미 Git 저장소가 초기화되어 있습니다.');
        }
        break;

      case 'status':
        if (!isInitialized) {
          addOutput('❌ Git 저장소가 아닙니다. git init을 먼저 실행하세요.');
          updateAiMessage('아직 Git 저장소가 없어요! 먼저 `git init`을 입력해주세요.');
          return;
        }
        showStatus();
        checkStepCompletion(2);
        updateAiMessage('잘했어요! 👏 파일 상태를 확인했네요. 이제 파일들을 추가해볼까요?');
        break;

      case 'add':
        if (!isInitialized) {
          addOutput('❌ Git 저장소가 아닙니다.');
          return;
        }
        handleAdd(args);
        checkStepCompletion(3);
        break;

      case 'commit':
        if (!isInitialized) {
          addOutput('❌ Git 저장소가 아닙니다.');
          return;
        }
        handleCommit(args);
        checkStepCompletion(4);
        break;

      case 'branch':
        if (!isInitialized) {
          addOutput('❌ Git 저장소가 아닙니다.');
          return;
        }
        handleBranch(args);
        checkStepCompletion(5);
        break;

      case 'checkout':
      case 'switch':
        if (!isInitialized) {
          addOutput('❌ Git 저장소가 아닙니다.');
          return;
        }
        handleCheckout(args);
        checkStepCompletion(6);
        break;

      case 'merge':
        if (!isInitialized) {
          addOutput('❌ Git 저장소가 아닙니다.');
          return;
        }
        handleMerge(args);
        checkStepCompletion(7);
        break;

      case 'push':
        if (!isInitialized) {
          addOutput('❌ Git 저장소가 아닙니다.');
          return;
        }
        handlePush(args);
        checkStepCompletion(8);
        break;

      case 'pull':
        if (!isInitialized) {
          addOutput('❌ Git 저장소가 아닙니다.');
          return;
        }
        handlePull(args);
        break;

      case 'log':
        if (!isInitialized) {
          addOutput('❌ Git 저장소가 아닙니다.');
          return;
        }
        showLog();
        break;

      default:
        addOutput(`❌ 알 수 없는 Git 명령어: ${subCommand}`);
        addOutput('💡 help 명령어로 사용 가능한 명령어를 확인하세요.');
    }
  };

  const handlePRCommand = (subCommand: string, args: string[]) => {
    switch (subCommand) {
      case 'create':
        handlePRCreate(args);
        checkStepCompletion(9);
        break;
      case 'list':
        handlePRList();
        break;
      case 'merge':
        handlePRMerge(args);
        checkStepCompletion(10);
        break;
      default:
        addOutput(`❌ 알 수 없는 PR 명령어: ${subCommand}`);
    }
  };

  const showStatus = () => {
    const branch = branches.find((b) => b.name === currentBranch);
    const untracked = files.filter((f) => f.status === 'untracked');
    const modified = files.filter((f) => f.status === 'modified');
    const staged = files.filter((f) => f.status === 'staged');

    addOutput([
      `On branch ${currentBranch}`,
      branch?.commits.length === 0 ? 'No commits yet' : '',
    ]);

    if (staged.length > 0) {
      addOutput('Changes to be committed:');
      staged.forEach((f) => addOutput(`  🟢 ${f.name}`));
    }

    if (modified.length > 0) {
      addOutput('Changes not staged for commit:');
      modified.forEach((f) => addOutput(`  🟡 ${f.name}`));
    }

    if (untracked.length > 0) {
      addOutput('Untracked files:');
      untracked.forEach((f) => addOutput(`  ⚪ ${f.name}`));
    }

    if (staged.length === 0 && modified.length === 0 && untracked.length === 0) {
      addOutput('✨ working tree clean');
    }
  };

  const handleAdd = (args: string[]) => {
    if (args.length === 0) {
      addOutput('❌ 파일명을 입력하세요. (예: git add index.html 또는 git add .)');
      return;
    }

    if (args[0] === '.') {
      const updatedFiles = files.map((f) =>
        f.status === 'untracked' || f.status === 'modified'
          ? { ...f, status: 'staged' as FileStatus }
          : f
      );
      setFiles(updatedFiles);
      addOutput('✅ 모든 변경사항이 스테이징되었습니다.');
      updateAiMessage('완벽해요! 🎯 파일들이 스테이징되었어요. 이제 커밋할 준비가 됐네요!');
    } else {
      const fileName = args[0];
      const fileIndex = files.findIndex((f) => f.name === fileName);
      if (fileIndex === -1) {
        addOutput(`❌ 파일을 찾을 수 없습니다: ${fileName}`);
        return;
      }

      const updatedFiles = [...files];
      if (updatedFiles[fileIndex].status === 'committed') {
        addOutput(`⚠️  ${fileName}은(는) 이미 커밋된 파일입니다.`);
        return;
      }
      updatedFiles[fileIndex].status = 'staged';
      setFiles(updatedFiles);
      addOutput(`✅ ${fileName}이(가) 스테이징되었습니다.`);
      updateAiMessage(`좋아요! ${fileName}을 추가했어요. 다른 파일도 추가하거나 커밋해보세요!`);
    }
  };

  const handleCommit = (args: string[]) => {
    const stagedFiles = files.filter((f) => f.status === 'staged');
    if (stagedFiles.length === 0) {
      addOutput('❌ 스테이징된 파일이 없습니다. git add로 파일을 먼저 추가하세요.');
      updateAiMessage('커밋할 파일이 없어요! 먼저 `git add .`로 파일을 추가해주세요.');
      return;
    }

    const messageIndex = args.indexOf('-m');
    if (messageIndex === -1 || !args[messageIndex + 1]) {
      addOutput('❌ 커밋 메시지를 입력하세요. (예: git commit -m "메시지")');
      updateAiMessage('커밋 메시지가 필요해요! `git commit -m "첫 커밋"`처럼 입력해주세요.');
      return;
    }

    const message = args.slice(messageIndex + 1).join(' ').replace(/['"]/g, '');
    const hash = generateCommitHash();
    const commit: Commit = {
      hash,
      message,
      timestamp: new Date().toLocaleString('ko-KR'),
      files: stagedFiles.map((f) => f.name),
      author: 'You',
    };

    const updatedBranches = branches.map((b) =>
      b.name === currentBranch ? { ...b, commits: [...b.commits, commit] } : b
    );
    setBranches(updatedBranches);

    const updatedFiles = files.map((f) =>
      f.status === 'staged' ? { ...f, status: 'committed' as FileStatus } : f
    );
    setFiles(updatedFiles);

    addOutput([
      `[${currentBranch} ${hash}] ${message}`,
      `${stagedFiles.length} file(s) changed`,
      '✅ 커밋이 완료되었습니다!',
    ]);
    updateAiMessage('훌륭해요! 🌟 커밋을 만들었어요. 이제 브랜치를 만들어볼까요?');
  };

  const handleBranch = (args: string[]) => {
    if (args.length === 0) {
      addOutput('브랜치 목록:');
      branches.filter(b => !b.remote).forEach((b) => {
        const prefix = b.name === currentBranch ? '* ' : '  ';
        addOutput(`${prefix}${b.name}`);
      });
      updateAiMessage('브랜치 목록을 확인했어요! 새 브랜치를 만들려면 `git branch <브랜치명>`을 입력하세요.');
      return;
    }

    const branchName = args[0];
    if (branches.find((b) => b.name === branchName)) {
      addOutput(`❌ 브랜치 '${branchName}'이(가) 이미 존재합니다.`);
      return;
    }

    const currentBranchData = branches.find((b) => b.name === currentBranch);
    setBranches([
      ...branches,
      { name: branchName, commits: currentBranchData?.commits || [] },
    ]);
    addOutput(`✅ 브랜치 '${branchName}'이(가) 생성되었습니다.`);
    updateAiMessage(`멋져요! 🌿 ${branchName} 브랜치를 만들었어요. \`git checkout ${branchName}\`으로 이동해보세요!`);
  };

  const handleCheckout = (args: string[]) => {
    if (args.length === 0) {
      addOutput('❌ 브랜치명을 입력하세요.');
      return;
    }

    const branchName = args[0];
    if (!branches.find((b) => b.name === branchName && !b.remote)) {
      addOutput(`❌ 브랜치 '${branchName}'을(를) 찾을 수 없습니다.`);
      return;
    }

    setCurrentBranch(branchName);
    addOutput(`✅ '${branchName}' 브랜치로 이동했습니다.`);
    updateAiMessage(`좋아요! 🚀 ${branchName} 브랜치로 이동했어요. 여기서 마음껏 작업해보세요!`);
  };

  const handleMerge = (args: string[]) => {
    if (args.length === 0) {
      addOutput('❌ 병합할 브랜치명을 입력하세요.');
      return;
    }

    const sourceBranch = args[0];
    const source = branches.find((b) => b.name === sourceBranch);
    if (!source) {
      addOutput(`❌ 브랜치 '${sourceBranch}'을(를) 찾을 수 없습니다.`);
      return;
    }

    if (sourceBranch === currentBranch) {
      addOutput('❌ 같은 브랜치를 병합할 수 없습니다.');
      return;
    }

    const updatedBranches = branches.map((b) => {
      if (b.name === currentBranch) {
        const newCommits = source.commits.filter(
          (sc) => !b.commits.find((bc) => bc.hash === sc.hash)
        );
        return { ...b, commits: [...b.commits, ...newCommits] };
      }
      return b;
    });
    setBranches(updatedBranches);

    addOutput([
      `✅ '${sourceBranch}' 브랜치를 '${currentBranch}'로 병합했습니다.`,
      '🎉 Fast-forward merge 완료!',
    ]);
    updateAiMessage('완벽해요! 🔀 브랜치를 병합했어요. 이제 GitHub에 푸시해볼까요?');
  };

  const handlePush = (args: string[]) => {
    const remote = args[0] || 'origin';
    const branch = args[1] || currentBranch;

    const localBranch = branches.find(b => b.name === branch);
    if (!localBranch) {
      addOutput(`❌ 브랜치 '${branch}'를 찾을 수 없습니다.`);
      return;
    }

    const remoteBranchName = `${remote}/${branch}`;
    const updatedBranches = branches.map(b => 
      b.name === remoteBranchName ? { ...b, commits: [...localBranch.commits] } : b
    );

    if (!branches.find(b => b.name === remoteBranchName)) {
      updatedBranches.push({
        name: remoteBranchName,
        commits: [...localBranch.commits],
        remote: true,
      });
    }

    setBranches(updatedBranches);
    addOutput([
      `Enumerating objects: ${localBranch.commits.length}...`,
      `Counting objects: 100% done`,
      `To https://github.com/username/repo.git`,
      `   ${localBranch.commits[0]?.hash || '0000000'}..${localBranch.commits[localBranch.commits.length - 1]?.hash || '0000000'}  ${branch} -> ${branch}`,
      '✅ 푸시 완료!',
    ]);
    updateAiMessage('대단해요! ☁️ GitHub에 코드를 올렸어요. 이제 PR을 만들어볼까요?');
  };

  const handlePull = (args: string[]) => {
    const remote = args[0] || 'origin';
    const branch = args[1] || currentBranch;

    addOutput([
      `From https://github.com/username/${remote}`,
      ` * branch            ${branch} -> FETCH_HEAD`,
      'Already up to date.',
    ]);
    updateAiMessage();
  };

  const handlePRCreate = (args: string[]) => {
    if (args.length === 0) {
      addOutput('❌ PR 제목을 입력하세요. (예: pr create "기능 추가")');
      return;
    }

    const title = args.join(' ').replace(/['"]/g, '');
    const newPR: PullRequest = {
      id: pullRequests.length + 1,
      title,
      from: currentBranch,
      to: 'main',
      status: 'open',
      description: `${currentBranch}를 main으로 병합`,
    };

    setPullRequests([...pullRequests, newPR]);
    addOutput([
      '✅ Pull Request가 생성되었습니다!',
      `#${newPR.id} ${title}`,
      `${newPR.from} → ${newPR.to}`,
      '',
      '🔗 https://github.com/username/repo/pull/' + newPR.id,
    ]);
    updateAiMessage('훌륭해요! 🌸 PR을 만들었어요. 팀원들이 코드 리뷰를 할 수 있어요!');
  };

  const handlePRList = () => {
    if (pullRequests.length === 0) {
      addOutput('열린 Pull Request가 없습니다.');
      return;
    }

    addOutput('Pull Requests:');
    pullRequests.forEach(pr => {
      const statusEmoji = pr.status === 'open' ? '🟢' : pr.status === 'merged' ? '🟣' : '⚪';
      addOutput(`${statusEmoji} #${pr.id} ${pr.title} (${pr.from} → ${pr.to}) [${pr.status}]`);
    });
  };

  const handlePRMerge = (args: string[]) => {
    if (args.length === 0) {
      addOutput('❌ PR 번호를 입력하세요. (예: pr merge 1)');
      return;
    }

    const prId = parseInt(args[0]);
    const pr = pullRequests.find(p => p.id === prId);

    if (!pr) {
      addOutput(`❌ PR #${prId}를 찾을 수 없습니다.`);
      return;
    }

    if (pr.status !== 'open') {
      addOutput(`❌ 이미 ${pr.status} 상태입니다.`);
      return;
    }

    const sourceBranch = branches.find(b => b.name === pr.from);
    const targetBranch = branches.find(b => b.name === pr.to);

    if (sourceBranch && targetBranch) {
      const updatedBranches = branches.map(b => {
        if (b.name === pr.to) {
          return { ...b, commits: [...b.commits, ...sourceBranch.commits.filter(
            sc => !b.commits.find(bc => bc.hash === sc.hash)
          )]};
        }
        return b;
      });
      setBranches(updatedBranches);
    }

    const updatedPRs = pullRequests.map(p =>
      p.id === prId ? { ...p, status: 'merged' as const } : p
    );
    setPullRequests(updatedPRs);

    addOutput([
      `✅ PR #${prId} "${pr.title}" 병합 완료!`,
      `${pr.from} → ${pr.to}`,
      '🎊 축하합니다! 코드가 메인 브랜치에 합쳐졌어요!',
    ]);
    updateAiMessage('🎉 축하해요! PR을 병합했어요. Git & GitHub 워크플로우를 마스터했어요!');
  };

  const showLog = () => {
    const branch = branches.find((b) => b.name === currentBranch);
    if (!branch || branch.commits.length === 0) {
      addOutput('커밋 기록이 없습니다.');
      return;
    }

    addOutput('커밋 기록:');
    [...branch.commits].reverse().forEach((commit) => {
      addOutput([
        `commit ${commit.hash}`,
        `Author: ${commit.author}`,
        `Date: ${commit.timestamp}`,
        `    ${commit.message}`,
        '',
      ]);
    });
  };

  const handleGitignoreCommand = () => {
    addOutput([
      '📝 .gitignore 파일을 생성했습니다!',
      '',
      '🔒 다음 파일들은 Git에 추가되지 않습니다:',
      '  .env',
      '  .env.local',
      '  .env.*.local',
      '  node_modules/',
      '  .next/',
      '  *.log',
      '  .DS_Store',
      '',
      '💡 이제 git add를 해도 이 파일들은 자동으로 제외됩니다!',
      '⚠️  API 키, 비밀번호 등 민감한 정보는 반드시 .gitignore에 추가하세요.',
    ]);
    
    // .gitignore 파일 추가
    const gitignoreExists = files.some(f => f.name === '.gitignore');
    if (!gitignoreExists) {
      setFiles([...files, {
        name: '.gitignore',
        content: `.env\n.env.local\nnode_modules/\n.next/\n*.log`,
        status: 'staged'
      }]);
    }
    
    checkStepCompletion('gitignore');
    updateAiMessage('완벽해요! 🛡️ 이제 민감한 파일들이 보호됩니다. 다음 단계로 가볼까요?');
  };

  const showHelp = () => {
    addOutput([
      '📖 사용 가능한 명령어:',
      '',
      '🔹 Git 기본 명령어:',
      '  git init           - Git 저장소 초기화',
      '  git status         - 현재 상태 확인',
      '  git add <파일>     - 파일 스테이징',
      '  git add .          - 모든 파일 스테이징',
      '  git commit -m "메시지" - 커밋 생성',
      '  git branch         - 브랜치 목록',
      '  git branch <이름>  - 브랜치 생성',
      '  git checkout <브랜치> - 브랜치 이동',
      '  git merge <브랜치> - 브랜치 병합',
      '  git log            - 커밋 기록',
      '',
      '🔹 보안 명령어:',
      '  gitignore          - .gitignore 파일 생성 (민감한 파일 보호)',
      '',
      '🔹 GitHub 명령어:',
      '  git push origin <브랜치> - GitHub에 푸시',
      '  git pull origin <브랜치> - GitHub에서 가져오기',
      '  pr create <제목>   - Pull Request 생성',
      '  pr list            - PR 목록 보기',
      '  pr merge <번호>    - PR 병합',
      '',
      '🔹 기타:',
      '  clear              - 화면 지우기',
      '  help               - 도움말',
    ]);
  };

  const checkStepCompletion = (stepId: number | string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      const stepIndex = TUTORIAL_STEPS.findIndex(s => s.id === stepId);
      if (stepIndex > -1 && currentStep === stepIndex) {
        setCurrentStep(stepIndex + 1);
      }
    }
  };

  const createNewFile = () => {
    const fileName = prompt('새 파일 이름을 입력하세요:');
    if (fileName && !files.find((f) => f.name === fileName)) {
      setFiles([
        ...files,
        { name: fileName, content: '// 새 파일', status: 'untracked' },
      ]);
      addOutput(`📝 ${fileName} 파일이 생성되었습니다.`);
      updateAiMessage(`${fileName} 파일을 만들었네요! 이제 git add로 추가해보세요.`);
    }
  };

  const modifyFile = (fileName: string) => {
    const updatedFiles = files.map((f) =>
      f.name === fileName && f.status === 'committed'
        ? { ...f, status: 'modified' as FileStatus, content: f.content + '\n// 수정됨' }
        : f
    );
    setFiles(updatedFiles);
    addOutput(`✏️  ${fileName} 파일이 수정되었습니다.`);
    updateAiMessage(`${fileName}을 수정했어요! git status로 확인해보세요.`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <PageHeader />

      {/* AI Robot Guide */}
      {showAiRobot && (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce">
          <div className="relative">
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 max-w-md border-4 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="text-6xl">🤖</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-purple-600">AI 가이드</h3>
                  <p className="text-sm leading-relaxed">{aiMessage}</p>
                </div>
                <button
                  onClick={() => setShowAiRobot(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">🎮 Git & GitHub 시뮬레이터</h1>
          <p className="text-xl text-purple-300">AI 로봇과 함께 실전처럼 배우는 버전 관리</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 튜토리얼 패널 */}
          <div className="lg:col-span-1 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              📚 튜토리얼
              <span className="text-sm font-normal text-purple-300">
                ({completedSteps.length}/{TUTORIAL_STEPS.length})
              </span>
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {TUTORIAL_STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    completedSteps.includes(step.id)
                      ? 'bg-green-500/20 border-green-400'
                      : currentStep === index
                      ? 'bg-purple-500/20 border-purple-400'
                      : 'bg-white/5 border-white/10'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {completedSteps.includes(step.id) ? '✅' : '📍'}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm mb-1">
                        {step.id}. {step.title}
                      </h3>
                      <p className="text-xs text-gray-300 mb-2">{step.description}</p>
                      <code className="text-xs bg-black/30 px-2 py-1 rounded block mb-2">
                        {step.command}
                      </code>
                      <p className="text-xs text-yellow-300">{step.hint}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAiRobot(true)}
              className="mt-4 w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-2xl">🤖</span>
              AI 가이드 다시 보기
            </button>
          </div>

          {/* 메인 작업 공간 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 파일 시스템 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">📁 프로젝트 파일</h2>
                <button
                  onClick={createNewFile}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-semibold transition-colors"
                >
                  + 새 파일
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className={`p-4 rounded-xl border-2 ${
                      file.status === 'committed'
                        ? 'bg-green-500/10 border-green-400'
                        : file.status === 'staged'
                        ? 'bg-blue-500/10 border-blue-400'
                        : file.status === 'modified'
                        ? 'bg-yellow-500/10 border-yellow-400'
                        : 'bg-gray-500/10 border-gray-400'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-mono text-sm font-bold">{file.name}</span>
                      <span className="text-xs">
                        {file.status === 'committed' && '🟢'}
                        {file.status === 'staged' && '🔵'}
                        {file.status === 'modified' && '🟡'}
                        {file.status === 'untracked' && '⚪'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mb-2">
                      상태: {file.status}
                    </p>
                    <pre className="text-xs bg-black/30 p-2 rounded overflow-x-auto">
                      {file.content}
                    </pre>
                    {file.status === 'committed' && (
                      <button
                        onClick={() => modifyFile(file.name)}
                        className="mt-2 w-full px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 rounded text-xs"
                      >
                        ✏️ 파일 수정
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Git & GitHub 상태 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold mb-4">🌿 Git & GitHub 상태</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-purple-500/20 p-4 rounded-xl text-center border border-purple-400">
                  <div className="text-2xl font-bold">
                    {isInitialized ? '✅' : '❌'}
                  </div>
                  <div className="text-xs mt-1">Git 초기화</div>
                </div>
                <div className="bg-blue-500/20 p-4 rounded-xl text-center border border-blue-400">
                  <div className="text-2xl font-bold">{currentBranch}</div>
                  <div className="text-xs mt-1">현재 브랜치</div>
                </div>
                <div className="bg-green-500/20 p-4 rounded-xl text-center border border-green-400">
                  <div className="text-2xl font-bold">
                    {branches.find((b) => b.name === currentBranch)?.commits.length || 0}
                  </div>
                  <div className="text-xs mt-1">커밋 수</div>
                </div>
                <div className="bg-pink-500/20 p-4 rounded-xl text-center border border-pink-400">
                  <div className="text-2xl font-bold">{pullRequests.filter(pr => pr.status === 'open').length}</div>
                  <div className="text-xs mt-1">열린 PR</div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-bold mb-2">로컬 브랜치</h3>
                <div className="flex flex-wrap gap-2">
                  {branches.filter(b => !b.remote).map((branch) => (
                    <div
                      key={branch.name}
                      className={`px-3 py-1 rounded-full text-sm ${
                        branch.name === currentBranch
                          ? 'bg-purple-500 font-bold'
                          : 'bg-white/10'
                      }`}
                    >
                      🌿 {branch.name} ({branch.commits.length})
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-2">원격 브랜치 (GitHub)</h3>
                <div className="flex flex-wrap gap-2">
                  {branches.filter(b => b.remote).map((branch) => (
                    <div
                      key={branch.name}
                      className="px-3 py-1 rounded-full text-sm bg-orange-500/20 border border-orange-400"
                    >
                      ☁️ {branch.name} ({branch.commits.length})
                    </div>
                  ))}
                </div>
              </div>

              {pullRequests.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-bold mb-2">Pull Requests</h3>
                  <div className="space-y-2">
                    {pullRequests.map(pr => (
                      <div
                        key={pr.id}
                        className={`p-3 rounded-lg border ${
                          pr.status === 'open' ? 'bg-green-500/10 border-green-400' :
                          pr.status === 'merged' ? 'bg-purple-500/10 border-purple-400' :
                          'bg-gray-500/10 border-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold">#{pr.id}</span> {pr.title}
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                            {pr.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-300 mt-1">
                          {pr.from} → {pr.to}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 터미널 */}
            <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-green-500/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm font-mono text-green-400">
                  Git Terminal Simulator
                </span>
              </div>

              <div className="bg-black rounded-lg p-4 font-mono text-sm h-96 overflow-y-auto mb-4">
                {terminalOutput.map((line, index) => (
                  <div key={index} className="text-green-400">
                    {line}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <span className="text-green-400">$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      executeCommand(commandInput);
                    }
                  }}
                  placeholder="명령어를 입력하세요... (help로 도움말 보기)"
                  className="flex-1 bg-transparent outline-none text-green-400 font-mono"
                  autoFocus
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => executeCommand('git status')}
                  className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded text-xs border border-blue-400"
                >
                  git status
                </button>
                <button
                  onClick={() => executeCommand('git add .')}
                  className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 rounded text-xs border border-green-400"
                >
                  git add .
                </button>
                <button
                  onClick={() => executeCommand('git log')}
                  className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 rounded text-xs border border-yellow-400"
                >
                  git log
                </button>
                <button
                  onClick={() => executeCommand('pr list')}
                  className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 rounded text-xs border border-pink-400"
                >
                  pr list
                </button>
                <button
                  onClick={() => executeCommand('help')}
                  className="px-3 py-1 bg-gray-500/20 hover:bg-gray-500/30 rounded text-xs border border-gray-400"
                >
                  help
                </button>
                <button
                  onClick={() => setTerminalOutput([])}
                  className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs border border-red-400"
                >
                  clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 학습 가이드 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/50">
            <h3 className="text-lg font-bold mb-3">🎯 Git 베스트 프랙티스</h3>
            <ul className="text-sm space-y-2 text-gray-200">
              <li>• 자주, 작은 단위로 커밋하기</li>
              <li>• 명확하고 의미있는 커밋 메시지</li>
              <li>• 새 기능은 별도 브랜치에서 개발</li>
              <li>• main/master는 항상 안정적으로 유지</li>
            </ul>
          </div>

          <div className="bg-linear-to-br from-green-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/50">
            <h3 className="text-lg font-bold mb-3">🌿 브랜치 전략</h3>
            <ul className="text-sm space-y-2 text-gray-200">
              <li>• main: 프로덕션 배포용</li>
              <li>• develop: 개발 통합 브랜치</li>
              <li>• feature/*: 새 기능 개발</li>
              <li>• hotfix/*: 긴급 버그 수정</li>
            </ul>
          </div>

          <div className="bg-linear-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/50">
            <h3 className="text-lg font-bold mb-3">✨ PR 작성 팁</h3>
            <ul className="text-sm space-y-2 text-gray-200">
              <li>• 작고 집중된 변경사항</li>
              <li>• 명확한 제목과 설명</li>
              <li>• 테스트 결과 포함</li>
              <li>• 리뷰어에게 친절하게</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
