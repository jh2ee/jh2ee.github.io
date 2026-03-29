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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647C36E5H%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIGzPp48S0LVDcM%2Fj0QfvXEnBpqusNm2kgk5IiTI3VW84AiEApOVSfGbj9uOR8V1nn%2FYLFBjYgp5%2BcTHoWNgZ5Ro%2BLgIq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDE3U6p8HuZpt%2BnbeMircA%2Fvy7NG9LNo9tF3zVDVoEEunJm3Z4iIINgCkueeWz2bxEplthLmDCGhW1NvuAZca84LgTE7RYR0JjTFOHrbMY%2FKxGNpSTh%2FSCj1paWf3wznE2yzqs8i62C73hiTOJO6WZJgfAmM69Y%2FiNiCG9GWA5jt%2BNzZ%2BYv4Ip3zXLDl9bQj%2FKGspiZ7M7Ym%2BHbqzGk2lbRoIdlalstNOs1%2FPyAHBF8KN59dIm4%2FR0XjobWdi9eT5Daun6Tg%2BMkYh%2BUTPKRiJQcAA0oKBd2e1oj%2FwbHZgiIiOR%2F1qp%2FBc4xQUmqjGVNjR4e3yNAUbw%2Bd6E07GrO8pLFkpkQoYfanTM1AbEEVJhS4FghFxvYsQF8C0%2F18PJprNUckkb2bUM8LKwwKMJ9Jy4BBd9Kkpn8MJX27Z5VnMANv0u4AZje1UvRkwqzg%2Fvtg%2FM8Rsmt62FvR3RyVuae%2BaoGml1rO5j541Lvu8jWfrqhNaScEY8%2F5xsaEfDaTDGeJRearScgWv5gIUD4OcyFuPpbitW5MZ0q3CwmuzBTKV0rAHH%2BzU5iz%2FtSbZ9eDGZkaqaYhxoj8%2F%2F5NL2E4Y4CT52nW%2BBgzidQF%2FQUT3sYgezvlvWqVfHUVu5ZCOFKss1kFMmcv8c4vXMbbhiCYvMNrLo84GOqUBhruYQQYmTcHYYDsgzszLq4G3vlJdSL%2BN6mqQC%2FyvRZF61HxASbbuwDYaqqq4CQbCXN5%2BeON6B%2BJ3%2B8QD8d46wJdK8TmHL6xylq9KfTQEEuDQKRrkVtiJhTmAisEA9zmuSSZOQ0ONexHRLevW%2FW7pM1CnMVHkfH07sFDlaA9EQOGURdUw%2BOgqCySrp2p5c4GJt1NN9AA6LiBWSctO%2Fh3CqaBhkKtO&X-Amz-Signature=b8bd2954bd868da9d6d7078efa49b62c5d3ed5efb8dfa7832af43de13aeea9c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647C36E5H%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIGzPp48S0LVDcM%2Fj0QfvXEnBpqusNm2kgk5IiTI3VW84AiEApOVSfGbj9uOR8V1nn%2FYLFBjYgp5%2BcTHoWNgZ5Ro%2BLgIq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDE3U6p8HuZpt%2BnbeMircA%2Fvy7NG9LNo9tF3zVDVoEEunJm3Z4iIINgCkueeWz2bxEplthLmDCGhW1NvuAZca84LgTE7RYR0JjTFOHrbMY%2FKxGNpSTh%2FSCj1paWf3wznE2yzqs8i62C73hiTOJO6WZJgfAmM69Y%2FiNiCG9GWA5jt%2BNzZ%2BYv4Ip3zXLDl9bQj%2FKGspiZ7M7Ym%2BHbqzGk2lbRoIdlalstNOs1%2FPyAHBF8KN59dIm4%2FR0XjobWdi9eT5Daun6Tg%2BMkYh%2BUTPKRiJQcAA0oKBd2e1oj%2FwbHZgiIiOR%2F1qp%2FBc4xQUmqjGVNjR4e3yNAUbw%2Bd6E07GrO8pLFkpkQoYfanTM1AbEEVJhS4FghFxvYsQF8C0%2F18PJprNUckkb2bUM8LKwwKMJ9Jy4BBd9Kkpn8MJX27Z5VnMANv0u4AZje1UvRkwqzg%2Fvtg%2FM8Rsmt62FvR3RyVuae%2BaoGml1rO5j541Lvu8jWfrqhNaScEY8%2F5xsaEfDaTDGeJRearScgWv5gIUD4OcyFuPpbitW5MZ0q3CwmuzBTKV0rAHH%2BzU5iz%2FtSbZ9eDGZkaqaYhxoj8%2F%2F5NL2E4Y4CT52nW%2BBgzidQF%2FQUT3sYgezvlvWqVfHUVu5ZCOFKss1kFMmcv8c4vXMbbhiCYvMNrLo84GOqUBhruYQQYmTcHYYDsgzszLq4G3vlJdSL%2BN6mqQC%2FyvRZF61HxASbbuwDYaqqq4CQbCXN5%2BeON6B%2BJ3%2B8QD8d46wJdK8TmHL6xylq9KfTQEEuDQKRrkVtiJhTmAisEA9zmuSSZOQ0ONexHRLevW%2FW7pM1CnMVHkfH07sFDlaA9EQOGURdUw%2BOgqCySrp2p5c4GJt1NN9AA6LiBWSctO%2Fh3CqaBhkKtO&X-Amz-Signature=b8bd2954bd868da9d6d7078efa49b62c5d3ed5efb8dfa7832af43de13aeea9c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQMGDVGT%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIFnIyr%2BpNW%2FKinaemn0IDocL2ach5lw9H5v3%2BkpKn6mqAiEAp3HGyfuGxUfGsv%2FJPVVzgWNqM3Jiil5J9wgaBeun2oIq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDGn3k7aXmlA1uallfircA0OQ7qN0R0yGe1jYv51RxXBtAqM4huWHHf1wdeJX1X2YcVFsFmL%2BjrZXQrgAErWcSRrpGp5i%2F6uAfK79noZ5l9rX7LMaFfSqyFRYT9Z1hKtUVTj%2BAJcqvczu4WxZZoM1TTtLk9rwg5fSljTxd22u2RxwNuY0CJHht%2B8Rv1HuTOojtKbGRK8GnbivZCX%2BA4hv2p1Mdt3OfKTwh2mLwU%2Fa28eQgkfygFm8yUtvLprKb4tN4Fjpw5dDUoymZyOMCKl0YqV4lsotoCHpCrPmOvi0JFercaON5c2q1JuhTEcFe4gX7FaD34dCQFfgJAykvw1QbB1XT1coBnLwnQLQ7fZIsEwuGYRIr50%2FtY%2BzcahSW3mnY5jlRudIvi3L0e0QLjtQnTRiO9k7IQPHHUkVNXjaETatGTMWAKBhJCn04QDEGTUZ99BjcDUZwbFqqEK0ioi4OVpvCfquBqbpBkEqAc7mbcG01P9Z6fdmy%2BtsoEqBmn84Xm4injx%2Bs%2FSsS0kbIQXvCbz%2FBhiAnBKnAXqNvCr49GfDKMUrq6uGTwNq45TG3AgTnhXzdiip1yfsDAvrhPEVptBnGf7cl31EDVRnZwojZs7XuU%2FNMYbiQFi4gEuD7VjYwMrY%2B8A9G08V1PyqMKrLo84GOqUBUfFL0fhRQ1a%2FQzoIjrl56S2qxi7SeKzpWCQc%2Ft%2FuhUQB%2BLzUy3hYT2TfAx0Opmpo9kx15KQTKNq85Cl7F%2BldK6BUQTScSPjPUDrARaW1GQBhcfN2uz%2FG%2B2ma%2FkMAYmJuI1BABD0Mu9XN8EoCHhD4FK1dCjz10q2DZ5hoFEN45%2FKEVLjjw0xN2YXqHE7c8YvCXOTH3TEgFYvUwjCIt%2FtEVNcy%2BzeB&X-Amz-Signature=8b2e20e5658c81fef2fe7b5e3ac9a6d39882e38a9a3407acbcb81705b59835bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPWQDLNV%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIE6swp0aHANF84UZCAiuMwi6WK7b5e%2FTpy6MmP2%2FI7iCAiACTkrhk7mkYBh%2BraasajbSLfsm0G0809LhaeOOFwuKECr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIM4zzI6%2ByyCtbsaIdHKtwDGuf9CEdwJYnAMcIKU3ZoDW2xJgkWtDaRhjNtDkGf3hQuO8I3lmMrbo1dtAi7oB8AlJdeoK5RhbD9SGgBzQ0%2FRnpFxfJpPw75OeJLUWRvnQuAs8kjqXmsEZmjkVBO5Ep29JI%2Frq4Tf3BNeqy6E8xdj30XmLB8ndSj%2FGnIGj85dfu%2FltM1dPRjvc8SlNoa6Q6uEvgbpAWlSUt2WSd9exsMenLYOdGSez3u60rjWjkm6M4dv%2BMHqBuYpmittltILHtnHR9oGhuG8bXr9AIH73K94%2FVlrGh9O1cgSSbf%2BOOI8ki2G1rfNhQhgYmCffaK3c%2BpuMeACJgK6saUH5uuRPpMUcqJwJ%2BEWcLy8bvjfacUQrcLjcOKAOMpEkq7nbzvyWGdzXZiGMGOIbC2a9uB%2Bx2MxHecpsIZx999oCBZrm3%2BDeuwzr6AnzZqTsbYNSk93un8BxaK9LpC7Q9v8QndSxQjuoP3xKAqNChPR3Fd0KePVQsgyDjp0Xqcm98sfq9Rbi5ad3DsCHd%2Bb8CCDrm86RdGQCwQ0wNgduDJHNwaz9aFLjKC8Eg3S1da4BUn1IGE6fjm9VSjfw4vgyvT9A32ZehxLWn6oAWwzbQJMPEKQJ2xWcH1%2Fa9M%2FrQpNVk4%2FS8w78qjzgY6pgGepa3P%2B%2Bdvj3SOAjtArE4f24%2FzcYuLhcK2cnp%2FMZrO2HcErImL%2BdGB6iY94xTSat3ZhkjPauORVDCM8H2zG5R3ylK8XdfcwqORG9Yyb9fo44n4UMZTEHb7Ud3%2F8An5%2BzBPJbYv22YAqpZ5azvS030uBBzv3uIUluW13KOgt4y%2Bv80ar%2BkWIePM10FUvPaXMGRfMU5JagAqXbxECD53s12K3YUNuo8e&X-Amz-Signature=412c0760482ac0969ec189c83f3f5724b3ccc9c3549506ff168acb37cddce7fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPWQDLNV%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIE6swp0aHANF84UZCAiuMwi6WK7b5e%2FTpy6MmP2%2FI7iCAiACTkrhk7mkYBh%2BraasajbSLfsm0G0809LhaeOOFwuKECr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIM4zzI6%2ByyCtbsaIdHKtwDGuf9CEdwJYnAMcIKU3ZoDW2xJgkWtDaRhjNtDkGf3hQuO8I3lmMrbo1dtAi7oB8AlJdeoK5RhbD9SGgBzQ0%2FRnpFxfJpPw75OeJLUWRvnQuAs8kjqXmsEZmjkVBO5Ep29JI%2Frq4Tf3BNeqy6E8xdj30XmLB8ndSj%2FGnIGj85dfu%2FltM1dPRjvc8SlNoa6Q6uEvgbpAWlSUt2WSd9exsMenLYOdGSez3u60rjWjkm6M4dv%2BMHqBuYpmittltILHtnHR9oGhuG8bXr9AIH73K94%2FVlrGh9O1cgSSbf%2BOOI8ki2G1rfNhQhgYmCffaK3c%2BpuMeACJgK6saUH5uuRPpMUcqJwJ%2BEWcLy8bvjfacUQrcLjcOKAOMpEkq7nbzvyWGdzXZiGMGOIbC2a9uB%2Bx2MxHecpsIZx999oCBZrm3%2BDeuwzr6AnzZqTsbYNSk93un8BxaK9LpC7Q9v8QndSxQjuoP3xKAqNChPR3Fd0KePVQsgyDjp0Xqcm98sfq9Rbi5ad3DsCHd%2Bb8CCDrm86RdGQCwQ0wNgduDJHNwaz9aFLjKC8Eg3S1da4BUn1IGE6fjm9VSjfw4vgyvT9A32ZehxLWn6oAWwzbQJMPEKQJ2xWcH1%2Fa9M%2FrQpNVk4%2FS8w78qjzgY6pgGepa3P%2B%2Bdvj3SOAjtArE4f24%2FzcYuLhcK2cnp%2FMZrO2HcErImL%2BdGB6iY94xTSat3ZhkjPauORVDCM8H2zG5R3ylK8XdfcwqORG9Yyb9fo44n4UMZTEHb7Ud3%2F8An5%2BzBPJbYv22YAqpZ5azvS030uBBzv3uIUluW13KOgt4y%2Bv80ar%2BkWIePM10FUvPaXMGRfMU5JagAqXbxECD53s12K3YUNuo8e&X-Amz-Signature=a8a374604268d88c98f3b7d0c3242753b391297f30457250512f589100beeee5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EJOLJKT%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDj%2Fl1FF59sRaVbpLvpAIC%2FzdX0i3cBIuJSbJbUJoYX7AIgFc%2B00GfmHd1Z3byP75wVTY3m5SBVF9Xaxi9ySyCfL%2Foq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDONpZvanGQZnynDIcSrcA1UwBrqT73nbS%2Bs8ZnY4GcOybhPbRBXJY5RMHnKcAWwwfxw%2BoTVTRcH05n%2FD8%2Bo%2BnYMkheol8xSjNSLLqmOAGFvVYd6X10F39mPx6Zgdmq9GZoFp2Rwt8NueInRD9cmnD67XnfQLg%2Fv1JuXYy8fizz9ozI3ZKOK9CVf9Yk9DEa3dAC5qnsgcWDgSAtLq3pBgMSJKUwDq3b66FqQ1%2FqBbHioj4bEg5%2FHCQ3tRPHaXgAAWsMUWH3Lq8DiYoXCNJm4gBpGWBKfE%2FKnZYDhV%2FIRmaBcyzKoyj7dwSnXnLKnh6%2B5rzOCRGfR9lSqFjh0%2BmPBpCs1m1EQAhj7mAUnyGBkUOqYIiuaqcyqSrwXryZY0Q%2BNqv72BrWFPlGnJHmHvzYySm6U2efOS30qCrPLJ5EqaDtjoabDeeQrrAlQbRlLY%2Ftia5hz4YU%2B6Kkt4n8OvCmOxYdy9yVNH1eKrQCmrvBpWzyi7RWjjIGnlSFOGoMf32IYax2iEUzyY68s7q08idVZVj3cEpm3JRankb0r3ZkXU8DpUAXEqjnDK8BqwJ8IaD4qu8nwS4tSc04cQRKn69RRJnJ1Jqm3qfm96%2Bb1luP4vPqAwhdsLevaIbkLhCM3XU4%2F6fsDzQfbJRH3saEh8MILMo84GOqUBXJfbp6GyugqXvGTzzuguG7%2BTDCjB31rQ9ppOK%2FzdjjtOJon%2FbVrDPQCMc53qS%2FhMYnSJHTrufkJhK0E6dnqmvkYLj6992ij%2FZDgNDj1m%2F95%2Bng9Y%2FxXPyYxshpRsEFsjbEzIjL0HhZpbV%2FZFVya8vx4lO4HjN%2FcnAAZRLOPYR9%2FivZr%2Fjzj%2Fbud8qpIwGlkYwEczof5kZda9%2FyqxuN%2BGz%2ByPhOi9&X-Amz-Signature=75a0646786886c983e8e1224c37cffb2149fafe27084dc1d3c5ae330b49f5f90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VF5WFFG5%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCs8Z2b0fVQiU%2BcLWEwY%2BsVCtlN%2BMkxrbSl00Pz3u2v2wIgaHXR%2FkS%2BeiYou4fNzaXt7MCMZOkSZJsU7%2F3kiGazm%2Bsq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDCPEcB01e%2BDupsQiHCrcA3h3yzSVz6WFPm2HZH9LtVPQisFQPB9LZJ7sLYDOChn0NDDCu6NrvaDllKoFPuLnBq1JrFe31sc%2FFFIVnv9diYwjMhec0RmBfzS1Ksc64T92dUbUKK6tlTXx9c95E5%2BHu8CuDjp51kW%2FRBVO10UkpjGfDuAbIoWy01WxYEC7AR3cGepfrmqgPo%2FDPTsBY2r0oM99Jc9yd%2B6J4t3QeVo%2Byze%2BA4aAozpMaLSipL9MRoX%2BfwJA1MiKna%2BOg%2FBqYRWKmaE4XRFJA0h%2B5jHb1u3AMFqXCP0EgTS0ueBul9uc34eQhe16IU%2Bb1Z2sAdWpn3mhY7%2F0S2mVCuw0FnIxKvgz8t4U4dd9Oliq8pboAguIWOiAtNfUX9eaw%2BLpMW0L5CctdgBKsP7HwJgaYxr6Pr%2BQxKphaTUhlhFqi9I8W%2BSDqu4o5XssfHmEB8zzVKWQMFd03rLbbE8Zeq5NPbc2ctTz9I7yRuKNMi6WzyamadNRBK4JwpzRLTr4kecHZzZ9wbCkPzI3BrSw0LDZkC5ICRfQwHJ6kXLVXSvu3JzCVlcy%2FMQbi%2FXn0hivDKr%2BD0o5MvpPnDB5BEJP%2FXvNc8PXUc4voeafYsoxzej1YpyUoGKS%2BfXFDdQkFXwJp9C2MprOMNjLo84GOqUBxmTfVhwhdMxjC%2F4aet6juhFdCgHpYnqm1T%2B1OUjoZkWBnkHl97i7UkpmjQ3xLj3%2BNxNiTWsPro6PGY7uRuCovwxEhh0mBGElSzkOPWAsPM7LbgGhkiw1dH939M%2BDfoTqFAYEDwTYIaHhur6BfYqhn4nVOmp4OuLzLn4Ec5ZWHV3CX7rtvOFEfiELu8kXjak0Ho6V05KSORqkpt2FyL47tXcX7Yyn&X-Amz-Signature=81178191d5af8c06a150477278b58c93b1d8f229ca7bb9f33a426ba34ef1cb52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIOJWSPF%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIAUuXwuWSbR41id%2BqYhFRh90FDphr%2B6gwDvkVKFLk0jTAiBjldl8x%2FPaf0OAX9WgS9HPNA8jgrbVkx0KXok4ZKUg1yr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMJN8uqvwgtSu6CDVwKtwDBrFUawznZMFd7HQENLo5Cv6%2BuVjq%2FgGqOFl4C%2BEMIubGwRs1lFe4WYScbnoS3FOMlAJUk92CwYScTNm9WgQUbByBtt2ns%2BG1SDgHX9%2BYg0GjcHdcMehg0m0ku0r4idX1mWg2aqOcAg%2FrRl%2F6NDM078BFrgq%2FuaLb6c6XrC6sE%2BeQ98bSE8i5sDny8teEIKORRB%2BTR%2B7gsqWPFOv1rBrEGMX0BhFMoOnZKveOFDAUsTNi0mUsfsHbNpwOr2rbRLMGdzFfcWX7sqd8akZxMebmIFsQ%2FPEb9%2FletX96JiwYN68KmsCLUQUTbPgaVidglpCN%2B5toK6WS9Ye4RYFRd8ZmAnAsQEMbvgjm14be4jDYT00iGj39y1WNfb6NIYD4PrLqv9CztHiMd1E0hHlhoxyTYwaJktXlAiAJSSiY51ne8f5%2F58SyUvnye2v65Eekrdi07wzan8IsCh2dSIzL0WQpDwY7CvIePxu4AIG2r%2BbQDuXttkVnsaXY3at5Ku4l2COeHEMQdduJd40m%2BU94pWGozaBRfKNHetTDoQeCNTAcuY%2F0uaUxH8uagnEIBV5mwZOouXkYPem%2F5mIL2RDBrCCfuFe%2FEDqznchAYzMjRK15snVjaOGJj6wJEnPKP6EwkcujzgY6pgG9UJL0fJB8Eey1VHpAsVZZyRkT7lfrFiX4%2FB0xGWhbtv%2B0dbpVQXbUv%2BkGOP0vQYWF9FY9pQVnxMFGNTRYzG44KiY1AwjVjJ1oiel2FNGz3JGCn5XXWyXmgD8VMjZSI8lebkzNOTNTzvRNnk2I2LTjgb%2By4w7wcsrx2h0uEdQPUKzU1PPkLlB2dFUwzZDSOrbA4M79WEm1WZndd6BKesgq0A%2BM%2Febh&X-Amz-Signature=e92bd1b3eb9ef29cf688a846a461a2919a447fdee0e5f3a1931d5509acc59c7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YOKFPWL%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICKFCBamqfEeFZkDb%2BY4TUFBf3YhQThMqhULtILWHkRwAiAHyZT8uM78vqdZXwntsNHfbewi9DdiNqALz77k%2BS%2BhGSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMETQxQJEYZA4KaSFNKtwDauPJae9SPn2H%2BY5IgVbYQ1Q0Kht8LHXF9Rx0HLQc6E2%2Febp5qmItmlXcN0ssWbhuM2cr5%2Fwmi%2BZGkkppiiF07Nju%2FiSfcMW0Kf0ANRItkDXAzUx31IhG5E4aeTfWC3jyV%2F2k07wmYjj%2BTY6BbEj%2BY2vh7i6xCw%2B5%2FMSPzN5%2FeRSnW9GDZ%2B4yLo4wlMZKzDqOycSAUDAEVaA1oGZ0WN6z9jVUTefUrONXKHIxnSvriMMnd%2FfhxBiDobGDhHIhhp7%2BDJXS0VLJG3DxAZ5t2lDjZJPWtkTXB9mT22cy8GrCsW4YbwD5uUEH5JrSR7FsyYB2wCZ8Ja19jaamTKb4FVTzX1sLS2rjhUGY4xis7VH8e8Arl1Qi2yJz057M6QZnod7on%2BjyIh5xhQkvk22nHidZQ3Yu7lntYtkHll2RmdtuZsIIA9IHv9hKSgJTbw3QCD0%2FBWqsVBojjO0hY2bV%2FkDWJ%2BtzDhDMtoaOeNGBcKeImK9hxhJ0fPWazwFrjBx6aE6D8V6Tg9YKOtKTtNTIOxvbkecJTyI77MdsoYf1tvBighzSqD0w44EWiv8odT394edvF%2FqSMXbXvPuNwOs%2BhMymB%2BGWZNPUcnPsXeceFsgbgUAxFV1X5v9hK6rrN68w3cqjzgY6pgGB53vY%2Be5%2BQAd05hbjkbYvyygjfAJ4hhiagt98bHYoYm6eMoC9rrD0rxrn3D5ld7JgVVWpVdmaIx9RNxC4w3GqUSBbcMmA8PPklocUrst0lA%2F1db%2F7KpSsQZwY36CUeAqSLYDvzZq9g61KSnhZFzYjbqI%2Bt8b6SFwZMna7NAjFBXKFSZI%2BH%2BRTWw%2FlJo84vRtHIqVDkb7DN8BywGhDgfWbAWq%2BSacM&X-Amz-Signature=a8e6c0032c91609c39cc2f9ddb3e6ea0afc9450ef0db216d9d9586ec3efea667&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YOKFPWL%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICKFCBamqfEeFZkDb%2BY4TUFBf3YhQThMqhULtILWHkRwAiAHyZT8uM78vqdZXwntsNHfbewi9DdiNqALz77k%2BS%2BhGSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMETQxQJEYZA4KaSFNKtwDauPJae9SPn2H%2BY5IgVbYQ1Q0Kht8LHXF9Rx0HLQc6E2%2Febp5qmItmlXcN0ssWbhuM2cr5%2Fwmi%2BZGkkppiiF07Nju%2FiSfcMW0Kf0ANRItkDXAzUx31IhG5E4aeTfWC3jyV%2F2k07wmYjj%2BTY6BbEj%2BY2vh7i6xCw%2B5%2FMSPzN5%2FeRSnW9GDZ%2B4yLo4wlMZKzDqOycSAUDAEVaA1oGZ0WN6z9jVUTefUrONXKHIxnSvriMMnd%2FfhxBiDobGDhHIhhp7%2BDJXS0VLJG3DxAZ5t2lDjZJPWtkTXB9mT22cy8GrCsW4YbwD5uUEH5JrSR7FsyYB2wCZ8Ja19jaamTKb4FVTzX1sLS2rjhUGY4xis7VH8e8Arl1Qi2yJz057M6QZnod7on%2BjyIh5xhQkvk22nHidZQ3Yu7lntYtkHll2RmdtuZsIIA9IHv9hKSgJTbw3QCD0%2FBWqsVBojjO0hY2bV%2FkDWJ%2BtzDhDMtoaOeNGBcKeImK9hxhJ0fPWazwFrjBx6aE6D8V6Tg9YKOtKTtNTIOxvbkecJTyI77MdsoYf1tvBighzSqD0w44EWiv8odT394edvF%2FqSMXbXvPuNwOs%2BhMymB%2BGWZNPUcnPsXeceFsgbgUAxFV1X5v9hK6rrN68w3cqjzgY6pgGB53vY%2Be5%2BQAd05hbjkbYvyygjfAJ4hhiagt98bHYoYm6eMoC9rrD0rxrn3D5ld7JgVVWpVdmaIx9RNxC4w3GqUSBbcMmA8PPklocUrst0lA%2F1db%2F7KpSsQZwY36CUeAqSLYDvzZq9g61KSnhZFzYjbqI%2Bt8b6SFwZMna7NAjFBXKFSZI%2BH%2BRTWw%2FlJo84vRtHIqVDkb7DN8BywGhDgfWbAWq%2BSacM&X-Amz-Signature=080db36969480f8cd8130c6faefa7329ee034fb35bd386ef0f58c3389df41629&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEV7NXWF%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCrvg15y9DWaT2BbmIJn0vExJqOkeMYtTXPoQqg3L45BgIhAIqV3C8dwxKqqkyohRhbw1%2B9s3Hu62xusDdqewzt2dC3Kv8DCAoQABoMNjM3NDIzMTgzODA1Igy4nxbc14SVs5SPdIwq3AP%2BfBkhrwWdJWHWlOaMQ%2Fd5MUTsNx3HDi5%2BFOqVvP3AVKM8py2dAX1Vf5hrBVemVHjb9EtDR%2FZw01KZJwooZMKZjs0tRbUVRqr2GhRJgDpnTAl6kvc89msxWs8wxDQwBL9Brc%2FUR8cqbwe3HD9O6l8fDZ2u0GxqH5bRDlnOpXuDK4alocj6UZni5876yHekSa4GseqeDl1CTFBcffzX04aaSghqX4LhCblPnppNTpovYTyTdUf5wgIFAcAO7IcEk%2B60aaY8F90LFQicwBz0RKgF2LxTvlpiGEtbZhsbqwpZ%2B5k8GSHlwcJ9GN0%2BmWscK9iGE5DUgMOR6wpye7QgVkvUqJQmjGQOvX%2BKbJrw8QxEaeg6WmjkHcXOyQwMQ1E0oRMgaZa3lFSRAUBKJu9H7xT58flebBN7aiB5FOItRzvPDiX67N51X4etijDAf5FJ62cF3Y16nGVQ9SdfbZ1BOHu6x1rwy0Zve0tRYHLzjd3495Uhxfu%2FmoMspF53SX3TVHg6Pa85R3MI0PpS%2FUyU%2FAYlEd5TJ91OyInayPUCF1uVTFRHtIQtJyhcaNH105XAo8etQf2DvntGo1fdJwoEcVWbg1TEQcK4Uiy%2FbYhpomLWu4Mmc3ga6AR%2FqrLZzjCsy6POBjqkAZvbDz%2FIsLoHQCyN7kWXiT%2BIoKADTaHMTI%2F0jbGXQwDZnlM7Yf6vKs1t4TVk1Bl8FhbMREncWOv1VNE4sDlCV5dvQohFpbEMv8A%2BDKQliCC7Ovgp4w9Veh133BpBQ4GVtxULDuIQ8YIg%2FFDobdXifxdO85Cc5HJYeXRBDwnwpoFt32z%2BQk147c68oRGLmm%2BiB2qMoCauQ9IW6VHHzKQF6kI8mB%2Fr&X-Amz-Signature=7606566e94e17ab4b406dd12501695e29d356d175adf4100a808d1324978f023&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YBJALF%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIGSIFYjMu1ex8DIjIWA3JkhEttLEC2szQVGqvsmAoUSyAiEAlsUZdATt1Y1PFcjw4I2WJaJ2vySt68Q58nSYMuJTTD0q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDIKIFX4u8KTvcJo%2BqCrcAwpB3pbbWMwcixFWA0Z58Ijh5zhtzs%2BO%2FDc7mK%2B93dpaL0EciWFgUoeUZHIGT9AYt06aUddrMy6q572oiU2yNxZr3rPWBl6dS1nIExa8c7eqQYwj3yGNV13mrVo8lrBoMsP6mJht%2BWCEIpKZiT4dZNEVQ5v5gHQ%2FSV7e4rh2ExKO7%2Fs7Jqia5CcWivUHR6vajTrsHCJpk7w0cCJjR6ak2qBnDE0AIHzgbEvCYQ8X5D6mMH3f4UGqnL6Sq3dR3KZWeuOyTvW5Ig3TzMTx1OlRChIzkpHiThpHJvDkhhUuhNAmhexyXvyXD3omJ4SQSNsyH9tNfdNKpnyRNJ4W%2BcR0VW3cBtbQO3Vg%2F%2FBSFIsPHi3G8lcDXDdmi7G1%2Fr%2BMPy%2FD3VFAe%2F%2FpXDomJznoMcMvwVduW9U8Xt3rYD7G09n7Qr3hBl9cRx3DS93huCiLV0%2F1YKZWsv%2B1ZnGDnfoiSSGqPw7U6gp6FQGnTonZvUo0jA2DrLFP871Mi5YURY8X5DG%2FnmqrKS6RET5hc9vmWlRgQYpG9c5qKaaiyrxKJYjS4Fd3ipv2AEwJGQku9mfRYEMc8w0qfQtlCHHjsCV%2F2VfZ1ZcAxwMV%2BZldS7UbYeCWiwb6IYlC6nAU8vjfOt7RMMbKo84GOqUBzKVBqQ8VMBMQCmvLTMj3YzgI9UZzYkoAhcS1F0g%2FKKf2kfHdJrCzjlo5TW1861eLrU5wCGJDxbADwCCU%2BFYAXwYxsfnHbpsBaGL7IEAAjv1UU2tsjWkScBLN0%2BN4YLNDl%2FZu6WrqxqLXa%2Fkm30w0b25JNJ9nDKQA%2BgoIGdBhIr8qkLYPQ5KdmGcwCzzJEnP4zfAxFEuxTd70YLLpz9JtSCCeEDxv&X-Amz-Signature=337fc251b065462965c271f22ceaa3e5d39c478f1ccd7187765bbe680f78fed6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YBJALF%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIGSIFYjMu1ex8DIjIWA3JkhEttLEC2szQVGqvsmAoUSyAiEAlsUZdATt1Y1PFcjw4I2WJaJ2vySt68Q58nSYMuJTTD0q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDIKIFX4u8KTvcJo%2BqCrcAwpB3pbbWMwcixFWA0Z58Ijh5zhtzs%2BO%2FDc7mK%2B93dpaL0EciWFgUoeUZHIGT9AYt06aUddrMy6q572oiU2yNxZr3rPWBl6dS1nIExa8c7eqQYwj3yGNV13mrVo8lrBoMsP6mJht%2BWCEIpKZiT4dZNEVQ5v5gHQ%2FSV7e4rh2ExKO7%2Fs7Jqia5CcWivUHR6vajTrsHCJpk7w0cCJjR6ak2qBnDE0AIHzgbEvCYQ8X5D6mMH3f4UGqnL6Sq3dR3KZWeuOyTvW5Ig3TzMTx1OlRChIzkpHiThpHJvDkhhUuhNAmhexyXvyXD3omJ4SQSNsyH9tNfdNKpnyRNJ4W%2BcR0VW3cBtbQO3Vg%2F%2FBSFIsPHi3G8lcDXDdmi7G1%2Fr%2BMPy%2FD3VFAe%2F%2FpXDomJznoMcMvwVduW9U8Xt3rYD7G09n7Qr3hBl9cRx3DS93huCiLV0%2F1YKZWsv%2B1ZnGDnfoiSSGqPw7U6gp6FQGnTonZvUo0jA2DrLFP871Mi5YURY8X5DG%2FnmqrKS6RET5hc9vmWlRgQYpG9c5qKaaiyrxKJYjS4Fd3ipv2AEwJGQku9mfRYEMc8w0qfQtlCHHjsCV%2F2VfZ1ZcAxwMV%2BZldS7UbYeCWiwb6IYlC6nAU8vjfOt7RMMbKo84GOqUBzKVBqQ8VMBMQCmvLTMj3YzgI9UZzYkoAhcS1F0g%2FKKf2kfHdJrCzjlo5TW1861eLrU5wCGJDxbADwCCU%2BFYAXwYxsfnHbpsBaGL7IEAAjv1UU2tsjWkScBLN0%2BN4YLNDl%2FZu6WrqxqLXa%2Fkm30w0b25JNJ9nDKQA%2BgoIGdBhIr8qkLYPQ5KdmGcwCzzJEnP4zfAxFEuxTd70YLLpz9JtSCCeEDxv&X-Amz-Signature=337fc251b065462965c271f22ceaa3e5d39c478f1ccd7187765bbe680f78fed6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQS7INSK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T092447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFM9oLx0c6bdA%2FeagRBDIr50C0iRQvDLMIt50zPFifEzAiBlRy9W4ljeUJJ9bU9OpMqGa5h8ZP3Cb1kaoQQvelzNsyr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMFO%2FO%2Fa9t6TzuJRezKtwDFM9P4ktEexhWB6eE1k88%2BWs%2BN%2BVnvg1nWjXPBiJl0W1OdVd5ahIyeVUFsOnhHxFVDvZAmBy0NIkpG5LJ9NdIHmBhjTYgpoXn%2BXfLlSQzvS%2BvPm09RXV0Y6%2BwqUnEEoyinfF3qImWKUOhGqqmEJYcLUBu0ugs1b1EJe2TgvN7J1CCDqCR%2FaXxc7djYwYoiYuoae2lhS1V54v9Sx%2F0Cd5avBZNlPFtHvXb2viGxjCN358ACquxea%2BZ7iw5YBoFmx1BDo1LFTssP7CL5kdQLBbMmKQLePa4RJjrEjquE3MAgNPBDiEvmQvFUbxh0hUqXCgWb9j47VWxVEEs%2BNCRCe6ddX5QIo7VI9Mb%2BoWAE9QQXxkEGwV%2ByEuobeCuzkIkhsBPqCoBr6XQmQbt4COf7oVLCwVNrHqwGG%2FCCxZXyQLoOzoNP%2FFvnh213gxSBzhCLNEiaPMDMUepAoZ1udwwQ7tNHoALkFj5uI5XZo3qPNfiqCGXU1Av6ag78864H7Y42d%2B3BksLBneBxfAVaJQjRVE9icIxVyQIkAQd7jSjhR3iB7M2pKMwCTTYQL0PV%2B8G8BQaA58foMqaY9KPfboZrR2v%2FgLJvWyfdpqXP34W63p0cmwYfnNAeh7FGu6WhkcwqdqjzgY6pgGVFzlgQlnG0orjsOvOifhJInmwoxqOZSNllogBzWX5RrdNsjA8fc%2BdCyd%2B18pIqK7rYeNUWBV%2FriSjPjKWY35H5oAkc7zgfkl7b7BKV9iaTYiK2aJjwYccc0URK%2B%2FNmISG5fX4qLdouytguwKFZYYuzC%2BPGkfD2amGLunfSEhPGOQE55tiL11myQEBwyvn2MPvQ3MGIZXEPlEOn8GNMv%2BrCYYF4LcQ&X-Amz-Signature=6c3b83315f8c6cc18149d507e1ee805f652e016f6c3326f59f3acd2511688b5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

