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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V25J5YAK%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIAnZFtFuGOUNpmqp%2B6yBPJR8BtZcblseQfEx5dAbNigeAiEA9fUwNUKGvizSKEPI9LaM3n9xF3cja2QDwsd3lQNysrIq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDEqpODK1QB5fXON7RSrcA06iDd872b4vxte4GIMGojjsGj0p8BeSiiZeG6YNZsDt%2BCUjPtsqjN4ryp78hFWHIH9TsOKgNRE5rsMt%2FIRW%2B%2BrkvDbcFS8O0JBU5L%2FGpPXaPH4cww7AVaI7%2FRhU0qope6pF5Hwf9cJyebqUEtmTgJgo%2FB4i%2FhPDqI9eijjgAWqvfuW%2Bi9a2CJ72XLo%2FnjRifHpjc1Pqcw2ZMsVoj16vGbLdGITqU5JjTMUSS7wxDtBlqCmdiH%2FOSpqAbs8FTRHxg7gLXaS%2FGskhZb3UC1d8UK%2BqXJ0FVePVfpF71Hq0HGDdYB%2B8MHXm9QnNSX3ZC22jotzzK%2BYxmiXCWyXTs4EIOGshUZGh4XzxCZO%2Bk%2B8Ejmqw4ZuXTtdNfdOOULVqQeT7l6R5mAlXTtEqUZWMO0U3Dx6xAyt4CDs8YLFOJUNjmOQVWNzOu4CxVR10F3C%2BFzp71MbeWH%2Fiw7OrnaVo7macFsjEGcKtmJPbw0fnCV0%2B8hYVbw0uCzqdImlf1oYnV%2Fi42cPJKO9q7AJRFS%2BjJ2WC7q3S4wdkmU%2B8RJmEkP%2Basret2vqM3lZLHj37xcjd%2FuPaDe0CrOQAtoZogjvMg%2FdbYic5RvkxqT9YDMb7a4JxZTBRIl8k2DkBzPuvIOCxMMb57soGOqUBbLS9W%2F8N7ljNgg2%2Fg%2BhI%2Bosc%2B9nTI3V9%2FWzyB4izqX45SCV2XAAvdEsyk2jiavCgeNdtUHz39Q9T%2FR%2F5Q4tzj%2B1ennuGG68xfOJozSC4qNRLIb6rR3nMkiHrcbdtN%2FC6BlLdsluxDPxhCebKloaBj4R485NoqJ9xFDYTafySwFA7hcxBm6O%2F%2FmXNxSTzuuP2C7oED%2F7eRmpbayNb9v0eVMt1Swww&X-Amz-Signature=929d251c59f67d905f26dcb0a2830c050f5026498cf825e3cc39d46a3f037d17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V25J5YAK%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIAnZFtFuGOUNpmqp%2B6yBPJR8BtZcblseQfEx5dAbNigeAiEA9fUwNUKGvizSKEPI9LaM3n9xF3cja2QDwsd3lQNysrIq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDEqpODK1QB5fXON7RSrcA06iDd872b4vxte4GIMGojjsGj0p8BeSiiZeG6YNZsDt%2BCUjPtsqjN4ryp78hFWHIH9TsOKgNRE5rsMt%2FIRW%2B%2BrkvDbcFS8O0JBU5L%2FGpPXaPH4cww7AVaI7%2FRhU0qope6pF5Hwf9cJyebqUEtmTgJgo%2FB4i%2FhPDqI9eijjgAWqvfuW%2Bi9a2CJ72XLo%2FnjRifHpjc1Pqcw2ZMsVoj16vGbLdGITqU5JjTMUSS7wxDtBlqCmdiH%2FOSpqAbs8FTRHxg7gLXaS%2FGskhZb3UC1d8UK%2BqXJ0FVePVfpF71Hq0HGDdYB%2B8MHXm9QnNSX3ZC22jotzzK%2BYxmiXCWyXTs4EIOGshUZGh4XzxCZO%2Bk%2B8Ejmqw4ZuXTtdNfdOOULVqQeT7l6R5mAlXTtEqUZWMO0U3Dx6xAyt4CDs8YLFOJUNjmOQVWNzOu4CxVR10F3C%2BFzp71MbeWH%2Fiw7OrnaVo7macFsjEGcKtmJPbw0fnCV0%2B8hYVbw0uCzqdImlf1oYnV%2Fi42cPJKO9q7AJRFS%2BjJ2WC7q3S4wdkmU%2B8RJmEkP%2Basret2vqM3lZLHj37xcjd%2FuPaDe0CrOQAtoZogjvMg%2FdbYic5RvkxqT9YDMb7a4JxZTBRIl8k2DkBzPuvIOCxMMb57soGOqUBbLS9W%2F8N7ljNgg2%2Fg%2BhI%2Bosc%2B9nTI3V9%2FWzyB4izqX45SCV2XAAvdEsyk2jiavCgeNdtUHz39Q9T%2FR%2F5Q4tzj%2B1ennuGG68xfOJozSC4qNRLIb6rR3nMkiHrcbdtN%2FC6BlLdsluxDPxhCebKloaBj4R485NoqJ9xFDYTafySwFA7hcxBm6O%2F%2FmXNxSTzuuP2C7oED%2F7eRmpbayNb9v0eVMt1Swww&X-Amz-Signature=929d251c59f67d905f26dcb0a2830c050f5026498cf825e3cc39d46a3f037d17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WD3WRREI%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIBaM6PalUHEOHHOqhMgmOknBmtexT1uQ9jUBXNN5daaEAiEA5PR%2F6YBPVU%2F7x3uIjkKFWYUD69OdASDAhBqDJsM6Spwq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDOstduDfpEI5vIQ9CSrcA78lgI2IANRspqfRKbRMvHhKRD2TNHidfi4h8PxkbVqRvs87%2BswRtre%2BKY5ugZQP%2FTB%2Bq8wBr44Y16o1qmFIEqbSskJK9NY3JJ6lWbqKGksV%2FfdPtJfS5g8UmGdbx0ztWnbEKhqCSPG8Y7lpudE%2BzFKH9GPSAkpHTIkStbic1N%2B%2Fytq8zUttwP%2B9qlWcXsO7czAEe3w4KsECSLBgpt0E0chAA%2FW7ZGn%2FwhvrV0N92ryuEPnkk%2FA%2FRqWottJIP47p7OcNMfrJp8tzwx02uws8ZmVQjQPEN%2FlAB0tU3xvaggfRYu%2BlvMpln2CytdbH4vAhZXE7Sd23OUWTwGKKGrXFXz6q0QFotliPtiyxyIyvZvV6FI7s1uhcn6PKYRiK49UlXqiXT3E0IRodAQSdkv0KcRef1Epvp1syb7P%2Bz37TAWDldEVAlNRS9bo1Jyw%2BAP7lXxVq4svQH20NE767FfHJMYYb7UciK2NC2ql2VrlaSlONxwBhwu04Nbz8r23sSdOM8tgBMgGeszhE9rdnUwwM%2BTTlBnfUGaYkSOwq7pGJ8o%2BDL1rGneEEHyGZNb3y2494SteswzAI1i8jyV8Jxx%2B%2BGGN4kawGVs%2B5DDMRgvvCQblhkdkkf%2Bg%2FY6QS4wUvMMT57soGOqUB58RwP7OCS%2F5w36tIOyOqcdDmM7P0ZRMDTZmwG%2BeSTU5VOGk%2B%2FxWxnPYm7K60Q1c%2FpsZZ9eePUTr1bdgs9XIeRjoAw1iWjCcf%2FFAZU8UbNKjf2IyjTEGPSyTpikXW%2ForVEtPkRWg6ZhC2Sl08z7ws41sqkk5QesSCdZIOFzR343gKHALMdhJ5K2zoWL6y%2BHs7sxjr8WOMqlJZD%2FsqCBCikf7XFQ3%2F&X-Amz-Signature=39aa639af34fc1814e51ae203195f8cda71ec667067d99e2a5ddc18a13d872b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHGTQUWX%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIFWJS08t7t6AU2%2FijgN1N3zB%2Bb3Y9rCDxuENulGRz%2BPqAiA89MnbMEPkLTWPEAY04ybm7siRVbxV6iUjDIpR1IBsPSr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIM3C%2F0fGMLl4yMhRBTKtwDPUTGwjE%2Bu89dBYSCs7wSZdKhuGwoUcM1sOwU%2BVVquzVm6MOg85etGKKf9f3Ra7FHjJxmmkJ2pERSIG534FSdZjfm4ER5iBXKYmwte2TUNT4K1Kab5NPG8SanZheWT93c3DdRYZVJxpZ2w24uUb3IWe%2FiellyDqcmuP0yJjc2HcycAfvM4zMgu6wZh0A%2ByMiLmz245Z1JodlNp4f8iMap14UDHXYbT0%2BAOzgj8t02WDi%2FVTRzvEmUNqmAAuJP%2Fix%2Fxu%2F2kXegwS6UYzm2WyJDSGJhTCS9ugoUFlYhSMu3mhNoeRH%2F67Fbfp6PN6snUyYCB8MfmiQYe7JQC3YBDy%2FsVxk3KQjJz8eyHMwchS2Z8h7pF9oawzJ44ARsgH%2B16gceGmJnTheq%2B4oUoP%2BcI7TOSvmUGT3JlmEZKUIF4twMhxdxcF6oggI0YhFi5CwwWyCEO9flv%2B4qGmqv3AIOqGE5GTx2dOiWtCKe9Fm7Xv9ZgCMss09nRKSDGOi6dYffFFcRBok8B24e3aWN8idJ6aGZYHzc0Gvf35TM0uT%2F7QnVU2E6pILbAL7oi5Uvi%2Fo7Dt29TZdkVwVA%2B257plICdB%2BK64Q2tTfJu3807HqaLqInQ8v9NITinOaeAg3Xwi4wu%2FnuygY6pgFmQCozcfOoJpI1I2UjTaa%2BJlk7KC9e%2BWCfhJnP1O5XQUQ9PzpLSfUmdxtBloFpgGNZfwEVLZjdwQZXwpJpauuulOVZ6vui7cndxaKvmWcU1fLrYAaFCuWbM1jSsTTrn3p6mIz6BHoQ%2FTv8ZyQjWzdsyGlYhX7rAZ5Qcj%2BSfyog6sxzt5LT71PG%2B%2BRfiP%2B1nRmEuCCG%2BhnJBHPGMtPz8bRIQdnRW675&X-Amz-Signature=9926972b070705e7d38e6df6254dd56381ce816d090d42b89827084de673e3f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHGTQUWX%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIFWJS08t7t6AU2%2FijgN1N3zB%2Bb3Y9rCDxuENulGRz%2BPqAiA89MnbMEPkLTWPEAY04ybm7siRVbxV6iUjDIpR1IBsPSr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIM3C%2F0fGMLl4yMhRBTKtwDPUTGwjE%2Bu89dBYSCs7wSZdKhuGwoUcM1sOwU%2BVVquzVm6MOg85etGKKf9f3Ra7FHjJxmmkJ2pERSIG534FSdZjfm4ER5iBXKYmwte2TUNT4K1Kab5NPG8SanZheWT93c3DdRYZVJxpZ2w24uUb3IWe%2FiellyDqcmuP0yJjc2HcycAfvM4zMgu6wZh0A%2ByMiLmz245Z1JodlNp4f8iMap14UDHXYbT0%2BAOzgj8t02WDi%2FVTRzvEmUNqmAAuJP%2Fix%2Fxu%2F2kXegwS6UYzm2WyJDSGJhTCS9ugoUFlYhSMu3mhNoeRH%2F67Fbfp6PN6snUyYCB8MfmiQYe7JQC3YBDy%2FsVxk3KQjJz8eyHMwchS2Z8h7pF9oawzJ44ARsgH%2B16gceGmJnTheq%2B4oUoP%2BcI7TOSvmUGT3JlmEZKUIF4twMhxdxcF6oggI0YhFi5CwwWyCEO9flv%2B4qGmqv3AIOqGE5GTx2dOiWtCKe9Fm7Xv9ZgCMss09nRKSDGOi6dYffFFcRBok8B24e3aWN8idJ6aGZYHzc0Gvf35TM0uT%2F7QnVU2E6pILbAL7oi5Uvi%2Fo7Dt29TZdkVwVA%2B257plICdB%2BK64Q2tTfJu3807HqaLqInQ8v9NITinOaeAg3Xwi4wu%2FnuygY6pgFmQCozcfOoJpI1I2UjTaa%2BJlk7KC9e%2BWCfhJnP1O5XQUQ9PzpLSfUmdxtBloFpgGNZfwEVLZjdwQZXwpJpauuulOVZ6vui7cndxaKvmWcU1fLrYAaFCuWbM1jSsTTrn3p6mIz6BHoQ%2FTv8ZyQjWzdsyGlYhX7rAZ5Qcj%2BSfyog6sxzt5LT71PG%2B%2BRfiP%2B1nRmEuCCG%2BhnJBHPGMtPz8bRIQdnRW675&X-Amz-Signature=a4ecd800a4f4c751fe1677e601fea49a4c585469721da1ae797d3c47dc26acb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WB3ALNHC%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIH4vs9aeNXBNCPUcltDYYwokQKkQGNaPAsHFD1FRi%2F7PAiEA4phj5LXGbWwWJQc%2F2UxDWIrYSba9wVbloRbUq0jnDfIq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDKrfuq8BLjBDp0RoiyrcA20xEj5pv7%2FCSx751oByqfktyrwMWYwNqPqmAz6qXW54ZymjJH1txLNRnCO5%2FWb%2BC%2BQlkqskd30961sIGWql71FaDSNMaR2dUVAdhxiZESfRnBzDgJ2M2qI6TBKF4hSVBZER3sFObAC0TVyk8%2B6KTmCmnPSwk5CaD5wavKS57s2VPlEt7GkyzD%2BXNoudmhBnaAMU18qsdXYApj%2FN9sk7TLnllVVjdmUnTH6%2Bx%2FNsSt%2BkmHoWlhLI8BamoQiW2Uh3Rd5vvfzZfotDWTzcUpJ%2BwGY8vH1HtByCM3Qa6ebXULDbHZOVh7DOTj%2F%2F35aPCHdpuDsZBH1JUZmvsaSTOb%2F6yX7R9kkI7R7JiOZX5VJj20uOFbzoQzJbzm4gDrZ4pArUcsAXfHCfXclbd24iJY540pMdXehOp%2FjSuLU1EEgM%2FHzafU4LQrGCdMNipEt7iBbgntHz6Oo4CLPfTjdTq3YB5gs95Y91giltxDaKggovX7LOnD2ojFWNjlZzQFRZeQhCvvc3Jsv6C0fTRIw8BFJPC54JTEeHDlzDHoVBZszIj34cTkBO9p3bmsVqmHe%2FbHFZpy8C8FqxT1AOzSuzVkvOwqf9vVxQ%2FHx%2BYb8hOWLIeSm%2FvtCmME7pOX6R7UZfMO337soGOqUB5uNTpl2QgV%2B3oqUVDlFQg%2Fp%2FSmR%2FBdXU013dl3LTCmFP%2FWQRdyUpYGtYuKh8nFScS1QhTFUDqVsSmp3jpyK8%2FcS1IwdmbBfDbhZwAxE0Fj1F5JfxEH4i5NuO7yo%2FcbnFC2hejQbS6n%2Bi6%2FlSw1MLn6lsVhm2gZJmysP8bQDcHX9T1aPFu02471pWeZu3y4YM72soHh7Y40V6sSQo%2BYMP4%2F1FF9sl&X-Amz-Signature=f43863e83af3707852a36ef1d9aa8dcfa9551bc53307be372a916403b3ad0ea2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ2ZWFVA%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQDjB9PiHRCmMcNhM2LdMAsyLhk7Rvu8Ob901N4tc3cITgIgLzAvgO%2FYPbITiMv1rFmCCcu9gYEncvhyC1uxJayzDNUq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDE8ydDegUdg4QMC4zyrcA7ddU9Ci94DBb46l3j2cOiszKfHxDgmsbwzFZJKyg%2BOBDeo1UnyxQ1FYEqf8DmGpC6S8MI6Qck%2BKwIDsMl89031HyUOmv%2B2YrEHn%2Fjao5w1ZQ3RzbF5yCbjf1DV%2FfGCDbZS%2Fe7X8Hdbqmf%2Frk%2FoKloiQsKz9QXdE%2BpcIfkH%2FY1el8s1pizSYrqg9xuu5eOjNAGeJTS00L4jeQVbDqXiANEC5tE2AmuMaTalmrB53hYCFYd90DRBUprRkgqtwlHRccgQoBH4CP%2Bw6UkXskJHTFPsDT%2BnqTj1cPiiObdXtcp6dZGBsT1%2F8TLyF%2FDj9WFOlMLOl7wGXj6YFoYU8EG50NKwXpwhDyyZqRVa7d5F4NEhgeVCJ2yJgBCUbwWIDhIk4wGoet12PZ8T1HWVfO2ygn7YCuaLa94Z7JWjCblMJzhCCrfMLUuvUpj06vQPMCPD9LAScPJi48n6B8u6lmE7NP7Aywrlr7BIZ6My5GIHM3gQY72omSNtckso2kTIfzHImAWu38CMYeMNUIyGjZFJ4E7rdeMiL5FMDk8dMUUWpdyJM68Cv%2BP6%2BA3WmKCLIbtPyUtLLQmmoVXUdg4eyELHkKPCNvanIZ5khVTsRrCDNuQZ%2FE15SSyiFBoWhbftUMPf37soGOqUBuOVyxJ7wd4BDtJmHIDO3o2T8I57wklzvLu4F6mUcQ%2BQ5vMW%2Bspo4v9QK3g6OYiOy1KyaJCAMcKs3rhCzTusjv7DH1aM85ObMXo53qAVi9FigGF%2Fbgnaj0XChZJycfwAnun0mP9W9TSbr6uDUcHYfqlYgnuUVagBCofql%2BnKAjlilqgJtW41509fEPqPtySL27rQULbjsVRzHr1zVnqIwsA27IB%2By&X-Amz-Signature=3a8140b310233b2bf06b5d26aaf1feeb1ea887c577e71b0a6837df82329866b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUQH2DE7%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIAG%2F8y5f1uV2TtLDObMpZDFxehwQBOmouC5bziymm4ElAiEA5neLCHgBKUEce5MxFuGtBkrJo3i4IOsebnbeqT1CdCoq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDCRTAHasjOEZqHyBUircAwTCclSkP2Yd2Asa7AVe8zC6WrhPHRwn5WnuIJbvjDnotUCJy4F8AXsFH0zqyV4jBA5W%2Bv5Fp1BF7aXe0UvLJ3svfB3Rx6GI35JwYdA6NWGNUr0MZ%2BjfhjctJT5cFNYVOC3DN9cDreenA04iXWr%2BH1CiPdGIwy%2F%2BDLqj%2BUn7vNosA1GOXLtZcaAt9l%2FSqP1i%2BcWG2R38uuucnKOUamKPwpGPSWNlrlF4XjmHOpW9Lf38vX76cVn81SuJf0UJptK1JolYJdKJkCR9fom6Skh1JrTULqFJEu02mftwu2r%2BhoLlQEu72q8%2FGyIMi%2BYhyorTKZj7tjnBiT%2B8BCwqQsPAqYvgl1MsMbAmcXw9uD0StPY9%2FI%2BAsPRuLJPbydfl%2FkYycvU7Lc0QdfPwU1mEBiFr6ZcQ0yqboHSP0wo5ZOLHq5h0xsjl3WIgqyMhPnuYiP%2FV8uUA64z%2BWR6jGdl%2Bo%2FjCNu1jbDeYPkJTNPF8Z%2FUKQkyjyc96ObksgOI0ccJao2g9qajwQ9QZxKbSe%2BHRsi%2BQ95nNdMiWypKEcZUCISXrYSlEKQ4NTxutPGjPYZaeiN8wbTAtEACHyDqmllPNHJdzSY1iMyMTrj1l6RS%2FS80LQ9aBfwaGQxJH0O3FsF57MJ357soGOqUBDX7dGHCCJMwA0pn8aB53y82L7PkFsCxOp4OTLa1WCEbkk%2BzrSFgYuoucDxGA3COmQmtcsW2x6QFg27DwJi7FDIfw%2FXcn8DfLi3HrzWRwMEMBKQknpVsej8o7s3dS0oKQt2WnI6Y4HY3H7P42iFOvrSQ%2FNLAobqKk3Z6cX2tsmWTe0ODpbkiwV2GPSdcyl4b6YsEVX%2Bkf%2FgrgQNQxV5y4Ci%2FRyj33&X-Amz-Signature=26599b587aac98213a00e6bcce0a08ddc926ddb88633eb385d66918444f71041&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7BNJK4C%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIH2ogrbp8O5HZLXFVSrFfsgOYcCELrrUSQZz96ZXHxzUAiBANJHNmH2kOK4WLLs5k8G8cEcdGhRFCBlFsLroZBb1HSr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMsFiuIoTA4KivJ8VNKtwDqLItPK5wwBVJ%2F57nHlGF8smfKU5fJbHSBYxHMOT4223nQm2cZrjp0Ji3VoPOeNkoIOzjH8zBMlU03M7LGDusr%2Fkdl4GD%2FgDdiR8c8%2B4okgfsbGIbjH39Q0evqQlN1hV0qGfC0%2FoaCs1tBWUFpoMS6Zo%2BJ7DAzC9bdtfPuY2r6GvRIVrvjy9EA8y9ZacW8SDPkdsa1KqQIKxx2IyU9nbS33vsiD9aa09dEeAyRgk2KDgEeAdVc1vzJel5KWQTVcbVikItgxLal7JBtt0Gy31WUw10q7ttm4oUYfuA0f7z1MO7pAG74sHJGtP36JHZgY6goPr56e02FpprjCd1JhFOaiUFbjKLFNDDEHx%2BgY8NKDANEHVjrA0HTVH1oe64erQJH8%2Bmc4EfsZSexlo%2BF4vlGnXBYIdKzFBX%2B4uSRTR7fR8vT77TRA7gRj9Psrfh2RltBix%2FGRxYC20v3H1COi0aNQcyw0L%2Fznl7P%2Fea7rhnnvfREhtNnAwpDI3jm3trAny5AuyP3T1HXobyX3rgxYMlNu4iiUIugagXwpLcMHa%2FUgQgtnSWDjBD406VPvhIISN%2FqvGb4Lrz2Ay0G2Bi%2FFqBRRyhIuq6DzxN%2FXaTFePEZ5pTNKejz5%2FnaCdelH0wo%2FruygY6pgFlKZEtq0fm%2FViyUzfOE1aWiB%2FioO2%2BBpprPGjgUS8ZeWW8DYQkGNyiYglIhlmsI6uNPBy1fdgJ7rJKt%2FRaiNyQLeV3VvJAFKChfu6XswEttFl1v952aIU560V8mfwc9W6KIaLovANTE5WkwxL8tkROMoR8nDkxazRi0L411banSNmkvIJrJunR3S4TaQosK0hxslItoGykb0I0DrV8q1YxG3WrGSan&X-Amz-Signature=7dc165fd2228b91dc808bda36c9362f62b8a87f7e774825f70bb754018b89506&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7BNJK4C%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIH2ogrbp8O5HZLXFVSrFfsgOYcCELrrUSQZz96ZXHxzUAiBANJHNmH2kOK4WLLs5k8G8cEcdGhRFCBlFsLroZBb1HSr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMsFiuIoTA4KivJ8VNKtwDqLItPK5wwBVJ%2F57nHlGF8smfKU5fJbHSBYxHMOT4223nQm2cZrjp0Ji3VoPOeNkoIOzjH8zBMlU03M7LGDusr%2Fkdl4GD%2FgDdiR8c8%2B4okgfsbGIbjH39Q0evqQlN1hV0qGfC0%2FoaCs1tBWUFpoMS6Zo%2BJ7DAzC9bdtfPuY2r6GvRIVrvjy9EA8y9ZacW8SDPkdsa1KqQIKxx2IyU9nbS33vsiD9aa09dEeAyRgk2KDgEeAdVc1vzJel5KWQTVcbVikItgxLal7JBtt0Gy31WUw10q7ttm4oUYfuA0f7z1MO7pAG74sHJGtP36JHZgY6goPr56e02FpprjCd1JhFOaiUFbjKLFNDDEHx%2BgY8NKDANEHVjrA0HTVH1oe64erQJH8%2Bmc4EfsZSexlo%2BF4vlGnXBYIdKzFBX%2B4uSRTR7fR8vT77TRA7gRj9Psrfh2RltBix%2FGRxYC20v3H1COi0aNQcyw0L%2Fznl7P%2Fea7rhnnvfREhtNnAwpDI3jm3trAny5AuyP3T1HXobyX3rgxYMlNu4iiUIugagXwpLcMHa%2FUgQgtnSWDjBD406VPvhIISN%2FqvGb4Lrz2Ay0G2Bi%2FFqBRRyhIuq6DzxN%2FXaTFePEZ5pTNKejz5%2FnaCdelH0wo%2FruygY6pgFlKZEtq0fm%2FViyUzfOE1aWiB%2FioO2%2BBpprPGjgUS8ZeWW8DYQkGNyiYglIhlmsI6uNPBy1fdgJ7rJKt%2FRaiNyQLeV3VvJAFKChfu6XswEttFl1v952aIU560V8mfwc9W6KIaLovANTE5WkwxL8tkROMoR8nDkxazRi0L411banSNmkvIJrJunR3S4TaQosK0hxslItoGykb0I0DrV8q1YxG3WrGSan&X-Amz-Signature=a272a47eba235c5ce87d8cb6f8eb3ac75b14bfd0952d33cbae21b9fd0f67f385&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2VTCFFB%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIC2Ht1rha72%2BPN%2Be3BVBtfRIuzxJi1zTytQNej9Z8d1VAiEAl3s%2FB0wXLtuKVTNc1CkqH3bvzxw5VqZ6WHpRmOM61koq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDB9dNg83%2BYhwT8aVTCrcAzBLkcPRWtToExtcsdJLyRa21sLSQ76mLn3MjnvAymXgzlr3TRirgN5UYvmK%2FZcBysNuyyHJlJ11HpwcqfnTbPhfNFTT48ZwoQ2gXGsoIl%2FvBV9Xk4Q5VZinWUJlrgnhEEgfV49VOUcascR8DBIdQQC5SlNkmCGGIJWb3iq6FZtpwF9bQy0vpYQdvvhUgqhtK1i4AEBBO9N859SVGnSsKvbKkaWapH8gIwjxVFPy99QrxdzQ6%2FNaU3PlVy01%2Bx5My2OgvwFfoumts2NxJgF9fUp0voZY2r06FMr2hKZL8brn38dAC1hE6cIW%2FiokB31GHJkHrAw3EeseirvCu9iDY3APzmiHYkWFlpok9RfL0oQ0AmopPR4r5rEroeRBW6eySlt1V1I2eH0npz5FyRWWhH3QMpB3UHQdiCAvgFSVKuEd78OoI7fezHiMyx9Mf4AIBf35CMbzTs0kXPfkO0lcJNZptQODvUeJ7%2BENSGiTDlECZBmy%2FBgoSzT2qtRbrH5GWU4%2BY5jX1FY8qc3BRset1GpptN1zNrvNHWQ9gCg8pDKO8iq0fVhWpkv1OYskuy5Axf3QZC3uTudeYRmZqvuWMSAiL%2FqoyrtKYP3bLP09sWWMnN5rJNLeqIKZ89HCMMP37soGOqUBNfXyQ3LPGTZajGhya1hKAyCXfJvOOZoMQA%2BTqSp%2BISpLqyWLLRo19YlD5ko2Li7zstNOmVClvkYS2a0oo3nuk5QQ8DLZtRn%2FRbfNF6vI2WEYAx0wUbA%2FM4s%2F7gdOWhIP4hAwjIqAbO%2FICHW7FMnHa9icoOdny83ALwpbW2cPFk0xV%2Bp3jB8277mg2%2F6a3OGqrs22Fg%2BD0piCkRliDQLmPOmT1qkk&X-Amz-Signature=c1b0b4b40992c26502428403296e45d79b850ebd804bf498942621fde39cba63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662US5WIIU%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIHvDPu6%2By8XKatXg7RY2Mw3ZSfq0l9%2BtF2xAm5k0SNW%2BAiEAii2VwpdqO8z85pbtRdqcBFJxdkws5neflTG%2F8ophaEkq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDOnlkpz5EAiy600pTircAzyvkm8WhXS9FmmCm9kAuYd6SScHGKIacw0tbzOUWfcq9f%2BTPwefS14BFAOU8Q06aqwPdjN%2FV4C9sZuuXdkcCEQY%2B7BqOTv%2BSQNchfwAyGQu5oEBVeCC8GJ3ta5IMOrewoRncqFheM9ETDj2zfY%2F97svZa3DAfd8WEoAM8n%2BMZP%2FzpJ3OwAl0kKQEC13F%2FeVoHsVWX0F6QlvskyNfbDsd0lQ4if95FoQcaMVnDdguwCqkDgxaUg%2FnDyZUyoB9KaUydY5KGSUwnWZYL9Q5TvaE1BYphlS%2BWaTC4JHL0CX5GpEFTZF%2B0phMh7%2BqCUkvdnj%2BfJCUv1QfJ2EajVHGNUJSA6ygHTTG58nuWp%2FF3%2Fb8m6QB3RLm39mM5hrtAPbwvlBidd4NCy4i7MA9M3gh1ENLHrpYK0MWNJjtIvivfFIzzBFOMuMsBlGT%2BcoeYRK4SF%2B08j3DmXi2YxS%2Fmi0VKlU0Cg37zHr2Wowh6TpG4s2aZ4Ex%2FPW2UVP5zSita7wj3PPzWx%2ByXuuiQG2ZtqLbYpb5xo7jvcIHTrUnVDsB3OuvNP%2Fgxu5A6PyuAiSPb6sFbG3YlIPS8%2BXuQzXKaIH1qgK9MNRFRxMt89d8oTfy392M1oKyxjkwtohEyvEe3nEMPf37soGOqUBi78a6JPVZbZqKY9k3vbQnVlRCO9vezeKA1V0WxIMNMsSDviIwper3s09Ms%2FYLIH0Mu2jKflFgy%2BNFAjG%2FeODvJ7jZlrOPzLA5%2FZseWGqbuZ9TFgSJ%2FO%2BYrLBIJwQ7LoF5Cx2hyb%2BTp5KVfwuPEfdVAnEN7iQByPTPL1Vi0ekLFIJPDSKgdmYIwjbtq7KmueK0pCQGw0KiyILHpjWAEmX65YiyQ1W&X-Amz-Signature=1f88776b84b8c45b4b977d043717b54ffa7f7cabf89378ca4dd4ee734799c9d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662US5WIIU%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIHvDPu6%2By8XKatXg7RY2Mw3ZSfq0l9%2BtF2xAm5k0SNW%2BAiEAii2VwpdqO8z85pbtRdqcBFJxdkws5neflTG%2F8ophaEkq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDOnlkpz5EAiy600pTircAzyvkm8WhXS9FmmCm9kAuYd6SScHGKIacw0tbzOUWfcq9f%2BTPwefS14BFAOU8Q06aqwPdjN%2FV4C9sZuuXdkcCEQY%2B7BqOTv%2BSQNchfwAyGQu5oEBVeCC8GJ3ta5IMOrewoRncqFheM9ETDj2zfY%2F97svZa3DAfd8WEoAM8n%2BMZP%2FzpJ3OwAl0kKQEC13F%2FeVoHsVWX0F6QlvskyNfbDsd0lQ4if95FoQcaMVnDdguwCqkDgxaUg%2FnDyZUyoB9KaUydY5KGSUwnWZYL9Q5TvaE1BYphlS%2BWaTC4JHL0CX5GpEFTZF%2B0phMh7%2BqCUkvdnj%2BfJCUv1QfJ2EajVHGNUJSA6ygHTTG58nuWp%2FF3%2Fb8m6QB3RLm39mM5hrtAPbwvlBidd4NCy4i7MA9M3gh1ENLHrpYK0MWNJjtIvivfFIzzBFOMuMsBlGT%2BcoeYRK4SF%2B08j3DmXi2YxS%2Fmi0VKlU0Cg37zHr2Wowh6TpG4s2aZ4Ex%2FPW2UVP5zSita7wj3PPzWx%2ByXuuiQG2ZtqLbYpb5xo7jvcIHTrUnVDsB3OuvNP%2Fgxu5A6PyuAiSPb6sFbG3YlIPS8%2BXuQzXKaIH1qgK9MNRFRxMt89d8oTfy392M1oKyxjkwtohEyvEe3nEMPf37soGOqUBi78a6JPVZbZqKY9k3vbQnVlRCO9vezeKA1V0WxIMNMsSDviIwper3s09Ms%2FYLIH0Mu2jKflFgy%2BNFAjG%2FeODvJ7jZlrOPzLA5%2FZseWGqbuZ9TFgSJ%2FO%2BYrLBIJwQ7LoF5Cx2hyb%2BTp5KVfwuPEfdVAnEN7iQByPTPL1Vi0ekLFIJPDSKgdmYIwjbtq7KmueK0pCQGw0KiyILHpjWAEmX65YiyQ1W&X-Amz-Signature=1f88776b84b8c45b4b977d043717b54ffa7f7cabf89378ca4dd4ee734799c9d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPTZBCDR%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T161306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQDNqd1NxhLZh1i0fqub59M91xC%2FjOnZ0xZqjppM5we5VQIhAIR%2BR7PWuhZCa6Co7ll9njWcd4EknmN1lYQXV7gZ8mdcKv8DCEcQABoMNjM3NDIzMTgzODA1Igz6PQT09rzCGHb1H48q3APGRUrhbzJ9ebDex3%2FS4aSQ2GTdFtNhO0JEVoqC4%2BaMAzHx9vcImVIyYn7RdcXqLuMt7sXsGzTAbywLrHKx2zxh9Gimo0CVrmU0nx%2FoWjjiAZDryCamc%2BQrTHbEJ9zGi%2BefGKeUXRSLMZfFf9MLxGUrbJCj7DBkEaeL3X9vZDK5i5Q0ht1IAmGu3%2FnhW4riMS%2FEj9sV52bC6Kw1rSdm4L3eV1o1aUoI2noeer%2BvEad82A3d19PMk7mOMCxoac58CTctJCqCWL9W7q8XRoGP3t9ZKkrSzx0s9%2BSrlSx7HCZRYYSLbF6C4UGvRzHYora5wX9wSo9GS%2BAQgN%2Fhoejz2%2FL4u9idRMe%2Bfo8Fha73Ns0aTqCMQecxg8S9jFxcEqp8s1aN2%2FGRoNKjWWFQuAzAHfSKgOsXkWDexVUdGGLPe6AciuCUvlG5Lbd5F7udjUCD3maqCg4xr8HJ%2BhaL6MfDSOR8WLJqgPYxSikUPnSgIPY8sV5q2IDcSiO%2BePAUBkprMNyoxU29XHfwe1biU5qQ1nI8uS%2BAd1ecLLNQNzltTq5ub7zlxctzbe5a30z2DO%2FelBT5zXqiwNfgOguv6VTxGXLlvXWaNbspkvMj34lI5BefqOjRc1J8J3f6JX465TCZ%2Be7KBjqkAQY3Gdkuh5QMp0EOyLYvmvHntyXvYT%2BhsIxGZnjkzfIcFCFNjyuMJtNxFIXiha2sYKRA8P2lslAZ27vVi12PfXKszqMOKL68ACIEXiJ2DTE6P7M0pmb1Nps1qMjWhsjxpVHvAycVRLgedR4L8nKSr4Ukhy0%2BA8lS0RKg%2B76sjlYOUgzj0ZHec6b7l3%2FztqckNMgCq4R9i0JQBPIsfdLClLUZaEt5&X-Amz-Signature=f83f6d46daee71e824c6e0deed0ddda1a3542896143caa17819db100ff90016b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

