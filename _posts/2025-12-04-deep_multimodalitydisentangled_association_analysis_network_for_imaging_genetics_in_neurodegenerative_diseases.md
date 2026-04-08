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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UMUGIXS%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCqrzZRtsap47nr%2FWpJ6zWetnjHoZsBPlaWGKHDocKJdwIgC9me1%2F8g%2ByOLsPn7TUEgLS%2FtcdZLhtWx1RXrI8dG%2BAsq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDEqD9zMp%2BkYbj0GzByrcA0HrJGGH4NGe3QPFClQvLBQFj198n8ji5t5k25LlHkcyu%2BLGs9jehO%2BLcBmAkHp%2B4Sym5F2hiP9cb%2BUiNX5UaBGWXFJm6pVMZkFMefvbs4EsFn%2BA%2BsBPx86%2F00%2BFC4Ndekg2q5MALGWJOhM2hrHxP3m80z1AEF1SKTlL37IghU9snfYu%2B%2F%2BvHWwaPjUqmKxlkXAeHHyn%2FMcuUFQiSqgzf82LQSY4X%2BshZ8tTBilN1EN3c1xZU3LcxQ96tYQpnEPtCwzFc4XnNbCj3B9nV9kFroHZTzq4gR6VVwuY026LWMkwRbpOGz8PEDJZndoq2Hzz4ksqbM1rahJidS75P4Q%2Bx1DC6DmCRDyFsMA%2BUdzWHURls34xEq%2BLdIO%2BE7iFred02zz5HR5U1LDLkiWQESYEmgHU1ig%2Fuj6dtcNoJGHVFrQdf2nRArB%2BVvMvBUTzoeB3HB2hE4ozf7871CFTShGLyTo9eMK%2FKR1WindCsAEfh05EPWh46Oe46p3DCagkas60PpyXpO9R%2ByOKTjvORHyI2NTP6%2BjOZVvN3Q3QWm9BDjIewL24r9V6h55CceGBvZFJrfMysWhBB38ONkMMeegzmR%2BdZnFK5vmb0QokoqcymwgiHXWJbbtV3bb%2BW%2B7sMObt2c4GOqUBHcBb4LMTt756Bc05wJkSqGlH6PKRxv0vyRVjBGl%2B26xhpZborhfZ3fOtR0K%2FgQeTvui8oNHvVtvSWH3HaLbelb1mzM%2Fs0IhWJ%2FfnRS2%2F5vymwpU52eJPhqGPQe2YWrjqKe1yPeOSuKeFtKa9ywuTy8MAK%2BG5oHav%2B8qLBC%2BQF%2ByM29KdoWNN6B6nrZU2NoQZC2xhlTuIFTHkQ61K5nNBfUARhUll&X-Amz-Signature=84ef0e521c996ab201d8e950309a050ca62e5144c231639f3ba55714dfd2158c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UMUGIXS%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCqrzZRtsap47nr%2FWpJ6zWetnjHoZsBPlaWGKHDocKJdwIgC9me1%2F8g%2ByOLsPn7TUEgLS%2FtcdZLhtWx1RXrI8dG%2BAsq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDEqD9zMp%2BkYbj0GzByrcA0HrJGGH4NGe3QPFClQvLBQFj198n8ji5t5k25LlHkcyu%2BLGs9jehO%2BLcBmAkHp%2B4Sym5F2hiP9cb%2BUiNX5UaBGWXFJm6pVMZkFMefvbs4EsFn%2BA%2BsBPx86%2F00%2BFC4Ndekg2q5MALGWJOhM2hrHxP3m80z1AEF1SKTlL37IghU9snfYu%2B%2F%2BvHWwaPjUqmKxlkXAeHHyn%2FMcuUFQiSqgzf82LQSY4X%2BshZ8tTBilN1EN3c1xZU3LcxQ96tYQpnEPtCwzFc4XnNbCj3B9nV9kFroHZTzq4gR6VVwuY026LWMkwRbpOGz8PEDJZndoq2Hzz4ksqbM1rahJidS75P4Q%2Bx1DC6DmCRDyFsMA%2BUdzWHURls34xEq%2BLdIO%2BE7iFred02zz5HR5U1LDLkiWQESYEmgHU1ig%2Fuj6dtcNoJGHVFrQdf2nRArB%2BVvMvBUTzoeB3HB2hE4ozf7871CFTShGLyTo9eMK%2FKR1WindCsAEfh05EPWh46Oe46p3DCagkas60PpyXpO9R%2ByOKTjvORHyI2NTP6%2BjOZVvN3Q3QWm9BDjIewL24r9V6h55CceGBvZFJrfMysWhBB38ONkMMeegzmR%2BdZnFK5vmb0QokoqcymwgiHXWJbbtV3bb%2BW%2B7sMObt2c4GOqUBHcBb4LMTt756Bc05wJkSqGlH6PKRxv0vyRVjBGl%2B26xhpZborhfZ3fOtR0K%2FgQeTvui8oNHvVtvSWH3HaLbelb1mzM%2Fs0IhWJ%2FfnRS2%2F5vymwpU52eJPhqGPQe2YWrjqKe1yPeOSuKeFtKa9ywuTy8MAK%2BG5oHav%2B8qLBC%2BQF%2ByM29KdoWNN6B6nrZU2NoQZC2xhlTuIFTHkQ61K5nNBfUARhUll&X-Amz-Signature=84ef0e521c996ab201d8e950309a050ca62e5144c231639f3ba55714dfd2158c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEE274DW%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIFAhP4RuS0%2F4ihdLfY8RjrsA004zSdoxauKOeeaGoERbAiEA6pQRap0N%2B2N7PMdVC3P%2F20kxze%2Bk5ISio0UzxCKYFFgq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDFQ6J7TG5qBWO9sTxircA4BIzdVcKdS9g2M6nb9EZrc0Ii0Ub2ckiqIiYtOzA3QZlCKRGYzjEmUbv00PmViY6Qwe7quH8K9My1ONJFvVFXCnQMH8xoBrBapNL5S0dWllDPOrarmEgtiMKGFfpmb2k3ZydHyJwL6PFLwFt2BHUeClcJv4cMilMM%2BaDHRhYEhFApNHvC3bsqHKDk%2FX7%2F8b8vA81U0IMDVQlZSDw8VxL%2Bh0FnX2ziaBEFaQBr%2BDY%2BY1jzfUrO9nFFVO2gb0LGX3MPF9yEWFVebnKE35rK6G25gwJQz7PXl6a8rPVayiSG0ugerLYNvWyxI89kSNf%2Bim4rUN%2FZ40Np2D40CiFky101wmQVNbRVLud9okZLDyd1t3qGMmnGO%2F8uyBb4U7DVNuVh5Xjqlxq4vpCZmtho1%2FPZkG5EoIWlD82NaG4RwpcD5RSBWY429Ly3Dqh8luQUhTBoJlS9MPBnf4%2Fazk191A%2F3z7PXGKMYP%2FHUlJyLDxUycm6lZSFeGQ2iN5TTSG0oo%2BjGps4j5brtdfDGBhADTtNrmIkG3isqpTc8OIqEhN%2FYUS%2F0VH8F30Gd0AKnUx0yNW%2BvOWuOCm9O7c4%2BNM6BA%2FZm9IHdH9LFw%2Fl2OISnx%2Bp50jGl04L9OvsnfcAZLBMJHt2c4GOqUBW2BYVob97Y4gFlBRcTKA9NdJ8wAH%2FJB3FKw8jRiPNgR%2FrlMGKsdoN6K6vRCFOzNfqPWp1tBzoUt5P38SJFmFq2qWNWmDBrDtORFzYtnDlK4RT96hCFsYdk4sI6iK58j7HQnXqVfjJPRx2L1qdH3fdurE9hQ1HeUn4aaSH1oNY%2BbfeLJh9hh5CzRQOEt%2B0MLk8%2BHo0W6AbE67Seh%2B76A6cdd622zJ&X-Amz-Signature=5adf3a5eed670451a5ce93502766a615b490b928293836d76d847ca93d84b8d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZSTTMFU%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDJLfwi8QsBoUO8nFKuMtt6jArZv%2BkBZImNYUZVS%2F9bVAIhAIn0xULy65NGs1weXEnjZsCz9Ju4FFLFZxEMSeupdZmhKv8DCAEQABoMNjM3NDIzMTgzODA1Igyarxl9uKM3sHAGv50q3APqRfdWE7UsDgu3jFh7uPWi%2FnQ42gMU6%2B3G5vM3ZHgjg6G%2BaWD9YC3JRj5T7Os97QhubyRnaHViwNSa4sGVurQif0qRv%2B0Bnm458ebPZmbIhz7SgVa%2FlTXR9eYR9QOw7JHCsw3PW1%2FNrWhqxboYFDGRWYVW2nV6gZXqAEC91j8RpztRD8QzPV75T4YznZw3m1gVNNpM7kwvo97PMBbvl4Re99JvJtLAEEo4MTCIUi5cnuSFCVmKHvtzomqZbw3fTmBh3%2B8M17Y8RL%2BptcBHpitGHqOggsFB2nzH%2FWsbvqDYlYKNWlAO99AUVm8L5OAWOLtNLRAAXVsYLK9RMW7OFTeeiJeRdFGuFscpvHD1ltK8AYKDgU5V5L5VPPl%2FyEUpUL7yx3ObLCCHI3rxxH%2FbPU64LczKIwv%2BXQX5atMw0jrxmIeiZm2OjATwVbhOPJA%2FqKKBfJptJstYxcz1mfW%2F6rDbTw0wQGtvOl%2FZt6LwM67K6BfScbjRROpWuhJX49nJhzxhXaoHd7dzHOlYNDoTRCvklN2nd1CD7Wp21R2UaWWVhi68gReE5zZeE89GhFsygLQAR%2BzIyszdFmPH0g2YWb3utmp9MxU%2BvQ4B7wqNFL8BelvbCgfobXOKp5MbfzDp7dnOBjqkAZLoFZ28ioCmXGCd3piJLzxVRM5ug6x7w00muRzCKzQ66bWKqn%2F6uVVY6NjX4JhELhzGyD4P1CK%2BHW%2BPGDsvSoaOPOY54kaRHk2gXnAv9vSMF5e2li%2FTUgecXJS1%2FUcpp8Ar5lHTpjEYfabHM0XpbJuItROp1OqXbk9Rf%2BXskvlPZ9Ugng6TZ90sWnsdBirrik2jv%2FbJzQ5o1weqMeKvflxt5YrX&X-Amz-Signature=65b5d7df5e14ee1af5b17e7cfb38a9518386e373ef2d346de0798d10a25d42fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZSTTMFU%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDJLfwi8QsBoUO8nFKuMtt6jArZv%2BkBZImNYUZVS%2F9bVAIhAIn0xULy65NGs1weXEnjZsCz9Ju4FFLFZxEMSeupdZmhKv8DCAEQABoMNjM3NDIzMTgzODA1Igyarxl9uKM3sHAGv50q3APqRfdWE7UsDgu3jFh7uPWi%2FnQ42gMU6%2B3G5vM3ZHgjg6G%2BaWD9YC3JRj5T7Os97QhubyRnaHViwNSa4sGVurQif0qRv%2B0Bnm458ebPZmbIhz7SgVa%2FlTXR9eYR9QOw7JHCsw3PW1%2FNrWhqxboYFDGRWYVW2nV6gZXqAEC91j8RpztRD8QzPV75T4YznZw3m1gVNNpM7kwvo97PMBbvl4Re99JvJtLAEEo4MTCIUi5cnuSFCVmKHvtzomqZbw3fTmBh3%2B8M17Y8RL%2BptcBHpitGHqOggsFB2nzH%2FWsbvqDYlYKNWlAO99AUVm8L5OAWOLtNLRAAXVsYLK9RMW7OFTeeiJeRdFGuFscpvHD1ltK8AYKDgU5V5L5VPPl%2FyEUpUL7yx3ObLCCHI3rxxH%2FbPU64LczKIwv%2BXQX5atMw0jrxmIeiZm2OjATwVbhOPJA%2FqKKBfJptJstYxcz1mfW%2F6rDbTw0wQGtvOl%2FZt6LwM67K6BfScbjRROpWuhJX49nJhzxhXaoHd7dzHOlYNDoTRCvklN2nd1CD7Wp21R2UaWWVhi68gReE5zZeE89GhFsygLQAR%2BzIyszdFmPH0g2YWb3utmp9MxU%2BvQ4B7wqNFL8BelvbCgfobXOKp5MbfzDp7dnOBjqkAZLoFZ28ioCmXGCd3piJLzxVRM5ug6x7w00muRzCKzQ66bWKqn%2F6uVVY6NjX4JhELhzGyD4P1CK%2BHW%2BPGDsvSoaOPOY54kaRHk2gXnAv9vSMF5e2li%2FTUgecXJS1%2FUcpp8Ar5lHTpjEYfabHM0XpbJuItROp1OqXbk9Rf%2BXskvlPZ9Ugng6TZ90sWnsdBirrik2jv%2FbJzQ5o1weqMeKvflxt5YrX&X-Amz-Signature=13a225d17a8eadb439b002e895b872e0154aa510edc75eacf9ce73921aef8516&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WW7PLRHV%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIAcW8YFCs3ZN1IXHmOTfPZ3GaDbtg6VlLsBUpl13X3v%2FAiEA0Gc7N9zH533Pt00SvU3%2F7hbZSPlI5wSR3oJRNKeJ770q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDAKo%2BKZpr7OY1WcidyrcAy8gFfJEXfvTTHEK%2F5%2FUE1oSNVECXcJKh19uEIhA54I1MoVeWxaBeBHcwOYMMZfZ6NXWQ7J2MsfqpItSdfy2Wq3mKjRF7bB%2BRx4dIGDboVp00j%2BW1zmuEB7KN6wSprulUlcAphUuYlx0BydKOwH7cv0UtUdGSUbKwxsx5aTzgn7SRPfHhKtU%2FOy%2ByXXLf6E8TxsTV%2FdVGuwsf5ONH1Nb2gFlMsaSJgSHbQ2MZPGhXBNRM4bHBmaoaRMD9v6dovIT%2Fzcy%2BX%2F1Lz075Lk4OTMkU8SYYfVHQWstC2TaSRYaA26B2oz3MNAM4CziWjmwrT5lyXd1NY%2BuWO4jAgyt7tSrvbQUZXMCpmP2CA4d47pGHHgMa%2BW63MHuejeFZu9ptPtY02vthAQJtYbHCc%2FbQhDBJ%2Fbb5etSAnCbMqt7gq%2FH%2B6i738c85vnl%2FZH5vQZnEJLsqR0W9MWSJD7Nd6sTXsXPpvgY03tEyNr%2FNUord8J4hKhhsacpvFcln6g7Me9YI3TW6XM3wdJRFf2Rv%2Fbc2qgB9nvztQ8N5tvnTCLnLUFWHR505xJThoIwLYSoyVztFKC5enNISAJfcrWSFyz%2BYzZ8dV2KsrutcXmwkINy0y6Y3otYyY%2Fj68dAb%2FaJ5uNCML7r2c4GOqUB76zqZO2IkRmLmCNvS8o%2B%2FJ6ky%2BhUexpIKhYfAx%2FDzxs9cnwvb1iPi%2BBllirQF4VhqUiwsX7LyCAN4oWeXewAK3T5N7DzvBs690ztKYZ4nXnISLXTWc94ZVbcrjHgsAE5w%2BWV6XR2lObagd1WAUniBcvvx7omMOG6hJOmqIGDNIDr7%2BBc3ofvl4I0ewxZ%2FMOMOxudm%2FgUPShoJomx2ieb7OzYd0mH&X-Amz-Signature=11ee32a27319859814c36b3cfe9ec13f67f68bfef96c9abde228b0feeef142a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4BG4DE2%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160415Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQDOF%2FgBRXjW09dwrGy94CMD1K1pwUH5e2%2BMIMysp4SHgQIgKFGVzt0GKGkeT3GLnGU2sNqMreEiaPfjd%2F4gtFv4TXgq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDCiAs5Qu7cebN3JXvCrcA8HrQAyl1OipnIizq2cChL0fgcUWZIGbCDJ35HUTDq%2Fn19n3STPWJJVLb%2BzXd5z8aY91IhQ1tJVbxOCxbKQzpeIByghoL4uxD9YKnu7Nmc7sqXbK2lSX21zHNKN1HcsNzSK1KqZKfN1MkEi8wOXv7mE%2FmVO2Go6tIwDDLScUvHR4RnIyFY2uufQ6fljC6RucSsLYB5JjSQB4%2BqMVN4COKm3LMgIkhbP9nvf9UqCgC3qngruBUmavWKeziNZxVvrwgnKqCHfAJQon0a5vjgxxBIvyFtd76PwB0qBK%2B%2FWIOgIOs749MgEaZsooiB17e037fETSLqO%2FL2Wqmoh3F22Qe%2BVOKMwUz9g6uQvtSuECcbwO0VhPlOELGKChrJWsu5jMbWvVSGhbZ3mYu2X%2B8cq9FmCpxqBvP7OW9sqeFo6od1uMzLWn4WTNnKBZUqidmPojVNONudlemU2d%2BVx0RmMfiu3mLPqnFOvBdtIzuZ8PSHDygNyFHPfE6hWhX2ffW2PDIPhYk%2FwoKKGopNaME6JTqsk2K3mMZcumZVVIpMYX%2BA9Xi6ipxegc2L18k7ca2hq8KtP69fo7HWTU8JuBd6PjL1vL3XKptcoMNHeRFUUbkhnRPy9KZgXmPu5Agw9RMLXr2c4GOqUBKyQNYu%2FOk8cnbEWvtRJXdRJ8eKU1DpGX9fo5cXwxjH2R7mP8geS1Qj5MoswE%2FkGvOs84tbfUtxWS8Z3ekqLoz2MWcfuO%2FOtkC%2BPmtIN2YbEXoqbVRUWq0EN1p3trfZh3BIgjWzOa%2FaND%2F1x%2FUWQcRda0bgwsizxnslAX%2B37qkx9npg1A12Oj7FyNF1zjIyXgSJexpJGoetVkXxF6%2B8B5LOj3uIMC&X-Amz-Signature=a45fabf6b84d0b1069ddde7b305197effe3236f50b5be4f3a86fbaba73f4b169&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QJ3ML3O%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIA%2Bt7327R18294GUzDtoGSE3A0lVFLWqyCkvA8cxXdNiAiBU2i2nkFEdq8th090m38MyMdcp4yfF%2BAOTtPAsIfPUcir%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMaNdzHVVk45KXtqStKtwDejZMTsNFrlMUrq5oYFpq9sCJIvf5kh2828C8RznS40mcU1ch51otxIGTK3CfHXxoxxpQ8aKIKKg1np%2BEBZaF3llOx7UHkMm%2BI%2FL4fc50eojGeBWd2KDXOUslhbwkXWB5eAbgd2ImNGZI%2FD%2FpoyMbrPn58vGMpKm0SrnVcf%2FDFKeN7xzLeSJGAnvaHZtU36a2cITISWR%2FVfaO8JLcjFtN2behBnu6RbBEQY3pKOY8HfvGUnCq9SPCLhShzFbm1y%2FUV35X7qUwit1ORx7OrmYkv%2Fq7xL8vyYg5fijoVGw8sMjKIBKOJ667anuNJwjkwu02VHVTz%2FQ05jJHmUPMsxE%2By3MWVC3Ha3MLxYBuHBekLEDQ%2Bbf8%2FqdykG55mcZpvxtWLMUkW6NBjq9YhEtPbbhuapbDDRPNnti7RcoJOJKdyiZIrxhNwB646BvXwNefRy3Z1A11b0yvvwQcenRy232X4x6HIQrvV6ItQiUYbjim9z8s5YPc8snB15oOx6nAEQ5NWeigsvVHQbUxTzJiygzo57uSEkfvHLmon4oKLwYXABzFa4u2FRi%2FqpOejL3E4Yv%2BpOfIL1viPB2B54d0IVr%2Ff9ISTnQbBJHm5%2Fx0Myd8q%2FS%2BYY96AcrucSazszgwvuvZzgY6pgHdbMb6yEZTfRxYcXJgOQH9XtYM7NfSOrf5vSdkyb%2BzqYfPtya68ovK3uSIg0BFqdu%2BkkVwYlie2PnzrsPDI3e1%2FIWutzudaIsKrjhOXbNJ6PY2%2Fegx5qC0aZOlG27dHRkc%2BWJjBByleba%2FKDPBpLk20LBGe8vzGurY3fImDlgjrSbPuZ6%2BnKVMxAIXIWm3spT6hEMYw%2BVYG5ze%2BCpStvkO0oBQFvc7&X-Amz-Signature=6c0a68b941188b0da4382d5f7b71946b80cfb77fd95313622ed651df7ec26f4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPBYUF4J%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQCHf7p%2BM3KysartxV0qoGo1oYZE3miIqwN22KnoXWU7RgIhAOYuREXrYMnO6B%2B0iC2ZIf8n1TR4QPa4VRJDWe64K17yKv8DCAEQABoMNjM3NDIzMTgzODA1Igwxf%2BNdAtZDBJiwbZsq3AOHHD7c5pQSKJUKEiv4DzmYAeROzbgBe%2FiiXawSlKSlG8t3m6RZZghaOOAUvpZTWZd3W4OM3KpLCln27FEhDHp4rANZLSudH3TqjL%2FOU9LBs7SQc4Wmo6T%2FtxP%2Bqsfrb%2FqwPeSYusgwdF3%2FV3H4f8paIBRaiR8PTqGzZpol9R%2Fz2KRBfBx39OkvgD4nnOT40nOQ%2Fyw2nOur0SyG9Na63mYTGNyNzhFksh005Sdvgi64V9a02%2BR%2BwsYAVkAgkQ6EVkj6OYg1bm3k%2BwEBOP1dcydgB9D%2BG3GfJ4SHiIt3RU5tONKOlzeNVUU6AcyRyKfTk5DpliMP25errjnKV4ip%2BVQQEEkLqndoHzJvxZZ9V2JqOdiK8Box9r9ewSkDfVcFmiQIC8LLrqal98kstw9taG4yHZNjEaeh5vT7HLadT7ssw6%2FTq7QiIOR8nrg3uRiX2l3oxHYbDI42n6PWGKNaOQ7qOiQ%2FGGxF4oUBS6tZ6HvoJN3QsiEC2L%2B9ihD6evREZ4jvK1iUqmy7iBmV3y71DcpPQpJIrFa4gTepIeNnaXama1bzCLOz5ylESWecDnFr1JJ3UpBa0MgFdRFKv723DY6ROOiFpRnIvWk0WPdMkNjUQlHvfUMnBmRP7T%2BVEzDx69nOBjqkATcc6u%2F5hOoNfDQqZ9bhkRNokMEZdQFgKHERBiJDJ71KvlDAfSaK8d%2FMDolRAVSr8uLe6vppQLV7yP3f2OVg6wTm6FVYszyhDqs1Or5iaUVmbTCvUkduEyW6pdMf4fyxp%2F1nZd%2BgA162BfvbOhJ3BeY%2F1TT2%2BA75tY3ZJLZsj%2B5FJlgKfFGEaL9XlxpfXX9%2Fuz5clpKaavoNGogISCnXMYs7Pp7G&X-Amz-Signature=d27a39ec05389c85d5bd2c147f1033bca3ed055a89192b5215014ff0a4363dd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPBYUF4J%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQCHf7p%2BM3KysartxV0qoGo1oYZE3miIqwN22KnoXWU7RgIhAOYuREXrYMnO6B%2B0iC2ZIf8n1TR4QPa4VRJDWe64K17yKv8DCAEQABoMNjM3NDIzMTgzODA1Igwxf%2BNdAtZDBJiwbZsq3AOHHD7c5pQSKJUKEiv4DzmYAeROzbgBe%2FiiXawSlKSlG8t3m6RZZghaOOAUvpZTWZd3W4OM3KpLCln27FEhDHp4rANZLSudH3TqjL%2FOU9LBs7SQc4Wmo6T%2FtxP%2Bqsfrb%2FqwPeSYusgwdF3%2FV3H4f8paIBRaiR8PTqGzZpol9R%2Fz2KRBfBx39OkvgD4nnOT40nOQ%2Fyw2nOur0SyG9Na63mYTGNyNzhFksh005Sdvgi64V9a02%2BR%2BwsYAVkAgkQ6EVkj6OYg1bm3k%2BwEBOP1dcydgB9D%2BG3GfJ4SHiIt3RU5tONKOlzeNVUU6AcyRyKfTk5DpliMP25errjnKV4ip%2BVQQEEkLqndoHzJvxZZ9V2JqOdiK8Box9r9ewSkDfVcFmiQIC8LLrqal98kstw9taG4yHZNjEaeh5vT7HLadT7ssw6%2FTq7QiIOR8nrg3uRiX2l3oxHYbDI42n6PWGKNaOQ7qOiQ%2FGGxF4oUBS6tZ6HvoJN3QsiEC2L%2B9ihD6evREZ4jvK1iUqmy7iBmV3y71DcpPQpJIrFa4gTepIeNnaXama1bzCLOz5ylESWecDnFr1JJ3UpBa0MgFdRFKv723DY6ROOiFpRnIvWk0WPdMkNjUQlHvfUMnBmRP7T%2BVEzDx69nOBjqkATcc6u%2F5hOoNfDQqZ9bhkRNokMEZdQFgKHERBiJDJ71KvlDAfSaK8d%2FMDolRAVSr8uLe6vppQLV7yP3f2OVg6wTm6FVYszyhDqs1Or5iaUVmbTCvUkduEyW6pdMf4fyxp%2F1nZd%2BgA162BfvbOhJ3BeY%2F1TT2%2BA75tY3ZJLZsj%2B5FJlgKfFGEaL9XlxpfXX9%2Fuz5clpKaavoNGogISCnXMYs7Pp7G&X-Amz-Signature=b0ae17f4aead662ad1dc2fdd5e32fce741bc6c33af1e068e4718a50c4a716b0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46624OGBFL4%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCICjhrlEyLmFUnVSYIT8nRFJEiAVYE8HMB%2B%2B67ScsYUTHAiBz3tGa12ic0R65Ans7Q6Be3OMp4TTYnOG2Gj5bv8e7mir%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMe3xAhO8z6htQVx43KtwDhE5bJj6KeBAWQv9c489iiuxiB2eSSR98q83F8rH926VJ06lkGFxcQK6cEyhJ92xx1jkDaavLCTCNLo7eAyEqiMcvxA37rWSnQO5woDj5E%2Fhi9ZtbefGbOaTjn0Kl%2BWPvUTcddydotJLM8hfJP0LIEBg3jtyRluafg8EQHz8hmrv%2Bl6dzKX7uUTEplF%2BD%2FSvbhd%2FJBgIEyemRwIkWUC1L4bWnVawaUsHl%2BKL%2B%2FA%2BQPlyD20OJR1Tr6zTwq%2BV5BWAbfObhs7e65wkZtlwU3CRXaBKINUUXsAGNfGIRU4BT%2FB284Ovqo3uEiqejyhM3CqMuHlGFX90tnUx%2FVgKIwUVoT0Xc6oj87z7jh5V30Gkn%2F5zoJhs2VNo4m5W%2FgRKfH14z2rnak3Vj%2FJAiBGlvAAByKmfy5gUF1ErLbxicEzMQ9BOQIvEQ5StTznGp1NoHTZAFLwAUPykDIBNM7OpnJNvQ2Wf8toQZDVEd5riA0T75aWlL1i9J7Kv3SuCeiWbJtAWiwKmgUWi0dvegjXUi8disMEBPOrm3oAdWKu6V5c2Sx%2ByvVRQe7jCRdWhPmToxrHSSDsKSMgolQSM1I8CDu2k2cAjcACg8mWcRoRMfbIQnzzJX8%2BgKfsey9YEISQ4wyu7ZzgY6pgH6F0TqSgtOw20Su8k72LJrjN1aDfoDz3L5NtpGDhdu%2BKAmGdWZWsw8gAQunzJoUIZR4fJneDYor%2B0MiYnis99LlOp5xyjpZCpnVrd71ZkH56pBZeHVW2M4z8ewk4VwXEpmJkp6QFk5SpJdQc4Tb2i%2FjplOxvQkCKYc429FqYl1W3PSVX%2BQFcxo5eEsJIaHnVfPT84pGqbNb9msJ5cs9JcfA%2Bbc2ehN&X-Amz-Signature=3ec86a1c64bcc5e8cf3f0bfcce9e23a56788a99d1faeae30a9dd68fa4667e573&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VYHRKWK%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIEJ9O%2FVaN2zOJJCtgktIUTq6IXoFSpB4anhiXdwHdr%2FvAiAUHThaujZfD9cyJp8oJl7qkkAwhI11HzQPPCbe7rGiryr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMxKloAFtr%2Bw3B3M1zKtwDnJ9UxqgVx1FmrXovRWyMja8odpAJ1KIpeSwM4fwsTFVZVqwyMLAlr4bfimfg8nSbT6ePaxOffsGqjLMOmhVDcSbfPEUeQbhkRcrdniLpl7xo8GOSKuQQpqEvO%2BVvRH04Dj9KkB7BUTk3JNr8swwInSIo%2FYN%2BcV9%2BcFVKcSApVlKrEHJWK%2FDrmaMlizze6kv%2FiayIosWispvvOvRYc094u3cUITFJSBXs8LXeWU6XFLXS7z8mGDEpOJwuHoF%2B0I3bfBs%2BNjC9q1PwEDGRElQ8lpma20q6kVlxiBrmAgDt5hZ2Q2o5Udc9z6eXJUWtLhnxwQdbTH6xYupIV57IAU4JwrmwNbZGitmpVdRou4tQuD29iR2212OCUZdc9edRg9Wmkhq13kSSCL1FTYg4XKVtXJV2zrYY2Kye%2BF8az7C80tQbhzNVoUMwX5UzfrykA%2B2SGSZWefWopEKxtHi3q7qu%2BTu38qdXmhQdRN7wJfFDdCl7FOI3pnEFhsJfk6RtRuMb3HwBKcsLD4dL5F2UjF2DU%2Fx5s6kQQFuhxFY0r%2BewpTxJwRqQvbxHGYvspWuWQGGVSWPQonLT8DbWNxm5cy2rpEQ4I9FX1zO3YtC%2BP%2F5VSyrzTdD%2FheAfOPLXThIwue3ZzgY6pgEcO8UI0U8uC%2B6Q70%2BTi6B46yk6wRApXoOq9GRPN7Brt2lAzJTJE3%2BrMHCg5ASaiX9%2BGEz22Quu%2BasaoPZuB%2BIHXWXioJ1Bh7fjq3629hoRWjiptKt2oXuIZvphF5wXH6w2x0nflO0i228McmPcnCm1vPI8829OcIZiNQgkaYYhdhjRGjBGynaJfN2wKOsggSQBJMsS4GUAp5j4%2BzVk0Enf%2FjFmBYxg&X-Amz-Signature=e01fdd14a12c7ecc7f97321b27df26cb8f2bb8c4d5ec07904eb6e594d9543de9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VYHRKWK%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIEJ9O%2FVaN2zOJJCtgktIUTq6IXoFSpB4anhiXdwHdr%2FvAiAUHThaujZfD9cyJp8oJl7qkkAwhI11HzQPPCbe7rGiryr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMxKloAFtr%2Bw3B3M1zKtwDnJ9UxqgVx1FmrXovRWyMja8odpAJ1KIpeSwM4fwsTFVZVqwyMLAlr4bfimfg8nSbT6ePaxOffsGqjLMOmhVDcSbfPEUeQbhkRcrdniLpl7xo8GOSKuQQpqEvO%2BVvRH04Dj9KkB7BUTk3JNr8swwInSIo%2FYN%2BcV9%2BcFVKcSApVlKrEHJWK%2FDrmaMlizze6kv%2FiayIosWispvvOvRYc094u3cUITFJSBXs8LXeWU6XFLXS7z8mGDEpOJwuHoF%2B0I3bfBs%2BNjC9q1PwEDGRElQ8lpma20q6kVlxiBrmAgDt5hZ2Q2o5Udc9z6eXJUWtLhnxwQdbTH6xYupIV57IAU4JwrmwNbZGitmpVdRou4tQuD29iR2212OCUZdc9edRg9Wmkhq13kSSCL1FTYg4XKVtXJV2zrYY2Kye%2BF8az7C80tQbhzNVoUMwX5UzfrykA%2B2SGSZWefWopEKxtHi3q7qu%2BTu38qdXmhQdRN7wJfFDdCl7FOI3pnEFhsJfk6RtRuMb3HwBKcsLD4dL5F2UjF2DU%2Fx5s6kQQFuhxFY0r%2BewpTxJwRqQvbxHGYvspWuWQGGVSWPQonLT8DbWNxm5cy2rpEQ4I9FX1zO3YtC%2BP%2F5VSyrzTdD%2FheAfOPLXThIwue3ZzgY6pgEcO8UI0U8uC%2B6Q70%2BTi6B46yk6wRApXoOq9GRPN7Brt2lAzJTJE3%2BrMHCg5ASaiX9%2BGEz22Quu%2BasaoPZuB%2BIHXWXioJ1Bh7fjq3629hoRWjiptKt2oXuIZvphF5wXH6w2x0nflO0i228McmPcnCm1vPI8829OcIZiNQgkaYYhdhjRGjBGynaJfN2wKOsggSQBJMsS4GUAp5j4%2BzVk0Enf%2FjFmBYxg&X-Amz-Signature=e01fdd14a12c7ecc7f97321b27df26cb8f2bb8c4d5ec07904eb6e594d9543de9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AFW7NVL%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T160419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIA5sKMy5BNhqa%2F6D42NoVHzTpHSNsGY1NO89TOhEzKyvAiEApZYlhNjukaUAUh%2B5EX%2FcU%2B1EcjuDdeofPy06%2FjFvcJMq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDNakzzYSDv5LQFQNrSrcAxP1%2FYL2HqhcXcQ%2BIMK3JCk0lHbaionUttMHdNQSieESIftKIhqc2rQFHZPwiLXgvgXO01bzuQiOCGBRj%2FLqg4SSJkyidBP2jChC0P%2Fm2toq0dljyEzVSxvU5Fnv685SUV1JJKSTtNJ%2FZcxy6ghqrOA2HCYwYlxb08eP9JhvyLLNxrHuN8OhrHh78WJ9fLH7LRKNjELinJmKmCSYrLA5AJf%2Bhwr3iKWBq7nHeCbNjIq%2BV9iIWwgfQZxUGVVxibEre6ElxCv4%2FfNj8%2FdzkulN33n8TYBWOtksAr71jIzPoQeOFftfKHeTmjDjeT%2BDVE1sO0afSibus6t4BK9Czb5FuaibOxcZnOyEr7v6nbC8IXfB51%2Fxy%2BcR%2F7BtmrQv08gGnZwGjL8anHoBgEQDLKHJHB0zDEppOu%2B4kESBNp3NSEesmi6ghrA2omnovgBeXEu3e8d7tWwZKLAHYY7HCqz3%2F6bF1d1RIY4gLsuVWBeXcSjZFzX7YG2Ctsu%2BaIue3YurofDiuHEiy9WYmUq9pdoIobX3J9SQFb2Gd09ELlTyG4Go4YVw77da%2B7oakbxsfWDDY6NmzifCdcovl1kNujI2w866jNAmOE7j%2F2Xyr7yKvE353lBkKD6r432rMIiQMMLr2c4GOqUBafftsDgqQcMtBx%2Bnm5s%2Bwhv4ZlcLfE24o3%2BF%2FH%2BXRiP9SK5vaW7qvcWsej2jOB77pu3xg6kqXWdDBRmXviW20h2b5rp57B2%2FVS6wpefK5go81atKEFunBUfYb3sZbyUpGVpfz0l%2BIqtgoHl8DQt7aTI2fgPkpWbiOS%2FFmDV7xVOhCiXEMdT%2B1TrMdB5vbT1RYDLJZn1GAhbX8yECOQmAvGzVqYtF&X-Amz-Signature=930076caa4e1b24c967b5f49d57a8006cf0589db8e53523372c1161c9b51b130&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

