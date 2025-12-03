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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMWOVPJH%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T034334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIHAep%2FOEiHrCMZSs7E3eJ17YOk78hanau65IYCxYncF%2BAiAqXpfraHk%2FtKM%2BlVMzJPjp375F2IjPDdsrFR1U0al0wir%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMNk0Tu9zYU%2FH2MhmWKtwDzP9FsWSkCRrqosp9MWnFvsh4sOdqEwPQq4Nk%2B8ofiA9C2TnJOBeDcYT9Jqy1pb30vjMDD4o4%2FOGuo8XuEZk9j06%2BiyLQwYUovlHfb4nim9nM2s0ma4iDdpD%2BgxVkCXcxXoutPYzhTpJDxco%2BJc4uiDkdzo5Kf3Ej8OkpspXMnDkvAedHDSxZqmshkiKAuI71mFk9qKt44jHpUL9kul74iH7ayTRW%2B14hjv%2FdnZobl%2Fw%2Bc9iWFgtg2t7iIb%2FgdrHr5djDEnyoDP1VGeDbwWkDKsB75%2BWJD0%2Bgk8N7rWlRD1q7EGyHEJFtKrQxHfsg6fWFINw3YpGNRE4bkBfF4X%2FMUu0Vp8dPqvocMq0BOsZa9QlncqOUs8SBRQ4oP9xVVW0S%2BwkZxg6d6AsjIqv%2BXb4Wr%2B8yCOW86eCAzcfmYvBgRc7XJPKtY676%2BGrs0Vp5DdN%2FdE0tl0eBtG8%2F%2BiJvFMrczcthfNXt53p5ixSm993ipa8WUN%2BRxinxe716KtdqxYmZuYVeZAcL0qJXyIG%2BA3u44VlTSHcJzZao2Hu%2F4gqST3WdYNsPTU9H4eN9CS5V7xfA36ayE0AKjSvZlsQ63HgRj2FT0iE6MlpCuOMrKJtZwEaa1qbIBgwREMxWNaEwoJS%2ByQY6pgHZQBJPbERKgM%2BWY7pBrxFH%2BT9JZ1BFHj6wB12HkEgBjemUT8ESWdqol5pXOZVE1%2FwyOqqwwFE%2FA9mTB6hGHYC2N2HpGq4%2FLToBOaNyLzjUbJwsQUyINEK8to%2FqI%2B3q7yVpm2RdDWJVPyBSCzwFGq6ng8YPYxcLxq8JK8tByls0bWkuiUvW9cPX2TAmS85fSqm%2BQHLQjtQV%2Bt3lIf6gxj3kApixF0PV&X-Amz-Signature=81fd371fd35b19ff28e7a89b1aeb7181822a0cccb2598f68233609f8ffb1d82b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMWOVPJH%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T034334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJGMEQCIHAep%2FOEiHrCMZSs7E3eJ17YOk78hanau65IYCxYncF%2BAiAqXpfraHk%2FtKM%2BlVMzJPjp375F2IjPDdsrFR1U0al0wir%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMNk0Tu9zYU%2FH2MhmWKtwDzP9FsWSkCRrqosp9MWnFvsh4sOdqEwPQq4Nk%2B8ofiA9C2TnJOBeDcYT9Jqy1pb30vjMDD4o4%2FOGuo8XuEZk9j06%2BiyLQwYUovlHfb4nim9nM2s0ma4iDdpD%2BgxVkCXcxXoutPYzhTpJDxco%2BJc4uiDkdzo5Kf3Ej8OkpspXMnDkvAedHDSxZqmshkiKAuI71mFk9qKt44jHpUL9kul74iH7ayTRW%2B14hjv%2FdnZobl%2Fw%2Bc9iWFgtg2t7iIb%2FgdrHr5djDEnyoDP1VGeDbwWkDKsB75%2BWJD0%2Bgk8N7rWlRD1q7EGyHEJFtKrQxHfsg6fWFINw3YpGNRE4bkBfF4X%2FMUu0Vp8dPqvocMq0BOsZa9QlncqOUs8SBRQ4oP9xVVW0S%2BwkZxg6d6AsjIqv%2BXb4Wr%2B8yCOW86eCAzcfmYvBgRc7XJPKtY676%2BGrs0Vp5DdN%2FdE0tl0eBtG8%2F%2BiJvFMrczcthfNXt53p5ixSm993ipa8WUN%2BRxinxe716KtdqxYmZuYVeZAcL0qJXyIG%2BA3u44VlTSHcJzZao2Hu%2F4gqST3WdYNsPTU9H4eN9CS5V7xfA36ayE0AKjSvZlsQ63HgRj2FT0iE6MlpCuOMrKJtZwEaa1qbIBgwREMxWNaEwoJS%2ByQY6pgHZQBJPbERKgM%2BWY7pBrxFH%2BT9JZ1BFHj6wB12HkEgBjemUT8ESWdqol5pXOZVE1%2FwyOqqwwFE%2FA9mTB6hGHYC2N2HpGq4%2FLToBOaNyLzjUbJwsQUyINEK8to%2FqI%2B3q7yVpm2RdDWJVPyBSCzwFGq6ng8YPYxcLxq8JK8tByls0bWkuiUvW9cPX2TAmS85fSqm%2BQHLQjtQV%2Bt3lIf6gxj3kApixF0PV&X-Amz-Signature=81fd371fd35b19ff28e7a89b1aeb7181822a0cccb2598f68233609f8ffb1d82b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TPIVSE4%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T034336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIBxD4z1mem2qd8wE4Oo0QK9vjBl%2F5bdBIhR%2BrtAMJrqWAiEAvnEtI0PcSlQosLxlyljkz9%2B7aDzIRPDEd4HQzgDmzgMq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDAmHqSI1yvyCBd8KMircAyNyTyGPeH%2BaHE1LkwjWALyOPOiTofAJvXVyZhE5gwiiLP5WgPHeN40956pu0mzoR11njbJhIp5c5eWBuUFEkEQHhJz8nc4peC1d%2BhSu0HGsQIP%2F8g8byUKy8PkOB%2FSh7YrWen%2BeaqZHLHZig8z5Miw8oyV91Cte3eAg2QKqWM71T4xQ0pY0WlmK%2FyqE9zIl3JmTGjn2GlW5ggDKxB4e9wPH%2FsCuXNGDm86G8KaAuAcHXCsfYdr5wcL2uhISRnqI%2FFtpD6QsTbL8OGy%2F2abFROTgWht%2FwLJdQ%2FjE9rIWQNUeRJRUk70Gpobh00C%2FxzRzFPkmXIXxDAC2wkQqxkevOkk49%2B2BAxxXKp9zKhtslJY5uysCIIG%2B3BWUlsgqBm%2Fg%2Bilcbvye85aP0PvaG1Kvo%2FnZnEOHA6U4O4c634nTpFEAV709cvcnxiSjLCrpPW4QnQfAqU%2BFq6li73I0cCktf%2BdC9iTaDIfaofpRGK%2FWD16rNLrnHTYIO%2BYjxXpljsitDjhtWyR7uftUZNYQaV1ZD1ALryVWlAaXvj7Inqcl69PYPIgVjtMLSycfbMvMg1LmkoBtkLeWV15tmdlz%2BpabF6qtB%2Bb1AecrFKDX%2B4Uf6AZdBIiFs1ZNPK8JzuXkMNqUvskGOqUBMRfN9nm5aOKgMiFq4042uHS%2FniqWu5v5wmzlXdylC4VYe7Lc028YkCcpeDrvt0z1JaoGi1E8WOhnwOV56i1gDj%2B%2FZE7TUJnoWMnrmZd86f7EmUFjrZk0WNAlJ5%2BZGQGzFoe7SBjocGJu%2FKtMtMYg7wFTg6%2FURuQhFATSf7L4Lbptk0Xc41Vknrja3Zcg8ZVACDcqxoH%2BXZuXee4jHgaYnBRNSAmH&X-Amz-Signature=f6740c73142d705611abf324654bf041fa564fa7e6dfb214a776c4a0a73e2544&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TPIVSE4%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T034336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIBxD4z1mem2qd8wE4Oo0QK9vjBl%2F5bdBIhR%2BrtAMJrqWAiEAvnEtI0PcSlQosLxlyljkz9%2B7aDzIRPDEd4HQzgDmzgMq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDAmHqSI1yvyCBd8KMircAyNyTyGPeH%2BaHE1LkwjWALyOPOiTofAJvXVyZhE5gwiiLP5WgPHeN40956pu0mzoR11njbJhIp5c5eWBuUFEkEQHhJz8nc4peC1d%2BhSu0HGsQIP%2F8g8byUKy8PkOB%2FSh7YrWen%2BeaqZHLHZig8z5Miw8oyV91Cte3eAg2QKqWM71T4xQ0pY0WlmK%2FyqE9zIl3JmTGjn2GlW5ggDKxB4e9wPH%2FsCuXNGDm86G8KaAuAcHXCsfYdr5wcL2uhISRnqI%2FFtpD6QsTbL8OGy%2F2abFROTgWht%2FwLJdQ%2FjE9rIWQNUeRJRUk70Gpobh00C%2FxzRzFPkmXIXxDAC2wkQqxkevOkk49%2B2BAxxXKp9zKhtslJY5uysCIIG%2B3BWUlsgqBm%2Fg%2Bilcbvye85aP0PvaG1Kvo%2FnZnEOHA6U4O4c634nTpFEAV709cvcnxiSjLCrpPW4QnQfAqU%2BFq6li73I0cCktf%2BdC9iTaDIfaofpRGK%2FWD16rNLrnHTYIO%2BYjxXpljsitDjhtWyR7uftUZNYQaV1ZD1ALryVWlAaXvj7Inqcl69PYPIgVjtMLSycfbMvMg1LmkoBtkLeWV15tmdlz%2BpabF6qtB%2Bb1AecrFKDX%2B4Uf6AZdBIiFs1ZNPK8JzuXkMNqUvskGOqUBMRfN9nm5aOKgMiFq4042uHS%2FniqWu5v5wmzlXdylC4VYe7Lc028YkCcpeDrvt0z1JaoGi1E8WOhnwOV56i1gDj%2B%2FZE7TUJnoWMnrmZd86f7EmUFjrZk0WNAlJ5%2BZGQGzFoe7SBjocGJu%2FKtMtMYg7wFTg6%2FURuQhFATSf7L4Lbptk0Xc41Vknrja3Zcg8ZVACDcqxoH%2BXZuXee4jHgaYnBRNSAmH&X-Amz-Signature=f6740c73142d705611abf324654bf041fa564fa7e6dfb214a776c4a0a73e2544&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFCLKO4T%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T034334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQCIGsJpi50qfiqDtr7ZJwANxbOkvDqneIbMEN8e8eG2mgIgWbRG1DL0XGu1d7HDjg7SL5MmltKhcZVY5bIL8DbeoR4q%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDKfnSxaz%2FzWRUlvGcSrcA9fBLASypS7aFcDNKfRFA5i11bIlTVO3cC7jAD3D3HYBZXgBAwg%2Bf4uvMOVHGpgbNlTPbhsSaddb%2B3qaxxQW4ryMQnhbwfY0gu9xXL6JJwLPj3AeDPZMX%2Fy46mtKjnwSVPgZauR%2BtzLQ1XRzPecv%2BeI%2BXt%2B3jAl%2BDGuwljUi6EoSGZojv2iUHMHE%2B%2BLNfmO79Ap0Zi7ZODZxdPXdQlcMMyse1CVneFesZhSoYak%2BUXaJHc88kR09ESfrpTnaCDcrMIjIf3PhWjSHOnCqXoWdVE5jBkXPXmzwyjIwdOY9XKKYHOkRNARy0fbfFTiBFom56OgrkvoZVEEfx8x32LlBAVkR91Fo%2FNF852cU8AYkTaNpflV77Qn7uezmc%2FzALL25aQpI90crWImJZcNjVzlT6AIaEcWHZxd2wGC2%2FuHoL4rYYRNc9%2BK8UAF%2FV450RUpGpIceuNkPAumWJQWZxZkSiKv2T%2F9eNjtx43n1kCap7rPqnd2g6qHlAYH5ccdpijBKZsikGL4v3r7bvosHSL8BrfSKlq8iBsfbIKUQe0uGv7hpOFvo%2F1ec0CF0eVnHj3xJmfVP5aZsWi5s3od3gGGLIaSBNOwgmqKzynA0fbw3LOigOM%2FGESwk73HSKvJYMIaUvskGOqUBE3YmC4j5RhXcJMgqlMJPHECzXnrw%2BqGdKTdI40XdKepobwiKFKogjCnUujKWx6IpWRLWcgpAXRteBNt%2FKHm5neKmvYTRAQrLVDur1gKjD58rk1ssm5oyPRJ7yfGfRWGEdd%2BbSXJY8km7ltw6RU84yVktw2cUeF6S5X8llNZbl19iQyxXYaOiYTtAMUldASKPGS4RT3pypdUOKFR55TK73R5K40pp&X-Amz-Signature=a4ca119780c54d55d4371eb56131135b83d2a39187dae5dc433ae82e230ccdd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663VN7CP3%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T034339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQCtMKqBZ5i2eZ%2B9EkSjbB%2FLkBmwuK5kq3MUXikX8dFLNQIgXD4LX0oFXWxdVYJ9XJ8y7AT61nzVNs27JVCAyc21h0Iq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDH3w9g75wJ6U5IQQ2ircA9yU1a5tQe4%2FJZc5y5K6tMJXTPgmQqKc2INVHWFsD3rf9eAnkDYd31w3iQdLLCpOi2xSP6ag%2B8UsdmGpAPYSkC5EwWA84dTyHNswSU%2FGFjSUk9QyoiCHH9vnYJodJ4W8OEKFQ%2FJPHqGZlgTOXahHBGwX8cvMLyZJOwt116V0LN0zpoOOa07%2FFGxs2qAu%2FmpHG%2FDmC%2F94X7drY4VsQwX5Ar%2BhAyN5Xmzt70LvMk1Z7aMhxvcZ0hbrzckMs%2F%2FnvK85NKWPUmCf102nUm2V%2F%2BPO648vyGVRx0UWFRLs5mmKAS6jqf5YBTxe8BwwYWB%2BuDT3JO%2BzyK0ootb9sF3GItlI3daoUaRIqe6Q1gvxld5qBFTe%2FUQ0vcc9paSlgRvpDTNIUyvCmQFf3H%2BKyYg1ZilcNt%2Bc1MGNukOTzPQwbKYUuzJvY8nD51DPcn0%2BvYPMzWOc%2FTNd%2FKbxoe7KyX%2Bch%2B2AevYfOBRyYKMxW2o9%2BwTNLEax%2F9W7AjH5aigr48%2BKQrcac90dNWzUXBWqYreukGtceFT8DVnjJicRbdNvaem%2FC2a%2F5KuMmIVR0rh0NG6BAv0R37Ro3b%2Fh09Wiu0awKmwdgNRYZNxAnjraNzs9nNQglYOgK3D%2Ff0CTmIPQzJQyMIaVvskGOqUBVGLaD9Ak%2FU5hrbNZ%2FA%2BCb05tRdMb9cnG4e6l0lxfUZUvjYEpxC5TjSSuUjVFW27qN0Zk66vIlJ%2FDGQlOTyxveVryT63dNu%2Bodplq5epsvqzyzS8u%2FNBGZowVSJxfcvgn3GadWLtRVs6uQr7zuk5nsxivaGEliVIY5d8G5KhdokdPHCqKZenOYpWkwpMIOBwjsbA336BpCpCRg0sr9kpYzMMXh3IM&X-Amz-Signature=761a85161e67c1fbb6721ef61a1872f86fd58fb91f138f6481b81ed1a1b87584&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663VN7CP3%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T034339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIQCtMKqBZ5i2eZ%2B9EkSjbB%2FLkBmwuK5kq3MUXikX8dFLNQIgXD4LX0oFXWxdVYJ9XJ8y7AT61nzVNs27JVCAyc21h0Iq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDH3w9g75wJ6U5IQQ2ircA9yU1a5tQe4%2FJZc5y5K6tMJXTPgmQqKc2INVHWFsD3rf9eAnkDYd31w3iQdLLCpOi2xSP6ag%2B8UsdmGpAPYSkC5EwWA84dTyHNswSU%2FGFjSUk9QyoiCHH9vnYJodJ4W8OEKFQ%2FJPHqGZlgTOXahHBGwX8cvMLyZJOwt116V0LN0zpoOOa07%2FFGxs2qAu%2FmpHG%2FDmC%2F94X7drY4VsQwX5Ar%2BhAyN5Xmzt70LvMk1Z7aMhxvcZ0hbrzckMs%2F%2FnvK85NKWPUmCf102nUm2V%2F%2BPO648vyGVRx0UWFRLs5mmKAS6jqf5YBTxe8BwwYWB%2BuDT3JO%2BzyK0ootb9sF3GItlI3daoUaRIqe6Q1gvxld5qBFTe%2FUQ0vcc9paSlgRvpDTNIUyvCmQFf3H%2BKyYg1ZilcNt%2Bc1MGNukOTzPQwbKYUuzJvY8nD51DPcn0%2BvYPMzWOc%2FTNd%2FKbxoe7KyX%2Bch%2B2AevYfOBRyYKMxW2o9%2BwTNLEax%2F9W7AjH5aigr48%2BKQrcac90dNWzUXBWqYreukGtceFT8DVnjJicRbdNvaem%2FC2a%2F5KuMmIVR0rh0NG6BAv0R37Ro3b%2Fh09Wiu0awKmwdgNRYZNxAnjraNzs9nNQglYOgK3D%2Ff0CTmIPQzJQyMIaVvskGOqUBVGLaD9Ak%2FU5hrbNZ%2FA%2BCb05tRdMb9cnG4e6l0lxfUZUvjYEpxC5TjSSuUjVFW27qN0Zk66vIlJ%2FDGQlOTyxveVryT63dNu%2Bodplq5epsvqzyzS8u%2FNBGZowVSJxfcvgn3GadWLtRVs6uQr7zuk5nsxivaGEliVIY5d8G5KhdokdPHCqKZenOYpWkwpMIOBwjsbA336BpCpCRg0sr9kpYzMMXh3IM&X-Amz-Signature=761a85161e67c1fbb6721ef61a1872f86fd58fb91f138f6481b81ed1a1b87584&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

