---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GHAVERQ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIC3p7bklQwA81yB1FVSFce%2BRUW%2FV9Xn8omxB%2Fx79yw1uAiAoMhsjekmJ6wqwkIp623iO%2BAvowA4gVg1dkiHvKFFT4Sr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIM0LhHACUaXH6sQKBQKtwDGcflhZTGZwL2Sx92TcvsBGpM07TNoiHL5TzYbgwlg22ADy60B6zcoxignlwX8O%2BJoEomdY2Yx5qI%2FSU6OGrUKsc1BsnzEUH%2BHqoqo5JRPSM3KoP4zhtb8ru8WaDqEc%2FTRYWXbTicyUPcvyb7dbYXY2w53EK0nK%2F%2Fa8NDUwnIsaciFPMDzeFTqupX3enfwCb7Y1lNsTouT%2FQfpIFY2d1qrRtjvvnC8rZxMCZOsBJ%2FkhoP3dntBwjeqAJ3OPZu5sy3AYIbuljcSxRgJQe%2Ft%2FN8vxUrAw%2BowUXWn5%2BerhzFkYPpr0wQ%2Fazyyr34NzDgWLKoXMK53XgIjWPlm%2FvUzysui%2Fcaylfei7IaejzXdnHTc%2FNbLjXFiqUEmxbEaN4bdpRNunoidF9ZczvGZSCT49%2FY85LMOi6Kko0cCMd90rUAS3cdGN1Fm1jXOElM5eiuzYAdo73%2FydnmLPKF8I5M1vExTVipqiukk0A9QKIwI%2FD9dcaJGok0STW5T%2F7dsJ5fsFwZOIzf3VKYzHj4cz8%2Biz6Hx8LUkNz33iYfoI%2F1UDmy3yjHfcteQHLLZksIJkV5xZb9SG9qlFYJTH3ZDHbojx1%2BkG2G4d2qV1zPuo1nPPcHwc%2BN2UE6AMy29kzJuOwwg7uxzQY6pgFYzDnr9gdY5fSXYOoUp5BDXvVkLZiKgu%2BZCm5IWMrziWmwUzvlikXg8oH3qBFwB7Q3Mv5w7Blx4QruWplckJgmVva%2BT6QCHiOr1UsM%2BR8yMWXTPii0oNmQXZZQAdP4VbqSU2EN%2FIfKXuQF4nUaK5brGWQGhjT%2FfkSi4EhpOdhESKxD1YC4QwiauRIovNsvo3eoiz1RTW4ApW%2BMIfQW%2Fy0ZmgZ%2Bti7t&X-Amz-Signature=517ed808249a066183076f0de4c018eb07c7e1a9dc313dc286db101d1e9b1535&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GHAVERQ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIC3p7bklQwA81yB1FVSFce%2BRUW%2FV9Xn8omxB%2Fx79yw1uAiAoMhsjekmJ6wqwkIp623iO%2BAvowA4gVg1dkiHvKFFT4Sr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIM0LhHACUaXH6sQKBQKtwDGcflhZTGZwL2Sx92TcvsBGpM07TNoiHL5TzYbgwlg22ADy60B6zcoxignlwX8O%2BJoEomdY2Yx5qI%2FSU6OGrUKsc1BsnzEUH%2BHqoqo5JRPSM3KoP4zhtb8ru8WaDqEc%2FTRYWXbTicyUPcvyb7dbYXY2w53EK0nK%2F%2Fa8NDUwnIsaciFPMDzeFTqupX3enfwCb7Y1lNsTouT%2FQfpIFY2d1qrRtjvvnC8rZxMCZOsBJ%2FkhoP3dntBwjeqAJ3OPZu5sy3AYIbuljcSxRgJQe%2Ft%2FN8vxUrAw%2BowUXWn5%2BerhzFkYPpr0wQ%2Fazyyr34NzDgWLKoXMK53XgIjWPlm%2FvUzysui%2Fcaylfei7IaejzXdnHTc%2FNbLjXFiqUEmxbEaN4bdpRNunoidF9ZczvGZSCT49%2FY85LMOi6Kko0cCMd90rUAS3cdGN1Fm1jXOElM5eiuzYAdo73%2FydnmLPKF8I5M1vExTVipqiukk0A9QKIwI%2FD9dcaJGok0STW5T%2F7dsJ5fsFwZOIzf3VKYzHj4cz8%2Biz6Hx8LUkNz33iYfoI%2F1UDmy3yjHfcteQHLLZksIJkV5xZb9SG9qlFYJTH3ZDHbojx1%2BkG2G4d2qV1zPuo1nPPcHwc%2BN2UE6AMy29kzJuOwwg7uxzQY6pgFYzDnr9gdY5fSXYOoUp5BDXvVkLZiKgu%2BZCm5IWMrziWmwUzvlikXg8oH3qBFwB7Q3Mv5w7Blx4QruWplckJgmVva%2BT6QCHiOr1UsM%2BR8yMWXTPii0oNmQXZZQAdP4VbqSU2EN%2FIfKXuQF4nUaK5brGWQGhjT%2FfkSi4EhpOdhESKxD1YC4QwiauRIovNsvo3eoiz1RTW4ApW%2BMIfQW%2Fy0ZmgZ%2Bti7t&X-Amz-Signature=517ed808249a066183076f0de4c018eb07c7e1a9dc313dc286db101d1e9b1535&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TJKAPS2%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCIQCpe5G%2FnxfZcsOO3bYuKTiGtg55Fsbl0R0RG022eB1CTAIgIB5hFuVb1fjFMJzqWvsi9NcMqTwsHsLFJ8vBTrzRNQ8q%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDJzYIjEDdQTokdZpKCrcAwf55WF7uTwEQuqdbwlNEyOgeKR%2FnewtSGglnfvxc0gzBVNeZlMHnelTybW8DuDIjXf6he3B1JnBo5T%2Bhku2NyQVv%2FLrSwCEZgcehLk%2FROj5gLTiI%2FQNkeXIZ74SzmkO9RyarWI14FzBOFk%2FHUTYpH1Y3DBXoyDXVGJ6bspt4835yBNxo7Vjmkqp6MehjV%2BCQavY8IKrry8j9DdbOaZQl6GcIhBbcuhF84gAh9kSpBldyFn277B7yMfAA6pmu3gLKfuVVyvZf17R%2BZo5KkozJs5yb0KGnsHzNeZNRoCTjTL0kCjUB%2BP6fvzRUJG6W%2BUmHQ2SMOKEwkzfUZSWS4LnLuM2fFkeHrATqyQ98iORjUjqH6SGA81M4kujARKHQcYv1kbhENBM8Pq%2BjAWEVciuJvF4LYx0iJm7HdxOJnGhnk4C0yRLO0Aq5333YMfoW9%2BqAEXlQruYBbRkt7lm7Hg%2Bv%2FZG73QeBnt6mehH4uTEIKnHBh4JQBXhagURSw%2B09%2BvjS3EjDKquxKcqew6K8WDH7MOXVc2Zilzo2VyKPKjvs8foiLtuR2ZHqExbwI50VRa8vfq%2FapCC4DsztBF%2FeOg6%2Fum9Wx%2BTTjRa26ARu6%2BxhFKI%2BWDm%2FqbPmJlvUWIyMNa7sc0GOqUBBkjByszQDeAlQia76tNR%2BPI3cvSolKWJHZu2iHMmxWbHuIJ7vXSYvkbBpSUi%2FChksyF0Ui9VgwFS2tFy89sws5bvLQ1cnp2UphnaobzcPy8GyQaI4hTjXjTbkppvvhgPsPWdOAZ0g5bDaN3PSYe6bd2UH7id9mOPxhLyWXYyX6xHN%2F2z%2BR6%2BqXNfJtq86cE7y%2BXd7csOAqz4t09SI5AWk7%2Bw4T9X&X-Amz-Signature=30562be10e182759713a73e7ca37fce2c36b9134fe4b18ac818389cf8f7bc5d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCATKB2D%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDuVC414nw5mtISFxKa%2BDGvI5LsZN%2FFGhqmbE3wZdAMNQIgWyhIICKtHbiYlssrgoq2ix%2FrrbYQj0k6Gv8Scum6MZoq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDMqnV5wREA7Q1u9hwSrcA9K8k6uIUcmV1yZdXeYOvmSMvpY6tF2lfbKiz7xLa3QZy9JeRgHlnOv%2FKNPYuSn%2FLgxkTS6IlXmsTTF0SW72Skt1%2B9HRHXIBGpxXGv1ipkVww8aBLDXgF2HUQ5ZCe1%2Bj00XSfY380pLIyUs8KmYHEvbwBVlHHgb0SSY7iTZNxW3dhDF93ojGMvuHP1fS4%2B%2Fh%2BAyruF8NC3vNUM40bOfU%2FOCYzhstEDgb5nTyx78LMkPwWa3wLoN0AkpPWncUmq6mRE1ThEQKULFkwDiWdfZrsJbD7vf5NeqC1G4bE0wPFHLn4kJZWB4AcT9vBjiOafFpD%2BNPCV3xkwEpZcrT0dsFQb7SoC1jm4J6sOMoT4siJVovGC5WM65ztYFmDFKZ3umJu4y4NgAXnqrrQfTvNIOjSSNn%2B%2FBeC6jv1Z2pLkYYx0zC%2BabcB2qElfzKjiahYxAKe2eAgKTK1jOUXMlWqBCT%2BFtf3kAZFHomTMz10V7A3%2BNoDX%2FUTlTn1g65P%2FIvmStwqasbEk8owt2udLbFAUgV%2BQGHc5p28gN%2BhAZ8eHGLL4oysmaaOxlL8WcFXGH6aOBIc6bfxjG7Fbi9fBhLflzD1fpAywo8CiXqKkcAw%2B%2BX%2BE%2Bnt0UGp8mqJNjkwRE%2BMKC7sc0GOqUBVns9MmxbG7hK6nBGBcVSkW4Gc7f07p0HjGGosepCpQlPLnluiuCuOqX3bpUvo3o19qVxk5ydh3jQUY%2FRxb2X7BWfNTKGsul9EDT2liD9dGI69uFAoj%2F6iIE7NXvx%2F2NeeOkhc9698B6bcSIJWprfTNQ9YeroXtSnXT%2FhoJQE339UdPp%2BRsbijQ3PRViIuGd%2FwEJBGFNeleFV5AwZNRQKLc2QEbps&X-Amz-Signature=a214ec9d955ac334efcc5978d526df2e1bb03eb2000f8bcbb61328e4cf850f73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCATKB2D%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDuVC414nw5mtISFxKa%2BDGvI5LsZN%2FFGhqmbE3wZdAMNQIgWyhIICKtHbiYlssrgoq2ix%2FrrbYQj0k6Gv8Scum6MZoq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDMqnV5wREA7Q1u9hwSrcA9K8k6uIUcmV1yZdXeYOvmSMvpY6tF2lfbKiz7xLa3QZy9JeRgHlnOv%2FKNPYuSn%2FLgxkTS6IlXmsTTF0SW72Skt1%2B9HRHXIBGpxXGv1ipkVww8aBLDXgF2HUQ5ZCe1%2Bj00XSfY380pLIyUs8KmYHEvbwBVlHHgb0SSY7iTZNxW3dhDF93ojGMvuHP1fS4%2B%2Fh%2BAyruF8NC3vNUM40bOfU%2FOCYzhstEDgb5nTyx78LMkPwWa3wLoN0AkpPWncUmq6mRE1ThEQKULFkwDiWdfZrsJbD7vf5NeqC1G4bE0wPFHLn4kJZWB4AcT9vBjiOafFpD%2BNPCV3xkwEpZcrT0dsFQb7SoC1jm4J6sOMoT4siJVovGC5WM65ztYFmDFKZ3umJu4y4NgAXnqrrQfTvNIOjSSNn%2B%2FBeC6jv1Z2pLkYYx0zC%2BabcB2qElfzKjiahYxAKe2eAgKTK1jOUXMlWqBCT%2BFtf3kAZFHomTMz10V7A3%2BNoDX%2FUTlTn1g65P%2FIvmStwqasbEk8owt2udLbFAUgV%2BQGHc5p28gN%2BhAZ8eHGLL4oysmaaOxlL8WcFXGH6aOBIc6bfxjG7Fbi9fBhLflzD1fpAywo8CiXqKkcAw%2B%2BX%2BE%2Bnt0UGp8mqJNjkwRE%2BMKC7sc0GOqUBVns9MmxbG7hK6nBGBcVSkW4Gc7f07p0HjGGosepCpQlPLnluiuCuOqX3bpUvo3o19qVxk5ydh3jQUY%2FRxb2X7BWfNTKGsul9EDT2liD9dGI69uFAoj%2F6iIE7NXvx%2F2NeeOkhc9698B6bcSIJWprfTNQ9YeroXtSnXT%2FhoJQE339UdPp%2BRsbijQ3PRViIuGd%2FwEJBGFNeleFV5AwZNRQKLc2QEbps&X-Amz-Signature=1f8896b943292738c5abc5bf0db9159f52ac235e201772bea81dc27154333931&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666V5JXRHG%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIGfVjhSZpzB8LAeoiVhRqIsAuhn2ffXl7B0Zr0bDR%2FYhAiBeDpxlvKnWCdppSBRuQ8dVgqQ76%2Bmc364UQ72clyeeLir%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMaz%2BLrLNmGY2DrdGoKtwDFwjgAPI%2FXJWn7Ab%2B%2BO0cMZEKl8cBDTTp0fFrHinltlfbPn3sRurJkIdTCb9CJJwEs0helKg2kxvejdz%2FfaI8IGDpjDIPaIMioc3micZde1PHezRvDdChzaIKlyp4Rp3UUq9YNiCulwDP2FVwrnL9oyIAqVSLUF9elNwR6lhVFOdOWbg%2Bs9nxiFNdZiKtDwZteGAXiWsZ8Fv3Kq%2FHchFkbQ5r3vii5Or4x6w0CWTZeeuZaZUJdhSVYlh881JKN1n1WLpvJUKcSeyuUy9weLjFeHXBlMOeeUuTXkGBZI%2BIyRqOn1P7bRFqMePI8I20hldF6WrzHCIS6kgGL%2FwEXA4V51%2B20Uy%2B1ygrEck0Vm9s3lfL6R2rV1xk5wUGpAajNgfy54HkKylglueTNkB70SWSUo1KUk1%2BC77AaFJmkvBxLWnoe3z8l4VBu%2FKzHPXyeTyfWWwAAe67jo54hHeYoPaZmFWtsEfc9i8nlaXw4tIzfIEDVmhY%2FEAHNiF2TTmjGETVraP460cdYWkak4G87aYaTE47tmiOXqdI%2FUP8%2B0nqXumdVPXkjPm71oEmgjZ7yJCehjSeXiMX9hWBeadDZOtMQNmYLycHORIKL8x1WN9%2FoU7ulFejViBizrax0RowoLuxzQY6pgFLX0kXg%2FMQ858MJjnT2pnVbm0%2Fg5f1h%2FEmb%2Fauqb1EYsGBULsVLdXQGdpMZsMOLUg%2Fpw5rZLvv1rTeC1160%2FuLsBoIRgstknIpx1705rrVdoabTzQQEumM0z38hm8SedBbp2dC2UsfUrkMokek7kYwHQzzO4TmXK%2BFQ340kGHifKfnV60LWxNDX2O%2BzfncVZDHprbgeLGti9y8ZaUfiVdKHhWOQ4Kj&X-Amz-Signature=c0ffb357eb8b7ac683ecb74eaa24831a3773316bac431c999ba0becd30b7f756&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEDYO3GB%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCoYtwENLyzeDdPRMftThHSHIG6KYfv9olnLvZFyr5Y8AIhAP0VeXJ2zT0b%2FK7Y0x5OtmEgbrUOFFBY50275CRaoYp%2BKv8DCAIQABoMNjM3NDIzMTgzODA1IgwzqF%2F%2FFFsLNMe7p%2BUq3APmPkd2y99nyisV7ad%2BZgO%2BXNNobDih%2F9I1%2Fg5r%2Bd57PuPt%2FWYipBktpULxbOUj4w6ExKxHSnFRCnEaHldh0HO%2FkQg8G4RQ6qLnyFI%2BgBzXmBOEQSRNSAU5v3ESxON5LEiHdYUkh%2Bmd%2BCJqZLWTXZNFrtPY0CSoyoemPPPmAoj0bsnoJ0QGkP4Ck7clO2TJgDfadtg%2FQvsVSpfMqb39Z6SffAEOgbFYEtyX%2B4qLg7%2Fu6cwNVZm8a4Bg%2B41HVCxg8EA8brUJgbtmDuDsKaQZUIT8hIGnZ5SGyHzQPOAQ8PRDUUhd07hyNhmUgk9o4W8Pp7OhqPkhuWJUFlBHeT54%2BTUUyXkv%2BD8akaaoPTqkZctM9P0s92b1AqOA34kauzIlT%2BAtOWtMogtymQ6pQ92Qo9Gtgeq1G8%2Bsntn1v%2B9LOHWoGvt4%2B59nHUYQ5oHj1Xun79P5quClKpLUUJS4K1vEtUkUE%2FX6msKi5cI5hH6xykhjMC0Z%2FXugZI24iISALRJ4v4Gren1D2jW20SwFrjT8utEjcvuJz7R0K7K2mP3%2FQvVWZjD3dXqpoCBTRkwSLdNYWzPrAKX%2FW1Wxm87dPMNqC0Utv0pGOrsIhyXupEihSFTSwFohqKg74roegbyOKDD2urHNBjqkASYbs%2BH4%2FyxPGsSuvCFi1L3HASdLiDx5bKGbJcTSQg72ya2GpsnBWsDHSNF1vts%2BpKI3cloNFTVRorn70k3vAO5XJDJaFh8E1wsvc8YuEvOReIoDtr9uuR0ECR5qUpkQOm%2FbjFbHG%2FrEO4074RbGG44G2HIL7cOWvLLOh3iX6e1WNKFdDbndOJeoRYJzma8dzbNwDdiQlOBOoVMnxszphxd6%2FqhG&X-Amz-Signature=1f67b187eeecedb7baa33bc9a8422ba502f6909a1ea1dfd73ddc07785ae7a2fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QD5CWQI%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJHMEUCICF4Wrj4AtOC%2F7HcTV9US8GD3W7TA%2BZNq%2BT832gpn3aMAiEA41uOzlcuj0ZiKQg2fV5jeDVeuy%2FD1SRUUZdOFELvs3kq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDOMKP7fcRzHgS6xetCrcA9R%2BxKv3s8Vxo%2Fn%2BFX6k1CeJyrKWeabGhnd%2FmBIh%2FFGflvUgQly4E4kDD%2FtEDoRWcyLBYDC9wFp%2FfF54fl1dJYvEdbL63Dq%2F6JQOTldsH073haYKhbKTAKl45I2YFIJd%2BZ8nMDRjC2KrhmKOjpUTLOZvOrXzQseE2PK8aHGirdz9OQXAyUn4VRxgWPasI65sukpazyv%2FbE%2BhJ2EnIemvDxK%2FZPnesfhOBHyX7JI%2FC5FsqMDYNALVEVXiE2z%2FqsMgZGLNuaEcOW7cNYPjT%2FFU16CaRAKaZ6Dy2FLLkFswXZtkCdviBV6Cgo%2FkaRHkNJj6WTU45J2lVpj6j6OfrgfTiZHXBWwOi3IQsgfxlm3a5%2BOKWva9vEFLcv03O1H%2FWgJLSYG3unRBIQl3BURC8EarSCUFTOLU7%2Fm4LyeWlTdykVtLLHfMJ6pz3gHSu0LW7lY0MKOfHmopYNJIrJMj0egE8VTiGWhjCFaxauUApHaSLUryT%2FDPO4uh%2Fk73VdQXuf4NkbQ55j3RANic7k0K50jeFvfK%2FNH%2FqLvuXnzYk9WUk8rBk3nb9HBia%2BVp1Jh80H0akaqBHyU5DGQizhsiS7gvKYHUI1OEqxYBgQQYXc9I1kBUiFu45y0pxDgFVpDOMMe7sc0GOqUBmeGHYg%2Fv2RmLg%2BKkUVSAV19Fwx7fmGFPcHBy5Fosepl2bGZuoW%2Fx4zf3e6xzyZoTa9pY4G7ZAyjQmwszbar3sW%2B2b%2BAfSE5u8rU25dODgDFo2zALYIMgAw6tk6gBKuiXnlYWZqV6Nv3s5T%2FB7ipc1ihjAxPN9tTdDE9SMXnlgWhLS8g%2FlOtc44tY8NRQXDcXRTQkYbkyDaMB2g8sDOfe%2Fmu8Zwtu&X-Amz-Signature=5d28aa67daf75d8c90a6227c5222dc67da08f10d974e9d284ae553408ebf4041&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627T4N6PU%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQDELgPooXfC%2BNrt%2BP%2BG10tGIQIE0iHHlhIGPMSwasO4JQIhALhnmpCXDVW4CQru434Qppsz1IIw4xn58POYrxER%2F8coKv8DCAIQABoMNjM3NDIzMTgzODA1IgxXAMLSy%2FVb%2BA7OtqQq3AOaRcTDF31bedLh%2FxzWxjdJGFrLRZWR5qjslQDaBa0ko5KPx9XC98BjJOEbAfmpWb4ghX30sHUikz%2BoJIQaqHxMzgds7ZCPlCRYlHr6LYuWGrXSnafVjuJl1sxM4Vdx4SqdzQPLqYAwzmCmIL9%2Fkovr6nHmbIZ3TMsX3%2FHURCvC62qv7KBgktyJvh078rupTC74be3kNcJVLXDj124LjDiA2%2BWpcovnT1HIPkizDJgGh52dPOADB4e49Iw6a9ZgHDxqKnjPf4IVVbJa8XORpiSLHAKtqTt1hr694eDT4cJTdtnNcEO8ettz4msX0dvFL4KnszdgovLHxjnCgKJbLIPRUJCYV37AjKvIE4oic6rihGo0gvdNc9%2BH098jraKXSeub9SdiqstQVmwm7y0qDm1uPHNjZ4uCbEAISjw3iyc5TbOiHAhTfm3JN2%2BD4TH1SKMeuceFcrXpmOyylKI%2BbltJNssRW4xIiyURh98ZecSqIJfQiHVHSr8JMw3IWP1h11M5%2B4j7Q4md9%2BvkEUBTT%2BUCdpBG9mm8vsLhCrmnIpobL%2BsnChu9O%2Bh%2Bpmy0%2FkZDVc1%2FzbgnMEHSyQ94gs4oXWAPgIG30eth9ux5WWXuZJMGqS7HZy%2BNJ4V4YAqRMTD2urHNBjqkAcRVc6coQWgjvaf2ZgA0FXdl%2BZhjfVidNAD0Ec5lKwOZwScDrGYcsTDgw6%2FWBKUAXXg4iMhV%2Fol5%2Fli4Y1Bb25JiYIABk7gnVVFAhuCoakBI1wbvgb%2FbUH%2FosSsz4GUjtJ5AWLixFthSSKEYfD6oge2j5caaYOu2gVE8Es6jnppUDqI5jZnrwS9Ck%2BIKKXJCpIcFwu8qdZOchg49BnpGgHTdeocc&X-Amz-Signature=f99e670eac8fd7827f1269b663e8fc2b6e0de3cb09ce4c41d779be1e078cdd7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627T4N6PU%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQDELgPooXfC%2BNrt%2BP%2BG10tGIQIE0iHHlhIGPMSwasO4JQIhALhnmpCXDVW4CQru434Qppsz1IIw4xn58POYrxER%2F8coKv8DCAIQABoMNjM3NDIzMTgzODA1IgxXAMLSy%2FVb%2BA7OtqQq3AOaRcTDF31bedLh%2FxzWxjdJGFrLRZWR5qjslQDaBa0ko5KPx9XC98BjJOEbAfmpWb4ghX30sHUikz%2BoJIQaqHxMzgds7ZCPlCRYlHr6LYuWGrXSnafVjuJl1sxM4Vdx4SqdzQPLqYAwzmCmIL9%2Fkovr6nHmbIZ3TMsX3%2FHURCvC62qv7KBgktyJvh078rupTC74be3kNcJVLXDj124LjDiA2%2BWpcovnT1HIPkizDJgGh52dPOADB4e49Iw6a9ZgHDxqKnjPf4IVVbJa8XORpiSLHAKtqTt1hr694eDT4cJTdtnNcEO8ettz4msX0dvFL4KnszdgovLHxjnCgKJbLIPRUJCYV37AjKvIE4oic6rihGo0gvdNc9%2BH098jraKXSeub9SdiqstQVmwm7y0qDm1uPHNjZ4uCbEAISjw3iyc5TbOiHAhTfm3JN2%2BD4TH1SKMeuceFcrXpmOyylKI%2BbltJNssRW4xIiyURh98ZecSqIJfQiHVHSr8JMw3IWP1h11M5%2B4j7Q4md9%2BvkEUBTT%2BUCdpBG9mm8vsLhCrmnIpobL%2BsnChu9O%2Bh%2Bpmy0%2FkZDVc1%2FzbgnMEHSyQ94gs4oXWAPgIG30eth9ux5WWXuZJMGqS7HZy%2BNJ4V4YAqRMTD2urHNBjqkAcRVc6coQWgjvaf2ZgA0FXdl%2BZhjfVidNAD0Ec5lKwOZwScDrGYcsTDgw6%2FWBKUAXXg4iMhV%2Fol5%2Fli4Y1Bb25JiYIABk7gnVVFAhuCoakBI1wbvgb%2FbUH%2FosSsz4GUjtJ5AWLixFthSSKEYfD6oge2j5caaYOu2gVE8Es6jnppUDqI5jZnrwS9Ck%2BIKKXJCpIcFwu8qdZOchg49BnpGgHTdeocc&X-Amz-Signature=d3e0e640cbb5f6ea73db09b8af80239b8f2c064b1d0213dc87acdea4add71e25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HBZXQCP%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCf4AeYHEYB%2BqkbTE6QU9%2Fo2wDj3fv0vDBz%2Bmx4yuJHmAIhAIwNIu%2FW3Di5%2BbZJxL0zlJImDGA3swGOkZKx%2FsSCNgaGKv8DCAIQABoMNjM3NDIzMTgzODA1IgwDo8P2OUx65sG80kIq3AOaQrlsM8Q%2FlgBRuEmESBD3L6AivMSsxQp8kDpa2d0Ffc1e0xOOQGl1iyylsDticCJsdrcJ0jbALfAdUkh2gP0tcX0f%2FRzxK6TZSVM4JvTfiLQpa6YBd9WG7JJGxILwMU0RHHbtvAstqBtGiZE3oITMGog63JQYy0JbyzOGA2CzB1lgDtOkRc47WvDhZzPg1G8Ur%2FFGWPqmB4LuoUNssfPdxfDGN66mW0fPLCyd4reecwnuoNdky9zolUG8oU%2FlLCC2sx8Yq6NaVtfUDxQ8Fxx9Oiz5QI5FAXCN8LkilnCOv2iqxLUenRma%2BjXdt6v2UhlQnQtl%2BW84nBN3wGCjcFqZ2xZsQqP6JI4nTZ8UOGZUrQNIuUsfnwmkE3Na%2FC9h%2BLAZ3tGBpmnh3c15sfv3ygWq0tWBA3bnLH4%2Bub1uNrbZTM6%2F4FNnBFsBcCb4FBzxJ6%2FWj2gR%2F1HeU4ZmNguNjpnQamKsFsKtZguBfe2n5OIqQWPHzC7SD1LfGqOiDGuGCq3iKFBDJR0jnk%2FwMIJECm9VAif6h1QMlG6e1o28%2FEeFpqEpjjtRa%2FET7rVuGGGzsVX93BsWuq6hI8c1ckL3czsCCBjX17%2F0ycBwGSZ4usJqw%2BS3HUGbrGifPD5AdDC0u7HNBjqkAbe1ShEcWqY4ngMDRKvGFoAcNAAAgePWcdipdh%2FBOa4DwfLN%2FJLWAalD2fuTXjzV03DLdskmsqGDCUhnY5%2BR8u4lkzt7TDm7hC1JwVbaLV4Y%2FJScGGcdbe8BZs%2FNaRHYBffDkBlGPdZOmkUoC0%2Blpyn9qE7apxZ7YgnLkwIlfwR1PtB5Q2C17q1o8WcNBQUcdUGQy4cOSr7yYw3hvTzf2IwrbjzP&X-Amz-Signature=6b2c304254ff81d0111a761ea4edef901e95b4a72e9e3b148642b2cf92a3b5d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZUNOQBP%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQDU0pb7CWzKg1eiZdNdSXIrU0xd73nK%2FbqZZZEqLFU3sAIhAMP11r2Lwe9T%2FV32WBErGIQKrAlva2O%2FI4LGUmZ2I%2BwXKv8DCAIQABoMNjM3NDIzMTgzODA1IgwLyQHBgvPAdtVDxBMq3AN4daVWYf6i7Gsew%2BeIetFapc%2BaopDehCeyZOhNiIFCcnVmp5MTHHXGK4sL%2Fo7fy%2BbixtpiuTVkFhdPWTnHVBX5hjn%2BQYxY0sIA1YS6gLJAfViriHrK%2BD4WWpwteQU1IGmqxKXuYa9%2Bzi6l3WRjzVoSgxtX7nb1OQEOcSSLQGOGFv%2Fv%2FireB8bN7O76uEjR6jRlWvxVJFQqmeKlsi5TJxbDauWCBV4pnZPqEtzS9Maz2aOQ2mrAtFsTvMOjMBNJwftoD5D5q1rYysF2kS6%2BBQPb7QBStyan98zWd1SVyH6L8PUZ%2BzYI01H1%2FCJWd9djhY%2FHMekrBHSnhiPsjVDxS0ATC2drTv1Sq2n97plU%2FMV5tbQ72bb%2FLKjEEEpkonw01zfReX2zfv9FYQHQwiZtNbuIzeO32xjf44aQOIaKv4anGKzetQ43h0TLo5F%2BzYft3vMz064oGsXuYiZlg4ZpM8XkWQcDJXO1KjTI4vp%2FX2kh4flv30nMnvd1ylaFD%2B32%2FZfUf%2B%2FaqxUI42fc62DApnsiSKBJtjz%2BpjFjKJeRbM7nQYp%2BVQA6WrHVEeYeGGCFIYtu8wHuDy7kcH3R0f%2B6zHCESt9GYc2aocLKLHTxFqR9sNktq19kJA3vOT5%2B8zCAu7HNBjqkAWBs6d3tufr1T1SDl5fpH8T%2FGB%2BL05jldQBaEoBNphlA06q64pnZ4Hu2NSTY8mtH84YyfMiylTFkQvHmi7qDrWlWKnsTTTqLFDYQc1TIjtNoXwxPTImTox9x0a8srjoi7cqx582IBkU0VnaAg2FYrYz%2FRTDypsDLOGKN684YP7Azs58MXyDqLi41NrTtnhkrCE9yuFMuqc6VqT6gt6%2FAOglaE3Qm&X-Amz-Signature=cab3610f23c4062ea922a82164c39b44ebf4f97bf4c07d90ece9044d89846415&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZUNOQBP%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQDU0pb7CWzKg1eiZdNdSXIrU0xd73nK%2FbqZZZEqLFU3sAIhAMP11r2Lwe9T%2FV32WBErGIQKrAlva2O%2FI4LGUmZ2I%2BwXKv8DCAIQABoMNjM3NDIzMTgzODA1IgwLyQHBgvPAdtVDxBMq3AN4daVWYf6i7Gsew%2BeIetFapc%2BaopDehCeyZOhNiIFCcnVmp5MTHHXGK4sL%2Fo7fy%2BbixtpiuTVkFhdPWTnHVBX5hjn%2BQYxY0sIA1YS6gLJAfViriHrK%2BD4WWpwteQU1IGmqxKXuYa9%2Bzi6l3WRjzVoSgxtX7nb1OQEOcSSLQGOGFv%2Fv%2FireB8bN7O76uEjR6jRlWvxVJFQqmeKlsi5TJxbDauWCBV4pnZPqEtzS9Maz2aOQ2mrAtFsTvMOjMBNJwftoD5D5q1rYysF2kS6%2BBQPb7QBStyan98zWd1SVyH6L8PUZ%2BzYI01H1%2FCJWd9djhY%2FHMekrBHSnhiPsjVDxS0ATC2drTv1Sq2n97plU%2FMV5tbQ72bb%2FLKjEEEpkonw01zfReX2zfv9FYQHQwiZtNbuIzeO32xjf44aQOIaKv4anGKzetQ43h0TLo5F%2BzYft3vMz064oGsXuYiZlg4ZpM8XkWQcDJXO1KjTI4vp%2FX2kh4flv30nMnvd1ylaFD%2B32%2FZfUf%2B%2FaqxUI42fc62DApnsiSKBJtjz%2BpjFjKJeRbM7nQYp%2BVQA6WrHVEeYeGGCFIYtu8wHuDy7kcH3R0f%2B6zHCESt9GYc2aocLKLHTxFqR9sNktq19kJA3vOT5%2B8zCAu7HNBjqkAWBs6d3tufr1T1SDl5fpH8T%2FGB%2BL05jldQBaEoBNphlA06q64pnZ4Hu2NSTY8mtH84YyfMiylTFkQvHmi7qDrWlWKnsTTTqLFDYQc1TIjtNoXwxPTImTox9x0a8srjoi7cqx582IBkU0VnaAg2FYrYz%2FRTDypsDLOGKN684YP7Azs58MXyDqLi41NrTtnhkrCE9yuFMuqc6VqT6gt6%2FAOglaE3Qm&X-Amz-Signature=cab3610f23c4062ea922a82164c39b44ebf4f97bf4c07d90ece9044d89846415&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDPKEFN3%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T181513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCXVzLXdlc3QtMiJIMEYCIQCz87rHrOxaAlvowiCfGuv8vLR3xiniwbUsmInpvkU9JwIhANvIvX02uWNqMT2UFj6of0xzduoHXXdBaVqED6%2BkF4OQKv8DCAIQABoMNjM3NDIzMTgzODA1IgwlhIjkVoI4rfB3YJYq3AOW29yJHwgMpOiaVnaQORd1U%2Bzl1wgP6rEwJ1202UEhRXSDXWf69TGsNCwfEeZikNPRRRpIHEpt0AEfXcTCpIbJUccnTAg5FUJiyJAIXBLhhTDNSveMWSK58qGhpsqK%2B99qpqLRncqgxnxpi2QcjuwABse9KZfSFluY1S4I%2BHeVDj%2FoL12yg6W1V4CdHorlsy4fPLb2yej702muh4A%2BbNWEzg5MtZ6PPMV1gA8iJ1yFx3N2zlZdi9cyVCXtkwrfcDN%2Fmp9veeqDZQxiRAEmVCVi8HA6gB24eEoEcsNwzU%2FRvyXIiKO6NVzcIPB0sW2We7ICkt4TfFYKo7ecrp0gm%2FDYWEw2ecklEeybwzE7ULpI3rBx8lRvGj6vQnomqpIzrQ2VErL0avdQO179q2B1CX2FDU870V%2FOREBd9493L4HWvmJHmWeWi2KdnepWOD3ScvLptkI4FdE8f34Jr38SfpTlRTy3iH0NrRKZiNMBGdI0GrYMdErLntBedofMxuGjcGb4r%2BtitFrUxsYaIebkOPloJC6jDLuf605dqrzGmiRDKvkVPu8QoxyFYVrDrXrzlm4CR8s%2BGuFw%2FFN3t7SkiTPx77irnOi3WNNDxofaqAd7FrkCGxEbVUXWwuFq7jDGu7HNBjqkAZi%2BAuU1SWJoa6fZLBQ%2FrTJYJAjtnj%2BTJT8mlSCV6LQiPufXSepkB83WSw96ZjKEoJyLyMDr3yY5OuNVEDQnFEgtJkdZgM5%2FtS1Sv2XHhejO25QZYTW8YVee1ZuDVTzvhpGWbp%2B2pSXMD8RH3cVF%2FhdcFR6dmxXAOXuYQcmxXLbtBPgKLd0jUWwhc1pejcSfFMwTOIeuagXIXI6RRrEd2tZ2iylz&X-Amz-Signature=446d09fc6cf5f479b43d64f0628c8efa6b995eedc03cb4e35c0adad6f52dc47e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

