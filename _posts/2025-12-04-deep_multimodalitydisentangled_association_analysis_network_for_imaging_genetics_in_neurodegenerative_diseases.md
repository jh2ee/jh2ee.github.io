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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3NYYNGY%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICvDlMxD1Zvg0nE4VFAvJvbnljXJMRuVgs0tPYAjBraKAiBDKm0%2Bdl2D7yUXV8VGbiP%2BMbcg%2Bl1Tb3qcODEyeM68ESr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMormonF1tZyoGWDy%2BKtwDLV2xbgSZ3XLkYl36q%2FDihiXQpPc1Q56XFec9MtbpmVOsvFuBG8MuLY5cG8R844OkzsvFuDOjQzoS1Ic3oiOxR%2FmDd11CpEn5RLqEaEeTa4y%2FPB9IKkY2HaE9yXm5226W0EchoxTaiPXS1DDRfnxJS4tkSaaXWjVfOcUUJMIxPkdsgRsWe4DOGQRQCAmDuAlkxK2dpJSoFL8rC%2Bvp%2F61ABMMiA%2F1sJ8awneF7UZ4aRy5SmtzTzvyTOB8pJSODSy6Gs6jsR4roLiOCFx%2BQwnYoW7L9MI%2BFC6aVK1VsSmBYEUVocOCW4DtLTkV5nHb2IfCPw4OLUvhOZKxMckfaHWX%2FnL6T6tKP746%2BwY2hxeSThuSSg%2FkvN2wvzNZear5WPoW0nJllnLl8npRe7usevPAo1sDowbqn9Aokdoj51UUh3dyc3i43sWYSbVhVAwTm2NeS2R3Scs5J4LW1vBPZpVkeTGrS4lXu%2FwfdHhPo%2BzdBQqMMQGqm0wWfYxlXzReO74Lf%2FSfSUJVduoDsl%2FffsWqoVgErAd43DdoaxofKPDY%2FP8tmkjp3F8jzbVpzImrcbijky44EVau0FzZPXahYi5L4Q18iMuvEJSFhBrW3JpwFpRYzGOOohXoZSJpRQ7Ew4uvKzQY6pgHPgI1HZ0AInHor%2BPR%2BR0qfKOgkIu2BaZy7SFPTi6FyX3SgF8D%2BJ9CgU504NtiPjFt4lzh7bmZjaGDmRJGjcSNs71dOf71%2BiZl8kxmiUp39dKQpV0FAxkC%2BJz9%2B5KR4%2F2jj8AMpZo7GgPXORsj71etxfs6cEROEf10Gta%2BOLogEegE9HcylCToK9qCHow%2FcpXLj3GNUq4LY3BEg58NH3%2B7geiapl4uE&X-Amz-Signature=1edd1067a84cfde4f4156c59382915e8d49408f17a3638c4f36806b62d159829&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3NYYNGY%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICvDlMxD1Zvg0nE4VFAvJvbnljXJMRuVgs0tPYAjBraKAiBDKm0%2Bdl2D7yUXV8VGbiP%2BMbcg%2Bl1Tb3qcODEyeM68ESr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMormonF1tZyoGWDy%2BKtwDLV2xbgSZ3XLkYl36q%2FDihiXQpPc1Q56XFec9MtbpmVOsvFuBG8MuLY5cG8R844OkzsvFuDOjQzoS1Ic3oiOxR%2FmDd11CpEn5RLqEaEeTa4y%2FPB9IKkY2HaE9yXm5226W0EchoxTaiPXS1DDRfnxJS4tkSaaXWjVfOcUUJMIxPkdsgRsWe4DOGQRQCAmDuAlkxK2dpJSoFL8rC%2Bvp%2F61ABMMiA%2F1sJ8awneF7UZ4aRy5SmtzTzvyTOB8pJSODSy6Gs6jsR4roLiOCFx%2BQwnYoW7L9MI%2BFC6aVK1VsSmBYEUVocOCW4DtLTkV5nHb2IfCPw4OLUvhOZKxMckfaHWX%2FnL6T6tKP746%2BwY2hxeSThuSSg%2FkvN2wvzNZear5WPoW0nJllnLl8npRe7usevPAo1sDowbqn9Aokdoj51UUh3dyc3i43sWYSbVhVAwTm2NeS2R3Scs5J4LW1vBPZpVkeTGrS4lXu%2FwfdHhPo%2BzdBQqMMQGqm0wWfYxlXzReO74Lf%2FSfSUJVduoDsl%2FffsWqoVgErAd43DdoaxofKPDY%2FP8tmkjp3F8jzbVpzImrcbijky44EVau0FzZPXahYi5L4Q18iMuvEJSFhBrW3JpwFpRYzGOOohXoZSJpRQ7Ew4uvKzQY6pgHPgI1HZ0AInHor%2BPR%2BR0qfKOgkIu2BaZy7SFPTi6FyX3SgF8D%2BJ9CgU504NtiPjFt4lzh7bmZjaGDmRJGjcSNs71dOf71%2BiZl8kxmiUp39dKQpV0FAxkC%2BJz9%2B5KR4%2F2jj8AMpZo7GgPXORsj71etxfs6cEROEf10Gta%2BOLogEegE9HcylCToK9qCHow%2FcpXLj3GNUq4LY3BEg58NH3%2B7geiapl4uE&X-Amz-Signature=1edd1067a84cfde4f4156c59382915e8d49408f17a3638c4f36806b62d159829&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LBOCZPE%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDIUw1akKzTBE9q3O1kPk6YG0k8olgSUwe83F1pageIWAIgH1OCfdvAb3Fma0Q2uK1PzKnXsBHJ57hgNSzXCiOEXrUq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDBaNntLAgS6PFPnriyrcA3sxl1aQh9f79PAEYdL1%2BqPE5oVcJWEe%2F8VdElQCeRJ4dde4zfh%2B%2BGPIMfXCB8%2FW%2BVSjzn3wmexdtOnyB2zRsNb%2FwbDl1%2FvzieBTBLsIqM1IGarlNHu6tE%2Ff98UApqSC3QlESN7G%2Ban%2FJ1%2BDZOBnt80S4JnrLhXN8xOoum3j09pOjPFScFKeGwcm1d1Ok4bCo5hm1hUX8LhUnkjZqU4uSzu7FpfC36Q%2FW7VvTYURn6OFin2amh3eAxGHurFbOt6XWKywCeEeIzk0xkZaq2epfHNepsmHchilpYAKTJeRM%2Fi0yhuHYWOL2zdIhJ%2FqCUaflDEeR9YBcqSpeIdHpWSuLlr82qXr3CAYNaPGntNY%2BMD4bRrIkDn%2B22eqWMs3og6yHTA%2B2G9aYRhmulmOtT9eNJeJb1sYeJRSSZcWmAuyNnPyw93Y8kzaQkBwhhkYFZmJrPoYP8IWHX3FgvyEBpas1KDmAtS9IUozvRGGSaUxAGtWwdxOcp4vqeb3Hi4e1T%2BaBFkdNkbSZPP1mDZkKcO%2BUgfjeVzCxxcDfuwnC3ZoqoTHbcFy7oI0UAQjIk5dfjh%2BoU4DlGG3VcB0e1rLs8EZ%2BzMVkLevdZRqECk2s1j4YchCb7WnZP5ZguqIOQweMLfrys0GOqUBDiBIHZ9e2sSzqcfO8s8LrfRZMjvpk4Z%2FlK%2B7Tjcr%2BqKmSExX40a6lALdcAh%2FfYA8ZvE67PKKrIxeY%2BlMlXN8%2FzBWlySYcSPtT39GnyzmrJjR%2F5ICY5JDq1zlOBKWK0lrm8anio0%2FAIxV5FzLY0gJ%2Fknf%2FaYP6g8LblDqvf0MYzkUbkSbmZBTX%2FktSHwcleEjx%2Fk63KptoRRTi3SA2xrBgOTLEE0U&X-Amz-Signature=202d0ab756ee75993092efd2c7ac1bc48f1db263b7c461d2533ee090bd2ff5aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UBKFPIT%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHCOZa28qf5uXTWnNa%2FyKMgUnqrNIT7JfDJvUkSnh5RDAiAjj98Jpr%2Bg1O1eqSSUhR%2F80guHRCigZ528OiS%2Fl4oUjSr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMjgNunspOMMwUCRRgKtwDZgaMKLKrTuQRlWHrXbyCreXRBK%2FqA5EROiVPH1wjfqLbrw9JjHoYatb%2FVMjI9ggDt492g66r%2F%2BkOxmQgsDIOfcMkrzqwz2wayfP0T7sanwBau7317aQVKQkiAbfHg1qiAUXlnKUvFEFCE9ri97eIKY%2Bzk%2Fez3bdTw%2Ba5Al403d51SOtLTadrWJaWv8ewdk7ynFzqm1oZ91LXrL4ZwWcNN7Qp3MUxrj5p6byNr7xgGLGmN3TzUCit5QXsAEJLjeB6lBQiffItgsEYbHha5s18mO4vfuar8Sd9yJpYUG9RSs1NHIIxdaugm3wVWd9bZ71Y2Uspfb3LHWxo%2B1jHjJMg6O98n8KxBtXoV26IZJItDRjztkWpCNjhI%2BMs1Vr1npADRo0FZb%2FPt7LZtDUOBaXDp0zzM6epnlfPoklE0bxhnfDDv0Ph9cEKcRK33XHfqVs%2FKbeaPS3lYQ%2FXisX2pALeGJas6aVEsIaVT0TF0unDBmD4%2FeNC26u0J89wbWezRsrWVZlPcS7X3svgq%2BlZXhsOB5N5Y0eGiaUjSO54vWYlfKegByKu5K0jm%2FJLZKa62FKKZeU0PgqAn9icDd99R4HVstnhTtwznr%2FMBobJ1iS7jRSPqL2Dzky55x9ZbzEwhu3KzQY6pgGR8vt9n%2BSTCdN3hBvxQN64KIQzNQkRGj7WMIaJ4DKDhUQ1gSozWv7DQdkj7GCbUv8WgMDq0H%2Fl1Z%2F0uDMrJLssD4sKQTsCHYxQdjJlW7Uki4ny%2BnfCYh0rqb%2BAcsfHOHr8VFP4lNtUdqf%2FxyHkLxyvoydjRh%2FfMvlGWrjn%2FmyiW%2Fn3JWjPYX6hqrSmY1RHJDvLvhtLfSI7XNX06YAHTjBAPFHxVaQP&X-Amz-Signature=954ad1a54d0a7309cb78095b0071d9ed975015aa03c31ef4a62bff632f3432b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UBKFPIT%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHCOZa28qf5uXTWnNa%2FyKMgUnqrNIT7JfDJvUkSnh5RDAiAjj98Jpr%2Bg1O1eqSSUhR%2F80guHRCigZ528OiS%2Fl4oUjSr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMjgNunspOMMwUCRRgKtwDZgaMKLKrTuQRlWHrXbyCreXRBK%2FqA5EROiVPH1wjfqLbrw9JjHoYatb%2FVMjI9ggDt492g66r%2F%2BkOxmQgsDIOfcMkrzqwz2wayfP0T7sanwBau7317aQVKQkiAbfHg1qiAUXlnKUvFEFCE9ri97eIKY%2Bzk%2Fez3bdTw%2Ba5Al403d51SOtLTadrWJaWv8ewdk7ynFzqm1oZ91LXrL4ZwWcNN7Qp3MUxrj5p6byNr7xgGLGmN3TzUCit5QXsAEJLjeB6lBQiffItgsEYbHha5s18mO4vfuar8Sd9yJpYUG9RSs1NHIIxdaugm3wVWd9bZ71Y2Uspfb3LHWxo%2B1jHjJMg6O98n8KxBtXoV26IZJItDRjztkWpCNjhI%2BMs1Vr1npADRo0FZb%2FPt7LZtDUOBaXDp0zzM6epnlfPoklE0bxhnfDDv0Ph9cEKcRK33XHfqVs%2FKbeaPS3lYQ%2FXisX2pALeGJas6aVEsIaVT0TF0unDBmD4%2FeNC26u0J89wbWezRsrWVZlPcS7X3svgq%2BlZXhsOB5N5Y0eGiaUjSO54vWYlfKegByKu5K0jm%2FJLZKa62FKKZeU0PgqAn9icDd99R4HVstnhTtwznr%2FMBobJ1iS7jRSPqL2Dzky55x9ZbzEwhu3KzQY6pgGR8vt9n%2BSTCdN3hBvxQN64KIQzNQkRGj7WMIaJ4DKDhUQ1gSozWv7DQdkj7GCbUv8WgMDq0H%2Fl1Z%2F0uDMrJLssD4sKQTsCHYxQdjJlW7Uki4ny%2BnfCYh0rqb%2BAcsfHOHr8VFP4lNtUdqf%2FxyHkLxyvoydjRh%2FfMvlGWrjn%2FmyiW%2Fn3JWjPYX6hqrSmY1RHJDvLvhtLfSI7XNX06YAHTjBAPFHxVaQP&X-Amz-Signature=1a95b46d2659ffd7c2d1d30f352c318141099ab4b64faa61e01ec52cf456238d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQMR3DOA%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFDVF3CELssXPXL1lb9THqpzOY69IWieK%2FCKBFz64x6BAiABIilttvUr6YJPpYPuRHeskIFzeTpTN9gXwUrmrej5ESr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIM2HsgGV8njiMugvJiKtwDnBo5XYL3fLOUukk%2B0e801Mw3tAQtWAzin%2FqSNouKlJS7Gz4UZlL0fyVTpi1fcaq17iSnAG3HMCXLSNK99kElfbGk%2Bbypax2iUTAnAYX6BbZEGhbikTEyApgrJGG8UUchd%2Bacdl5OoyzjnTuz4MSIRURIm7BF7Gv27DREzT4EyMmRBoTEmcdiD0yigjcAfqbwuQ7nZZIykqAs%2FMXyFL1d4Gu1A%2BxqjpRV2KLBXx8wDxEBX%2FVO0OpJYjPFqbzcGSRlOn6lQVWiafiwb7IL255zFB36vanAEHcaEPlcm8jXLo%2FitqedObzc%2FzV8QzNZSsz9q00bh8MmcNRFZxoIUyNa3EbXRwpbaTQkMvJ3wTKag68KoPMan%2F9BUzUh1hJ5jTaoRLik8%2B%2Fdp7pKWL13z%2B1E6QJqZcO41kG8auF%2Fg1OlObMFbZ97oUd3MFGIbfJWoIXwnVBLv1BQP5vd%2FyV1jmqMtD%2BuDce%2Fvll4eNxxAg8PSy9HzQr5FfTP050hJNCHHyCZ7K21YZVCAXmHQzhLx56%2FsfCbIBrt9AQcmkOV0T8XD%2B8kmSlbWvU44H9wa5GXi84shcIgE7fGMERecFM2kOWyDE1cIMthuwRCM8hWOTYvM%2BDrjfuctwMIMtF02vUwwOzKzQY6pgHlssgBeYAfkf%2BeDY2tc7UDEtfW4ZfpaXEh%2FJCWsHbfvxwXB%2FWl0O9b2XwAiYW0sI5iOnTqU1UYJQG%2BraApA%2BZqPPrXa1QX0%2Fn94408BMA58QdONPb6%2BBtFeuWhB2camDKX3DHVZf19hjAaBD2Y%2FBHOuco28VyQLSGNB2zJ6eNIeUsxkT4as4ZIwlFQCT5iqtutShheM%2Ff514NTI0iZBAQvgGqU1%2Ffg&X-Amz-Signature=c1b6b812e9ad94f2958f81709dc7ae78e902541bb6606755ffd95147cb4098c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIQJPNN6%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDTdadu04cuv4f1ypHhwJpowWD%2BGi4NK%2FYGMgD00UgykAiAYcz%2FsQjmqOdKq5E1zIrc9dy0aDxvCAFwgOsZKr275hyr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMJjE5aEzfdu0gud9lKtwDz3cgfGOBcITl9%2FHro6u%2BqA72t7LTjdUEicW%2FUck7SBofS3p6HtyezZlTieZ%2FC1qXxDLR7r4CqF9cqeBaYtas1zxgy07NefxzwF7j8vikzzqQvfpcV8Fdb3GPNdsbcGXy46xEO63VE1hzR0QK1ju3cDSYhUHLE2qOCBbzKMuvFnMIXlyZYXBEzxni96SwUtUYQfzgKdYaqNfJ6oZfGf5NtkwhB5OJOubRli9wSGBllwytE0xo13rPCE%2FmJ4SZcu091VmLqk2wcrRHWW3tZtyGWMCNtpJsTx4GtqViFRxE4OI1sU3db9pciKlKbbLeyKqousXQUbzKkRZqtJRSKYVsGP9ggVklhMI1919ueG2Dca5%2BBmxvYCYnom7CRui%2FfYVMeRMsDmVdvycwM%2FndI5zdoVuYkf6bZdueKpfMzqCuxPTr1NedLoG6dsLlkapyVK7xTwbGCkXEkBCBdPFLsphc2ZpKGmhmBk0V5r%2BLL3Bx23FH0xl5HrwBJV660ZCLCL%2B1l4q1nS41T%2FrunKfLWDjnX1ADLkfxA6vZBLFy8hE7YCdeH0n%2FqBe68%2BOuZMrhl58UBmQMP7Xso%2F61jTRsaSUI5X04mCp3eO%2FclpCDsx3r8URnQqw%2BeOKNZttbnqYwwezKzQY6pgG0kUs5WHoobqM6YTCBILFhQn9F6VDWaoON8aH3oDY4oFT0G7qupY0WCaxIOFhTILZykZOE8ykZchx%2BbuS5xrUD9H%2BmAwJw5IzFZbedrCC0I8Ch6ejGm1VaD57CRCqvt7MDzMxx0U8fEIiYk6Cf5OJBBMCHiMBlAALg4BlWO5VRDEqu0qnGfvY%2F0KxTzk6vTvROSkxW1qPxOn0jn74VdY%2BjiyIFJ2QI&X-Amz-Signature=1143ea43ca2ba303d31fc74434336d74e6da8d62695e2d7a967318abd96ce41f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOIHAOY5%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDakfOG5xSl29FwMw%2Fg0cihBmklXL4rgEm0kYnosIeMlAIhAIfryt38F7j96Bb%2BMV%2FPLAMgjimTTd%2F%2B2rIgw3KEXo1oKv8DCHYQABoMNjM3NDIzMTgzODA1Igz3arMAd9bFLCgd2dUq3AObf1Fn%2B%2BIaK%2BWew98DDPx%2FIXd7NmbQaE6rd6g38lYcP602cgnclXxYlNbQEoNDrZMYhA%2F%2BODDuuGHrq0lmz8G9HFmVbMsQwJ%2BLzyx72YNRqLO01%2Fdb0y3zNNzDkg5sH7yWGtTfLs8n40xFaH7o3c05XRDKFFqekwmyOgUAZzTi9v4AaOBLyDhP4awb94DO3E1HjiP3pbbCUUGXScAMbkHjNtIsj0tN25XkyE7TmHZyG3ywCaiWTOL3xk3DZQSbnUxOFEGsC%2BZ0n7lpH6SSPRrHB6vUj%2Bf69R31bHe2srh1WgIsN8fgZ91qX4m%2Ff4vFbdp9ZaCiwOlNzcw5XtNqsLyxP8a9n3flhPG4zssMBMCRXP0ORS%2B1c6Ry516TSWu7jQEi0rMfPmaDa%2Ffy%2BJ8KGVfn%2B6C%2BIW2pnj9n5R5mIJ0CtnHyPTxrwnSwFhON8WAmGXOcogd%2FshxHqtvTxWrVTNm973VMEN%2FRGRmIIq86fZZoXidgVuTGFoPD5CFEWcsWQBjMUJjmZK3IcNoE8ZKLrPViDIXqLs%2FZCoPUm5tl5hO%2B9W5p%2BYStXTywDuom79ReHucJHdag%2BVLvrh6PNCZK0uqFY0E%2F0f4X41OUQpZWDrwAuYnCtm8jv0EaGSvxPzCc68rNBjqkAWTgF4Er%2Bq%2BUJjKZMbOk7GFbK491oneY0JVrJDGY8TqBxu3vIr5jgks%2FcHzezLLb3c8xjFDn8eFTdPsnafz19LAqkOVfybg0ZKmSSan5xFdbRJ3kG4yr449cTizbXAyPUqbRiKM1K6Twa6GF0u3ZR0BPteOJzQkn0e6uQXcbBRhwzVykwFptUCzDeFbnJs3lDUPnix4u4Kr1NU84WbO%2BMCPprV%2FJ&X-Amz-Signature=61f07dd5e389662b7e0385f182d7d4f76c1aa48e71bf8734caf8db2b486fe8f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNDGUSRA%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAtwToVu2c1xVyruwT3DY6bKil65lPCbOHIuCXva19YAAiEAgFEGuXh0Fqsu0%2F9S1ThCbTrFTwJuTeTvImN6LsThS5Aq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDOx7I5kZcj130dOvNyrcAxYrFvTuinhM%2Fr0UraEECZlb%2BVsddwy%2FNT9GUaOudAIa8wu6KFHypukhIwGKAAbASuyCn31llwKDYw%2BU95WWu9xO9HwVxdQr919%2B9EOPYOSm%2FaJOM%2B0kbj39P5nY8e%2FLN93w%2BwpnOOA%2FdTfInfKhrzSEwpePDA0%2BkX%2BFV9If6tzeAfVXhX4hR9zS042hJODsSVDLwcEsjyj0vd21%2FLRIctQPW%2BaPa8ExDPLQpHkbtLxR4GiudpaOudWsk8ism9YlYzYS46SylEI6nBER4WRkCAm2sqRILUjM7PnDvJ5qPMaZHx4GxJf51KmkLjtJAu64d2lj0%2F8LRMf3pGG5%2FMGuvWioRqtIzuiY7aZC2l5rLHc1LNqbMOuBNU94Oy41na%2FgGVqYc0uC%2FGjf%2Frj%2FypK4d%2Fs6DPj%2F581epbNopXHtK%2BJX1runVBRr4isqcoEFCdUkgrd7ezwOY0fr4KUsJ5SOlGaAxaWMvGW1DVWcaJxD8ofSf8I8I6vPoV9FBKMOte9fG3JpIwzfwaFjJey6SxTU%2F06fFvnox%2BhB2oQHR%2FHgQ3%2F1wu%2F2mkgrKHQnAZWW2kBaEUlnmseKBhKx8Xk9ZyJAmmMUVRxfU4WVvIaKCBE9drTp%2BFsZZYDX1e%2FU21xCMLzrys0GOqUB5cPU9oCbAVn3idnpkz5xFEQSocbHlDeBQdNubA6uki8rYLYC5eskB0tCUBzdtz9QDK0PhvBsn8NXdzdCp11CcTjM3q2XoPbbnIadVhdr0rPcrT4ASs4ghQfqzPoZUhis3qQYzNkdgd62sJqW81MWwOg8ZZeN25YT9DokPXEufBny%2Btjm2sNvDafrL8msKrl6jNnjP%2B%2FGrCvw9Rc3LD5ommffter1&X-Amz-Signature=72ee64daba61a1d1e0093a8efc97e86e68260e5d585b38256b6e41efc0150d99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNDGUSRA%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAtwToVu2c1xVyruwT3DY6bKil65lPCbOHIuCXva19YAAiEAgFEGuXh0Fqsu0%2F9S1ThCbTrFTwJuTeTvImN6LsThS5Aq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDOx7I5kZcj130dOvNyrcAxYrFvTuinhM%2Fr0UraEECZlb%2BVsddwy%2FNT9GUaOudAIa8wu6KFHypukhIwGKAAbASuyCn31llwKDYw%2BU95WWu9xO9HwVxdQr919%2B9EOPYOSm%2FaJOM%2B0kbj39P5nY8e%2FLN93w%2BwpnOOA%2FdTfInfKhrzSEwpePDA0%2BkX%2BFV9If6tzeAfVXhX4hR9zS042hJODsSVDLwcEsjyj0vd21%2FLRIctQPW%2BaPa8ExDPLQpHkbtLxR4GiudpaOudWsk8ism9YlYzYS46SylEI6nBER4WRkCAm2sqRILUjM7PnDvJ5qPMaZHx4GxJf51KmkLjtJAu64d2lj0%2F8LRMf3pGG5%2FMGuvWioRqtIzuiY7aZC2l5rLHc1LNqbMOuBNU94Oy41na%2FgGVqYc0uC%2FGjf%2Frj%2FypK4d%2Fs6DPj%2F581epbNopXHtK%2BJX1runVBRr4isqcoEFCdUkgrd7ezwOY0fr4KUsJ5SOlGaAxaWMvGW1DVWcaJxD8ofSf8I8I6vPoV9FBKMOte9fG3JpIwzfwaFjJey6SxTU%2F06fFvnox%2BhB2oQHR%2FHgQ3%2F1wu%2F2mkgrKHQnAZWW2kBaEUlnmseKBhKx8Xk9ZyJAmmMUVRxfU4WVvIaKCBE9drTp%2BFsZZYDX1e%2FU21xCMLzrys0GOqUB5cPU9oCbAVn3idnpkz5xFEQSocbHlDeBQdNubA6uki8rYLYC5eskB0tCUBzdtz9QDK0PhvBsn8NXdzdCp11CcTjM3q2XoPbbnIadVhdr0rPcrT4ASs4ghQfqzPoZUhis3qQYzNkdgd62sJqW81MWwOg8ZZeN25YT9DokPXEufBny%2Btjm2sNvDafrL8msKrl6jNnjP%2B%2FGrCvw9Rc3LD5ommffter1&X-Amz-Signature=b8d17e443973d5afd14f287c3bb4a206f4cb6d09b689b67d68a8171c1dfbc801&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTRDR7LP%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC%2F1l8uE05V5jaTFz979GejCNcD7CKCDDNP1PMz%2BBQ52AiEAtCh2vcwBnBr%2BuDb%2FjcJ9SJGKjsN%2B4yuszJTkqhHzC5Qq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDIHFheVU3bH3eI9NpircAywUtHdYSfSSDLmlr7p0G8wpo3d06o39T337m3%2B2%2BzYbuYdJFAJqMBxdbdWNBREfAn2KmIInXEtzH5WnQfs%2BH2c6VhgGswPpr76vK%2BF4P7kOzrPYmsFlFH9sBD80LEEF9B%2FuaRw4HctAvwL8%2FXnEpaDro53gbipNQP8cvOfCPOZlyFOp605LrKyINzJi1IQFp0qvqNVOE0gjnJr7CIkqzPFK31mL%2BXpxX2oW6kVMXUwSECXkMjTSzMOj%2FlrCoOLSaza6z%2FzWraNQrS4cmeOTuhNwsr41is4kIFDtcNiyk%2BUsKiYSwTdcEcO2PNrHNHqrVa6x9MZPjRq5tK1RlAp7g1o9dmGUIJpyzNbZtiFTjAoVl9afCRI133LL1r8ZzWfvhbNTh1l4HVFkksMO%2Bgm%2BoBifGXTqrwuhc%2BhnheIcoWomd%2F6%2FxgNw78KlmUR2Ab3OFJ03Gh28RGPmmQ%2F7CQmR7r%2FG2gkGSWLPICq9bkgpyxC8PlXl%2FfdGyPwgJ1jor%2FnnyrtTxtQesDY3LK68W4dThIein7mWkV9GqTSEZrARKuA6%2Bp2NgfYZhreEkywFPYqMP1brv1AEmUipZRGfkpl6No1QKQSYaNdR74XKSMskh8uqzEFk1%2FHdjICfIv1eMLvrys0GOqUB3VIrt%2FYbT4XFrbESDIhhQsbN5biXaNZsNLXsX6%2F3rNB1J%2BelZfl8g9hKxVP0HKW4Hh%2FPYp86uMTwf42oKTivSazFpb69ssT%2FCl%2FA38KL9V8dvjeoidlSSms9c8R8%2FLc9ljuy1LXmYtoSohT%2BGC0dhDuPxvhSWcrW74odd0Trvs4pgqm%2FKpSO7nfzZH9AaMrRDptp1x8%2BjiH6UxbZn8XPqDFpu1Ys&X-Amz-Signature=acca8bbc15ab06b9def87777b9d63085a997c4fdaf44fb16c552040c2bc5a9bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVWCEHTX%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID1aghKo%2B4TGhEO83XNhKUBOYWr2ljUX1%2Bo25hOqJQ3aAiB%2FWAm6WtyXJlDTEyc%2F3Yakf0svNg0Z%2BhApF63ZHJfNxir%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIM1apnN1zQP1tjvwB2KtwDwlz1uhSMSGG2qDBbQgN5R1K7ZtuyWJLGAGBz6jOCVfJneNLKu9bIBh5K32uAEtUBpJRpyxyVgcEFGEseyfZ%2BZOuCqKX0lGofZkTMWqrVFoDlIIZiTHSUb5VlqjhFGlULV3p4zco%2BzAOf8HqLlcc7yNZZxrLHpAYfvGJ7zRdeQOfN5OzOaK2Oe75093Ix6DNWMF89hZQvB5YENJ0nvYZzJcxW55mduwBhN0%2BXqVRny9zOuLkokSjMxWxZeQEYFrTuyqsdLpu8ENhMQ6oOsTdl63bAdWUll1xn89S%2F7PgdF0y61f3CRC2K62cwWum8h44JOKYCyarmBQbXSMbdzPipnRIlM1nLRvnTK7PP9A%2B%2B%2BrmlAO6eJG%2Fj1PhuJh7vArTFIOzPHo%2BpQYZe7nexU2DY5qbulofWMLlM5AE%2Bcv1Tvnq1GrHgkOH1z0xAjoaNimsb6AL9M5R8HOkqpuOx8BGa1Yk03pc8Jp5CAHZVku0Aob5LVWYPzAVapjFyy3YyRLgKtee8F5RYtBS2HI1XuJrnP2PPcwjghpp3RgCVpV2CMUUr8%2BXLnSIyZG2fkuBf3Vv9HXdnKT8TRa%2F6aeo%2BxNJJD2mew2rGkHm7vQlGjODWjlEhY5eG35V%2FCX7Cldcw9ezKzQY6pgHF500uRJBjwtNQWXbUpI5XEPy3cXW2K%2B0Y6PU50FokO33yiRlVy%2FeeikhvldPSU9R4WIGQ5dvR3QLFeqcEPjoZQN0reX7RqgzUWgHzjtox7TWGzE6WM9Tmr6OsQ6L%2FklEE2IZ7kPJ%2Bkf6qpluPBuB9VQ5KhE7TIyEQgxtnHIASFHhY3CPZ8L0bg06vSyDyEBFoXOx6tDhiGSEPVxj4LdaSxb1Pv0cD&X-Amz-Signature=0428e782eb47d5dd8fa4928097168d64b60f816804b21758d7dd83651c03e8e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVWCEHTX%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID1aghKo%2B4TGhEO83XNhKUBOYWr2ljUX1%2Bo25hOqJQ3aAiB%2FWAm6WtyXJlDTEyc%2F3Yakf0svNg0Z%2BhApF63ZHJfNxir%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIM1apnN1zQP1tjvwB2KtwDwlz1uhSMSGG2qDBbQgN5R1K7ZtuyWJLGAGBz6jOCVfJneNLKu9bIBh5K32uAEtUBpJRpyxyVgcEFGEseyfZ%2BZOuCqKX0lGofZkTMWqrVFoDlIIZiTHSUb5VlqjhFGlULV3p4zco%2BzAOf8HqLlcc7yNZZxrLHpAYfvGJ7zRdeQOfN5OzOaK2Oe75093Ix6DNWMF89hZQvB5YENJ0nvYZzJcxW55mduwBhN0%2BXqVRny9zOuLkokSjMxWxZeQEYFrTuyqsdLpu8ENhMQ6oOsTdl63bAdWUll1xn89S%2F7PgdF0y61f3CRC2K62cwWum8h44JOKYCyarmBQbXSMbdzPipnRIlM1nLRvnTK7PP9A%2B%2B%2BrmlAO6eJG%2Fj1PhuJh7vArTFIOzPHo%2BpQYZe7nexU2DY5qbulofWMLlM5AE%2Bcv1Tvnq1GrHgkOH1z0xAjoaNimsb6AL9M5R8HOkqpuOx8BGa1Yk03pc8Jp5CAHZVku0Aob5LVWYPzAVapjFyy3YyRLgKtee8F5RYtBS2HI1XuJrnP2PPcwjghpp3RgCVpV2CMUUr8%2BXLnSIyZG2fkuBf3Vv9HXdnKT8TRa%2F6aeo%2BxNJJD2mew2rGkHm7vQlGjODWjlEhY5eG35V%2FCX7Cldcw9ezKzQY6pgHF500uRJBjwtNQWXbUpI5XEPy3cXW2K%2B0Y6PU50FokO33yiRlVy%2FeeikhvldPSU9R4WIGQ5dvR3QLFeqcEPjoZQN0reX7RqgzUWgHzjtox7TWGzE6WM9Tmr6OsQ6L%2FklEE2IZ7kPJ%2Bkf6qpluPBuB9VQ5KhE7TIyEQgxtnHIASFHhY3CPZ8L0bg06vSyDyEBFoXOx6tDhiGSEPVxj4LdaSxb1Pv0cD&X-Amz-Signature=0428e782eb47d5dd8fa4928097168d64b60f816804b21758d7dd83651c03e8e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WIEAHDQ%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T135256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCBBn0RG0skd2DM0TFCOZUQkpXXq%2Fitj6jpm3rjpDca8AIgbwiV2GuAHW4Pnu3a1dr0E23vXSIJRseEOml756F2LOsq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDBCsBbqrXUb1gRDUTSrcA4wHFuFSfhdjTX%2BkHCwtJDaG%2BQb%2BL33dkVNceqqtv4%2FdPdT0gpkj2HU3idCX%2BjqZ2avcxbwSmRu2xwejJrHh4ILvbk1i7QMDUOO%2Faga9joNq6PKRAtUFgd0S0QrlP6NZ1zi9EPkS7BpiXNBJgigr4wIf2Arnjei%2BXjNyKUnkx09iNMI%2BONspJE35gYLgxVdqW%2BMauw2MQH%2FgFu5wMFYERZDEO6GjoUcPy34Lw6lUWq2VgKygne0Px6exAiO4bsl48b%2BPAcBtJPgs5BouYbrxMmSPH9GH99DF86NKe1mFxjTNrD3iXvkc5K7eVbBbX3OlRkXmpqtvIFHj2lUX%2BJxWSITbLNQkebZ%2FiXbMxZRJZ0QzfaG5Mq%2FnD0sta7%2BZEvcVty2hPii%2BfLdmkN6HI2h7Zzt1SmkAVOhQ0GzaC%2F9D6xq%2FpQzV8mKNhAUgBq5ddGNL9TCh3VTyUdw8kh5QF5%2Fi3f%2FnlrPKTeF%2BrUR%2BZ08%2FaDhCdn9eeQfg9wWl763lMdKL0zy%2FXEMZoKwZYn%2BLKUQC4tC6Zuw8%2B9zV%2B9%2FPFt%2FvsHFSfjZ2TKna41KrJ5IOhu7%2FrTaSpr2%2FL%2FMG54%2Bhek%2F3WY93OdcIYAUMsQI1EFyHj6VVXrYLR8%2FvOcX2ICglMKDsys0GOqUB4DtfueWs4554RBYvR5QXeeFxYx4GqhtR0MmTu8nXjmdWBqkDxgJ4ryOQGSJ3sKRfE%2FsbiXoZU6zcmzg6l4DVZsNlXC4XoBz6UUZfD5v71uD7%2BphEAVI0eKl4c2uGtvYV6ojgl3CCz9JV5jr5%2F0iYsaNTqpXI%2FZ38fpRsWah98jm52SLAvfMW8flkSfZ%2ByuSfau5ZsSs4OzPZeai9lCwzbutyDOrc&X-Amz-Signature=d9d89e865756d728eefcf29505917f486c54c7b9d51f6af731c2b7366f654d84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

