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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NXJQK63%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIAxRMna83Ckppf56WSEcA2EVBLpQPfUoibmfyGYEqJ1bAiEAiHyDug42Uacu8iBo6FWqMhCZ9%2Ffa0fcrd8yrb9Tv9JEq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDAg8jF7nxVOBHCdq1yrcA%2FY5IlJmDop4J%2Bcy7oHkB7PSeAWXlq4c4Xd2geocAb68M%2BIME15HYe7w85PfjRgCc61lt1kFwLkegFAoEWSnNkcRVxIh%2Bj3EIQl9ABlDrRjjQHbcPpDPE4Htgn%2FM8abf%2FG%2Bt70S39f7qObxgWNLektbdeq0vHMSWZ5a5SPYqI%2BOWvVlGf%2F8iiVmGRGvgGe7p5wn4Gk8htbDgMloUzuEZwCRLhD%2B%2FlWQI0jW%2FD8RLpu8w1Ze2Ui3BOIW8fqy8q99dMUC%2Fmj3AAn6KBr7mSjkCqPzacIdYYHAo%2B3NsLW4YXUzdfu0f6WMA3JmS0ID40a3VzzW1BYVtUwUvEbpK7WzNce3cgd%2BSH12OyMm%2FlCNTXc89vXs4lW5t4nzc%2BdD0CYApixcy4oDrSADG6WN%2FP2D1GUDQ6UV0tBP%2Brp4QAc%2Frn6MYzIqGbDS%2F26%2BRbktiUhG1HMklk%2Fn%2Fn38z7GcOO67226sg8uAbNycSDbEMG4FcjbZc7MxmV69SzV9l1nEyEeawXhX%2BsH6cAl9eu2cGfzDob6Ai8EbRXuz1pniFzAYRpZQYnwXO9fEjRL5TGaFU%2BkSKwrMCZgq7KrFNVouKdvA6fJxGcvfhP%2FsEYbV9uqyKKYdH%2FzwUI1X9gtK7PGmaMJjso84GOqUBuSZaYbhl9FRHbzBxLPKFGe87wb2dqQ4SmTSeZMWXHMB%2BN8FzTlVTLCl%2FBrJYLfsFD0OLPj9ir0ioYECJN5A%2Fwe%2FDGoOlRGAI5Z4PTOpA6SIoIrdU4LtXiaFJYn7m2Fs7PWU2AgAQ8w%2By%2FIdH9gG07RPlHolW9lfAv8RgdNpiVqrHlcMl6H737npnZxQ1fuH1Zo9hfhfJ5WbH5gjqWcc75mTmPstz&X-Amz-Signature=e9d6841587674d6391ee9a7ac464059cd919f3f0d0aa5799067f5fe9eb513d3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NXJQK63%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIAxRMna83Ckppf56WSEcA2EVBLpQPfUoibmfyGYEqJ1bAiEAiHyDug42Uacu8iBo6FWqMhCZ9%2Ffa0fcrd8yrb9Tv9JEq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDAg8jF7nxVOBHCdq1yrcA%2FY5IlJmDop4J%2Bcy7oHkB7PSeAWXlq4c4Xd2geocAb68M%2BIME15HYe7w85PfjRgCc61lt1kFwLkegFAoEWSnNkcRVxIh%2Bj3EIQl9ABlDrRjjQHbcPpDPE4Htgn%2FM8abf%2FG%2Bt70S39f7qObxgWNLektbdeq0vHMSWZ5a5SPYqI%2BOWvVlGf%2F8iiVmGRGvgGe7p5wn4Gk8htbDgMloUzuEZwCRLhD%2B%2FlWQI0jW%2FD8RLpu8w1Ze2Ui3BOIW8fqy8q99dMUC%2Fmj3AAn6KBr7mSjkCqPzacIdYYHAo%2B3NsLW4YXUzdfu0f6WMA3JmS0ID40a3VzzW1BYVtUwUvEbpK7WzNce3cgd%2BSH12OyMm%2FlCNTXc89vXs4lW5t4nzc%2BdD0CYApixcy4oDrSADG6WN%2FP2D1GUDQ6UV0tBP%2Brp4QAc%2Frn6MYzIqGbDS%2F26%2BRbktiUhG1HMklk%2Fn%2Fn38z7GcOO67226sg8uAbNycSDbEMG4FcjbZc7MxmV69SzV9l1nEyEeawXhX%2BsH6cAl9eu2cGfzDob6Ai8EbRXuz1pniFzAYRpZQYnwXO9fEjRL5TGaFU%2BkSKwrMCZgq7KrFNVouKdvA6fJxGcvfhP%2FsEYbV9uqyKKYdH%2FzwUI1X9gtK7PGmaMJjso84GOqUBuSZaYbhl9FRHbzBxLPKFGe87wb2dqQ4SmTSeZMWXHMB%2BN8FzTlVTLCl%2FBrJYLfsFD0OLPj9ir0ioYECJN5A%2Fwe%2FDGoOlRGAI5Z4PTOpA6SIoIrdU4LtXiaFJYn7m2Fs7PWU2AgAQ8w%2By%2FIdH9gG07RPlHolW9lfAv8RgdNpiVqrHlcMl6H737npnZxQ1fuH1Zo9hfhfJ5WbH5gjqWcc75mTmPstz&X-Amz-Signature=e9d6841587674d6391ee9a7ac464059cd919f3f0d0aa5799067f5fe9eb513d3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZSDUSJC%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDetyc1nqDllxSxRV46CcUoYX2%2F2S66Ek%2B6L60ruFYQTgIgbfyB4Qip1s7hT%2BqK94kXZxJiZDLz8HUNju%2FAaaVnWMoq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDKLbxoQTLAvBkXRM0yrcA8Oj1woI55Bptd80adecLf1Kp3151SLLY0Cd9nhlWbVaeWUCrow0R0gRfcQ%2BBrFuTZSdT2rQYffT5ksEzYgfNlZ4Qxb6aTIK5GIpEUF%2BC8Bu5HlpsZ5qwY09nDLbvHU6z1SYCeQy3kavS6vuODOdJcYJZr1XNISGNhN8UVCjG5wZ0WQrsCaGusmdqOQzL5ewcbISjjDs6%2BirGQUWkNcwxgyKgbgh5L4tjZARnafM2vDHStJmNufw5rD8xBXhptEjWFCsawfvIH5kmTSMNL0iIONR%2B1gD%2F9j9P%2Fe%2FtJqYEzfpAvD0IiSReNm38lPAbVqKlaFomAim0YCQBWWSSYdtkKa4XXOvMimjgKZNxiQYBrAVgWBKY2pIzqWIEfPfxqqZg5Q%2F%2FU6Vw6myasjz4WSqUMQPtxPR%2FpVhgWecwjzjZmHu7wZeYHCQ73BjRY2Y5FEtvjNx4i%2Flspf0QmyQHJeIBI6nTms8bqvyyzk0oILfYw%2BiXH4OKrVvN%2BQliK%2BbXIL5PxNvGAnfQrPq71I6OJj%2BXxewUqjDb1s3V6qAld47v6nbK5PRE2RcRBi%2Bavhnp74kVOK2UWQ9xwD9Ci3ewZKnHxY5xkNkKF7FhdJQSiroXTCPA1N4AkNAsKyuDljBMOjso84GOqUBlVyyObht5Y6buherq37XfL%2B5Q15ziusPMNMJmIaDpEgfxL1hIPPLs%2FMVuYic3pgIuoS7f2b1c7KNdPSCFxZwmrZKpdHVhIgIxbKglyiYZLFpEmUfs1Hq6nLtVUFaZafoWKqJPxfqroaDUHxZsQk2sU5UkkGBeUuoqHmC6EVWdN4XFgABdZ8G9CbtEADv2tyatMoH%2BqHFzL3W2mf2hBPXIcw45nVH&X-Amz-Signature=c8679937dc3f1ced6defe318d6d3311563acef188f9fc4c5cd4185e815d710cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DSV4FF5%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIFPVU%2FCMmjld2uLp2PPFKUiG0o3IZEtndW9oqR3QI6Z0AiEAhjU3XPFJqlbm2NdcE2nLMGkSajMKDwVl3sHKRDiNCDwq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDKm2CfI%2F1etiXO5ZASrcA0Nwqvt8NPzXSIIS%2FPsS5KwC68bogUUfP6K%2FY%2B7DQUlCpHq65t3BGvOqcQiOXA3fpbIUtFpYJR%2BMgGQELke6BlYa%2Bo%2B8cC%2FLpjQKJgWTYx9yV8FDc%2FFZQU3jMMEHy2VHcSl78uWgAUhlXqEyp1%2FRQpNdPyL07cSXAMllE1MqFxrqNpJa5oVH336O0E6nnFd3yvQcNq8DBq62EgX%2FO2INpURmkpWdaysLKpwaPCAwFtfqem6CnC3u414jm5sNe42V3wBblkODyMmg%2FIaEZlF%2BJEVk10%2BpFqW%2BBd9Gb5jsleidmbTYgX9UQssYY2A0GTUyylmpGEWcs2tHyFbK5FikV3RqZzJmbfA%2BEhyDiC%2FOpdg4gHp1S5qUvvLfcD%2FU9b0l9V77vrL%2FFnyWtX83jEsSrCppienWVIaYJwAOOhMdyeOgFC9dgZilLSGzrh54NWYJzoF8Nntbr4ayFD%2FL7Q0QLiI0LSeM7Axza4KHG7Cq1cZMBWuLIrf7Zl8dHdrq9qQcdQyHMqXHNZADp5XEQR6gMLvqzN0aQDIYOE%2BQqMcGvQqq4cedaa2p1ZTdO4%2B69jKzMR%2BCVI%2Fked3dwsnKc1fQbQ%2Be2OGF8DfML6EFUSAV%2FVenjJjiM9TC2blnYb6nMLzso84GOqUBRKh9LdS2FoKR2ZV41pnsIF3waZckseSDVlgy9nLk2u6fxOD80IX300mRNaQ0Cs96X0UXAblRyhQZbi359SDUbBp9bB2srgcugDeTBxBKrz5xtyFO5kVdXBMjKpDnN3Dwm%2FLSyB%2BDn5JlIPMV8GXJ339Ed3KHUhognJLWEZCeL91rIIAPcpCAiSIOdQRwy9HR54FU1Yvf%2B1dWQjNqH1QkgfmYSUbf&X-Amz-Signature=3b89548f78f58a2da3eb805e9cd017ed4827e4f986bffdb11199458f6273dce7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DSV4FF5%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIFPVU%2FCMmjld2uLp2PPFKUiG0o3IZEtndW9oqR3QI6Z0AiEAhjU3XPFJqlbm2NdcE2nLMGkSajMKDwVl3sHKRDiNCDwq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDKm2CfI%2F1etiXO5ZASrcA0Nwqvt8NPzXSIIS%2FPsS5KwC68bogUUfP6K%2FY%2B7DQUlCpHq65t3BGvOqcQiOXA3fpbIUtFpYJR%2BMgGQELke6BlYa%2Bo%2B8cC%2FLpjQKJgWTYx9yV8FDc%2FFZQU3jMMEHy2VHcSl78uWgAUhlXqEyp1%2FRQpNdPyL07cSXAMllE1MqFxrqNpJa5oVH336O0E6nnFd3yvQcNq8DBq62EgX%2FO2INpURmkpWdaysLKpwaPCAwFtfqem6CnC3u414jm5sNe42V3wBblkODyMmg%2FIaEZlF%2BJEVk10%2BpFqW%2BBd9Gb5jsleidmbTYgX9UQssYY2A0GTUyylmpGEWcs2tHyFbK5FikV3RqZzJmbfA%2BEhyDiC%2FOpdg4gHp1S5qUvvLfcD%2FU9b0l9V77vrL%2FFnyWtX83jEsSrCppienWVIaYJwAOOhMdyeOgFC9dgZilLSGzrh54NWYJzoF8Nntbr4ayFD%2FL7Q0QLiI0LSeM7Axza4KHG7Cq1cZMBWuLIrf7Zl8dHdrq9qQcdQyHMqXHNZADp5XEQR6gMLvqzN0aQDIYOE%2BQqMcGvQqq4cedaa2p1ZTdO4%2B69jKzMR%2BCVI%2Fked3dwsnKc1fQbQ%2Be2OGF8DfML6EFUSAV%2FVenjJjiM9TC2blnYb6nMLzso84GOqUBRKh9LdS2FoKR2ZV41pnsIF3waZckseSDVlgy9nLk2u6fxOD80IX300mRNaQ0Cs96X0UXAblRyhQZbi359SDUbBp9bB2srgcugDeTBxBKrz5xtyFO5kVdXBMjKpDnN3Dwm%2FLSyB%2BDn5JlIPMV8GXJ339Ed3KHUhognJLWEZCeL91rIIAPcpCAiSIOdQRwy9HR54FU1Yvf%2B1dWQjNqH1QkgfmYSUbf&X-Amz-Signature=ae1950565ebd10a443af3318f5a41b1ace71a8cea30d6bf8a91c63824d0e3878&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKBEITLY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIAZ8h74vh26gmFbQ81bpytRiQa8pexyfbH4TuBPVhP8qAiBptnHiYV%2FWCWNqb5mPuUrOamcvESMvx%2BxAYWjFctVKxCr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIM%2F%2Fa5WPrU5%2Fx5%2B6ULKtwD9NSmDT4BhScR%2BTMZNLEab5uqgn%2BpTabHUrxGBoDlgCXEa1RALfXQFv01lZhm0ZRJww8kWfihaS%2BHtssIIWJjdBnaoyz3HJdx63ISDCeTC92VZohvkEu6bhsDv2MJKz8qsXydwAWgXHhVnDYmCrG6YPKVv3Tk8c4l3PD4yOpCwM%2FEE%2FpkBTBQETf4P0qJYLvKmsnrIpZCaPMW%2FliZs%2FkqJz0NsZ%2FgQeEQ%2FiZlpW9qQ4t2thRYuhmvVPaokrUc61q79huI8AzZTNW%2BKFmLQMMo5GD%2FJgI7FUeVkpEB4ZWfYZXoc1Bj5s7oOjpeMbBT2Th2qzXyuKwMh11Ao4aHMfUVbDWqo7nRKuQ8uzX14ZBpPDSz8WmtLBfLcAfMyNzsgedBO%2F5VURNi72tW%2BfYw7CjhpCHbpzMxxch8ee5GyucpUX2AzVqYQSTfIl9r5W%2B720BrNFSEFWIoXezIwENIBoTwjnvXA577Wh0WFIGXEvgW7A9q3wi7A4Dhwtgzdl81G0s0p3zJgpfmQpdIt8M4U8U0AobwrQF7%2Fsj77ua240qzl%2B0ebP3wWBgq5wfypHQMNBUWbuTWr1d1ljCWL6f4j1CfNj1JFUX0IrQsyXXrC%2BmYG2Bjhxx6SllMGXbeEacwiuyjzgY6pgFi6ALbghE7%2Fk6bAjJuHIEw6iuA6wfNEuckDryQM7XlFMFRJQUPq1QNZma2fFCwMpIUTXZ5806ZkPgPQqz%2FPeLaF1hJsPB%2F8yOfIzCHDYgEan8aoDTEudmWwaYaaW6YuLSgSHhyuH3V6QCfN6jHb9SgDSczTbbv%2F2TwgLIR09osUURuL96chX9hxva2GDfISY%2BekwdEnNx3KYpY6O1KerWrVFPIWyUM&X-Amz-Signature=9dcf417f490191963559b43c721d94b60a07ac3c58006cab30468a0bc52ffaec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOGOZQCA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIB5tCGnxlfHMQia%2FfvC4CIClf9HoQzZE0HWZs9pyk4siAiAZY3lnZ6czIDHlR1n2TV4mzo%2F6AwXrg8qjMrKL1qitACr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMHg2owLiw7GmIyfGcKtwDB43Wt%2BOxgC%2B815gjGngU4mjosB1%2FbQaEyRnbk9YmUMa1xIXbbHXvSXz30tyLpkEA3IdQtt6ov5shUGpWwTPruCD9IY7KmgOnPuSq0CxRbGfVY2RrtcEHsEjxeu9%2F%2F5jZOcob6Kvlj%2FXLMSDox691Pd4unIY310zKnquBjViSVJj7OmyLzpJ9oedbitsTcarJG8BT9qVajo8CMvoWROwPwE8T6j%2Bi4cUqnaoVTxn00ta2oWi6QX47Qj5zBhED%2BZT%2BBAplzL%2BF2mKYvNIY7NeSqftOQlKQLutkH3psQ0Dey5U3d%2FJXVg4aQdei92EvPUF6lfKT1vhy0v%2BIQpNAmWbU1EZVXs4ok1PHAX0dmDwPKbUiOn4aC1KDeLb41HObtFV0O61oKDuRTw4NPZ9dITjqHMn3j%2FT6ZmZXAr%2FUCdPbv6PHkmldNrLVNlGEa%2F7fg1KFJs3Va5D44DhebxoBJ1yW4Tp1KT03iLRkKz4lnFDQfPEshSkEBZKraOu85ensX4WM7AL2RikVNUN6dvIWjOpq%2B0gv4yVsLPb59iz2OFlHbDLqKxEGUq4bVrBdoJ%2Fwdbl284xn22ZdBplV2kXfnZFmDeomBWkUTGHPYZF7liQqk3TyvJ7O67hAaPGp7bAw2uyjzgY6pgHctZPjayz6KDMUGu8JwRj7Qq9s4ma0OR27t7sZdc2dqTgBV9FpHOI8Hqis6HUTHoL3z8A9UIkxpSduI%2BRnongnieg1IrLk89XJESlww3FsN5cabMUpvxUVIGqEd2Nx08lVxmDJGmMErfYcOlSe4Lu3wKDArZG5qEzSXFw2Ta9D%2BL0aSnbdsHFLi%2BBcOst4raZ2NQZTPNwYNht2D%2FO2NdQnoZ4hEVgr&X-Amz-Signature=9513208f56ac276c44f05f5f9bba5dafb6118e9e85d3759ccd53cdb49ab6a46b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2YAVXGT%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDzvqiUzVNwEPWaief0uGr9GYRMK6dbj%2ByIPDsxV%2FUoMgIgRd8CZuDGv%2FGhgWPrY0BT1wy546AIQZrb8nBaLE9ikWoq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDOwge1z%2FjqP1Ho8RXCrcA4UGOBT9d9z5dac0dSWNS3Y64h9EPdAMEpAkZLYmTG8BcuBGff0Bfhrl4uppERZbrlQGFUlsWvRoCOAfQGcJZulUQqFbEWI1wCtr7SrbqKnQiVWJZby4eXIFQIvH160ws4J%2B03O%2FWgv1fF1tLyEbb3CoC2fzu2QtWLOfk4Ds4Tt8R%2BGHHn8DMEZ7J1WMLrBLNXbUXghALGP%2FOhbhNKIXHOsUKLaVRc7987781aXvmNb7ozH5qB6Jmd24wHTEDznK%2FJ%2FM9N62R%2F1zGkP2oBvBubjsqQUhJ6tQ%2FmTAkHWNifm7kLt6hXTwTc8kao2PfgH2pHblmVCX6j2BUsUlvJSYcSE0FNpGzC0CHQo9fYiGUzoJWivCSVMKZ4WDRKhEw4kZ0gCQxx5zLQ6zsvYeE0MiJ4JTpa3W1Pl94kbw7Tc%2Fcos4BptXP8sB5yIyOLbL26jT2y7d0OQC0O7PNHfduuhKT3y8e4wLgFTFWcGHqYf14iC722eyqIRWKCwWfZ8IYLn8kqeEyzsjtD1D%2Bg%2BMsxsCWaNzZs5TqqGZq2ds9CFxiV%2BG3UkqSv%2BDdvIz0w9jOeHn3EsHGHIAxAHoFUFIbtLlVNFFXFiqOrIu%2FDRua6oR4o3jYZcyIcBj6bh46gbUMLPso84GOqUB%2FpiEWdJXKrlhBTd3WpJ7iFjVqIWHTgIPTFdGoW8jIwalo4179opaXWB%2FirEv43q0BKBfKEe1b00Vbs%2BUKG4uia0PprQzLMMCrmJcde0e5tRZAW2YtDfdDoA23%2Fc0xWs0cSMKWMF0qTqqeAt3BY4nI4WmmQuHbvsJ2e%2FPlPI%2FJK6OV0keY6w%2ByGoG3XDKRVBdPDznL5CcU3pcktcz%2FsVpWMi23FbB&X-Amz-Signature=e0065a263d502805396444fcd65873cabcdcdd8d8251a3f1dad5b9c92ebcc5b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664U2YB26%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIG%2BUbM7MVku3jpCETChPWFv8%2FunwFNv9t7tdmYtRXiA0AiBaYDDxG04GO1q4PQDVBY%2FZfK7bljD1J4SUEgWjvRuKrir%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMJVaWUX5%2FSY3iteRLKtwD2TYSYqcIDXUDIII%2BBYUYwFGTpyQREbNT8SBHla0onF48DNesfPgkVn5SPCxkNOh8zNJWh2I9oTLupXGEpjwJZanuqyEqBUtwuSq7Upm5OlBphBYfFfKTTPnqPKRnQtaCvxbxqfIkE6Tmj%2BugzVl6vqnPvccxrtiGwVJOMMrDGr8QsVjxhgnNeaQG%2Bk7djjWReQqyUrfXuG504B92lwdU%2BJbvR5u73QQ7taOVeAdHE49BWo2ukqb3cY8CTUZjroNGHzMygiEzfAI3E4jZ5mrwKrVrC%2B%2BJsmqlPYYHf7%2BvSbSkWjWSQqPwiE3R92lURj%2FQjaU0nO2vY34O9fdX9K02nnzoH9jet4cvN4BamS07QN4PzNi%2F6hALA9gv80t%2FmdWhPJSHhEEg2UsJKQSUg3j1LieYfj77aL%2BR2u7S%2F43Zb6xptip7OYIlDq1mp3eaG9tJxiP8Dz4j59VyABSgh2337gw0G1i%2B2zCVR0xLlI6h1okDJKxEv1PRNY%2B8xXi59mOGg5gC6l16Ue0Ft%2BhGXKdkaP3ipijObYRF2NHapbMO9jDZ7r%2FVpbIzWnCb3q9tqbu9ZxXtyV5SboJYLjqvf402Y2jAT%2Bb4CjMXa5WGC%2F2DqtEBXpPkRxQXKZbn6%2FYw2%2ByjzgY6pgF2gdEp64lESb4XjbTdHJbjCnY%2FjdJsIimWjIZNZNy2hvB7oS%2B4JPGINcSndMHij%2BRrLXwioFC4QzcdTmWwKXSFqpu84mNPbhTy%2BIxrTHDh37cK3nSVKDmpnNHXMGshjRXq%2FPx2cNt0RREQsgAxSoM33DrFARbWhU8QMXwWktWRl4w43kKiSPWS2Xu1ehe6F%2Fj5%2FKvIHZ%2BIKGHT%2FE28apP7o%2BTgHitr&X-Amz-Signature=0f54d7816fdaf57be5cfe2b7db9ca074e757ac18a335c0079067c62724678737&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664U2YB26%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIG%2BUbM7MVku3jpCETChPWFv8%2FunwFNv9t7tdmYtRXiA0AiBaYDDxG04GO1q4PQDVBY%2FZfK7bljD1J4SUEgWjvRuKrir%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMJVaWUX5%2FSY3iteRLKtwD2TYSYqcIDXUDIII%2BBYUYwFGTpyQREbNT8SBHla0onF48DNesfPgkVn5SPCxkNOh8zNJWh2I9oTLupXGEpjwJZanuqyEqBUtwuSq7Upm5OlBphBYfFfKTTPnqPKRnQtaCvxbxqfIkE6Tmj%2BugzVl6vqnPvccxrtiGwVJOMMrDGr8QsVjxhgnNeaQG%2Bk7djjWReQqyUrfXuG504B92lwdU%2BJbvR5u73QQ7taOVeAdHE49BWo2ukqb3cY8CTUZjroNGHzMygiEzfAI3E4jZ5mrwKrVrC%2B%2BJsmqlPYYHf7%2BvSbSkWjWSQqPwiE3R92lURj%2FQjaU0nO2vY34O9fdX9K02nnzoH9jet4cvN4BamS07QN4PzNi%2F6hALA9gv80t%2FmdWhPJSHhEEg2UsJKQSUg3j1LieYfj77aL%2BR2u7S%2F43Zb6xptip7OYIlDq1mp3eaG9tJxiP8Dz4j59VyABSgh2337gw0G1i%2B2zCVR0xLlI6h1okDJKxEv1PRNY%2B8xXi59mOGg5gC6l16Ue0Ft%2BhGXKdkaP3ipijObYRF2NHapbMO9jDZ7r%2FVpbIzWnCb3q9tqbu9ZxXtyV5SboJYLjqvf402Y2jAT%2Bb4CjMXa5WGC%2F2DqtEBXpPkRxQXKZbn6%2FYw2%2ByjzgY6pgF2gdEp64lESb4XjbTdHJbjCnY%2FjdJsIimWjIZNZNy2hvB7oS%2B4JPGINcSndMHij%2BRrLXwioFC4QzcdTmWwKXSFqpu84mNPbhTy%2BIxrTHDh37cK3nSVKDmpnNHXMGshjRXq%2FPx2cNt0RREQsgAxSoM33DrFARbWhU8QMXwWktWRl4w43kKiSPWS2Xu1ehe6F%2Fj5%2FKvIHZ%2BIKGHT%2FE28apP7o%2BTgHitr&X-Amz-Signature=12721ddb9ba5f0a938711150c32a947432c3368204bac3b733cb86fdb6c7c84f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664F3BLLUX%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIE%2FT%2B3bXBH8lTRNaVfptph01eZUgbrX14yGZKcqktivHAiEAoC9rueKv3B0CL162fRkhzXxP6Nf1IJKE%2BcL8oWOwqR4q%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDLzt3tppAMtosR7qdCrcA1SKxOQ6DK0X5u9wGg%2BllXYkTMpfUh3a0cga9aYz1r1yypIBxFnI2Zv5X%2FslPvN554M%2FfSUfJ2%2FwnQdKfPSjoIF4iOCdQB3r%2BAZm2ReOiJzas2FRk3fW9SI3vIGDu8VeKYDDZCQs7%2FG7zE%2FmL2X9xzx8wsnwYh0C70I%2F%2B%2Bpn%2BrHJfFcngS6QPHMSb%2FXtOH%2F1Di%2F7%2FCDc%2FKAJAC6%2FaLRFh%2BkiKeKVt2RDoTQOAdwiUDHJUZDbPGG2NUumwmXNTCYDA8Cnr6gaz8bsIk0AXNmsAAQR8yXdUZElDS5Z3S2%2F%2BQ8EbQsdh7Y%2B%2BH6xjmvjEIuyrND9w61XTucZ6uz0LruzdRcAxRQLNw1zoWSby2ZMMlRj5l13a%2FIrlXK6kxXcEyozZ4paJn6POIAMTsFJkftEjX9RvmXRbC5VuofzSWg%2FOoaC%2BDm59o0uIL7%2FYMCI6kkLwgUufotzJl7B8eyrU4JV4Nb%2Fu0mvxxE3n3LzKxl13BVD36L0eC1YiGSE4o12EiGdk4%2FsTl5BpNpYldYSoqJwWp%2BVC7Yd9fHFKg2C0MnI%2BK1BbBawLXyQFvG48hiCEfsnlQIzrz0e9WOmAPwfDSt0v7hOP5c1mGZdSVGFwJNDXjRJ4bAs%2BnIZCyhHUIqRMOfso84GOqUB%2BegvKuM%2BM%2FmpYi97mlYnKGyJq%2F4YYyi0PBcu9uUdP5f6kbzjA%2Ff5OVDcewFGOdpTTww70EXUzSylU3uEBoW75bKbzAsy%2BuEpxY9rOMWBiZgAIkpkQ1p%2FF5hfFdvkMR%2FtrJ27SudSNsHzlZib9eKqig0FWh5SW7FptzCeqLDytMSP5pJcS2V2ggC2Azec4VijhcGql5dOZ%2FMGOnqEybUnroKWD%2By8&X-Amz-Signature=84ee9286fd963bd9ae8179eee815980f943600daf316e4e404c79e453f6a6b86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOEW3R37%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCICOvMol%2BrCueIe28m9BiqX06hjWY3J%2F5OXsLiaTmpLZhAiAHTes4EiAvKkBGRPo3t3tUdQXN6KfO7gYue%2FQF6VtHXSr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMVCVtQwg30ZsEZF0AKtwDQxq%2FAIxeJoCKJUskq3S9P5uHdQ%2F63SSvkz2aiRvT0qPzoRcHI%2BE5WrL9l69J4w%2FbU%2FrobJnG0al%2FOJE0g5yBc6mPi1u%2B6hzPlaxm2KuRv4UbeKvyB78nHeRuyfzcFfM8BINId0oe%2FEDggjrEVFwJjKoaEvWAxYikrAdCYf4XSszhvya0fot5xYKYq8SILvCB%2B5s9Nqh%2FWxoiXECS244SPuXCWXSBzf10s5L9%2BUoHNTKO042BNV6jv6SfbWwwyS1vyMpN%2BLPGK38KOmziaZX7hDKzgTW2NW5lNvvGCM6ZlSKAKPy4SocPWHnWYnvDu5D3hXqfuJtfngMHUodHHQcKi%2FkNDyrbbP%2Fgii9j%2F4fiL0LaLNtwemezPPcQVGUtg9HYWOJVGcBXj0nuAeXnJHFPmjo3gemJrbJCFPZWjheOdDESvN%2Bb5YO0%2FuIJHL4CSN66JMi4D4%2BO11ezOrYzAUxkJARaa%2BCTVnbGboiAkmWarB7KKK7fy7vO2oMqidVPlBwnKGQ9AaJun1RuL%2Bj6VxWysh2pq6ckjW7Wg73KRLmNoG%2FlYyKXCmpGH0mKWxFk2AgQbrRVMiEJfBHgJvAjL2%2F7Vc7Tw0Uu%2B3tz6M5AeUoDoYxeGFtDi1l8PVsmbOkw5eyjzgY6pgF%2B%2BJshnAoljIVsMiCG1MBQwzdiFyL4xz%2FzpmizZpqJHYbBCKBxcAAtdWCAtwr8uK9LuEdBL7blEErZLSPeVzccdQQUIXJDG0cCXxn%2BZcIe8y0MuVkiH6Bp%2Bxk20EVadCOF%2B7%2B6txy6DR1O9A%2Fz%2Bi51%2B49TqUUMHjlFwnta5T18XWt3SE8T374CKv8QDe%2BFCVA1FbaW2LAOvvLCtsz4scf%2BoySd3WgC&X-Amz-Signature=f72048de393be921532c4fa2384c9a5bd8ab2bde02d8ddfe4a3f11e65e7de7a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOEW3R37%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCICOvMol%2BrCueIe28m9BiqX06hjWY3J%2F5OXsLiaTmpLZhAiAHTes4EiAvKkBGRPo3t3tUdQXN6KfO7gYue%2FQF6VtHXSr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMVCVtQwg30ZsEZF0AKtwDQxq%2FAIxeJoCKJUskq3S9P5uHdQ%2F63SSvkz2aiRvT0qPzoRcHI%2BE5WrL9l69J4w%2FbU%2FrobJnG0al%2FOJE0g5yBc6mPi1u%2B6hzPlaxm2KuRv4UbeKvyB78nHeRuyfzcFfM8BINId0oe%2FEDggjrEVFwJjKoaEvWAxYikrAdCYf4XSszhvya0fot5xYKYq8SILvCB%2B5s9Nqh%2FWxoiXECS244SPuXCWXSBzf10s5L9%2BUoHNTKO042BNV6jv6SfbWwwyS1vyMpN%2BLPGK38KOmziaZX7hDKzgTW2NW5lNvvGCM6ZlSKAKPy4SocPWHnWYnvDu5D3hXqfuJtfngMHUodHHQcKi%2FkNDyrbbP%2Fgii9j%2F4fiL0LaLNtwemezPPcQVGUtg9HYWOJVGcBXj0nuAeXnJHFPmjo3gemJrbJCFPZWjheOdDESvN%2Bb5YO0%2FuIJHL4CSN66JMi4D4%2BO11ezOrYzAUxkJARaa%2BCTVnbGboiAkmWarB7KKK7fy7vO2oMqidVPlBwnKGQ9AaJun1RuL%2Bj6VxWysh2pq6ckjW7Wg73KRLmNoG%2FlYyKXCmpGH0mKWxFk2AgQbrRVMiEJfBHgJvAjL2%2F7Vc7Tw0Uu%2B3tz6M5AeUoDoYxeGFtDi1l8PVsmbOkw5eyjzgY6pgF%2B%2BJshnAoljIVsMiCG1MBQwzdiFyL4xz%2FzpmizZpqJHYbBCKBxcAAtdWCAtwr8uK9LuEdBL7blEErZLSPeVzccdQQUIXJDG0cCXxn%2BZcIe8y0MuVkiH6Bp%2Bxk20EVadCOF%2B7%2B6txy6DR1O9A%2Fz%2Bi51%2B49TqUUMHjlFwnta5T18XWt3SE8T374CKv8QDe%2BFCVA1FbaW2LAOvvLCtsz4scf%2BoySd3WgC&X-Amz-Signature=f72048de393be921532c4fa2384c9a5bd8ab2bde02d8ddfe4a3f11e65e7de7a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5GY2ZBA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T122453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIDGbYm%2FiNQeIDaPmGn9guEg6r3sln2vvdXSMuk3VgZA8AiEAjhRZ%2F%2Bj12Wd%2BeDCiQgReN4yX3F%2BgIpDz79YFKLuTueoq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDJ%2FcidMwAMsMQNE9iSrcA50lBmYY8I6QgF3FwJrKDRKQFzJNKT5q6SkAJWyfeniag6CbZ8IAuFwIRv%2BKT7I94XoJUbxEyBdsMlFFWKckQORk326U27Vvy%2Fv4JgFzea55l7f3KuTyD3pHlPuthtQsC5M5VZhVURddkVkSrxHSv04pz51LVJrGxFIqaxn4amzOQWKsVK2tTlKdO1jn2qWKBonJ8O26zKM7X%2F6elvbyidtr97UUbwq4VrLpw2yQZCcptMbViIIPZGqZh7CRxnQutafh3esPxlGdWq5O3PICdAb5ljrns%2BDOYs20VrAnm0T2TpvEgE13GQ%2ByAY0EnjXEX1xYzHu635lSkGK5ljeQBcGrxoQga5SfaW46MGqVDd0PtoK%2FRKvFC4F8O81FQuAVfyMbg2mfT4GrclNEQ5ILfGE8pX4oDqKmF%2FVwHcuwGaX1b9%2F0UL0Qnd5ZivKUak%2Fv4pTbhxmTvNOIyFy4DIjNIcuEZvk%2FaW07dqnK8gAokX%2BAY%2BxGAuZJGe0Zs5kJd%2FOg%2BUCSYIifBxYhKfEl%2BkPQ%2Baec67zdYzueprjP0puvCtT%2F%2Bh6yIpMbGLcxqKm%2FftMjdrDsv%2FKtqjgyGpBOqfX5cz%2BnSGSidbuquNp0cW7ftmrFhFXIcf59SG5DuFPSMKXto84GOqUBPYnRcF4i5y4b%2FpvU9lCfmQfu7yiQSLz3Z1GRVklgSimgXkTB0qKJ2JbeikHHJvgzcdM2Z%2FeZMz8AtWsT9Qtijto8GJnT8ul5HJCXWVCBg9pEcKep%2FJmHrgxgLqT%2Fqe04OA5lxYfOnw9kT2SP7dqOV%2BNknpXHQ9rmLY1qH%2BSPh%2FEQ4jMPNLUzI1JrSfpmC%2Fn%2F4u%2FPmzbEYpkkoFHCbB%2Fq6EGVqmQl&X-Amz-Signature=20b99df8dea606731cfada0703aa8b105053f12dd6563105be8f06dd7983b3cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

