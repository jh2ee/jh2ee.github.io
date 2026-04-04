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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AQ4YBWL%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEdK55iRpwQIvLMslswdxXhTCt7K%2BAD24ZsbdWu2Il2GAiEAt6757C%2FTw%2BAECZXwSDnaNfzj8MoFtSOMme1fXck5Xk4qiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDLiPxtZ8H930giK6ircA1XL0iL%2FRZUzdyYS8%2Bnb1Dx0aFBG1%2BFQKz1u8gk%2BrhFJgcMPGbcjI3yC2NewEKCIMpQBadZg5bDibNPSyJI5lOwbIB66Pc7eeueYz0hcAKj36S07WHBCCuq0Bnaaplxca9Xz3P6Y1y0u%2BdaHtJkPI%2FXcI7aWzRx%2BKfnojPNvw%2FoMfwVAlUIGrOC%2BIDb0aOvnyqwGN2tHebyMqVfLRDpIpcbPKzTdPz0pPWW6vNcIeLTE4Hraezcpe2TbmR%2FoR82jg3FxagQpupW8THWTBiKceoeLdqq2SxvA%2B2E9r8RzeT8KQjhHjSCLNewo6yOjmeZiuUbsnGY9Spmbfd5yrwGj6d96YGtY74Kf3B0gbQXeqKR4yBZAMiAk4cN5cUbcf2Z8dB9PE2%2B8%2FSB9zjfQIDCr%2BlXv%2BtW%2FfB%2BiHID3svHCp1XdR23znh1Q4dgW61I%2BSwvZpTJUmqnWIKMNkjiMrtgIi5mjmlw4xWXJChGqVwlCYtbSLXHblbo55e6JMIs4O19nuzsKNjuTu8BB85RDaX9XoP%2B3zXILnyvCqX6VCDcd1pBoFH0%2FXQaGrZMJi78xrdRjmEBp09xDzPOwc5xRHTRNlk5x5ORyokT9shJkH1ZRk6PTbdXgQqTBl%2FJ9bfokMNCcw84GOqUBxIsaaRk7%2F%2FAAUSRr0%2F1qX9xfv2OojU%2BwNtqSbZuSsngEjhkvxLJ1mp84cs8lCW6b0MrjKgCUuz7ES2We%2F%2Bll1s%2FuoP6TBgKWswzfyZ1V6uFxNO%2BZNobi1Sr6Y7IXU3o8dEvR4n9sPDqNpj4u4mVjuyYq30omf%2FYkS59rTBz6Xj6s9CueGsOZZAVh90mFuPT1etf0Iaz0LxANtubWMe%2BU4NNmqJ7m&X-Amz-Signature=68af03be6467771ca0a287b8d93ba2fc18a1b6b4f1268024349920f5fdb3086b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AQ4YBWL%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEdK55iRpwQIvLMslswdxXhTCt7K%2BAD24ZsbdWu2Il2GAiEAt6757C%2FTw%2BAECZXwSDnaNfzj8MoFtSOMme1fXck5Xk4qiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDLiPxtZ8H930giK6ircA1XL0iL%2FRZUzdyYS8%2Bnb1Dx0aFBG1%2BFQKz1u8gk%2BrhFJgcMPGbcjI3yC2NewEKCIMpQBadZg5bDibNPSyJI5lOwbIB66Pc7eeueYz0hcAKj36S07WHBCCuq0Bnaaplxca9Xz3P6Y1y0u%2BdaHtJkPI%2FXcI7aWzRx%2BKfnojPNvw%2FoMfwVAlUIGrOC%2BIDb0aOvnyqwGN2tHebyMqVfLRDpIpcbPKzTdPz0pPWW6vNcIeLTE4Hraezcpe2TbmR%2FoR82jg3FxagQpupW8THWTBiKceoeLdqq2SxvA%2B2E9r8RzeT8KQjhHjSCLNewo6yOjmeZiuUbsnGY9Spmbfd5yrwGj6d96YGtY74Kf3B0gbQXeqKR4yBZAMiAk4cN5cUbcf2Z8dB9PE2%2B8%2FSB9zjfQIDCr%2BlXv%2BtW%2FfB%2BiHID3svHCp1XdR23znh1Q4dgW61I%2BSwvZpTJUmqnWIKMNkjiMrtgIi5mjmlw4xWXJChGqVwlCYtbSLXHblbo55e6JMIs4O19nuzsKNjuTu8BB85RDaX9XoP%2B3zXILnyvCqX6VCDcd1pBoFH0%2FXQaGrZMJi78xrdRjmEBp09xDzPOwc5xRHTRNlk5x5ORyokT9shJkH1ZRk6PTbdXgQqTBl%2FJ9bfokMNCcw84GOqUBxIsaaRk7%2F%2FAAUSRr0%2F1qX9xfv2OojU%2BwNtqSbZuSsngEjhkvxLJ1mp84cs8lCW6b0MrjKgCUuz7ES2We%2F%2Bll1s%2FuoP6TBgKWswzfyZ1V6uFxNO%2BZNobi1Sr6Y7IXU3o8dEvR4n9sPDqNpj4u4mVjuyYq30omf%2FYkS59rTBz6Xj6s9CueGsOZZAVh90mFuPT1etf0Iaz0LxANtubWMe%2BU4NNmqJ7m&X-Amz-Signature=68af03be6467771ca0a287b8d93ba2fc18a1b6b4f1268024349920f5fdb3086b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2XZ73F5%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDYHu4sy0eDG98ZdlRvaM2F8PuDyGOi8ko6Rm9s3oZb3AIhAKR64W79pR0U9rJaZn%2BYQ6xYTZK2kL1QLauEM4WP8CK3KogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyH5DMQDU9z%2FkJvXawq3AOZOAubPcGs6O1YvZ3G7hEpx%2BAuI6oIp0U5Q5qm62560zssLJbPq08NTO2lSO1kdSP9Y2IdWmUq0sUp9r5Rkk4pT0gy3JtymSsikfhDnzdtsHpOubfLKHUEBxerRQiCR3cbLGO%2FMDvQtv%2BGyflvMyvVfoHPlaMp7KVEl9R2HuKx4iVhTnzO3xUqbl%2BOC2KBl7G%2FW9QAm%2BygUBtI6FHsv3HaB8EjS%2BO67vMgW8W0r%2FLnJSuGSP95dKGD7w%2BTdo61lZSVFLimSKLUQnQiggwE7pcchT4%2BlmvWyKt0i74v9WjC0IiqcmppBDX9sOAPjC%2FQzY960nvdhcywrWTcOjIQRGp5TGZh74uH5I55Li693lHBPwX0it8X4DAlt6heVgkOmZtNBnIgiTisFKdkQEL3CgLicHm07WG1RNF%2BHfD61HYB8aM%2FJ1ad5T1D29jnxErnB9TZ8YbKf4DutxWJrPeF0SaUSRPfI9wv%2BfAaa6fSKbHJMLe1fXGWzDMdDnLwK2%2BnXvDUebWQA9cmBftPPYQ3E3piPiiCkydkrTXsJYTShUrx1wbHcW%2B1T3obZL%2BCHhQPJANzJzYslC2EZvfKD%2BXibu%2FyVWWY5VbA4XEYKepHcKIjSDohUxsK8AcZKY0WWjClnsPOBjqkAecDADyBUdYYZ4joI%2Ba7NEjgcTIa0KtZfuGsXvdPpzzMOTd%2Btf77QdV7q9CvDS3YEifCiftF9%2BTenPGuGVNKmfAn%2BqcioSkAFtOWCEi1j0QhNGBObzDmv6LYz4C4VAF4xYitoAxiglapFFBMPTvqG9jovheWx1TncZb8Dosr8L3OYg2Aw1Ma6F6oB6nO%2FORx%2F9lmXVf6IWLnDWLdpmb52uaZpj%2Bl&X-Amz-Signature=e7f040955a150726579f53d30d005adbd86ae4776d35b8d643568ed866c06027&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZAEJ25B%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZY3kQNOpoHCeayVu3KtsiF9iZcrSvzngqabGLTySfWwIhAM0t1vMbYJyxwHhps%2BGimDrNmlT2JMr2Jrz13lrFJUtRKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyPg9TiuQYlAYRo6cMq3ANMtZQeiJ77oMCswvDZCnik9kA7Z%2FXflMy2W5D8E0MvtJnoPxqTfH137px%2B6Sm0I%2BRStCVbO%2FzAY49cYyBjCChsTSW9Lw2%2Br05bcG3lecTLSoFfjs8SVEclKdHY6qwxfOJvrKbEUiW21LExMLZE1uyU8XDNk30nmiOLAxD%2B5e5cagpKUkAfd4XL2dYTl6Ct6Mo5mHw4bT%2FhOYLKQ5Ryxoi%2BqR%2Bd%2FB1oM6j8oe1GtzZ%2BUCBskoy8KL1wugkJCA%2B%2FhUCFd8MEpPXvWz0V5zkuHT0R3NZyBRjYjYr2CS4LxczjHfW5pNNzoNDRTLGkXx9kIaaomZov7HC0lGOAR%2BDYT7IFhEOu4Jl%2FD0Yoo2I%2Fywv1mzeW1E3trrVGDu%2BvbfGtDt%2BG3KG1pcd6Lk7wa4NvTrAax70fsa7J%2BWMJNhrX5F2laHiqwIvHLL6b34FbpRLX6u2p6pehBe2xp2uXNgRzMz80zS0Ssp%2FHC1pGAmn%2BsK0njRKxQcym7OWT9TbjYNSmKD3bZiWhykKs%2FiUeuYzpVOQI9Z97%2FgP3Vwl93rItKVJDCW0dn%2BDIRtnLm0pKI%2BOwvBbPiAXtQJHEB%2B9t4h1wqQfQgMX1zCGqwX05LaHeNTXmrxQvuSjwxPAdWwnuVjDenMPOBjqkAQ1BSi6nIelkZG%2BWKgkkTHwwkKe7aJyB5K2yNCGXJKw40IWoJVTzude1MSZOBXd9vJaZTJURJvmbLkL9N6h5phhwcbHvOPu%2FSVATqe0bfTiwCIE2rpv%2FclkTQEzIvwBdXaqXXZGVw9gmlGpJA%2BQeaQmZJY%2BCAgfSuX4Fz%2Bv7z0Nxf%2FS8ED55Vjmt2R3dzgKpwMuhSZERrHV6Xgijo5wQZkD%2FLlT1&X-Amz-Signature=13d98185c863ebc63b1fadd0379c0904fefafef1b6e2024d2bcd5c69086938a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZAEJ25B%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZY3kQNOpoHCeayVu3KtsiF9iZcrSvzngqabGLTySfWwIhAM0t1vMbYJyxwHhps%2BGimDrNmlT2JMr2Jrz13lrFJUtRKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyPg9TiuQYlAYRo6cMq3ANMtZQeiJ77oMCswvDZCnik9kA7Z%2FXflMy2W5D8E0MvtJnoPxqTfH137px%2B6Sm0I%2BRStCVbO%2FzAY49cYyBjCChsTSW9Lw2%2Br05bcG3lecTLSoFfjs8SVEclKdHY6qwxfOJvrKbEUiW21LExMLZE1uyU8XDNk30nmiOLAxD%2B5e5cagpKUkAfd4XL2dYTl6Ct6Mo5mHw4bT%2FhOYLKQ5Ryxoi%2BqR%2Bd%2FB1oM6j8oe1GtzZ%2BUCBskoy8KL1wugkJCA%2B%2FhUCFd8MEpPXvWz0V5zkuHT0R3NZyBRjYjYr2CS4LxczjHfW5pNNzoNDRTLGkXx9kIaaomZov7HC0lGOAR%2BDYT7IFhEOu4Jl%2FD0Yoo2I%2Fywv1mzeW1E3trrVGDu%2BvbfGtDt%2BG3KG1pcd6Lk7wa4NvTrAax70fsa7J%2BWMJNhrX5F2laHiqwIvHLL6b34FbpRLX6u2p6pehBe2xp2uXNgRzMz80zS0Ssp%2FHC1pGAmn%2BsK0njRKxQcym7OWT9TbjYNSmKD3bZiWhykKs%2FiUeuYzpVOQI9Z97%2FgP3Vwl93rItKVJDCW0dn%2BDIRtnLm0pKI%2BOwvBbPiAXtQJHEB%2B9t4h1wqQfQgMX1zCGqwX05LaHeNTXmrxQvuSjwxPAdWwnuVjDenMPOBjqkAQ1BSi6nIelkZG%2BWKgkkTHwwkKe7aJyB5K2yNCGXJKw40IWoJVTzude1MSZOBXd9vJaZTJURJvmbLkL9N6h5phhwcbHvOPu%2FSVATqe0bfTiwCIE2rpv%2FclkTQEzIvwBdXaqXXZGVw9gmlGpJA%2BQeaQmZJY%2BCAgfSuX4Fz%2Bv7z0Nxf%2FS8ED55Vjmt2R3dzgKpwMuhSZERrHV6Xgijo5wQZkD%2FLlT1&X-Amz-Signature=ec21f901cfd1c1bc94973563394437639fd476a923bd5b0d9d9b5457c644e57f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFAYCOL7%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCtOgmkuvVu7VJ7aAkMXNBvz1DZZbz%2BoNJwov0%2FdkRM2gIhAMmfApq1gZmMGDfBZpz23lxx6ORMZZQKYxwVuUSJV54pKogECJv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyAePzuwt3uhGiDh%2Bkq3APuPBpIzrpzkYLEpp2Az672bCX0qAmmvk0SGAghn048Ld1VNoKkmDod%2FVo7RQh1%2F0SsxV7A85UVkIIL9Fc3PS2BGNO1nhNXiruuEJADL%2B%2FHrCjPZ05WJwU4AyEp7rlRrOY4mNjkhK3RS0OLIiv%2F2Zu2qsIG%2FHR6NkUr%2BuVFTimoiieuaYO1KxPH4ovRnedACYFgN7yLZpGpmEqhNThFJ52PHFIIiXtV9xw2KYSWz8FWEPNfWteUQqY8kmn9CD3aujca6x3q6hd%2BE393mc9oW966xiSFf%2FwurKsG%2FdiwvVGXqtH7ukd%2B3lGz1a47zM8MzN5po3%2BenosCHDrQ3516JjOHzketH7JbNUDwJduSS3UE5SE0PKuNieQ1k%2F99DSufdRIv4BYU%2BgoBUzMeC42zam9PoKB39YYUX1S4LGeESiup9GkfTg5aaxWfUw%2BjkNziUi3MweUeOyKyxABgfiXYIYu%2BHltrNTV5roaBKjJBjuugU%2BPvF7VBk1l4Q0E2YSzYTnHsK8iSCqObuoZ%2FTvj1PTRjGOlLLK%2Bc8F6kBBC4shWbeXV5ulu2hhXK03uWXSpSscPL5sZjKml6pgNhIypSWJEp4XbSLrsJNVBufLLGo9zYquuxi1afgEtIujiATzC%2FwsPOBjqkAXRjELb2x8Aj0rpiQQRBo9CDg8cmsRzgnbTiZrampLxEmWwPOrUMx%2Biy3APq9MiMbriM2SPym8pHqJOGJmhvuHkRTgDhwK%2BKfJQdVuz6Wrc270O5A77oLZihM0Bs8VVoKTDw4PUQxpCLQM4iD0TgiOfRy1ATuEt1SXApoidEXi44zX8perar3RHBS06sxgJ%2FXEVcFXVfVhMFc5DdONFH5VfPtCVv&X-Amz-Signature=5edea682d9b59c7cf736dfe940005ea0fa99666ac9100bc97049dbb18e7a12db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCYXCAUN%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBINKtfSEdBoJ95PT2AxNfVx7GiwMaRq4o03LIqI4q7BAiEAhTUDM1l1fUuU8kc8ZcSOxO6pvHEvd3HzBRUMlYx4bakqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOZMGwWHLXCv%2FGsHBircA58YVkDJ0c7AyPrAxwLLO7IXY7zQOoCducmCHNaGfDo1PJ0KMudlrAF3PISXQnLL%2Bbv2cMkrBUqDJqTuwgGwrQ8yOsPkzX7M6L0ET2Q%2B%2BLvJm5RnNPy69k9JDRxITFv8ZqpwMbC0QBwVhcRD1zt89DjuRHo06AJ9Mq6euJBOW6adwiC6kR83CLrjLAn6BpFdYakrPBRWypRAJdTxPYapPwykgYTynbnqnw0MjuIa2Hz8G0cOFL0FKoudeI%2B%2FB3vJGMSfiSj8FlYIiP%2B7ir8muPuWdeOGD0p7tkkEl3aXsZ4JOwCiL4u1UgCp2ZRH9o8nzTNQ58WFlp6tHN8cIF%2BUnCk2eOsdebS26wSnNPuXrfLhGg4AcVTEZg22FEbYOs8JvYvurUoqrf5yQY7Ih7Py2YkgYjTP8Ie1C%2BkKtzgM8D3J7%2B9uzcDFOD6da008eXMJJhflyGU%2BMjMRehNZgNz83R2cHbT7KTZplsB8FclkoTrVMoWr6suS7VNO7Q7LnEnHrwwUFco%2BKMFUyXHAUHdWJHxRyoHr8SNvSQwKOr%2BFUQSmMbxiYSZJvLnItorhRWjFaAJSZNMVBN5YUu6K%2BRe7jWOHYtdnaoYCUxBErfkLJLVbeoQ5POrx7qjsFCL%2BMMucw84GOqUBlatFMCDG5amiIU845lrnG0kthmRIhi7rhU%2Bb2mN%2FSvv6qHCHtJQlzFl3lxrY0lxzFrFv53TOf8GlRNO8qUqfkwHTQj87psvqwXqjTzT%2FFUEmv2itg8hlQFN3ubALMq784lzcvRznaXkDybakUjSs8Oyr35KB%2FQaiXmWqije%2BEE5C6j%2FoymGbIbVg1kz%2B2AhzCVRzwpqEcN865OEiNjZuJCHXNc3M&X-Amz-Signature=9015946685680fb4f8cfe68a9f5e92749682ddf42dc1e27c58f2e80931a94ee6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVEKXNDF%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDnsDZrpqzAo2%2B%2Fue0RpC98KGUy2HCuC1DvUrDxK0RGygIhAIjxFeKFZsS%2BblP2pIXuDYtfvN3J6ZzJ1oHMXiF3nSWpKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwfwLxikf0oPc4kb4wq3APz%2FWIe0N3KDu%2FzHqejRdCXQQ24BOnnn%2BxqZXRYbJABC8pY4jQ3xU37wbRBNk%2BuQC4pkqoyZsul8nuSID4zTGMeWfhNh3nwF7ZgTDj3u7uR9DheRcR2r7kwBqg5hLboDWJBN6vP4CAf8yK7NQ1gYwnYv4KopRyMCYpSyF502O%2BdGhCxVEyAyq1WlN7DE5crdED7RvFPghIpBdg856NdFJVV6AUWncBhioAAASIhCuP9vBUYglOBBx8dBvyup9DYRdp1TZB%2Fin048BWY5hJF%2FMTAOV%2Fqfo1tWtrQT7jx37nuYz9wS%2BgTR64RSnrlR6xuLhyP4RTXd2N0kjZERHVjDDfFwE8ktM9gydsnbFXu8xwE1NQyDzDOEPL6szHMpFfsC7Icl5sxle7w2YouxZEoCDBaIOCAXnSKvmp8KJV%2B1P3yko5iUdZ584JUVuG%2B8qDZjPFrLZP%2Br7LX4GHukTJduhz%2BmUDM0lBrrjpBoIa1lPHjg4CdQewfj8FyhBre3YnbW7P992un5jDq175VN4Lo58aKZWxnchYHV3ov%2Bb8Nx8bwjd14npurMQTkdOs4NLkPRbOimeMXl0P%2FQcB%2Bdz2NZ%2BZo2056keY5xUTLaGundzV5zt9NVWFH1nq3EEXvdTC5nsPOBjqkAR6o8f0s%2BtRNtzifMjbQ55RDlBSGMVFMBpTLV%2F555Ir33pfafR2qO%2Ba9PL1uQj6S7RZ5lRGKRr2j%2FLFG6FVKAyVtd5abVUtKmgVH9Pg%2B1%2FXVH1sU8sToHq4gbJku4RiN%2FT5AajjIMhc5vDCXXW1Vdi37fA5Zm04Uy%2FAhFSJ3iGVyKbY%2BW6cMjNbtGmX9szmWiQp4CTERb5Q9ZC5tnvBw4wuGJohZ&X-Amz-Signature=d68abdac41d7035034e2b44b6d1261c17b715f08f103b0c3adbc7173c81957d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7JOCQSM%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG2tpmd1ZYV%2Bn4053c4UWRP0pa1crzqC0eRFqcbIKfHgAiEAoQU0UVxF6aEnSLTn8zCgIrJefc5KaazLpBZ4P%2FKmtpEqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFnajLc0%2B386mWSmwyrcA1aM5VykTixiZiW4K9WcDiAGTZbnLsto663aGzpjn3DKgP4Ehej0bwc76ohaRSB%2F77H23WoF3P2qWj00dprfoq5PUyhlDB7WCXkm35epdL4ukLwKYzuk0vsVtwFrffOdd3U4G3B5SO4ZpTOnMaRTlBk1tjpTukEVjXy527cHeCLKAasNOZ2oIUSXDUq5k7fI6UMBhcewQBn4o2lSHhfe%2F95bNvrvJ%2F0D8GYvsPVDwfmZR%2FhxkkP0TiYuwfUKxhjqAZhD%2B2W%2F9vbDwLqSjebBzz69WTjwxvDy5fuKPMK92zdZUOwX9T9NLAMtFaD6Bj4Gp7ChonsBiTUtosNb0VcH2CKVowFedJYje2XnergdeLfJBgY3CSbWFo1krP69emVuKVtWMixNnL8oyC85OTYta%2FLQxUTk67B6soYi8P2kANd42gCHeHGFwTx3vF%2B34LWl2Mvg3iImV2TLJK2UFJ43K7VLb33GdsEwpI1%2FarJnig7RaJpkXfUYcOYqbnA8vWQig2t4d0waJqi7vzlbhU85bXu0ypWiBw83WsJ4TwsnbBTs3iRQj22pTte8duvBi78rsqkE9eQqGob%2FhN1gMksKojv7pEmWA53jwNTkOY64eTaEp9FRvwVAP1JGlP1UMOucw84GOqUBLsvumyX5pfRne5XuPud%2BZt242phBz8N5mpi%2Fm7LRs1UOImcUF37SzMrocHuqEXyKRGSF3DoGeLYhIJYPs0SGLnZGqZOoGK3%2BUzyNUCztBzl32f8kXlI%2BeBs72osGQ3bmEam54hhnmS5OqGjy%2BBdUGzKaSZ%2F9jONvJUCoypOp620uttp3ACHGW%2F6m2lBVplrOkbQX1GJlZTDpldpUBP5HImn6jeMH&X-Amz-Signature=6252e61d21f60eec819719002ded9172054ef70604bbba82eecda85bf843f79e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7JOCQSM%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG2tpmd1ZYV%2Bn4053c4UWRP0pa1crzqC0eRFqcbIKfHgAiEAoQU0UVxF6aEnSLTn8zCgIrJefc5KaazLpBZ4P%2FKmtpEqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFnajLc0%2B386mWSmwyrcA1aM5VykTixiZiW4K9WcDiAGTZbnLsto663aGzpjn3DKgP4Ehej0bwc76ohaRSB%2F77H23WoF3P2qWj00dprfoq5PUyhlDB7WCXkm35epdL4ukLwKYzuk0vsVtwFrffOdd3U4G3B5SO4ZpTOnMaRTlBk1tjpTukEVjXy527cHeCLKAasNOZ2oIUSXDUq5k7fI6UMBhcewQBn4o2lSHhfe%2F95bNvrvJ%2F0D8GYvsPVDwfmZR%2FhxkkP0TiYuwfUKxhjqAZhD%2B2W%2F9vbDwLqSjebBzz69WTjwxvDy5fuKPMK92zdZUOwX9T9NLAMtFaD6Bj4Gp7ChonsBiTUtosNb0VcH2CKVowFedJYje2XnergdeLfJBgY3CSbWFo1krP69emVuKVtWMixNnL8oyC85OTYta%2FLQxUTk67B6soYi8P2kANd42gCHeHGFwTx3vF%2B34LWl2Mvg3iImV2TLJK2UFJ43K7VLb33GdsEwpI1%2FarJnig7RaJpkXfUYcOYqbnA8vWQig2t4d0waJqi7vzlbhU85bXu0ypWiBw83WsJ4TwsnbBTs3iRQj22pTte8duvBi78rsqkE9eQqGob%2FhN1gMksKojv7pEmWA53jwNTkOY64eTaEp9FRvwVAP1JGlP1UMOucw84GOqUBLsvumyX5pfRne5XuPud%2BZt242phBz8N5mpi%2Fm7LRs1UOImcUF37SzMrocHuqEXyKRGSF3DoGeLYhIJYPs0SGLnZGqZOoGK3%2BUzyNUCztBzl32f8kXlI%2BeBs72osGQ3bmEam54hhnmS5OqGjy%2BBdUGzKaSZ%2F9jONvJUCoypOp620uttp3ACHGW%2F6m2lBVplrOkbQX1GJlZTDpldpUBP5HImn6jeMH&X-Amz-Signature=594e73fb23df4c22a3b00ac5600c6b844f355ff693a388dd3203d4efc40f2452&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627AKZPZ3%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCEZZ4OacS%2FScNYTBdp1jcnGQH%2Fp35vtL8lqZaa0ryTmwIhAJNLu0LTKI8AfUyeeL54cc9fhzSryWjjk7zJmHxU3AG%2BKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgysFUj%2BEpF5OyobdnEq3AOPaQRhJ5%2BBLB6MWY%2FHVXIpNYy8jiMbinQXGFa6W0iqVIF%2F57XMEFm77JPGoBErziGvZxz%2BuNGuWR3fQYyQOJ5UfZ1Xi%2BfxAp9jYjCu2yemDazJ4LAHwkTFxtsOu8cvHBWdJV3Y8GAqnt%2FbmNep%2Bf3ft0pW5fZ23SJRqtqCk8hgP4p%2BknssMHBb9KPGm1VcOGWYqFvRoY1%2FkCqGi8nWI0xcEsuoCZdXQ1nAANazNOMUHdCpYAbRfnp%2FzuxIOsgHkizypnfYav0tOD5aUS8MrmTx3Q2oLDWMviIfz08H7KcOkFLfj27b7nxcW4P5BQgygMqYQYvAvNbicSFx4mJNFZdxNUg9NOU8XbeBIfNvNXy2KUHcgbZff4D9zUOvvf2BGQHKUrYl2y%2F7nkjV4l%2BGz02VEn8MgVShVjVKcrgVU4V0IIiKlyDmX9%2F%2B0B75ohHnzfgDem%2FuoYhASuubuKNCiXl7uoWunlUwZku3IEAY7gc9j%2FbsVhedDLdp3jNJ7%2FNLuUCAyuwkyTasyQZyx35yuv7HpcOUQUNhYoaW7iGrysEZRF6e9oCzTIcWERqvKvPd9FLmZp6i5wwN9WllGb46TpuAlZNh75xsJ5yKvZMTk29JGCzUjVqhhxy1G8N9QTC1ncPOBjqkARuIVIDaIzdInxVgFx8z%2BvLsrGix%2Fnl8A9DZgDM%2FJP%2FISzug591zT39lRDYO5wnNtgGdYRLq3uIsGAaWwEK1I9UTgQUWlads3TP2KbEdBPP%2BeNe3cSYQgrerpNyrxLSmx1eAGKalnWkyu35sM%2FxeFgl2tzeWg11Vyt6FWLktWAY3ELvH5MaUdSi1b7WWwCSC9TkafEMunpvzoqjLre3nH1LQVBKC&X-Amz-Signature=de867ed797154b83e22c4c9aaae9cff7de5fdecc0158dd5c1215cf8f380202e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZN4S6IGD%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCVu7J4%2FuMGTE0aa%2FrHC8ESCerLs1u4txihoPNT%2Fha9VwIhAOphRAlqNBzTqKcU3yTYpxxbBG6j0HPXYGpuSwC2BO8NKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwX5JCK7nuYW1YZ2rAq3APdhVR4iL33VPDdN9yYVrLVq8iU%2FYy3Bc%2FECbugBXbYVqq50XwGW%2FlP1aycDRZ9sMn4P%2FIkZ4OibCAyMujSqIWGvUd1A63%2FxqL1kWtrIovC7z3StFHiZ7DH1rAxSLs3ZLFfIG12JYKcEAmEf4XwejHjObxLdV0pqi1JfeASOQFHjNNE9tKwewTjv53G8etj5k78T8Jnno1Xlh78mpw8O6V3TwQTFB5SHBhaz0%2FGeenNFnX62vd4iLyu%2FIBM73c87lk1rnhj1JWY8MiGNUZ9lq1kd32I8LPBX87XAYCMxec05AYoeNg9WljG2H8GgcELnzYrJze9bB4ANKuW7loFFk1gzbAlf%2BFcSYaXL2oJtXay26l5R1J1TDb5THZ98CvEj4q6%2F7ghbz5bjuql1MKCdtocZtXjfGD10pQ3j0MBQT3oe%2FDCAA42b0qHZZ2C293bG%2B7suCCg8y8GD%2FvmeNlhO%2Fa6WvhCu3EBNxKtH20mNf1Mz%2B4mktjuGn1e0C6EEUtC1PCmq6Ko6rm%2FIMh%2BPaPG6HW6FTlU77hb0JC4Rzl%2BXJTMM%2FnKZDra283bLNKnOcMSLyMqrZ%2Fv3KEgYiHuOGuv%2Bvyfo4MPWni4VPnjrlFP8QZvFAyzYKGhblFQpa8P4TCqnMPOBjqkAdp1P1nFugizgvPU%2FHKqAUHgZ88yOgcooTpEv6revl0wq6CSLZ2PwzC5PW0nwzvUBTiPDBPJOaqg4%2BnXAtkeZlbRyVSe9cNgQiBHwcGO9Zku0M2i45gG4X7CYlFDes34L74%2F0%2F9Hk%2B4OXuMTPwmUurC4lt%2BODlQX1pMi%2B0%2BiKdXWAgFRlSFg1ZycPnR9Yb2pYBFAFO%2BWI5rKdkaz0eQJ1CsFIfoL&X-Amz-Signature=5b8f5efa766096e10ac0cc33b061924328d614befd4d5e79da7dc186605723d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZN4S6IGD%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCVu7J4%2FuMGTE0aa%2FrHC8ESCerLs1u4txihoPNT%2Fha9VwIhAOphRAlqNBzTqKcU3yTYpxxbBG6j0HPXYGpuSwC2BO8NKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwX5JCK7nuYW1YZ2rAq3APdhVR4iL33VPDdN9yYVrLVq8iU%2FYy3Bc%2FECbugBXbYVqq50XwGW%2FlP1aycDRZ9sMn4P%2FIkZ4OibCAyMujSqIWGvUd1A63%2FxqL1kWtrIovC7z3StFHiZ7DH1rAxSLs3ZLFfIG12JYKcEAmEf4XwejHjObxLdV0pqi1JfeASOQFHjNNE9tKwewTjv53G8etj5k78T8Jnno1Xlh78mpw8O6V3TwQTFB5SHBhaz0%2FGeenNFnX62vd4iLyu%2FIBM73c87lk1rnhj1JWY8MiGNUZ9lq1kd32I8LPBX87XAYCMxec05AYoeNg9WljG2H8GgcELnzYrJze9bB4ANKuW7loFFk1gzbAlf%2BFcSYaXL2oJtXay26l5R1J1TDb5THZ98CvEj4q6%2F7ghbz5bjuql1MKCdtocZtXjfGD10pQ3j0MBQT3oe%2FDCAA42b0qHZZ2C293bG%2B7suCCg8y8GD%2FvmeNlhO%2Fa6WvhCu3EBNxKtH20mNf1Mz%2B4mktjuGn1e0C6EEUtC1PCmq6Ko6rm%2FIMh%2BPaPG6HW6FTlU77hb0JC4Rzl%2BXJTMM%2FnKZDra283bLNKnOcMSLyMqrZ%2Fv3KEgYiHuOGuv%2Bvyfo4MPWni4VPnjrlFP8QZvFAyzYKGhblFQpa8P4TCqnMPOBjqkAdp1P1nFugizgvPU%2FHKqAUHgZ88yOgcooTpEv6revl0wq6CSLZ2PwzC5PW0nwzvUBTiPDBPJOaqg4%2BnXAtkeZlbRyVSe9cNgQiBHwcGO9Zku0M2i45gG4X7CYlFDes34L74%2F0%2F9Hk%2B4OXuMTPwmUurC4lt%2BODlQX1pMi%2B0%2BiKdXWAgFRlSFg1ZycPnR9Yb2pYBFAFO%2BWI5rKdkaz0eQJ1CsFIfoL&X-Amz-Signature=5b8f5efa766096e10ac0cc33b061924328d614befd4d5e79da7dc186605723d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FNDDJWY%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T122453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEEshrpoJ%2FqdBLZ%2Fr3C%2FBt4yoeCCNcMUG3PJXXNpbD3YAiEA%2FNMuRjmPvvxPuG8RHpOMJEtoQ9eN%2B1mOH%2By5ipz1wTEqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP0%2B%2BiDMWVuhDzhDZircA8gm1KHUT7YxRLwyqW6b6Y%2F1KzivR%2FkPw%2FWQK9l5XVdhRF4gmFlWK6tPaN8fsftN5s5OenXz4CfM43nWYQpoSk%2ByllMrHOF79PMwMm6arOwVSOzmYUAdlXSidRXbhGo9wMxAVV70MHBoD3l4KyU7zMpRjc%2BUcF2Mv8nn2bho76yleLcA1WND1Fqe%2FG0PQjpFK3B0rWtqJHmhx44RA2%2FyXzEAceK1yi4kg9QSD9hDndWc9k%2By7Sxra7Jdfq8DrubjWF4KZPjgHVuVfXp7Xj1VA5HYo0Vkwre8UmqTzyA8nu%2FQsf4SBj%2BfKmCwZAL1fmi6e9Jos0azGq3QMZgdtiZMsvkmPr0tCw80Dx2OkZgjUzrujG1sXkz0Z9rEIT7BtQBPyMIZrkvWGENef3fHnU4GlwiuXwwZTXlmab1yynRzSCa01u3lw7w62mBJ%2FexjwQlHdObcHdAJMSvB9VGFWj71lNsBVklRTaP8qzhoHj600SOuuFlIZt3Yh3MWTrc2sb1MHifpgHrXV6GJoZgZdtD2jFCXVutfx8u7Zj8VoL1cucVSlr0RMDIca9nFjdCAdpwVQUpFXw1NRAPL4U2%2BFKD5BO0jOL8amprGQroOdLIU6G92wNTOZ0VV4sWcoRyQMMicw84GOqUBy7YRzT%2FOuSOj1kVreqlN%2Fopdkle2IfGsjtmigGvgV5TAgM7dpOAfFUy%2F9IHDTZDkfqiZoqsS9QqGYIl8iO%2ByS3QJkKNNIrQ1CCsW887XPD22xgl%2B%2F0VofH3m%2F%2B6NaiDQkWTOtlf3O3xMiXuwY%2FAvI2tVzOyZka5dVy%2BbAwNIs7qcqxOb89nEtw1%2FHJeak4%2F002wfZUdh%2FhEkEsq%2FxkG3MrLRu0f5&X-Amz-Signature=ea4704377806326330c780931547dc97c7dc5818728813bca76e8a47b8d4d909&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

