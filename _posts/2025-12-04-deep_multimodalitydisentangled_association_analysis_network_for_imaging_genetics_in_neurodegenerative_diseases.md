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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664II4W2Z2%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDHsqaacUU5DiKmBhLUYnKV%2FKzpF3YUeTHJgxaoBzd3YAiEA5UIaiyKLgq4vKiS7ianGJfL6eLa0G%2Fpb2kSvZK5TZnQqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKxMnKTtvzJiYtTC5SrcAzL%2BNyV9T5kwU6AVv83D8h7993dv%2FRXZdV4LjmzDBwHAR%2BSCtr2LP3ZODQ%2B9eLZ0%2BYRUsuw%2BSNH6FTROvSumMDqO3QRjVLoXwOnm5ox7InkGYEXCD4HVJzo%2FZ4zS%2FBphXK6%2Bi0mM3QFz1NCA%2Fj%2FKxiiHWPLUX0wO8CFsMH%2B65FNEr0fmgwuvoVpQrhKJo2HWvHkVPx7jWSznFRHzss46tp17AxpxKGwP6XHLVPe2wuxXuEjFiW%2FRymvpnvWi4pXGJoCHovi99C%2FqSHiCEJ5pYc%2BVgMiyS4TZ9u39luIQnUI8%2FxOAwmbmmTBMZyg4HU59thBswwW4oy5%2FsyiV6%2Bo7uuKZacV%2FEBPWOZbVrhpqfZhaXWOemrVC736aQssnPiIUAi%2Fg53PuPqE6VuIWk7ncZ%2BrOMA5yRUShcI7xC%2F2wEFal571he%2BRRuqa71eQIT7fIDJ8CTlXQY7B%2BK1IOGaRFxwW5jW18LwMIK0h5TbHKzlFQ4%2F7ucFSC1tFjTzIyYAC1Uihe9JP0HiVLhcE1H%2Fh9CDLJ77A%2FP%2FMwIMtOOstOXpC3rWJIq9Ya4o%2B9tF1hJzuea43rToWQ%2B2r%2BBzKxT3sOpd1H%2FautK3e9i0KyYkbuhZjktp4asUHEKQJAnSrlMK65sc8GOqUBws0obPfpgsr%2BY1prJ9Eb5PvewrOQYu4zKk23kbdnhn3sTiQvnPZ4tCB7eLe5uvy590uSnOzVKM7qMp9%2BpGXhUDNYo4H93mZAKQWX%2BGH4aVbUbq2ul9XT8C7kltoRYO%2BG8iANed%2FPKtRefq0VDPe9RUczDev8F4FyH3CAaZvOEambPfLFiWBPkz0stnajaGL%2FpHjbM7sORdUo6Qcu6S6edQYFQtio&X-Amz-Signature=86d27254984ea779c803762479a590fb2f26c989a40ff955c73e44318cc5ec65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664II4W2Z2%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDHsqaacUU5DiKmBhLUYnKV%2FKzpF3YUeTHJgxaoBzd3YAiEA5UIaiyKLgq4vKiS7ianGJfL6eLa0G%2Fpb2kSvZK5TZnQqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKxMnKTtvzJiYtTC5SrcAzL%2BNyV9T5kwU6AVv83D8h7993dv%2FRXZdV4LjmzDBwHAR%2BSCtr2LP3ZODQ%2B9eLZ0%2BYRUsuw%2BSNH6FTROvSumMDqO3QRjVLoXwOnm5ox7InkGYEXCD4HVJzo%2FZ4zS%2FBphXK6%2Bi0mM3QFz1NCA%2Fj%2FKxiiHWPLUX0wO8CFsMH%2B65FNEr0fmgwuvoVpQrhKJo2HWvHkVPx7jWSznFRHzss46tp17AxpxKGwP6XHLVPe2wuxXuEjFiW%2FRymvpnvWi4pXGJoCHovi99C%2FqSHiCEJ5pYc%2BVgMiyS4TZ9u39luIQnUI8%2FxOAwmbmmTBMZyg4HU59thBswwW4oy5%2FsyiV6%2Bo7uuKZacV%2FEBPWOZbVrhpqfZhaXWOemrVC736aQssnPiIUAi%2Fg53PuPqE6VuIWk7ncZ%2BrOMA5yRUShcI7xC%2F2wEFal571he%2BRRuqa71eQIT7fIDJ8CTlXQY7B%2BK1IOGaRFxwW5jW18LwMIK0h5TbHKzlFQ4%2F7ucFSC1tFjTzIyYAC1Uihe9JP0HiVLhcE1H%2Fh9CDLJ77A%2FP%2FMwIMtOOstOXpC3rWJIq9Ya4o%2B9tF1hJzuea43rToWQ%2B2r%2BBzKxT3sOpd1H%2FautK3e9i0KyYkbuhZjktp4asUHEKQJAnSrlMK65sc8GOqUBws0obPfpgsr%2BY1prJ9Eb5PvewrOQYu4zKk23kbdnhn3sTiQvnPZ4tCB7eLe5uvy590uSnOzVKM7qMp9%2BpGXhUDNYo4H93mZAKQWX%2BGH4aVbUbq2ul9XT8C7kltoRYO%2BG8iANed%2FPKtRefq0VDPe9RUczDev8F4FyH3CAaZvOEambPfLFiWBPkz0stnajaGL%2FpHjbM7sORdUo6Qcu6S6edQYFQtio&X-Amz-Signature=86d27254984ea779c803762479a590fb2f26c989a40ff955c73e44318cc5ec65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URZGLAZ3%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDOwICUPQZDQs3PRPA1qQALt88pdnz8WVziAFFJ5TndIAiAKc6Fg%2FsHnQuIO%2F5LlIyLY58WqWNiQ1IoZ5Z5wpdYXuSqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLejQ0PSfvmHBExRsKtwDRgjXT86HKnIWGA5psQ2xz0AfiQDnFjFBAU%2FkVCznhKDs2IlUHwUkx60pc3Stv1kgwUx%2BgAIJ2jNZQ5Wy6Jkz%2FRhxS6vnyQtcndwtOAhjIAbWS379pQRtWl4J%2FHS5dhSqVx6ZGtpVZ6kvio23sYyFBPtAj%2Fmho1ELJ5mGTil1oFrdNK7o3JOR2nReYa17CDundbhD7T6Cj8%2B%2BfHeKD18%2BExpEZTgP%2F6cBnjYs4fWqJsmXMoFdk5wFGKKMJcziR0K0%2BCxQMj5%2BjCUt%2BMkEtec%2FOtUuaP%2BRQ1mak3rrM%2BfJGSFSAhO2c%2FKIvuU%2BIxJ6nZS9oBqQhYxSIFEgm6cKf9Dy3CI8hwpvW0rNwtzmA%2F%2FcCcklaao30ke54%2FRIL48l6zut7v0BPbR9RLjkyEY6mUh5hY7L9yne7SFfaKrCv4cYeSroOzuGs5Xx7qNGsMMWQf6xzgEMvFQWz9XTpOGaGcncs84nYq%2F8%2F%2FZRMeiuUl4uXXrskegMKO1Iwf4hJoGSdnSX0odwEcMvDe1DA0JQtUbAs05c7SN2QsmCU1LQ4OoICcGVvZPLJ2%2FgPURGXCsSXCqBth%2BDGGPCx2AFqgMV%2FV%2BgRLD80WTqwspX2R2qZwu5%2FUXlwJlAN%2BbSYvK1GJwwwLmxzwY6pgFNPYC%2FzhASoZ%2BaPbe%2BB9peESYV70XqVUqOeVf6jpDrfXnKHri1aHSXcOqoqyEceNGRlgved3E8bANe77K75XW7npJVZQfL2HwfGU9cuE3jE4xm68Ff6mulUeruU1Gnc4FJwvf1qAfslkt4o%2BKhXRzF80UFK3DVv9xTM3xzvP8RYoaK8bPYub4oBj%2FNVsgAjulORQZUBbRoTbnTK9x9NmK02AXmmySp&X-Amz-Signature=8ea3f9b872a7f3d4ef71654771c4881c6b949babb679864f5e45c34c02a0b28a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVVJY4AF%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCwv9Kaq9VRBqM7xYRpen18LXxgHfDREBbh%2B8KY%2FIBaOAIhAM8xLEgsmEulj4f%2FG%2BCuSgWiS1NgryOsL%2F5iAeB%2FnLoQKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyt%2FYJ9uSQQMNxH50Yq3AOFjwz3dfParAgGEA9OmCuLFvvjl8BJLlWABOwp1qQgxBGnHa25Gp7Alikg6kAEdgKxNnWtDNTh5ELzweAJsUxcRjVWMSWqg4jgQd8ThVmYLz3q9XwoFwtvEWc9nvnQ1JlWTsf5DDI54JlEcOYvoSTq6I8FBN5jYsTNb5X2yyR7G%2B6GczBu4XmVv4%2BAz%2Bj0ka4gOZ7PMRZC8b3pIbkMmYjT8ZF8H5QExcBZ7D11Hg2oGpI9r%2BBQvpfg3K9CmVuN1T9oNQURnqwk1PIz5zZkevDyXzxrL0N6chXO9yCFuW7Al%2BiXtiSVoLyN3g7pFav0pUuDlHQsqRurWY6OAbFghFr6lppA7Ysk2jIDWzHC92gfxHH10yiJjcTunszYFd17Twup%2BamWVx3Ey%2BQ8yAvn9VY7PcoUb3J0Lv4cOvZWuG3mXBUTUtJWc6dWYrGLi1RByy1hv1igCPsg9yTlrUYo7yxE6u04%2BD%2BAiLELAFj2W3esujVUXjnlo636ocD8S8GnsOF1XnNJwu91KLFmpxdLi%2FCukJ32vQuJS0xExbNtMRZOXchJWynAclUCVcygtM9RlxgeHBMTFuyb02ezPR6NuL9D1cQSW1sG4Nz5nl4kB84VBF0W4ZlFJ%2BOXq5BB5jDUubHPBjqkAar1GiahPiHVvq9iMbOvGZKSHfUs7wQAi59toUyhODWEzhQ7DIOLqj9PzmZm%2FjXd%2BqpIW3%2FqCyS5EQdxL1YQpABzeUu37CtWr2HEjMx7DTb%2F6lFLEvUOZnvhhm%2FZiHVIa98L495MYt%2F%2BHygPW0nqovM60oyrqGwp2MGHOprmQF2xHEhXtQRDaioBsr3b0%2Ff6hg%2Bupf%2FXakehS4pqzNNNbRTCYPKO&X-Amz-Signature=26f622eac91096c52076b370f993cd6304b15c7fd45f53a61e96a114e0a803b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVVJY4AF%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCwv9Kaq9VRBqM7xYRpen18LXxgHfDREBbh%2B8KY%2FIBaOAIhAM8xLEgsmEulj4f%2FG%2BCuSgWiS1NgryOsL%2F5iAeB%2FnLoQKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyt%2FYJ9uSQQMNxH50Yq3AOFjwz3dfParAgGEA9OmCuLFvvjl8BJLlWABOwp1qQgxBGnHa25Gp7Alikg6kAEdgKxNnWtDNTh5ELzweAJsUxcRjVWMSWqg4jgQd8ThVmYLz3q9XwoFwtvEWc9nvnQ1JlWTsf5DDI54JlEcOYvoSTq6I8FBN5jYsTNb5X2yyR7G%2B6GczBu4XmVv4%2BAz%2Bj0ka4gOZ7PMRZC8b3pIbkMmYjT8ZF8H5QExcBZ7D11Hg2oGpI9r%2BBQvpfg3K9CmVuN1T9oNQURnqwk1PIz5zZkevDyXzxrL0N6chXO9yCFuW7Al%2BiXtiSVoLyN3g7pFav0pUuDlHQsqRurWY6OAbFghFr6lppA7Ysk2jIDWzHC92gfxHH10yiJjcTunszYFd17Twup%2BamWVx3Ey%2BQ8yAvn9VY7PcoUb3J0Lv4cOvZWuG3mXBUTUtJWc6dWYrGLi1RByy1hv1igCPsg9yTlrUYo7yxE6u04%2BD%2BAiLELAFj2W3esujVUXjnlo636ocD8S8GnsOF1XnNJwu91KLFmpxdLi%2FCukJ32vQuJS0xExbNtMRZOXchJWynAclUCVcygtM9RlxgeHBMTFuyb02ezPR6NuL9D1cQSW1sG4Nz5nl4kB84VBF0W4ZlFJ%2BOXq5BB5jDUubHPBjqkAar1GiahPiHVvq9iMbOvGZKSHfUs7wQAi59toUyhODWEzhQ7DIOLqj9PzmZm%2FjXd%2BqpIW3%2FqCyS5EQdxL1YQpABzeUu37CtWr2HEjMx7DTb%2F6lFLEvUOZnvhhm%2FZiHVIa98L495MYt%2F%2BHygPW0nqovM60oyrqGwp2MGHOprmQF2xHEhXtQRDaioBsr3b0%2Ff6hg%2Bupf%2FXakehS4pqzNNNbRTCYPKO&X-Amz-Signature=ef0ba0c8d6351c2907518b0c13d92594ba4213ca4802f613b19c1319a5b78e1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MFJ6QAM%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6%2Fn1ldGH1E0JnmpbT0Y680%2F0EwrUQ%2B2k4%2FjapilHFLQIgK%2Fwx7XV0A%2BcNtF9uC%2FUzWKuxUip6lS3x9jMGCzENPOAqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOOYC7blUOWdiK7swCrcA5lAFM2veHIzhh5cGyVcBPWYjKZXMVWhq7gR05xgcANENWDDGafGlHkjWVHuneu9NNLTh302%2B9OYUNdS%2BiDoStedQoEEJt4L1k%2FCNnXJrF0q05HM8NucBhpP9IerJe42%2FVtjCc9Xo5PCCN0BGT5o8sN%2BohF3qc93wFHuLduQTPCLZcpHvaii4QqQ4pBkWVAi46AYLmi2F4JQ8pKBXzZXuPuJy9OaGNr9xOw3YFCv04vPgNTNoJq8dg4Uhi7toiKlCZII4sUPJW4rDc8VIgVhAxi85TlFULD%2FxM%2BRQSeQbSr4uVcNZYsQ8B5LYKKILdi9L40hGmJsvnhXVo3gmsQkhS8LkEHMW0qsUY8gxCspBVMJTdt0Gzpad99e%2BwW%2BsVRah9Y9ukfsP%2BwuVeF%2FMfjxhrR2MQ3Xoqg%2Fi5kB0lrN8%2FJPFWXd5IRoc5Pz9uekgb1LVPm%2Fqn40RahXLNS%2BYNmf9UIUU5b%2FH8kthExjJQgPYXV0N%2Bqkel6NMRFcz5vuCfeUybb0kIMisCYSrvtqDiaLrz13tKpHtSP9o%2BiZZ8TBEDScSKbI9e3M8BiRh2Mn7r%2B3BPs3ih5HNgPQBjCE%2B2uhT2WcOrY6Y%2BphuHVLFRBILA4Et0ugiJ0%2BINFTq8CzMJC6sc8GOqUBjM4M1Rvk9zbbiU3UEqWKVuN%2Bjcv9NVUECDGYIMP0tfhwrBp4w7aiNMpYzPKTn8eNABW5V3jvuplAtAb2GT3dowFSSi7zmk8xSMAycp%2FaU4C23WTNdZceFhTmWOzgw72OezQ%2B9gvKU2comw4YteWT9w9EFsvZr1JOPTtrI3SYJ0vtx6CFrQ%2FVQc%2FCRQc%2B6qs8Vpv34zJBGhbANRAu0w2ZHgXM6Act&X-Amz-Signature=62a13b0de85319ef57b3555a20ef0620e34f7d9a3f2c9fdd57a6e97302520161&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KP7L6IE%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBPB8E1U2UTLuuPvYYEPqN4BfbL2lAvX4Foy92eXbxjSAiEAmCURGhx1TbO15pWCtD9SUOGMEcwtytZ1D4xsajOo6TYqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGocWdpBsTLg2GYJPircA8WXWF%2BabmQJ%2B3fUtez22CfToXyVQkXwqSwnf0R3YgmGoOuWNbDj7a5fO9yFp%2FnTLVWphqBMbcleITm8TPwYriczpqRDLk1I%2Bwi6nVyrX4%2FW84znI1M8TStGUmMhnDRfxynAgEOTDQPXivccpLOXrPtTvo5fRf9t4zk1Q8lBi2mVuh2nVeOW2Ya%2BswZmHQ1IrJA2Jyyyw6BSViSJkAjEwmDpBcKkUKwluT13D4gt5ct%2F0vXO1oeyEznasZvd%2FSQqvfmCW0HokdX2OXa%2FMmgNoDQ8ZBHlW5kbkZKncpa3%2BhXgC4l7a%2BOj01gZHXbyCnEBzhj7S5nwcs2ucA3HrmJMcFVBs5IaWfHvXxX5OBNYPLAFDIswsvgNG23sVQ8awbHzKskt6oMEylut2L0ze9Vt3d08L9phhBL59Q4CNpPwaabYGoq%2F0yV1RoHjErB0hCIZNN7skGlPjBiN4uLOyGgaz71p6iZfAxg%2B5JZYoNr3gh99uvQXcGhl6zwxOcNZKIZF8gq9Iwkp95%2Bph6hxDlP7%2FwdITayckKV3SrEZVLGqdOLzsvpm%2B7fs2D8M%2Fcn3qfbQUEk04SV7Eed0MUazXU1Mx3I4PVHXWzJpM1KFuWbaSbc8y%2Fl3XdQmGP1SpVtsMNK4sc8GOqUB9rX%2Bb%2BIPMeTBtWCWbS76IaK%2F8wbm0KY3w2XAGF3eY5xa5tWfdeAIw9RYUHYMcbfeZQuHmFbb%2B%2FI%2BFYxCtrUfeA17e2dxKz%2BzrShm9fkP5viM4CNC6SZxT%2BeFVsu%2Bl3SNwlX8Q3A5fHQbKtuiXTm0%2BtcME26QcKVk9pFaaInoFpBr%2FL536VW5hB6ZlhmTmcio6hYiXzeGr2xNb0bvocYOZbplPl5k&X-Amz-Signature=55c794a2f669b6f0c8dd0f5241683587a0b68cec9cf0b06399a8827dc7c1ee8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RU7KRDCN%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB8lUBElzqTcdDKIWYUq8Hz7lagODbmpJC6YDbf7SjYWAiAIaPj6dvyCLIJvEvguEkZoqTsccl9qoZlHYVQf9UIIriqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMInwF%2F8rS%2Fy%2F8jz0EKtwDM5jaDe5kkdDzojpvuajU8EpVW3pY8KxQMnkZDCn%2FjYet7YRoqoD86k6hbZDC4ov%2FZL09gk9BZexn5L8xjm7dFSCSZGTBroVJ5TrnBFtE%2BYS5cfdtrp9pnsM0zy5CHYE%2BXZ5EedmwozoyjQ9LFmLukCF0%2Bh4GjC0c7xDXBpVvV8KlMTWl4fZlvWDOtE%2FCqEYGRi5vHkAgnlyzOJ7YkPyqx996Usw9Ah54wOKKekpR7sUPQxVkGJEgZ%2Fv8L76%2F7jZj4GrrzSgEFJil7HzMw7htIZaYxvILpvoIQJESxhRoAaqRfCvH%2Ba4nG6oREEzlLqULVYMt8YA%2B%2FVRj%2B2CK7AMUvti%2FENJskt2wmgwLCdGxf0ZkuPIghgw0IkBQTHaR1ho9kNtjc1YMh32vF%2FwECLWyBcBBWzqDrKiUi%2FOm5kC%2FkHZWIGSwIgaEZEImGhKlBcMzVKnDh70JOMU4MCxw4jBvBKjAAxbVSG79dnC6V%2B%2Fm17SxiBYrv5DLTND56MW6DaJ641kkxJpSVxD1WVfGNijGpbr4jhWBWjdnRFh088rXrG3mhWnsHmyHD28UFf3S6RtTN6CK17Ya73C66VWEXBAQAQGFF91DFIth0Yq7E%2FmoOKiCo8b4I0gn8yUkBLIw07ixzwY6pgELbm71tDim9aEKjev1zs7lcGSRNVBcOKGCZDDQFqdmRuQbrS2p6zuT2u7ca%2FwETC5yk0BuCxR1K0rgleWDcoSFP3Voeg5HdbxtUJPneZRQpGJFFWLTRK8%2BSwvFZTkH2ZKrIGMzdCPfovcHGKgnm%2BtCab3igYkUPrkABSvSdjcJ7VNLCMglbOkCQjhljEApFYJLJvtPbrkuz0K637Gsl9EBIs9BKi12&X-Amz-Signature=02179de1e948e7b55c9a257b5cee02389e6755dd9abd931f12023da6d14ef705&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIPBU7WH%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBM%2F0h48GMiFoast4VmACkksyglCfxG2BQCeQmvx9G6dAiEA4pEPeZpATv5eKQMGTj8mz34GQhrlSSjlc2IvThVHb1UqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLIoxKxATgd2%2FObd9SrcAysCex95plk%2F4POaWYaH0Q2YwyW1nHWH3zW65oYuUK29EwHyH5Ko2F9SyGd0H%2F40M721OXoBMvdhdl1AM4n74YZ3VJp3lKLHwHEuep16rTbjbXWdip%2FOz7ZppEctqKt7mMfWrHgE5eCSH0QL%2BeKYh7I36GD8itI843386lW03l4GaW8iPyTdicxehT1E2jyH3TRj3RpABrN0EewSFjCUJj9qbQiqN7X4xFocyl8uI9Atr5JIaWue%2FyYbrVp06orkA3GKT%2BfXS9FLlYKif4n9So5tV1osVUAHN1s%2F3obGhV%2FjRhKBJWltDp7Br5R5cx0QrzPzeLoTEt5wVhcVvcVY7wpqI25SDzs3iD%2Bnc4TTJ4dU7gTz0ywhnTgmhb2%2BDWcos9Tv6Kndn%2FxhHwFBNzW0p5emSymC5lCBe8JFHFyWXHhrBrZv06XYFPKv6Esd4us3du3aTo8V%2FmNnUdFz0NH2k%2F3%2Fye2cqs5h0vItdGuOWpvDyunpw7%2FIPmSg4bdkyhoRdPBbwjq4wLlOMVlULBk1Y6nEBu%2Fa5%2FTLvJ79ZBNri4CyfhX9lQsil8CW3W931DtiuKx4iSZ04fcsnXCPVcmUByfVJorAONqexG3cC3BmxRPGHpKLnLH8FuYjmGZXMI66sc8GOqUBqScy%2FRa1HGZtzQOMdFgBoLRnBOls6sTohD5%2FcT7E3T0ofRN2m8AdtBtW56jiRJOojZhgx4Edpq1H5LtkPwpGT4mcZUL0rom7xwPMYd2suFmWZ02nqLojrRAStJxj5asZZqHjTaL8BDoODcJ3DYwyfWftVRt3xlgTlRLttwmnzuWRwJ4p4XA%2F%2BvW%2BJ6OM07pGHnDknFiGnsmHZNfGbdZmWYl9tm%2Bh&X-Amz-Signature=78bf1f49079e6117e74129196d97dee5140e84b0bf5d4d6245f684bc4e33728a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIPBU7WH%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBM%2F0h48GMiFoast4VmACkksyglCfxG2BQCeQmvx9G6dAiEA4pEPeZpATv5eKQMGTj8mz34GQhrlSSjlc2IvThVHb1UqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLIoxKxATgd2%2FObd9SrcAysCex95plk%2F4POaWYaH0Q2YwyW1nHWH3zW65oYuUK29EwHyH5Ko2F9SyGd0H%2F40M721OXoBMvdhdl1AM4n74YZ3VJp3lKLHwHEuep16rTbjbXWdip%2FOz7ZppEctqKt7mMfWrHgE5eCSH0QL%2BeKYh7I36GD8itI843386lW03l4GaW8iPyTdicxehT1E2jyH3TRj3RpABrN0EewSFjCUJj9qbQiqN7X4xFocyl8uI9Atr5JIaWue%2FyYbrVp06orkA3GKT%2BfXS9FLlYKif4n9So5tV1osVUAHN1s%2F3obGhV%2FjRhKBJWltDp7Br5R5cx0QrzPzeLoTEt5wVhcVvcVY7wpqI25SDzs3iD%2Bnc4TTJ4dU7gTz0ywhnTgmhb2%2BDWcos9Tv6Kndn%2FxhHwFBNzW0p5emSymC5lCBe8JFHFyWXHhrBrZv06XYFPKv6Esd4us3du3aTo8V%2FmNnUdFz0NH2k%2F3%2Fye2cqs5h0vItdGuOWpvDyunpw7%2FIPmSg4bdkyhoRdPBbwjq4wLlOMVlULBk1Y6nEBu%2Fa5%2FTLvJ79ZBNri4CyfhX9lQsil8CW3W931DtiuKx4iSZ04fcsnXCPVcmUByfVJorAONqexG3cC3BmxRPGHpKLnLH8FuYjmGZXMI66sc8GOqUBqScy%2FRa1HGZtzQOMdFgBoLRnBOls6sTohD5%2FcT7E3T0ofRN2m8AdtBtW56jiRJOojZhgx4Edpq1H5LtkPwpGT4mcZUL0rom7xwPMYd2suFmWZ02nqLojrRAStJxj5asZZqHjTaL8BDoODcJ3DYwyfWftVRt3xlgTlRLttwmnzuWRwJ4p4XA%2F%2BvW%2BJ6OM07pGHnDknFiGnsmHZNfGbdZmWYl9tm%2Bh&X-Amz-Signature=8c9a3cb65d488951f7c041f88b6c6e17a7c51bfa6b7b6e664f43fd6cbcea69b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TP3KIWHX%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCPGgGEQVPlnUZ28tSAc3qaR9gsouPmyFwKVtvd5YkapQIgEWm4QyYob16X%2Bq67IghAF%2BVXVHhXov6wx%2BSOBLLptbgqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA4tqq9OFomujxg4gSrcA2qTIx4LkBTKgWjj6SA0b4eKCsuHyWtBw29BLxMmp6mWR8uN29BTxq%2BrRilOsLn0G1cOZq3ogYFH%2BKD9mPFPEGQSfYPtqyHJ9i9%2B%2F61p1%2FSwVf%2B3YdayzHRO3ImmlJUB%2FKDh5X4UI4u1dzRWZ17xiC0rxvQ6G6NrwGJumThgQtUjXqUKOxF5t743xzXK05GTyyYo%2B1ViQIP2F5w3mc%2BAYkWJugmbF7%2FM2rx0Ymb3jy88KrdNtpEFY2aqjOUJHLaPAKRMSPIuveM1cL213KAX20%2B6ktDIqeBnzinMa5Y4CGkhNsxhIAMbSnkKZvkYsD%2Foki4b88%2B%2B4iF%2FhK%2Fix66JElxwgrQiLcW5aj86s%2FjZKZWtVtsZY6WedMwc8t2knk2cuGETgwRSgw%2FdSnFRmy7jopnLii2lH8KJBm2qWNvRSQpeFxjfemlZZHc2pnNVlMLSC8WYQyKiPfCmqycQHqcSAftVpmXeBr9aEiyiAk8hRkOFMIWu1m6fM7TOEG4q9xQBO9xyTkOtOyGYeOeMFazLZrigqDjHbyimnuyr7L2UxzeDzYK02YLoBhNMCtOIcI0lU6UCUdFv9%2FsAF5h33rLJOBvLEIonXh%2FFnMuMqKUhnkA3Dc9j0zbA1zi9M1OYMKy4sc8GOqUBUj1A3vTOVekvMP0eVqtjUKl4J7YHILBgAhIumQkIG%2BuP%2BAxHHCQE6kEGoGKxKhptgVgugRopbMovRK8YeNtIEyNUuujAVVOfo%2Ffgg7JkwWaA89iCwSLJBk0dpwDMOGX%2FJBaHlv95UWbjqxI1sKQr6Dh0oyzueY3oyoYhlsQ7vdh2DJra0AntwpkMHO%2BI%2FAxcNG3C3rA%2F2skV2F13551AopqD5JU9&X-Amz-Signature=2c3eb42592777ba5d5d90e7f6adf8b5995b2b70dad0b4a5153a8599c7512ada5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646UBGPBI%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDAp4z5ZDjmU4ekl61lBBH4vLvyNI7mRRuuCOPlf272ygIhALPME%2Bu8GkrCkmaETdbtTi%2B%2BJDvlL3L6aHzvTYeEBkzOKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxoxX2IDELOSd8%2FhcIq3AMZ%2FZD%2FBBOTAuAcnbHHkgkQBSv6NqVGVSoD01wWlK6%2B%2B6kqqEqo4p4c2heddQf%2FYLKKOLyNHjBnSk%2B5dRXgDeyQHVe99pBHmMoM5t8oZw6YkauueLfi7kzM%2BvpmBFYBPJ9%2B5DE2hIE2dnrIYTueel7jPkVLo%2BEr%2BxWkcqyr%2FzIO4HSKEp6EBVaSOMCXgffWCDcJJfhG1NB3Z%2BQ%2BXyv6svFwwtXBirbl7i%2FKzK2t4QewBM6OZe%2Bg7TFTLWXRWLP0eeWFDFZNkxTnNJSq4%2FJFuDhsLOMdJlkinYINN5pse8sS65tzblY%2B%2BZf8jW8TqrPViL%2Fu4WH%2BUQjLwZm6mpQUXfsnwlBbcIRKNrUuV%2F2uvrkQ2MzKgTztPzjnw%2BVcODfmslKL5NlG19EvndLOAX7bfxn%2F%2ByOXmwYDZNPDWYuqlpJ233nutmbNlA3A%2Fm%2Bus%2Fzewkp3EqqrqJMOun%2Bm3XWUcycbeuOL3hhuTS1PycODftoksyIlCHA1zsM%2FAiN3f2JnJ0wHUJdEkTAvv7xXA3z%2BU6jZe8bDBxMZQhyRrQy0OQdf2EXcQYolLcxU9%2BmtN0npZnKZH3YNHmsk%2BJo2V4AoT8Y6A0waQSYuTR1P9I6Xu7MJop1HFUNi220BUW2LXTC2uLHPBjqkAUW6CWE8mk%2BlN0xF8OEQo1OHgtQd0GUnKVkj23D3x%2Bf2fGYQfyv9JgA7uu0huAr%2BZTSxki%2FGlJ%2FBcUBrV3x1mxXPLjDXcjlo2DNfwX6DxTficKCA7%2FkHExtDWQW39u%2F1MJ7jmaWTcvQBtGJ05bQUAytM2hhjofePso5dn6RdiLfgtA5hr92T1RmLU0ERNwITIyn6Ip%2FsKrwJi%2Fbw96h2R5xv0NxQ&X-Amz-Signature=a0981af737593644013c66a2e832ef0663a27a145a2aca3295d3071b88209381&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646UBGPBI%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDAp4z5ZDjmU4ekl61lBBH4vLvyNI7mRRuuCOPlf272ygIhALPME%2Bu8GkrCkmaETdbtTi%2B%2BJDvlL3L6aHzvTYeEBkzOKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxoxX2IDELOSd8%2FhcIq3AMZ%2FZD%2FBBOTAuAcnbHHkgkQBSv6NqVGVSoD01wWlK6%2B%2B6kqqEqo4p4c2heddQf%2FYLKKOLyNHjBnSk%2B5dRXgDeyQHVe99pBHmMoM5t8oZw6YkauueLfi7kzM%2BvpmBFYBPJ9%2B5DE2hIE2dnrIYTueel7jPkVLo%2BEr%2BxWkcqyr%2FzIO4HSKEp6EBVaSOMCXgffWCDcJJfhG1NB3Z%2BQ%2BXyv6svFwwtXBirbl7i%2FKzK2t4QewBM6OZe%2Bg7TFTLWXRWLP0eeWFDFZNkxTnNJSq4%2FJFuDhsLOMdJlkinYINN5pse8sS65tzblY%2B%2BZf8jW8TqrPViL%2Fu4WH%2BUQjLwZm6mpQUXfsnwlBbcIRKNrUuV%2F2uvrkQ2MzKgTztPzjnw%2BVcODfmslKL5NlG19EvndLOAX7bfxn%2F%2ByOXmwYDZNPDWYuqlpJ233nutmbNlA3A%2Fm%2Bus%2Fzewkp3EqqrqJMOun%2Bm3XWUcycbeuOL3hhuTS1PycODftoksyIlCHA1zsM%2FAiN3f2JnJ0wHUJdEkTAvv7xXA3z%2BU6jZe8bDBxMZQhyRrQy0OQdf2EXcQYolLcxU9%2BmtN0npZnKZH3YNHmsk%2BJo2V4AoT8Y6A0waQSYuTR1P9I6Xu7MJop1HFUNi220BUW2LXTC2uLHPBjqkAUW6CWE8mk%2BlN0xF8OEQo1OHgtQd0GUnKVkj23D3x%2Bf2fGYQfyv9JgA7uu0huAr%2BZTSxki%2FGlJ%2FBcUBrV3x1mxXPLjDXcjlo2DNfwX6DxTficKCA7%2FkHExtDWQW39u%2F1MJ7jmaWTcvQBtGJ05bQUAytM2hhjofePso5dn6RdiLfgtA5hr92T1RmLU0ERNwITIyn6Ip%2FsKrwJi%2Fbw96h2R5xv0NxQ&X-Amz-Signature=a0981af737593644013c66a2e832ef0663a27a145a2aca3295d3071b88209381&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBTWA5VL%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T084148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDYZcCo9KW9t9%2FzEwawQ5%2F0xfHhSeSdwBdMfCvhgifb2AIgOM6w35QCKGgw%2Fvkv6X0btJqlkH61%2BRshgj86%2FQH4s%2BYqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH9hrld9sMC7Yeu4CircA1SM9DCzsbjsl%2BFvxqAGXnGxBB%2FoUojvLG0vxtgRbMv22zApkF5alVjI73P2O%2BsHEMYGGjwDftEpZxEo%2FvweMhgYHDYLkucJmQQzwN%2BGEFDk60HqjieJkLnA%2BvwjFPlXy8%2BlE8W9%2BcaRBEwFkX9ygVpZCopieU7ZrSh10T0T04pBSrFNc49JBQqgEypuCzmIvCbSvBOs3fcJWtJ3AYXDq9sZ%2B2KlsU3QZyLLcK%2Fp9X71Qgkc0OU3jkM6C%2FdROsP%2FypJklLD7UVuzacJReZNp4gfBHg1JjeKFkytl7lVTMq3u1kuWXde25LtuYAUKs%2F1Nw3YodEsRSVknVtSbSsBJQp%2FydEq955rpJbiZ6d5adRBopSc71CubTGEM84CSJnUBzarYq65CgDBmjbH0uWxh8g2EuSzZON%2FkAqBNZgf9L6dCCRYfOYa6kJEqOEoiWnBkhAd%2FCXF%2BcywjqSMQNdDTBVbm2Trdr0LJDeG7P0NOUAW%2Fi5EhseeiU7KozJXF4HjRvJlP%2BLONQzOtW3%2FDsoudmD0NiSPmqDM%2BVEIJ8NMKf51gvWJKVrVnJ9Rb0GwQ3h%2Bd80Tv6QlwfecnKfDEX4Cg1itCaL07ND6F%2B9WIVWBCsZABeCUaDSdcDLyRBfmEMJ25sc8GOqUB9Xap0KGfPpXD76dBxsHvbeZxI32OD8tzGYnVESkZ5H%2BrZaIfo2ifkPjOliDYyT3ovl%2B7vhA44Om28GwmrAPPe%2BPJIjKfP1DVnpXugcM%2FGW16PVlU1OMcgV7C1LZMSARRyyzKaRJtBZwjzTgPa0z7PSO0EyTTzDJOiTrUakoTYSfrb7eKApxWvejHBDKZ4P9yEhkDSNuAhUAJ41%2FE%2F6ME4wOl9xQR&X-Amz-Signature=7f39136b4a7e2dcffe111f1ec1578cedc0e17c3ac731ce24d134907c89f1d4d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

