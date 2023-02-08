---
title: 스프링 부트 입문하기 3
slug: spring-mvc3
category: spring
date: 2023.02.06
description: 김영한 강사님의 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 강의를 보며 공부하고 느낀 내용입니다.
img: spring-mvc.png
author: XIO1016
visibility: true
---

<p align="center">
<img src="/spring-mvc/spring-mvc.png"  width="300">
</p>

회원 관리 예제를 통한 스프링 공부.
> 전체 실습 코드: https://github.com/XIO1016/springMVC-enter

## 회원 웹 기능 추가
### 홈 화면 추가
- HomeController
````java
package hello.hellospring.controller;
  import org.springframework.stereotype.Controller;
  import org.springframework.web.bind.annotation.GetMapping;
  @Controller
  public class HomeController {
      @GetMapping("/")
      public String home() {
          return "home";
      }
}
````
- 회원관리용 홈 페이지
````html
<!DOCTYPE HTML>
  <html xmlns:th="http://www.thymeleaf.org">
  <body>
  <div class="container">
      <div>
        <h1>Hello Spring</h1> <p>회원 기능</p>
        <p>
        <a href="/members/new">회원 가입</a> <a href="/members">회원 목록</a>
        </p> 
      </div>
  </div> <!-- /container -->
  </body>
</html>
````
- @GetMapping("/") 는 기본 localhost:8080 을 의미한다.
- 앞선 강의에서(7강 정적컨텐츠) welcome page는 따로 설정하지 않으면 resoureces > static > index.html을 찾는다고했다.
> 참고: 컨트롤러가 정적 파일보다 우선순위가 높다.
### 회원 등록 기능
- 회원 등록 폼 컨트롤러

````java
@Controller
    public class MemberController {
        private final MemberService memberService;
        @Autowired
        public MemberController(MemberService memberService) {
            this.memberService = memberService;
        }
        // 회원 등록 웹
        @GetMapping(value = "/members/new")
        public String createForm() {
            return "members/createMemberForm";
        }
        // 회원 등록 기능
        @PostMapping(value = "/members/new")
        public String create(MemberForm form) {
          Member member = new Member();
          member.setName(form.getName());
          memberService.join(member);
          return "redirect:/";
        }

}

````
- spring boot는 클라이언트가 요청하는 방식에 따라 @GetMapping(get방식) @PostMapping(post방식)으로 나뉘어져 있어 따로 method를 표기하지 않아도 되고 url이 동일해도 식별이 가능하기 때문에 괜찮다
(get은 조회시, post는 등록시 사용)

- 조회
````java
@GetMapping(value = "/members")
public String list(Model model) {
 List<Member> members = memberService.findMembers();
 model.addAttribute("members", members);
 return "members/memberList";
}
````
## h2 database
- 개발이나 테스트 용도로 가볍고 편리한 DB, 웹 화면 제공해준다.
- 테이블 관리를 위해 프로젝트 루트에 sql/ddl.sql 파일을 생성
````sql
drop table if exists member CASCADE;
create table member
(
id   bigint generated by default as identity,
name varchar(255),
primary key (id)
);
````
- 데이터베이스를 사용하는 데는 여러 방법이 있다.
1. 순수 jdbc(예전 사용)
2. 스프링 JdbcTemplate 
3. JPA

- JDBC API로 직접 코딩하는 것은 20년 전 이야기이다. 따라서 고대 개발자들이 이렇게 고생하고 살았구나 생각하고, 정신건강을 위해 참고만 하고 넘어가자.

### 스프링 jdbcTemplate
- 순수 Jdbc와 동일한 환경설정을 하면 된다.
- 스프링 JdbcTemplate과 MyBatis 같은 라이브러리는 JDBC API에서 본 반복 코드를 대부분 제거해준다. 하지만 SQL은 직접 작성해야 한다
````java
package hello.hellospring.repository;
  import hello.hellospring.domain.Member;
  import org.springframework.jdbc.core.JdbcTemplate;
  import org.springframework.jdbc.core.RowMapper;
  import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
  import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
  import javax.sql.DataSource;
  import java.sql.ResultSet;
  import java.sql.SQLException;
  import java.util.HashMap;
  import java.util.List;
  import java.util.Map;
  import java.util.Optional;
  public class JdbcTemplateMemberRepository implements MemberRepository {
      private final JdbcTemplate jdbcTemplate;
      public JdbcTemplateMemberRepository(DataSource dataSource) {
          jdbcTemplate = new JdbcTemplate(dataSource);
}
      @Override
      public Member save(Member member) {
          SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
          jdbcInsert.withTableName("member").usingGeneratedKeyColumns("id");
 
         Map<String, Object> parameters = new HashMap<>();
        parameters.put("name", member.getName());
        Number key = jdbcInsert.executeAndReturnKey(new MapSqlParameterSource(parameters));
        member.setId(key.longValue());
        return member;
    }
    @Override
    public Optional<Member> findById(Long id) {
        List<Member> result = jdbcTemplate.query("select * from member where id = ?", memberRowMapper(), id);
        return result.stream().findAny();
    }
    @Override
    public List<Member> findAll() {
        return jdbcTemplate.query("select * from member", memberRowMapper());
    }
    @Override
    public Optional<Member> findByName(String name) {
        List<Member> result = jdbcTemplate.query("select * from member where name = ?", memberRowMapper(), name);
        return result.stream().findAny();
    }
    private RowMapper<Member> memberRowMapper() {
        return (rs, rowNum) -> {
            Member member = new Member();
            member.setId(rs.getLong("id"));
            member.setName(rs.getString("name"));
            return member;
}; }
}
````

### jpa
- JPA는 기존의 반복 코드는 물론이고, 기본적인 SQL도 JPA가 직접 만들어서 실행해준다.
- JPA를 사용하면, SQL과 데이터 중심의 설계에서 객체 중심의 설계로 패러다임을 전환을 할 수 있다. 
- JPA를 사용하면 개발 생산성을 크게 높일 수 있다.


- jpa entity mapping
````java

    package hello.hellospring.domain;
    import javax.persistence.Entity;
    import javax.persistence.GeneratedValue;
    import javax.persistence.GenerationType;
    import javax.persistence.Id;
    @Entity
    public class Member {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String name;
        public Long getId() {
            return id;
}
        public void setId(Long id) {
            this.id = id;
}
        public String getName() {
            return name;
}
        public void setName(String name) {
            this.name = name;
}}
````
- jpa 회원 리포지토리
````java
package hello.hellospring.repository;
  import hello.hellospring.domain.Member;
  import javax.persistence.EntityManager;
  import java.util.List;
  import java.util.Optional;
  public class JpaMemberRepository implements MemberRepository {
      private final EntityManager em;
      public JpaMemberRepository(EntityManager em) {
          this.em = em;
}
      public Member save(Member member) {
          em.persist(member);
          return member;
}
      public Optional<Member> findById(Long id) {
          Member member = em.find(Member.class, id);
          return Optional.ofNullable(member);
}
      public List<Member> findAll() {
          return em.createQuery("select m from Member m", Member.class)
                  .getResultList();
      }
      public Optional<Member> findByName(String name) {
 
           List<Member> result = em.createQuery("select m from Member m where m.name = :name", Member.class)
                  .setParameter("name", name)
                  .getResultList();
          return result.stream().findAny();
} }
````
- 서비스 계층에 트랜잭션 추가
````java
import org.springframework.transaction.annotation.Transactional
  @Transactional
  public class MemberService {}
````
- 스프링은 해당 클래스의 메서드를 실행할 때 트랜잭션을 시작하고, 메서드가 정상 종료되면 트랜잭션을 커밋한다. 만약 런타임 예외가 발생하면 롤백한다.
- JPA를 통한 모든 데이터 변경은 트랜잭션 안에서 실행해야 한다.

### 스프링 데이터 jpa
> 스프링 부트와 JPA만 사용해도 개발 생산성이 정말 많이 증가하고, 개발해야할 코드도 확연히 줄어든다. 여기에 스프링 데이터 JPA를 사용하면, 기존의 한계를 넘어 마치 마법처럼, 리포지토리에 구현 클래스 없이 인터페이스 만으로 개발을 완료할 수 있다. 그리고 반복 개발해온 기본 CRUD 기능도 스프링 데이터 JPA가 모두 제공한다.
실무에서 관계형 데이터베이스를 사용한다면 스프링 데이터 JPA는 이제 선택이 아니라 필수다.
> 주의: 스프링 데이터 JPA는 JPA를 편리하게 사용하도록 도와주는 기술이다.

## AOP
AOP가 필요한 상황
- 모든 메소드의 호출 시간을 측정하고 싶다면?
- 공통 관심 사항(cross-cutting concern) vs 핵심 관심 사항(core concern) 회원 가입 시간, 회원 조회 시간을 측정하고 싶다면?

<p align="center">
<img src="/spring-mvc/4.png"  width="300">
</p>

그림처럼 구현한다면 다음과 같은 문제들이 생길 것이다.

- 회원가입, 회원 조회에 시간을 측정하는 기능은 핵심 관심 사항이 아니다. 시간을 측정하는 로직은 공통 관심 사항이다.
- 시간을 측정하는 로직과 핵심 비즈니스의 로직이 섞여서 유지보수가 어렵다. 시간을 측정하는 로직을 별도의 공통 로직으로 만들기 매우 어렵다.
- 시간을 측정하는 로직을 변경할 때 모든 로직을 찾아가면서 변경해야 한다.

이를 AOP 적용으로 해결한다.
- AOP: Aspect Oriented Programming
- 공통 관심 사항(cross-cutting concern) vs 핵심 관심 사항(core concern) 분리
<p align="center">
<img src="/spring-mvc/5.png"  width="300">
</p>

````java
@Component
  @Aspect
  public class TimeTraceAop {
    @Around("execution(* hello.hellospring..*(..))")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        System.out.println("START: " + joinPoint.toString());
        try {
            return joinPoint.proceed();
        } finally {
            long finish = System.currentTimeMillis();
            long timeMs = finish - start;
            System.out.println("END: " + joinPoint.toString() + " " + timeMs + 'ms');
        }
    }
}
````
해결
- 회원가입, 회원 조회등 핵심 관심사항과 시간을 측정하는 공통 관심 사항을 분리한다. 시간을 측정하는 로직을 별도의 공통 로직으로 만들었다.
- 핵심 관심 사항을 깔끔하게 유지할 수 있다.
- 변경이 필요하면 이 로직만 변경하면 된다.
- 원하는 적용 대상을 선택할 수 있다.

<p align="center">
<img src="/spring-mvc/6.png"  width="500">
</p>
