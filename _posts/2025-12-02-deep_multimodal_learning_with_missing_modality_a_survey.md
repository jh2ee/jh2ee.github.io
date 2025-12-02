---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V32X6UDS%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T034426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQC7RTsqv6%2FTh1ZstatT0t%2F6ZGjc2gSKYFHCsC08MLSXRgIgLOxaxAOIcLdOL736YEPbfpVmZ4rPEKw3PkUCkKUXzGQq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDHUB4LOJiKkOxCOd0ircA9FRw%2BQxJxrEya9ux6SkvCu%2FtiM5Rlc%2FE8fi1abOjAtet0U6HLMvDe4KTNWWiZnmsoeivESOy738Ypg47gPi98tztCkLswXy7CdORF0DFqDWDAZ8wkZWedj14gFNNw7e5l2hQz1hRwRFlbJfX%2Bj2GJQmkIjCCu3h2GHvYoJAZdByhYHWjT7g1%2BjmKmYAJ6WHS2xhEnxuaZ6LlJejvuDtCeZJUbWOgXWYn3Xox53ehSqjSS%2BP5T0dzAjq00E%2FQgTI8j0mV8N7%2BcdHE5qPF8O4j%2F%2BUWrzKwAFxo1xlagz0PnDn0pXz%2F207u6zsnIDWhZ6Y%2FkSqoXYxceeqOtijCn4GkDyXpre1eI4KmL4Squ%2Fn8jYNJqr1kyWyhVmLaYl4uxjtGzGKi6ABM%2F%2FURv0ng8yqfIrMJTEaHK%2FV5nviiRkziB4upyvEu0raraKksrDPU9m2raFwV%2B06hY%2B%2B5oyDU35TzE4K6JHTZUYGQYeGCxr%2BAKIxAGzTjtTDMqcjBfieqijbiKvlpaASvMC0Dgy6iJEyhtZrpFwXLCq22OQ1HD%2BYLYhHxpDH%2FQ4%2F6srV5GejF%2FBnM0N7GR9%2BAOpf%2FbAAlIqdraRETqjq1ur590WBbBMbwEXEgfE6tsaAuBlG2jthMJiiuckGOqUBR%2BSKvf%2FnNQdPK2q2SNg81t8xdpJKj251WB7Tv5qcvvHUPevdpwosTWPit5DwTveWEZBGK4vZeXCMZ2KxrHa31nN4LUgs7gkRwD7HRv83riYdMry7MmTQlrzMwC9eZ7B8ie8dw1kfQIlgRk3Yyf6XLWco9YRytYSZzfD88d%2Fwtk3QZgG%2FfRupIaJGDBjJA%2FbtpOA8EhTTGpem427EQv1o2%2BhAiKM5&X-Amz-Signature=7c156cbf5278218621129630e8adde02098587a796a5f3ba6a967bbc4755f953&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V32X6UDS%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T034426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQC7RTsqv6%2FTh1ZstatT0t%2F6ZGjc2gSKYFHCsC08MLSXRgIgLOxaxAOIcLdOL736YEPbfpVmZ4rPEKw3PkUCkKUXzGQq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDHUB4LOJiKkOxCOd0ircA9FRw%2BQxJxrEya9ux6SkvCu%2FtiM5Rlc%2FE8fi1abOjAtet0U6HLMvDe4KTNWWiZnmsoeivESOy738Ypg47gPi98tztCkLswXy7CdORF0DFqDWDAZ8wkZWedj14gFNNw7e5l2hQz1hRwRFlbJfX%2Bj2GJQmkIjCCu3h2GHvYoJAZdByhYHWjT7g1%2BjmKmYAJ6WHS2xhEnxuaZ6LlJejvuDtCeZJUbWOgXWYn3Xox53ehSqjSS%2BP5T0dzAjq00E%2FQgTI8j0mV8N7%2BcdHE5qPF8O4j%2F%2BUWrzKwAFxo1xlagz0PnDn0pXz%2F207u6zsnIDWhZ6Y%2FkSqoXYxceeqOtijCn4GkDyXpre1eI4KmL4Squ%2Fn8jYNJqr1kyWyhVmLaYl4uxjtGzGKi6ABM%2F%2FURv0ng8yqfIrMJTEaHK%2FV5nviiRkziB4upyvEu0raraKksrDPU9m2raFwV%2B06hY%2B%2B5oyDU35TzE4K6JHTZUYGQYeGCxr%2BAKIxAGzTjtTDMqcjBfieqijbiKvlpaASvMC0Dgy6iJEyhtZrpFwXLCq22OQ1HD%2BYLYhHxpDH%2FQ4%2F6srV5GejF%2FBnM0N7GR9%2BAOpf%2FbAAlIqdraRETqjq1ur590WBbBMbwEXEgfE6tsaAuBlG2jthMJiiuckGOqUBR%2BSKvf%2FnNQdPK2q2SNg81t8xdpJKj251WB7Tv5qcvvHUPevdpwosTWPit5DwTveWEZBGK4vZeXCMZ2KxrHa31nN4LUgs7gkRwD7HRv83riYdMry7MmTQlrzMwC9eZ7B8ie8dw1kfQIlgRk3Yyf6XLWco9YRytYSZzfD88d%2Fwtk3QZgG%2FfRupIaJGDBjJA%2FbtpOA8EhTTGpem427EQv1o2%2BhAiKM5&X-Amz-Signature=7c156cbf5278218621129630e8adde02098587a796a5f3ba6a967bbc4755f953&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SITFNYOA%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T034427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDLZyDvIpshytUQ%2BpKy4neC5HGUGcDGD8CAMCC1XJr5iQIgSozNlZsygWYQ8lVApLY1QSKCmL28bLNeu0fcNa6ecH8q%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDG%2BRvvNOy%2BS8cyfKQCrcA79lnrQTvuOZYKRCI1iVBbOsivJOtUaiocUUxuOktGcsPIu%2Fe9hcoiZ577bmHt7rK1qR4WIr8G7sGl3N%2BD1T0DTZ26P36HIYeJJz%2Fd4jVfzd5tCoTzzhWh5y%2F%2FPLxHMs7N%2BEnV0v8PcRYf7NE8TKkJ17eUxrJiyrgVwacVcijybhYNqiLH%2F8OvYc%2FDw85zo4%2BE2clvM17dO9W6Obn5F0tWNYRbgzwsE4LOR79kmn0bdnCa8xszqYk3o9CgK4AIDd6tCzx5IdloIvdTZoah1NFtoErqgtp8WS9pGUZuo7jYt8RG%2BI9twIWxquc1oNeAOd%2F2k%2BM9z53HXYarA9%2B%2BfokZae%2BAYxZT2ionYnLEc15sIJ1xQeBX%2FAKG6Iv451eKPgaFs7B%2BAumSqVLp2hCGCZZCzv4Ygd36y4bVrktG21NmRVQxC2VS4v1NQUuExfaoZf2yYCov%2FWObR7e%2BFu6yrpyzU00AmKQ9wINqD9vO3pK87WId0ZpZwT3xNxnXePxmdXlA%2BwTh2jNwXzkpeEdiLYy5pOKBdcdKr0zhjro%2BvWAp0cxxIFk7S1Y44HZ0fGoZIN5x1uEfdm95vSpB0XqcCtOvCo%2FOLaHZPtXHr8P1WSmYpEeyEZ5lZN3IY0BhxVMJmjuckGOqUB%2FEoCQ78oQLbULO7f24zjuxHgmAaIfT72xOXobAClo6rwvMJjVGqofpRZVNCKl3MXIcA3vpeFOPoIPjEtBj0VAI46TmOpBE9KB%2BxdXuRe1xkRNbFmGTDvvMXcecrJMcP9nNuodjV4a2mP2eRZXqDVc6w%2FjApFltcEPQgXMd%2BSfjST9evVr8iDoWk6cENIvatgWf0GCf3vEDx0560MzUGe6YGxDOlK&X-Amz-Signature=28c46b4393c64bd85d4a64bb10eab50648a542e4757d772db62c4118b3301dab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SITFNYOA%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T034427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDLZyDvIpshytUQ%2BpKy4neC5HGUGcDGD8CAMCC1XJr5iQIgSozNlZsygWYQ8lVApLY1QSKCmL28bLNeu0fcNa6ecH8q%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDG%2BRvvNOy%2BS8cyfKQCrcA79lnrQTvuOZYKRCI1iVBbOsivJOtUaiocUUxuOktGcsPIu%2Fe9hcoiZ577bmHt7rK1qR4WIr8G7sGl3N%2BD1T0DTZ26P36HIYeJJz%2Fd4jVfzd5tCoTzzhWh5y%2F%2FPLxHMs7N%2BEnV0v8PcRYf7NE8TKkJ17eUxrJiyrgVwacVcijybhYNqiLH%2F8OvYc%2FDw85zo4%2BE2clvM17dO9W6Obn5F0tWNYRbgzwsE4LOR79kmn0bdnCa8xszqYk3o9CgK4AIDd6tCzx5IdloIvdTZoah1NFtoErqgtp8WS9pGUZuo7jYt8RG%2BI9twIWxquc1oNeAOd%2F2k%2BM9z53HXYarA9%2B%2BfokZae%2BAYxZT2ionYnLEc15sIJ1xQeBX%2FAKG6Iv451eKPgaFs7B%2BAumSqVLp2hCGCZZCzv4Ygd36y4bVrktG21NmRVQxC2VS4v1NQUuExfaoZf2yYCov%2FWObR7e%2BFu6yrpyzU00AmKQ9wINqD9vO3pK87WId0ZpZwT3xNxnXePxmdXlA%2BwTh2jNwXzkpeEdiLYy5pOKBdcdKr0zhjro%2BvWAp0cxxIFk7S1Y44HZ0fGoZIN5x1uEfdm95vSpB0XqcCtOvCo%2FOLaHZPtXHr8P1WSmYpEeyEZ5lZN3IY0BhxVMJmjuckGOqUB%2FEoCQ78oQLbULO7f24zjuxHgmAaIfT72xOXobAClo6rwvMJjVGqofpRZVNCKl3MXIcA3vpeFOPoIPjEtBj0VAI46TmOpBE9KB%2BxdXuRe1xkRNbFmGTDvvMXcecrJMcP9nNuodjV4a2mP2eRZXqDVc6w%2FjApFltcEPQgXMd%2BSfjST9evVr8iDoWk6cENIvatgWf0GCf3vEDx0560MzUGe6YGxDOlK&X-Amz-Signature=28c46b4393c64bd85d4a64bb10eab50648a542e4757d772db62c4118b3301dab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667L3FXTRK%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T034426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQDUFKaIualkZj3LIzyTH4rWpfdn2qtmX3AtlscJjA13JQIhAKM4YtjgeAJjsbk6V8awKLshMw71fwlzJ1LBZpTA6InWKv8DCAwQABoMNjM3NDIzMTgzODA1IgzJCht%2BU7HjRwRoH4Aq3AOCNEGyGZyceepoJ7mwpUwnBUHp305tzPVLtTT2w7I5Goj0XKINVDYcWefLZaatSgeoaC96vT1Wn44yZWFij0w0LklcZ%2FgpMuyvscJQm8kAaGQIJztsDRKMMWDCxPvANcsQ9Ha%2BHiGEN9eiDlPutwIrUgA0F%2F3YUSwMlsrUgQ2yinQZAKez2nPTNMDBxqqvHs%2FIFT1jEZyBjWzKfxZvrARmbl4uY%2B5iebBnHTqeUBsAJVoZ84TrZpn%2BbI%2BQc6YUIFZo%2BZ%2FrGpspHDIBq4e1gA6l6S1U%2FjLEj1V%2BMCXtpprTzIXuLloxJapkdg0J56TAo5ZmGaazegyXxcRFmaP18WjIHBSEcUUZTf8ltk%2FyMpc2%2F5c%2BElmIeT%2FqzHSZmJqN14ALVMqspMGZmeq74sZte083DKs2fLojz9%2BxlHnH0Tsn8VHoTk52cWjZKKMKWuaEw1C95w%2FKh6JaD07zRvOxACLoTBOL7lxAo%2BLgMdvBpW0v%2BoCAR79R%2FKsJBuDX5emchUbIa1rrcAwI5bL6XCHFbq5PdzId5%2BAuJRvOxEGA86aKreJUMu73TG0UHXAsFxvnp3C2qXFp2dDLxLoElnAi%2Bci1Pnh0CegewEY9aLmpVoBcDgrIAJLExRyiK6u5BDC3ornJBjqkAb3%2Fe0BmcRuFvBfVrc5m%2FLhsWiEB3b5r4KK08bI4XvDVEbR0ck5WL4yJDNkMZyYxCm7glscUd%2BSCU6hwhdjsqbR%2BQbLiI9AMjlHpN4sD%2Bq5c921FM9gCK8xC3WGI%2F33%2BnEx7H%2FEXYOkaY1M9GorIo9jg6Jf7hv%2FwoAcqXO0CrO49D57jCInYxj2sns2HLDccO8J%2FnvX32J6NNgqH4LhQQL0RQQyH&X-Amz-Signature=ecf124cd4c6835b51c67feaf68e61485c7bc24b267b15f18510cb8b5a6d39c4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2BLVANQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T034430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIG%2BV0LTKyEO%2B%2Bu8sh2YUHpKmXyLc0sxuc%2Bev%2FpzPZg45AiEAjDlchjHRgX5qvOFc%2F1zqeUc9NJDfEg3eNtC6DRLHkpwq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDJjkMcGQar%2FyNxhXXircA3zqnDMe0WYquQhYzqFDAuXIsLgaUHANfwdzVq6gpvcvDs4qeINAa3AuzkC1xFcMwQdixGxXnao7FFx5Tmg%2B%2BQRzQ%2Bk7%2BYBLSeB4X1tfFzi3X252eJcomvYBFYArSpdMLa0GreA8xFGmnYDQN%2Fo59%2FuoXTNXpzh0%2F5bTFNsrf%2BY5NkNgDCTRH%2FIubWcw08Cyt7immfCqCwh%2FXW3xT5UaoLOYsrsFZs%2FMsKMDonF1RhDFJMCO0OtSMTD4z5n%2FIYbZCDi4V5pADNE0u1xIUkWSw77LLKC4esGnwGqZEUElLI4zrD3pxyyrJWRaaZTi%2B1XQaBGRBD4v6Gr9%2FrANMiGrocFs6IrYuUKDDtOyP9j%2Fgiq%2BNkw0KRtOBdu0lGieYB9XrMg1UzlEDgWmDtSCFAqom6qfCIEAZMbgtthXbhbcSw2XZIGwp%2BsLpgZ6kaXGGA3ZYQf1PmfhEmWboiWSxlcfr32va8W5KGHplBqY6fuEAyI2RAqcsZMZ2k02CPLNaNnaFBx8jDkfR2dc2wXxe74TDtazD9ICn23ExtnxmeLVttzo05Dh9nPsAZ2jl9Og8aYL2A0miiyfydP7NRWSsd%2F9CEhZFdqTSqnD2tbwunkJjjG09uyvvIZ163g6AT9VMMGiuckGOqUBRX1pEInXH2Qp%2FVxmtHMACTIIwGKTYqB1a0LNNkiRJYD6jSOFWsFN7e5W1us4t%2Fl0%2Fbu4GYI3tjsJnZBf78RD%2FuYBAM5naGIJIfqEfbjD7Uw3wRie1HQ33PJCA3nmpWfy%2Fo1VHclcaNgALyA8jMZBbrkZyRhLVlAW0anY2%2BB2XqLsstiYSQl%2FB5Z7Zl7IhxjVTMgFDps5pD5sMtpGfBD76yXWyC%2B2&X-Amz-Signature=b004997c7806e6fe751c0a688ac8247122b15ccf6b55b6be88e0e21dc547e242&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2BLVANQ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T034430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIG%2BV0LTKyEO%2B%2Bu8sh2YUHpKmXyLc0sxuc%2Bev%2FpzPZg45AiEAjDlchjHRgX5qvOFc%2F1zqeUc9NJDfEg3eNtC6DRLHkpwq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDJjkMcGQar%2FyNxhXXircA3zqnDMe0WYquQhYzqFDAuXIsLgaUHANfwdzVq6gpvcvDs4qeINAa3AuzkC1xFcMwQdixGxXnao7FFx5Tmg%2B%2BQRzQ%2Bk7%2BYBLSeB4X1tfFzi3X252eJcomvYBFYArSpdMLa0GreA8xFGmnYDQN%2Fo59%2FuoXTNXpzh0%2F5bTFNsrf%2BY5NkNgDCTRH%2FIubWcw08Cyt7immfCqCwh%2FXW3xT5UaoLOYsrsFZs%2FMsKMDonF1RhDFJMCO0OtSMTD4z5n%2FIYbZCDi4V5pADNE0u1xIUkWSw77LLKC4esGnwGqZEUElLI4zrD3pxyyrJWRaaZTi%2B1XQaBGRBD4v6Gr9%2FrANMiGrocFs6IrYuUKDDtOyP9j%2Fgiq%2BNkw0KRtOBdu0lGieYB9XrMg1UzlEDgWmDtSCFAqom6qfCIEAZMbgtthXbhbcSw2XZIGwp%2BsLpgZ6kaXGGA3ZYQf1PmfhEmWboiWSxlcfr32va8W5KGHplBqY6fuEAyI2RAqcsZMZ2k02CPLNaNnaFBx8jDkfR2dc2wXxe74TDtazD9ICn23ExtnxmeLVttzo05Dh9nPsAZ2jl9Og8aYL2A0miiyfydP7NRWSsd%2F9CEhZFdqTSqnD2tbwunkJjjG09uyvvIZ163g6AT9VMMGiuckGOqUBRX1pEInXH2Qp%2FVxmtHMACTIIwGKTYqB1a0LNNkiRJYD6jSOFWsFN7e5W1us4t%2Fl0%2Fbu4GYI3tjsJnZBf78RD%2FuYBAM5naGIJIfqEfbjD7Uw3wRie1HQ33PJCA3nmpWfy%2Fo1VHclcaNgALyA8jMZBbrkZyRhLVlAW0anY2%2BB2XqLsstiYSQl%2FB5Z7Zl7IhxjVTMgFDps5pD5sMtpGfBD76yXWyC%2B2&X-Amz-Signature=b004997c7806e6fe751c0a688ac8247122b15ccf6b55b6be88e0e21dc547e242&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

