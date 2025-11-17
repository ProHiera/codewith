-- Sample Clean Code Programming Data
-- 중급자 학습을 위한 샘플 데이터

-- 리팩토링 챌린지 샘플
INSERT INTO refactoring_challenges (id, title, level, category, time_limit, bad_code, good_code, explanation, principles, hints, steps) VALUES
(
  gen_random_uuid(),
  '매직 넘버 제거하기',
  'beginner',
  'naming',
  300,
  'function calculateDiscount(price) {
  if (price > 100) {
    return price * 0.9;
  }
  return price;
}',
  'const MINIMUM_PRICE_FOR_DISCOUNT = 100;
const DISCOUNT_RATE = 0.1;

function calculateDiscount(price) {
  if (price > MINIMUM_PRICE_FOR_DISCOUNT) {
    return price * (1 - DISCOUNT_RATE);
  }
  return price;
}',
  '매직 넘버는 코드에서 의미를 알 수 없는 숫자 상수입니다. 100이 무엇을 의미하는지, 0.9가 무엇인지 명확하지 않습니다. 의미있는 상수명을 사용하면 코드의 가독성이 크게 향상되고 유지보수가 쉬워집니다.',
  ARRAY['매직 넘버 제거', '의미있는 상수명 사용', '가독성 향상'],
  ARRAY['100과 0.9 같은 숫자가 무엇을 의미하는지 생각해보세요', '상수를 선언할 때는 대문자와 언더스코어를 사용하세요', '할인율은 0.1로 표현하고 계산식에서 (1 - DISCOUNT_RATE)를 사용하세요'],
  '{"steps": [{"id": "1", "title": "최소 금액 상수화", "description": "100 → MINIMUM_PRICE_FOR_DISCOUNT"}, {"id": "2", "title": "할인율 상수화", "description": "0.9 → DISCOUNT_RATE = 0.1"}, {"id": "3", "title": "계산식 명확화", "description": "price * 0.9 → price * (1 - DISCOUNT_RATE)"}]}'::jsonb
),
(
  gen_random_uuid(),
  '긴 함수 분해하기',
  'intermediate',
  'structure',
  600,
  'function processOrder(order) {
  // 유효성 검사
  if (!order.items || order.items.length === 0) {
    throw new Error("주문 항목이 없습니다");
  }
  if (!order.customer) {
    throw new Error("고객 정보가 없습니다");
  }
  
  // 가격 계산
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  const tax = total * 0.1;
  const finalPrice = total + tax;
  
  // 재고 확인
  for (const item of order.items) {
    if (item.stock < item.quantity) {
      throw new Error("재고가 부족합니다");
    }
  }
  
  // 주문 생성
  const orderRecord = {
    id: generateId(),
    customer: order.customer,
    items: order.items,
    total: finalPrice,
    createdAt: new Date()
  };
  
  saveToDatabase(orderRecord);
  sendConfirmationEmail(order.customer.email);
  
  return orderRecord;
}',
  'function processOrder(order) {
  validateOrder(order);
  const finalPrice = calculateTotalPrice(order.items);
  checkInventory(order.items);
  const orderRecord = createOrderRecord(order, finalPrice);
  
  saveToDatabase(orderRecord);
  sendConfirmationEmail(order.customer.email);
  
  return orderRecord;
}

function validateOrder(order) {
  if (!order.items || order.items.length === 0) {
    throw new Error("주문 항목이 없습니다");
  }
  if (!order.customer) {
    throw new Error("고객 정보가 없습니다");
  }
}

function calculateTotalPrice(items) {
  const subtotal = items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  return subtotal + tax;
}

function checkInventory(items) {
  for (const item of items) {
    if (item.stock < item.quantity) {
      throw new Error("재고가 부족합니다");
    }
  }
}

function createOrderRecord(order, totalPrice) {
  return {
    id: generateId(),
    customer: order.customer,
    items: order.items,
    total: totalPrice,
    createdAt: new Date()
  };
}',
  '하나의 함수가 너무 많은 일을 하면 이해하기 어렵고 테스트하기도 힘듭니다. 각 함수는 하나의 작업만 수행하도록 분리하면 코드의 가독성과 재사용성이 높아집니다. 또한 각 함수의 이름이 그 함수가 하는 일을 명확하게 설명합니다.',
  ARRAY['단일 책임 원칙(SRP)', '함수는 한 가지 일만', '추상화 수준 통일', '작은 함수 선호'],
  ARRAY['유효성 검사, 계산, 재고 확인, 주문 생성을 각각 별도 함수로 분리하세요', '각 함수는 한 가지 작업만 수행하도록 하세요', '함수 이름이 정확히 무엇을 하는지 설명하도록 작성하세요'],
  '{"steps": [{"id": "1", "title": "유효성 검사 분리", "description": "validateOrder 함수로 추출"}, {"id": "2", "title": "가격 계산 분리", "description": "calculateTotalPrice 함수로 추출"}, {"id": "3", "title": "재고 확인 분리", "description": "checkInventory 함수로 추출"}, {"id": "4", "title": "주문 생성 분리", "description": "createOrderRecord 함수로 추출"}]}'::jsonb
),
(
  gen_random_uuid(),
  '중첩 조건문 제거하기',
  'intermediate',
  'complexity',
  450,
  'function getUserDiscount(user) {
  if (user) {
    if (user.isPremium) {
      if (user.purchaseHistory) {
        if (user.purchaseHistory.length > 10) {
          return 0.2;
        } else {
          return 0.1;
        }
      } else {
        return 0.05;
      }
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}',
  'function getUserDiscount(user) {
  if (!user) return 0;
  if (!user.isPremium) return 0;
  if (!user.purchaseHistory) return 0.05;
  
  return user.purchaseHistory.length > 10 ? 0.2 : 0.1;
}',
  '중첩된 if문은 코드의 복잡도를 높이고 가독성을 떨어뜨립니다. Early Return 패턴을 사용하면 조건을 평탄화하여 코드를 더 읽기 쉽게 만들 수 있습니다. 각 조건을 먼저 검사하고 조기에 반환함으로써 중첩을 제거합니다.',
  ARRAY['Early Return', '가드 절(Guard Clause)', '중첩 최소화', '복잡도 감소'],
  ARRAY['먼저 null/undefined 체크로 조기 반환하세요', 'isPremium이 false일 때 바로 반환하세요', 'purchaseHistory가 없을 때 기본값으로 반환하세요'],
  '{"steps": [{"id": "1", "title": "null 체크 추가", "description": "user가 없으면 즉시 0 반환"}, {"id": "2", "title": "isPremium 체크", "description": "프리미엄이 아니면 즉시 0 반환"}, {"id": "3", "title": "purchaseHistory 체크", "description": "구매 이력이 없으면 0.05 반환"}, {"id": "4", "title": "최종 조건 단순화", "description": "삼항 연산자로 간결하게 표현"}]}'::jsonb
);

-- 디자인 패턴 샘플
INSERT INTO design_patterns (id, name, category, difficulty, icon, description, problem, solution, real_world_example, code_before, code_after, pros, cons, related_patterns, use_cases) VALUES
(
  gen_random_uuid(),
  'Singleton Pattern',
  'creational',
  'easy',
  '🎯',
  '클래스의 인스턴스가 오직 하나만 생성되도록 보장하고, 전역적인 접근점을 제공하는 패턴입니다.',
  '애플리케이션 전체에서 단 하나의 인스턴스만 필요한 경우(예: 설정 관리자, 로거, 데이터베이스 연결)에 매번 새로운 객체를 생성하면 메모리 낭비와 일관성 문제가 발생합니다.',
  '클래스 내부에서 유일한 인스턴스를 생성하고, 생성자를 private으로 만들어 외부에서 직접 생성하지 못하게 합니다. getInstance() 같은 정적 메서드로만 인스턴스에 접근할 수 있게 합니다.',
  '데이터베이스 연결 풀, 로깅 시스템, 캐시 관리자 등에서 사용됩니다. 예를 들어 Winston 로거는 싱글톤으로 구현되어 애플리케이션 전체에서 동일한 로거 인스턴스를 사용합니다.',
  'class Database {
  constructor() {
    this.connection = this.connect();
  }
  
  connect() {
    console.log("새 DB 연결 생성");
    return { /* connection */ };
  }
}

// 매번 새로운 연결 생성 (비효율적)
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // false',
  'class Database {
  static instance = null;
  
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.connection = this.connect();
    Database.instance = this;
  }
  
  connect() {
    console.log("새 DB 연결 생성");
    return { /* connection */ };
  }
  
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

// 항상 같은 인스턴스 반환
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true',
  ARRAY['전역 상태 관리 용이', '메모리 절약', '리소스 공유', '일관된 접근점 제공'],
  ARRAY['전역 상태로 인한 결합도 증가', '테스트 어려움', '멀티스레드 환경에서 동기화 필요'],
  ARRAY['Factory Pattern', 'Dependency Injection'],
  ARRAY['설정 관리자', '로깅 시스템', '데이터베이스 연결 풀', '캐시 관리자', '스레드 풀']
),
(
  gen_random_uuid(),
  'Factory Pattern',
  'creational',
  'medium',
  '🏭',
  '객체 생성 로직을 별도의 팩토리 클래스로 분리하여, 클라이언트 코드가 구체적인 클래스를 알지 못해도 객체를 생성할 수 있게 하는 패턴입니다.',
  '객체 생성 로직이 복잡하거나 조건에 따라 다른 타입의 객체를 생성해야 할 때, 클라이언트 코드에 직접 작성하면 결합도가 높아지고 유지보수가 어려워집니다.',
  '객체 생성 책임을 별도의 팩토리 클래스나 메서드로 캡슐화합니다. 클라이언트는 팩토리에게 원하는 객체의 타입만 알려주면, 팩토리가 적절한 객체를 생성해서 반환합니다.',
  '결제 시스템에서 신용카드, PayPal, 비트코인 등 다양한 결제 방법을 처리할 때, 각 결제 방법에 맞는 객체를 팩토리가 생성합니다. React의 createElement도 팩토리 패턴의 예입니다.',
  'function createPayment(type, amount) {
  if (type === "credit") {
    return {
      type: "credit",
      amount,
      process() {
        console.log(`신용카드로 ${amount}원 결제`);
      }
    };
  } else if (type === "paypal") {
    return {
      type: "paypal",
      amount,
      process() {
        console.log(`PayPal로 ${amount}원 결제`);
      }
    };
  } else if (type === "bitcoin") {
    return {
      type: "bitcoin",
      amount,
      process() {
        console.log(`비트코인으로 ${amount}원 결제`);
      }
    };
  }
}

const payment = createPayment("credit", 10000);
payment.process();',
  'class Payment {
  constructor(amount) {
    this.amount = amount;
  }
  process() {
    throw new Error("구현 필요");
  }
}

class CreditCardPayment extends Payment {
  process() {
    console.log(`신용카드로 ${this.amount}원 결제`);
  }
}

class PayPalPayment extends Payment {
  process() {
    console.log(`PayPal로 ${this.amount}원 결제`);
  }
}

class BitcoinPayment extends Payment {
  process() {
    console.log(`비트코인으로 ${this.amount}원 결제`);
  }
}

class PaymentFactory {
  static create(type, amount) {
    switch(type) {
      case "credit":
        return new CreditCardPayment(amount);
      case "paypal":
        return new PayPalPayment(amount);
      case "bitcoin":
        return new BitcoinPayment(amount);
      default:
        throw new Error("지원하지 않는 결제 방식");
    }
  }
}

const payment = PaymentFactory.create("credit", 10000);
payment.process();',
  ARRAY['객체 생성 로직 캡슐화', '클라이언트 코드와 구체 클래스 분리', '새로운 타입 추가 용이', 'Open/Closed 원칙 준수'],
  ARRAY['새로운 타입마다 클래스 증가', '코드 복잡도 증가'],
  ARRAY['Abstract Factory', 'Builder Pattern', 'Prototype Pattern'],
  ARRAY['다양한 타입의 객체 생성', '조건부 객체 생성', '복잡한 초기화 로직 캡슐화']
),
(
  gen_random_uuid(),
  'Observer Pattern',
  'behavioral',
  'medium',
  '👀',
  '객체의 상태 변화를 관찰하는 관찰자들에게 자동으로 알림을 보내는 패턴입니다. 일대다 의존성을 정의합니다.',
  '하나의 객체 상태가 변경될 때 다른 여러 객체들이 그 변경을 알아야 하는 경우, 모든 객체를 직접 호출하면 결합도가 높아지고 확장성이 떨어집니다.',
  'Subject(발행자)가 Observer(구독자) 목록을 유지하고, 상태 변경시 모든 구독자에게 자동으로 알림을 보냅니다. 구독자는 언제든 구독/해제할 수 있습니다.',
  'YouTube 채널 구독, 이벤트 리스너, 리액티브 프로그래밍(RxJS), Vue/React의 상태 관리 등이 이 패턴을 사용합니다. 한 유튜버가 영상을 올리면 구독자 모두에게 알림이 가는 것과 같습니다.',
  'class NewsAgency {
  constructor() {
    this.news = "";
    this.channels = [];
  }
  
  setNews(news) {
    this.news = news;
    // 수동으로 모든 채널에 알림
    this.channels.forEach(channel => {
      channel.update(news);
    });
  }
  
  addChannel(channel) {
    this.channels.push(channel);
  }
}

class NewsChannel {
  update(news) {
    console.log(`뉴스 수신: ${news}`);
  }
}

const agency = new NewsAgency();
const channel1 = new NewsChannel();
agency.addChannel(channel1);
agency.setNews("긴급 속보!");',
  'class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    throw new Error("구현 필요");
  }
}

class NewsAgency extends Subject {
  setNews(news) {
    this.news = news;
    this.notify(news);
  }
}

class NewsChannel extends Observer {
  constructor(name) {
    super();
    this.name = name;
  }
  
  update(news) {
    console.log(`[${this.name}] 뉴스 수신: ${news}`);
  }
}

const agency = new NewsAgency();
const channel1 = new NewsChannel("채널A");
const channel2 = new NewsChannel("채널B");

agency.subscribe(channel1);
agency.subscribe(channel2);
agency.setNews("긴급 속보!");

agency.unsubscribe(channel1);
agency.setNews("후속 보도");',
  ARRAY['느슨한 결합', '동적 구독/해제', '브로드캐스트 통신', '이벤트 기반 프로그래밍'],
  ARRAY['알림 순서 보장 안됨', '메모리 누수 가능성(구독 해제 필수)', '디버깅 어려움'],
  ARRAY['Mediator Pattern', 'Event Emitter', 'Pub/Sub Pattern'],
  ARRAY['이벤트 처리 시스템', '모델-뷰 동기화', '알림 시스템', '데이터 바인딩', '리액티브 프로그래밍']
),
(
  gen_random_uuid(),
  'Single Responsibility Principle (SRP)',
  'solid',
  'easy',
  '1️⃣',
  '하나의 클래스는 하나의 책임만 가져야 하며, 클래스를 변경하는 이유는 단 하나여야 한다는 원칙입니다.',
  '한 클래스가 여러 책임을 가지면, 한 책임의 변경이 다른 책임에 영향을 미칠 수 있습니다. 이는 코드의 결합도를 높이고 유지보수를 어렵게 만듭니다.',
  '각 클래스가 하나의 명확한 책임만 갖도록 분리합니다. 클래스의 변경 이유가 여러 개라면, 각각을 독립적인 클래스로 분리해야 합니다.',
  '사용자 관리 시스템에서 User 클래스가 사용자 정보 관리, 데이터베이스 저장, 이메일 전송까지 모두 담당하는 대신, UserRepository, EmailService로 책임을 분리합니다.',
  'class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  // 사용자 정보 관리
  getName() {
    return this.name;
  }
  
  // 데이터베이스 저장 (별도 책임)
  save() {
    console.log("DB에 사용자 저장");
    // database.save(this);
  }
  
  // 이메일 전송 (별도 책임)
  sendWelcomeEmail() {
    console.log(`${this.email}로 환영 이메일 전송`);
    // emailService.send(this.email, "환영합니다!");
  }
}

const user = new User("홍길동", "hong@example.com");
user.save();
user.sendWelcomeEmail();',
  'class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  getName() {
    return this.name;
  }
  
  getEmail() {
    return this.email;
  }
}

class UserRepository {
  save(user) {
    console.log(`DB에 ${user.getName()} 저장`);
    // database.save(user);
  }
}

class EmailService {
  sendWelcomeEmail(user) {
    console.log(`${user.getEmail()}로 환영 이메일 전송`);
    // this.send(user.getEmail(), "환영합니다!");
  }
}

// 사용
const user = new User("홍길동", "hong@example.com");
const userRepo = new UserRepository();
const emailService = new EmailService();

userRepo.save(user);
emailService.sendWelcomeEmail(user);',
  ARRAY['높은 응집도', '낮은 결합도', '테스트 용이성', '재사용성 향상', '변경 영향 최소화'],
  ARRAY['클래스 수 증가', '과도한 분리 시 복잡도 증가'],
  ARRAY['Interface Segregation Principle', 'Separation of Concerns'],
  ARRAY['클래스 설계', '모듈 분리', '컴포넌트 설계', '마이크로서비스 아키텍처']
);

-- 클린코드 뱃지 샘플
INSERT INTO clean_code_badges (id, name, description, icon, category, requirement) VALUES
(
  gen_random_uuid(),
  '코드 리뷰어',
  '첫 코드 리뷰 완료',
  '🔍',
  'reviewer',
  '{"reviews_completed": 1}'::jsonb
),
(
  gen_random_uuid(),
  '리팩토링 초보',
  '첫 리팩토링 챌린지 완료',
  '🌱',
  'refactorer',
  '{"challenges_completed": 1}'::jsonb
),
(
  gen_random_uuid(),
  '리팩토링 마스터',
  '10개 리팩토링 챌린지 완료',
  '🏆',
  'refactorer',
  '{"challenges_completed": 10}'::jsonb
),
(
  gen_random_uuid(),
  '패턴 학습자',
  '첫 디자인 패턴 마스터',
  '📚',
  'pattern_master',
  '{"patterns_mastered": 1}'::jsonb
),
(
  gen_random_uuid(),
  '패턴 전문가',
  '모든 GOF 패턴 마스터',
  '💎',
  'pattern_master',
  '{"patterns_mastered": 23}'::jsonb
),
(
  gen_random_uuid(),
  '품질 관리자',
  '코드 품질 메트릭 80점 이상 달성',
  '⭐',
  'quality_guru',
  '{"maintainability_score": 80}'::jsonb
),
(
  gen_random_uuid(),
  'SOLID 마스터',
  '모든 SOLID 원칙 학습 완료',
  '🎯',
  'pattern_master',
  '{"solid_principles_learned": 5}'::jsonb
);
