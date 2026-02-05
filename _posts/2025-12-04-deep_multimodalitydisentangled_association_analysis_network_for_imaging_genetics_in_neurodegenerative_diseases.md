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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VY2U4QAV%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQCM7FHEUnI7E5sOCpoO7eU23Zmxa9Wz%2Fr%2FKAq7iIU6fyAIhAOq6PDe4YEM%2BoPIrxCiolFURczFpJBheRo%2BHgSiitkOEKv8DCDIQABoMNjM3NDIzMTgzODA1IgzBMb0Os4uIE1EH5h4q3AOVhyC1PJj7b%2FwCXGfCLSgflt%2Fu6UeT71pa0ubgSmrUDRPg1dCbArUnTco85utV1rw%2FBp91JE0V6a1JifQp6Lvyt3ZfHM02MXh99m2vz6EAfYkJ9wjqrjhsH6RZ%2BAlkEeNroCJAv5KSYr8Fh9v9%2FIYamRq5eBWruJDgc5GC9m%2BZuBe5%2BDqVnHGlQmq3rqk5ur1keSe3hIUdVMxL2eEhSg07aTlWnlaOLS%2BVcFisWLTHCvSpbgBTjGHD3SM90rjSsjz3v%2FBLwsk8WhIMpJgvwzPzZN9OVaIWQx7IUikbp%2F4KTp8TO%2FPi1ux405%2FfWgREWrt5DTjfpSlmpWRvRzKkBuL3lc8epTCMVJYDqg2dgDeVyBsG42%2BEN5%2BZRjylz1YSh0qeR%2FEAX8cIpof7Qe66n7dyBrnK1JsL8hJzwU6%2BxncCp%2Fk%2Bt7SAwfqgbm2GOf%2B12G0NapoVOQD6sqmsHkkx4ve9bM8T0xucjX6o8cqLFNABIOuHwTQJqLHww7K6NIn6EvDapEYcFd6SylR1BNgbpObo3IVDxpqRDWKZeEp%2FYMj7vO1CQ3LUpFbgGD%2F1a4OPCfNKqO12%2FBPI3vWSrVh7bPX0V2P7UkpAQk1vH8XvjFyOuHYcAYSGi%2BDKY3QdajCPpZPMBjqkAXtB5QtlFF%2FsoFSdShf9Kaomptvn%2FBYHtJnP2xgMQ0dGnxLk9o92XxzrRI4VH6UB608UV60Px%2B36Vcuc7eyqUBSzcgrVzs21rAFpCxkOBt6DtafX4FFtsQZxEITxXgfXHjVGCKkEJeEHpZigOe7T9U%2FhT0fShd%2BBloF6sUOZl%2BduN%2BKW1%2BtPYkOgHVP2PPYVEIrc1txUcvBVA7iBo0hVPfljMWUc&X-Amz-Signature=631726c3bd0a0e2f0b7228d07be35a7d5964236ace4751176e603886c5e49e3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VY2U4QAV%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQCM7FHEUnI7E5sOCpoO7eU23Zmxa9Wz%2Fr%2FKAq7iIU6fyAIhAOq6PDe4YEM%2BoPIrxCiolFURczFpJBheRo%2BHgSiitkOEKv8DCDIQABoMNjM3NDIzMTgzODA1IgzBMb0Os4uIE1EH5h4q3AOVhyC1PJj7b%2FwCXGfCLSgflt%2Fu6UeT71pa0ubgSmrUDRPg1dCbArUnTco85utV1rw%2FBp91JE0V6a1JifQp6Lvyt3ZfHM02MXh99m2vz6EAfYkJ9wjqrjhsH6RZ%2BAlkEeNroCJAv5KSYr8Fh9v9%2FIYamRq5eBWruJDgc5GC9m%2BZuBe5%2BDqVnHGlQmq3rqk5ur1keSe3hIUdVMxL2eEhSg07aTlWnlaOLS%2BVcFisWLTHCvSpbgBTjGHD3SM90rjSsjz3v%2FBLwsk8WhIMpJgvwzPzZN9OVaIWQx7IUikbp%2F4KTp8TO%2FPi1ux405%2FfWgREWrt5DTjfpSlmpWRvRzKkBuL3lc8epTCMVJYDqg2dgDeVyBsG42%2BEN5%2BZRjylz1YSh0qeR%2FEAX8cIpof7Qe66n7dyBrnK1JsL8hJzwU6%2BxncCp%2Fk%2Bt7SAwfqgbm2GOf%2B12G0NapoVOQD6sqmsHkkx4ve9bM8T0xucjX6o8cqLFNABIOuHwTQJqLHww7K6NIn6EvDapEYcFd6SylR1BNgbpObo3IVDxpqRDWKZeEp%2FYMj7vO1CQ3LUpFbgGD%2F1a4OPCfNKqO12%2FBPI3vWSrVh7bPX0V2P7UkpAQk1vH8XvjFyOuHYcAYSGi%2BDKY3QdajCPpZPMBjqkAXtB5QtlFF%2FsoFSdShf9Kaomptvn%2FBYHtJnP2xgMQ0dGnxLk9o92XxzrRI4VH6UB608UV60Px%2B36Vcuc7eyqUBSzcgrVzs21rAFpCxkOBt6DtafX4FFtsQZxEITxXgfXHjVGCKkEJeEHpZigOe7T9U%2FhT0fShd%2BBloF6sUOZl%2BduN%2BKW1%2BtPYkOgHVP2PPYVEIrc1txUcvBVA7iBo0hVPfljMWUc&X-Amz-Signature=631726c3bd0a0e2f0b7228d07be35a7d5964236ace4751176e603886c5e49e3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RU2WDRIX%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDMjWAoOFW5%2FPKFL0XFndpeVZzr3YWnIuqdc3msaH1q8gIhAMnhnAnv43CSyW72WtxQyi%2FBTgmnybBPB3r8Pcm3ToDIKv8DCDIQABoMNjM3NDIzMTgzODA1IgxpaAX9regTmQmG%2BIIq3AOipsDjuzm7CfEqNlogvLvN1tfDSBBgRW1lyLQ3G0URBtHDT78g1QWgozWmy%2Bbg%2F1gMzndLggqKPs9QTYBDVBd1Y72arIxUknjkKyaDP3lq1AHsw6McryOrReqDqmeZxzJ0bWAguHf3%2B6zqAogUq8zMRsU2uePoQRWnW5uSFird%2BKO8BAax5nSxLHw8WwCZMHjC83NEPNuDCoehovudAd5dvv9f1TbyYq6tGRqdOkIQvGkCYVRJfr4YBktc%2BAnC5c4lqkPrLTJDRp%2B3PNHkBpujfY54ifSPc0qgLsv8uUAftmxbukq7LSIUb9ZFIf8rghNSBEiGKHuKhf4cO0gj094k%2Fe6db0qzwRa9W3pk7a0uyv0RWjHP3pukWDo3J7yF8MXgg7r4hcbEE5cOhGK3LUzKYPKaiQmdhRR4u9MBFLPbegqr0CR9vhiN9xA%2BTywfzRyvmoycmfo9jJ3WNVG5PbbEqJjqsZKkCsbEGPNO2qVJ%2BMOVxo8WizZ0VqFZeQ0I5qJv6lVDhL0DDi92uKfjz08KF9yzzsfOD9O2aaDO40GEbXGehfcUwiajoV8Kwbpz4HX04owR3fr%2BIcosZ1E9p3b7yExyA6215BwIC5rQOA8JOcno6%2BayhhWi6Z7wuzD7pJPMBjqkAfljoBLSL5%2BE%2Fl5b%2B0WNiu1Azz27XsD1FDWUioukOyEkMSJ9X0tDkvHz2VFambuMH6CbFHxfUd3r4H2mpklkicAHXkjXKQsEkjZ8b4jcvpqpID9BOiEWJXlYWndATCiKyLsfVr%2BsPoKoYDupZqrcdN5q730F1EAOWAJbzC7LT8eGIkbxYEY41KU4RLgyniIpNdf%2BjGS%2BLb65AeBfZ59aPeLJoSyy&X-Amz-Signature=6ff78267c09031590aba10d5cf55c63e25df10253acb072f181783a4b0f7a402&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAFNKOPX%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCICdt66QD31P4zZmqAYxp2x8c9HCRm6l59lk1%2F9KlgTiDAiEAkNJAamhBwy%2FhEVumq3Gpmqbb1wB9v82Ckr75qt3GLLQq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDGgazlxbxM959qrlWyrcA%2BPftzq5hE8e7wDnsuvKwvyaaEg5g7leMmAcfV7OsmemzD%2BMld%2BDAvEY01v2nJfpUOOQtY%2FdtgGYViR9h%2BsIGcW6sBk16ed%2BJ82XVbfEz0eKiJ9apLxnn6sYkzRLphcNVQW%2FxoW6oPqHgj89nfwnLoXc7TPMXuq0csZrMU5%2BdA%2FIJsHkcl6xeYN9DGxM3O2ggr019T%2BQ%2B3%2BZX1RN%2BcfU6shIYROzpShQO5ygcp32HD8%2BlnnnhTjiSWXNN%2BCQ%2F7yJzvpn8utIn4UfJ6gvVVit%2Bn1TrPGdXCCcgStZLvGRxKVkB6Y9pZp2bBpAw%2BfE1kqyQXgKZB1CdUkRcylKZN%2Fn%2Bs%2F%2Bsf4moJj7j6iGpxRglcpOdMIzF4B4ujMNcCTLmBcUYS6IldtJCBS3ezgQF3Z9vWZHWJTazzmP0H6Fsta6ZxsUW%2FBkqdRB96M5Mjmcxcf74t3BMRBlG%2FwJNI6H4cnZk1weBMmTIqPkJYNpSfKLi8A4rVMaKw%2Bt3wAIPilC3NqpFSC%2BVajzSWYSqDY31PoKziyvT3%2Fm2KS6390g67MJSzzYp3ViaYhGVoZmf1NmNJRab48sClE9esVR3Qyztlw%2FeSjDY9%2BODX5oes4FTOuTV8TsZtBT1KAlN3BoxypmMLimk8wGOqUBViQ0PIDDKxn%2Fr%2Fvovct3oKj7%2Ba4wFwzej2SldqgpcHFwzPgrHfZIYz4w3H6yVFb6ZS1FiuPcWqLhNCRE2OULCjdB5Dy1%2FjVUg%2F5DU3nIlf3%2By%2BlPj%2Bxj4lEg4EL4Dnk8X4Bads9c2nA4CWTSCM8ghXGiTgjVgyPa9j1EmKhxU4dvMiy23RnRqcKNq7ErY4KIudhSurr4M%2BufeXHXqjF9eu%2BOawbq&X-Amz-Signature=e838f3638f97a4af7078e2d14cd01a87a49a92db4b0a843b33cfc058a54e77c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAFNKOPX%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCICdt66QD31P4zZmqAYxp2x8c9HCRm6l59lk1%2F9KlgTiDAiEAkNJAamhBwy%2FhEVumq3Gpmqbb1wB9v82Ckr75qt3GLLQq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDGgazlxbxM959qrlWyrcA%2BPftzq5hE8e7wDnsuvKwvyaaEg5g7leMmAcfV7OsmemzD%2BMld%2BDAvEY01v2nJfpUOOQtY%2FdtgGYViR9h%2BsIGcW6sBk16ed%2BJ82XVbfEz0eKiJ9apLxnn6sYkzRLphcNVQW%2FxoW6oPqHgj89nfwnLoXc7TPMXuq0csZrMU5%2BdA%2FIJsHkcl6xeYN9DGxM3O2ggr019T%2BQ%2B3%2BZX1RN%2BcfU6shIYROzpShQO5ygcp32HD8%2BlnnnhTjiSWXNN%2BCQ%2F7yJzvpn8utIn4UfJ6gvVVit%2Bn1TrPGdXCCcgStZLvGRxKVkB6Y9pZp2bBpAw%2BfE1kqyQXgKZB1CdUkRcylKZN%2Fn%2Bs%2F%2Bsf4moJj7j6iGpxRglcpOdMIzF4B4ujMNcCTLmBcUYS6IldtJCBS3ezgQF3Z9vWZHWJTazzmP0H6Fsta6ZxsUW%2FBkqdRB96M5Mjmcxcf74t3BMRBlG%2FwJNI6H4cnZk1weBMmTIqPkJYNpSfKLi8A4rVMaKw%2Bt3wAIPilC3NqpFSC%2BVajzSWYSqDY31PoKziyvT3%2Fm2KS6390g67MJSzzYp3ViaYhGVoZmf1NmNJRab48sClE9esVR3Qyztlw%2FeSjDY9%2BODX5oes4FTOuTV8TsZtBT1KAlN3BoxypmMLimk8wGOqUBViQ0PIDDKxn%2Fr%2Fvovct3oKj7%2Ba4wFwzej2SldqgpcHFwzPgrHfZIYz4w3H6yVFb6ZS1FiuPcWqLhNCRE2OULCjdB5Dy1%2FjVUg%2F5DU3nIlf3%2By%2BlPj%2Bxj4lEg4EL4Dnk8X4Bads9c2nA4CWTSCM8ghXGiTgjVgyPa9j1EmKhxU4dvMiy23RnRqcKNq7ErY4KIudhSurr4M%2BufeXHXqjF9eu%2BOawbq&X-Amz-Signature=7e5bb08297f77af4521cf85b9139e85c64d630f038d2417431931fb0cba2664c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675ROMUSM%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCID4UxXz7kvb8uypN%2FW1joQuTUS1xmAU0laVF97msU5SIAiASiyXqwl23x18Fs4MCa%2FOz7wuHBuX0lBpDfiEk6vcdCir%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMycXBJI4SzQN%2BGO8tKtwDHPcFup9ZaitqylnciVhnBiNZLaPuixH6onBhHl0LgY0AzOAYVf9queTcMhnDpjHW%2FZAq4qjwOML%2B8hVxIH4z27k6%2BJt8vZopw8OAMImteTqBcXQLgUdzzGAvDzhFkVofRBhO8xNZTj75gWDSZYEFcgeWZjhJbiLjPVqTLnyMvP0T2BiQWvNJDM4yuHbm46VPexX1hhlzggktZla4IAmvKtORpsRmRFIR572kOtUmS6iutMNhUEL8PHpVOgmE4HfCwkp4T6da0Oo28nZOpZJNH2BukUAKnhkLxc2AE1xQ%2Bwqp4kK3gNoZ%2BumA%2B59vgihSXaiR0r%2BRLcoNqLxceo8BfvyGdJwVmK86nRvTUbmTqyMxvE%2FqNhl3WNBe6oj96mAz45Wex9oN3kGwhprODtB6CzFZQhTzhLiVKz0nUugSLOeF4qgLLo3%2BQgpR2jdt1OOn%2BcvTRM3SBt%2B2rk6zJnzAqW4L1dMW%2Fny11LvfjWe%2F8AvJn%2FwIx5BVyVUWYjdZVgTOXMW0kQrh46757F2IUzj60G%2FroWA1vLlkB40LS7YHuxhg8KcDQ9cU%2Fce75SFAu3%2BVma%2FErlJsJxGoA%2FLOrQLfxCTfm5UPeELjsTZWSq7XzYKmX2ZkneaOPqwfElYwgqWTzAY6pgFk29%2FQgOJ1af8NStDl5lrWdwakbhkFu3c37YtmTQf%2FnWkBhZbyhgkga1VzjCX1zbmwt%2FimkuQuX6X3rSIfYG4E3zkbRyEc2484LhujJcJJt%2FcF0JmmmCdd078%2Ffm80fgRUlDzPlZi4fdFGuUNc4y14k5ylwbElZO8HK%2FsoLdu6nlc6%2FVqwYI270GT1aMs5WsbaVxwWRHrjcORUjTr8OGM8HZvzmKkZ&X-Amz-Signature=633a6ea8feafef9c375f6c9cff59272105e39aa5aec8926cca82a0c1d5b3a5b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667WO7QK3D%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCw85cf1WnPrf52p1m9cqI4XWe1JFlbcsPcPX7NdbtdkQIgCrX4%2Fk3RQLTtU7HYJlJlE3%2B6lrJ0CbS2ILKmKbUMPFgq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDE2K7mB39szdRWF7OCrcAw2PUTamryMosAsRKHQDTSlX2wPdOoNdDnYpDDr3LYVSKufwwJp%2FxsrmbGkEc59QiP3B1AY3ktJhnqJot3YIF5SCoV0sYtJwnf3RDRcI%2FK%2Bp8AY1ydYnAcwIRPZbksaLBG07JvsbzQreohX05Eaj2cVX262kxS%2Fd97yVP6b0HubO3by4OZsVPZiffZFxHSsyX%2BINb5pJJl5zv7rc8%2BOKP%2F2K0EJOLFzwkPBlUyP3xfx7cIEIyvP1RCgPDUzef92MK4ly2iR9BTAzpndOmseHX2mbp%2BiJSvLSZ%2FE5PTIGIMgVyfAMHyvWFkoFDEcgbKEE2WLWNIrMQlZoxJR5dtq%2BiaF40tmHyTNgf49Sy2PiTK1cpEq1SJP5ZqvIAy9V%2FlUoRhmLMIjREDtbbqLAZ6glT7yPPbaP2IOxUOCvBvn6AMQjvldzXVITBtz12I8cXZvgbwl8YWX1jCH2BXilfHgDIjpXt%2F7obgGgtaTJlMIbqx5ZMYALmxdDcZE%2FEpVOY8e851eo6LfsQlem8lll%2BWlQUdpiQBb0xR3Ff3xQv02w%2FBW2y%2Faj0V%2BicbQlL6zdtcYa6DMFQOKLqO4aQPqxhmeXhym8u2tOxSeDaup3bkQcyY3Lnjp3yxAj4hAjoG5PMLamk8wGOqUBOyW9jPnOmW9OoBPCQuOj7Jn2rOx1C7tBH1%2FVdwi042u7DwLffCrxFQDP1axq4UNjk57UonDAn2zLpH11NlxNNT7A7PQbLpI66ACTSPqVBwf1ft8Q6lw8Mz8Y7kf%2Bwb9Rn9mLMizxCrpDzmRMd3oGENxJT1KHwJW6zZKuwN%2Bn0ZdXk9qJAr0Xl0BaaJ2k7A8yiIUubQQweOU%2FBUS0v7nYi4Y11m8T&X-Amz-Signature=e6d3f8599fea24c82ae94471f9b40ddd25da662a1d77745ba8e4ed0a84b2cddc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDZQ6B5Z%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQD3tt4trhKpE6zK5c4bDpkexHiRHULCYYr01sgjmI%2BrpwIhAM60B14XLS0%2FHXIAJtYKKV2nX5%2BAV9P%2BkCdxig54%2BhKaKv8DCDMQABoMNjM3NDIzMTgzODA1Igz3Oa6xNlDrZuLG%2BB8q3AMk6dd%2BG%2FmVnZF51HXt56bafPqePzYrw1yilzfEyb48Ym7t4kHtDUGFjsZZIbbIYjK3bRQa%2FMv1Vl8pEre3sAvZWniKgC3tnSY3A7BSn8%2Bpw1HofdXUedvjigDSxniQK47frQFTfAy2ttEOOtPg6ch0oaWQc9Lnzy%2Fn%2BkCjos85jw8OOZJ%2B7ZZOnpSVhQTYr506sH6%2BvaTMx8lq2WmkjY7xqdrm2Pa7J%2BH7txtuj42WK%2BX0vStV46MxQJxyoafiX9%2B%2BCe%2BJ7aJKmdfusaQytgTpbUY%2BxhZgw%2BI2g7N1tVAqadIq1iukhu1ymANydRe4TOv%2Fba8izKews5gzp%2FH5xPCVhbIrVWruVQ1ZjS0oKh7ZoqzWg%2FXlSw7aW%2FrqSoGjqX7w35u%2FehWv%2FHWttKCT7fe9%2FHInh9S51Wtxo98afYStvAkdHRHuhZurJNWzYRgkFjT8eJCtXm3oQ%2BQCaXVj5inDJr0EgRxFdoMdt9kWKZjHYXV8gMD1hmWn2hlZ%2Fc9aJWChVAHsca%2BnzHhxayQGgyprrVTF1E3It1q%2Fg2HlL1bOkk7xLE01SAwUXvEe8iM8rgpGY%2Bt%2FMXTwkrE0vZso58t9sp5Uwy%2BV4aRXLiDndNnZ0bK2gPR5vdkWrih1djDnpJPMBjqkAQPAow%2FYzsCZ2NGLJ76IBG8pnClSs9o2e9DEkowA19P0f6tUgBSVDnGTp8j6lZRcTnuGJHwRxvx9Jb%2B9P2WdgexsWa%2FQIIGGPRIAOTYwah5VtoLwvDU2OzFvp0yPnIM25kTZZSMphe%2BiSvwYT6Hj5yEWbMzokdkP8Wz8sekw0ZlsDZRBthYELnBsgKYRfYBCxnxXml4zCwZ9Sn%2Br%2BNnu3i4Uowht&X-Amz-Signature=20949f14073609a124417160c20012c24cce6d07176911a0d09b5a17003c2c2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664GZMH2S%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIBaNMF32zD%2B8%2BFJZ6mVeqoVXHGo7U8mamzaVzQGg6l45AiEA2qzAlM3hxdjyCkbEo3xRPnQkzZTcIx4IG20NPF2xZmsq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDMXRJTgX1ilRvQM0VSrcA39%2Ff6YpCwy3Y8Q7EiiPQVeTHP1qYBXG7KTBxSGN3Qo%2FeuKjh5r5PgSiSIqp4vFvaNm1Yu4Jy1DWc4Y3lojJ%2BRC6UQ%2F%2Br70vcaInYcEp4osLjti4gSMkh63vW0btUp0MNScaq%2BW8EJyyrLbo%2Fep5dtARw8hBOravbbxHuTIAM9GoXLzvEtnQozzMXmHEEkC%2FCtgzVbNEYCaVnDOtZl60JLELPgfvYSy4Pn8jjagusOf3eUb%2BtzAz4AxmTg0iFPXg8T8iBbXNBdci1ZpiDeM8aPrG3OAx8gYVUu8hYJUATdPF%2FzUA2uZYHeTLEl0t5KatjL74YdP29GluQuuCOa66rQaXkgbfrogyUe1MMFgs5RNEvBJzvavU3BLnUN8pLNYFTapj3mpdfLdAoCX86mpocxvOhF08uFnnetN2dzPB6lifs8Nu9%2Bm4r6VPS3cZsmuNYH41x6MO2Uj7WA8nH9QlcdMGi3FCwY2iGjZoMbvjsUTomwhgkp1uaVEAqVx8uxMvRrgQVUYq%2Fp5JkmEHU78qnR%2BAeiusy1nfKWIFGEP6eC3KnYLKP6eunJ%2FeCIGcd8%2BkUuhk%2BCBO6oKUgQGEhM0re2UwvI2e2xw3Gg2r62JtQZJrVMOqgqkguKfPeZKOMMOlk8wGOqUBHzYlj%2FWC0AJ5gYPW%2BPj1P0K7YtN4sKzaAEg2nba%2FM6Kozn409erNj%2Fu92hfyF%2FRaBz9b19ht4nVthOk1LyeZnXGwU%2BEK2e334hPEitTDKPh6xBgKTqlPGOlg%2BYg5KmT%2Bv2AjlG7LVCgksFSakccUQN2SdXQ%2FhH4lwV%2BhjN%2F7R%2BzZRTOWSw0B4cgbLDBYBdLMyyxPPH5V3lsCvk7gCkAwN9w50qkF&X-Amz-Signature=587e212c000463c331f772df90f8be5fb024f4f44afcdc67ec4a45a351476053&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664GZMH2S%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIBaNMF32zD%2B8%2BFJZ6mVeqoVXHGo7U8mamzaVzQGg6l45AiEA2qzAlM3hxdjyCkbEo3xRPnQkzZTcIx4IG20NPF2xZmsq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDMXRJTgX1ilRvQM0VSrcA39%2Ff6YpCwy3Y8Q7EiiPQVeTHP1qYBXG7KTBxSGN3Qo%2FeuKjh5r5PgSiSIqp4vFvaNm1Yu4Jy1DWc4Y3lojJ%2BRC6UQ%2F%2Br70vcaInYcEp4osLjti4gSMkh63vW0btUp0MNScaq%2BW8EJyyrLbo%2Fep5dtARw8hBOravbbxHuTIAM9GoXLzvEtnQozzMXmHEEkC%2FCtgzVbNEYCaVnDOtZl60JLELPgfvYSy4Pn8jjagusOf3eUb%2BtzAz4AxmTg0iFPXg8T8iBbXNBdci1ZpiDeM8aPrG3OAx8gYVUu8hYJUATdPF%2FzUA2uZYHeTLEl0t5KatjL74YdP29GluQuuCOa66rQaXkgbfrogyUe1MMFgs5RNEvBJzvavU3BLnUN8pLNYFTapj3mpdfLdAoCX86mpocxvOhF08uFnnetN2dzPB6lifs8Nu9%2Bm4r6VPS3cZsmuNYH41x6MO2Uj7WA8nH9QlcdMGi3FCwY2iGjZoMbvjsUTomwhgkp1uaVEAqVx8uxMvRrgQVUYq%2Fp5JkmEHU78qnR%2BAeiusy1nfKWIFGEP6eC3KnYLKP6eunJ%2FeCIGcd8%2BkUuhk%2BCBO6oKUgQGEhM0re2UwvI2e2xw3Gg2r62JtQZJrVMOqgqkguKfPeZKOMMOlk8wGOqUBHzYlj%2FWC0AJ5gYPW%2BPj1P0K7YtN4sKzaAEg2nba%2FM6Kozn409erNj%2Fu92hfyF%2FRaBz9b19ht4nVthOk1LyeZnXGwU%2BEK2e334hPEitTDKPh6xBgKTqlPGOlg%2BYg5KmT%2Bv2AjlG7LVCgksFSakccUQN2SdXQ%2FhH4lwV%2BhjN%2F7R%2BzZRTOWSw0B4cgbLDBYBdLMyyxPPH5V3lsCvk7gCkAwN9w50qkF&X-Amz-Signature=0def0cf9c90162d14643f8a8c278c2f6e564f7c8c1203c8a5ad68501eadbf60c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLHYJH6Q%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQCR%2F1BP3h%2B3r2EweQ%2F%2BGFlKI4GXshtGp3EzdKSE8Ogv3AIhAI68fuSkr0d2Sl1q6FAr6av%2FHIheOdZzV84fUfbxVSGtKv8DCDMQABoMNjM3NDIzMTgzODA1IgxvnVb1yawOrTjgmmwq3AM8Zbdwuh69AInkIvfnOmrzGIbkowQ3zzktYRWmmJ%2FP4umVges4tVWY6nTU7m2VvQRAFLjfrPgyPCoaoVF1IF4x612oD7N06f3lgc5c6TXB4ZJomTS7gTwPlAm4%2FYwQ5R3qLJfG47ey%2BvIDILmWxEmDzCDIUF7wkMCTSzssK2Whi2ASLT1%2FHmFvHT1lhiWoPlmCZvXmuJQjodXS2pvZ7uiaSA9b%2FKrXwQ8oj1I0gVFvToi5j4bP3H3YwrdcfylHlj%2BkeEkDlFOlStfcJRt7tS9mkVVPD2CToK8H6Fca06K95odkSDN3pev3Pwql9xhMY%2Bs31exY7F1VH2EcWnZmgiwAFAOFPOKoLOhgvx739WKqCRA0wqwV9lazGMh3r7iVYrjzM8WrpxJ9aY22kEiO7Xb3rGDiyS6xrfTbLKh0k7FQJCbhCdYcEYN0eynTvjX6kCbMvrzzUsm45OLfIc4TdNro%2BAN47gfQ7Nc4dnsdewQxPBoQR4WCkGphMHWY1Gk53L7QULqKRyGWSaNFGhG4%2Buzl1Bo0M%2FnxIGjL0giXOxesYUyimS0oTmw%2BafMcT%2B5Xj0Pjm0DguP7SCdb0Usr7rxl4KhonO8565e3V81YGUrC%2BvioZqqN43%2B9ErqJ2kTCtppPMBjqkAanYrVByOD4DGvPIK5QF3aLfFvAmpg54ypJWale%2BNDx6LHvgb09HLrzm1o8dgNlHzHV%2B8P37piJ7HRFW2v%2BwfdRXXamuMS9%2BhoStmLTTosde%2FGtsM0zESMc4Y%2FAhLlkpWhc8Kpi0%2Fkzbi7paHUn%2BYc6q8K3tyNKZw8OgmT0otqf0WZPrAlYd3IXoHyNF8ixQi2zigEtczSK4U8dJURZg96Xrdomy&X-Amz-Signature=95d5ffb453c4bd7ecf181b4bb482b6548a9c059f4976eded9a34964c369b6bfe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IUJASW3%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIQDyCSwu0caNLAAVeQGlvnBZM%2FD7CNTUmywEkCfhO0E9pQIfP%2BGVZjs1SEpjNyOl%2FGDI%2F63SYzvQQggQDS2aYQaB9yr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMFhV74g9RGVn0X%2BL7KtwDLhgiJs8G%2B8%2BCM3FoekY3z6wbEFjLQ9S5DYHxQNh1NydiXFlvk2b%2B1TscYbU85d5AwlY0vBQIfSm%2FGBA0BfPkjPL8hwXM0UY9B%2FCNfFz0qv%2FDJ9sQZ%2B3fRqKaa0Bs6Id4wWlqiNiqGm9YHhCVabfA%2F1OQdeQ27RA%2FnXoFuNcfQrRvBecke8LPgo9OvA3Y4O2%2B%2Bc8hiqpa7DvacfE849GxAc%2FMnZqPQb7PJRp3n0x36jitC70rLIuvYAcP07wPOGPdio9ruULFByNOgWQx0tulvx8XfA8Vapq6%2B5zKHvuQ760GrE94cqw09IFxWfy0hOomMGGzXRk4J4WlWdmb75ndp5uKttNXr9L%2Bm35I%2BI4C3P7TCv8D7FnQud1OPBDlGqbYkYHuGJ61iyWlWlhDP%2Bm0TXlFO82h8WNlE2QjipDEYwlTBcgVFOFQZJ2klbPR9ze7W1KNkftRbSe%2F0tX9%2FcfkXBxxJcppBqXzFXHdMahKoG50TrDt86MNYhz0%2FJNYNwewhEcbrv1SJ8wXN9lgzra9rL2u6%2FS77FmR986Or%2F8UbMc8vb795AuXtbtkD3YvgFZ%2FehLzXmQye1fZJUrs1Bd7sZ%2FyVvGBjeOXRTixce58B8RJtlRraNicSvOKEPIwq6aTzAY6pgFCPTH1AIQZ3YQgeHc1Nf4JnsJzT0Qe5c8VWmVnckcfLJdrwoWlAE3287BK8MUfdOavFDEyPAKDFvgA8F5LBsf%2FcFQcrftTmdeajlYh1QFgfgzY2B5MjIgq5a2h4yA56Q1aoTa8FykxkH0T7MNZmeowyUOgL0DdDg4PlfatyPEYmEwA8Qmpj9jlaRB28ALRASsroTnMD%2BLSLVe7pWhe8IlC7bdFtp36&X-Amz-Signature=06349ce7a498b53b8baf830b20e24064349ecde7b092f45b9ad4c2d07bf700b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IUJASW3%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIQDyCSwu0caNLAAVeQGlvnBZM%2FD7CNTUmywEkCfhO0E9pQIfP%2BGVZjs1SEpjNyOl%2FGDI%2F63SYzvQQggQDS2aYQaB9yr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMFhV74g9RGVn0X%2BL7KtwDLhgiJs8G%2B8%2BCM3FoekY3z6wbEFjLQ9S5DYHxQNh1NydiXFlvk2b%2B1TscYbU85d5AwlY0vBQIfSm%2FGBA0BfPkjPL8hwXM0UY9B%2FCNfFz0qv%2FDJ9sQZ%2B3fRqKaa0Bs6Id4wWlqiNiqGm9YHhCVabfA%2F1OQdeQ27RA%2FnXoFuNcfQrRvBecke8LPgo9OvA3Y4O2%2B%2Bc8hiqpa7DvacfE849GxAc%2FMnZqPQb7PJRp3n0x36jitC70rLIuvYAcP07wPOGPdio9ruULFByNOgWQx0tulvx8XfA8Vapq6%2B5zKHvuQ760GrE94cqw09IFxWfy0hOomMGGzXRk4J4WlWdmb75ndp5uKttNXr9L%2Bm35I%2BI4C3P7TCv8D7FnQud1OPBDlGqbYkYHuGJ61iyWlWlhDP%2Bm0TXlFO82h8WNlE2QjipDEYwlTBcgVFOFQZJ2klbPR9ze7W1KNkftRbSe%2F0tX9%2FcfkXBxxJcppBqXzFXHdMahKoG50TrDt86MNYhz0%2FJNYNwewhEcbrv1SJ8wXN9lgzra9rL2u6%2FS77FmR986Or%2F8UbMc8vb795AuXtbtkD3YvgFZ%2FehLzXmQye1fZJUrs1Bd7sZ%2FyVvGBjeOXRTixce58B8RJtlRraNicSvOKEPIwq6aTzAY6pgFCPTH1AIQZ3YQgeHc1Nf4JnsJzT0Qe5c8VWmVnckcfLJdrwoWlAE3287BK8MUfdOavFDEyPAKDFvgA8F5LBsf%2FcFQcrftTmdeajlYh1QFgfgzY2B5MjIgq5a2h4yA56Q1aoTa8FykxkH0T7MNZmeowyUOgL0DdDg4PlfatyPEYmEwA8Qmpj9jlaRB28ALRASsroTnMD%2BLSLVe7pWhe8IlC7bdFtp36&X-Amz-Signature=06349ce7a498b53b8baf830b20e24064349ecde7b092f45b9ad4c2d07bf700b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7YWC477%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T173658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDq0YNoPR%2BC%2Bh%2ByrXRdzyK%2BS0pNnj0pWXCUkIkxMzm2hAIhAMKjYEXDTn1HWnkN%2F3jDCiN9yLVga%2FDXUI8Tq%2Fe%2ByaytKv8DCDMQABoMNjM3NDIzMTgzODA1IgztzDSPKfPf7Q4bR1Yq3ANH6JrOuvM4cBIWduZVLvFkY%2FF1WXUehCSu1w4YE2pZW8Wn3FS7JRQw9Wn9iBCSX%2FaeKKiSKb%2B00DAiRxQ2nss0j0cOiH4WqucvBXWjjtb%2Be%2B1Zb1MQC0Dsh%2F7yswbUlwvvQcmOL5G0W1ITLZg3sn0L3fB2Ov%2Fcbr6qsZG0bGSt9iDLQMHwE15dr5GakOf5%2FFVE%2Fhy4E36%2FYy1jfbn3WHdm5EhJ6b%2FO%2BwT92DBX8U%2FUtZdrOv%2BjkbwfARthLv7ye%2FL2sa6qwEoVK8%2BDrJsVl%2FD9SAngvkfZBSHzpwqY5W7bLL22Iof%2B4EMigK4KYlj6Xr8aonboVV6mB41NgHD8UOGh3OPzcge5NGf3b3Qb6Wz0MWqyQS8bcDBQMWN%2FYS0wrdYwFyoUlqbRHl1f6PzLHOQZq1jwQDUf%2FPxQBy5PrKXPThMbPqELPWxMI1qeyWbepxHOjGVb4naOR%2BdfSgOz3qvBwcq2YAjFb5lRAHUfLehkxcdEOFIyCEQjyBpeIfIk11ua27k27VfMOYqm9zAAR6COKTgLgL9xUPP3L9UaCPj%2BvPczshcJ5%2BTuBUyyoMMtDC6bISKxouNIRPtKafA6dW7lfDqDthbwja2PMFIywfqR7FIDJHle2nXR8Bf6EjCYpZPMBjqkAeCBmYvLFuqX1gqpY1k92RFluTv1%2FKIFDKV7eCXmPcW7J%2Bw77AZtp5tZGnG15bcqnHt17cee4KnAqMgdfLLEdwo53iRwz6JmAc%2FBV9VSV0eE3kE%2B6c4EdF821W0wkf5HMpy8zryKBSSKrPqiIB525LNa8O5ZebDJ2DuXU3ROwagmT%2F0nFimWk%2BvxecR4umkdK6GD%2F7Q1X3bC4SgCobNxgWabEtMV&X-Amz-Signature=f552781c7f4dc4cccb389ebc638ea951b157f15443f8db40bbeb624708b5cd8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

