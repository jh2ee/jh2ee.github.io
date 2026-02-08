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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DEXKS2R%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDh01STcdtBooqk5ZX7ErnbkRkqkNPmRdJQw9hsuG7DxwIhAMPEFeRcwTjvCOMAZR1aFB8N8s75vcddk13Xd3bFBpalKv8DCHYQABoMNjM3NDIzMTgzODA1IgyDQjOP2ysSz%2BWY4goq3APmqFQRfXIwqteI8ELQ5NXfmHWXChwgYmrDxt%2BBqHHD6PjCoTikbkUzswurgR1OJoft7WHhjmFvPvsgILS2jwH1g9LewmsXM%2B8sZwwvIX9akKgHrLeH1i4m7JBD1vphFh9aiw0lKhclMGIyd8XhnKv6M7dbz4dKpZVLnITp3iy5CWzcgr0FAPwNcfd8UmJH8sZgqaIRxB504r3R0I8fSegrwZa4qAVW949oxN7Z5pJcBnNipro92IGrOmKMmnkz%2ByQPFjcv8eWL0CGrNiahitq50xElFrb4mRPWOzZyxQURNAueYN1j7kEbAyhlk%2FeAS0c9bjBAC0FBsjBqvFAY8vfxkdRw4l1YNI9mgDMA4BfbG6KKS5YbrzVsMRrgklw3FHfZWtvGkxYUdifo6obO0Pl9WavGBhfbg%2FRzKzQJNmh1Z%2Bob17%2BtEs3IVPEHYRj36L3POG8NSTCLvfbeoF%2BJBWnXF6aC9xlMwyrehD%2ByVSCON7LO0cPcs5J2HFT%2FcvpibOvU1CdTHXvXlQtvg32H8P%2Fep8oCw5JqZwRYfKTqkGuMTWhMUOJ5iazPCR%2B%2FKcwoeJIpNRvNvRgIit73z9cUYTLFtPBoGBxF5PBADBBN2RWMuoPo8RqAereS6IhCvjC3jKLMBjqkAZZBjYS%2B9vJrYpD79HO%2F0zQPAY3pKXkqR9Ltwd%2FAl8mH5iK4mnX9Zl2eRut59%2FOOMdVQQSPjTz%2BdwRyjlDgoaqI3EZRhAqnvudny75zRBHy68nwVqDxoV5FggN%2BBUsej9SBlEaXdSpapMeOMfc1b9Hk9Ywh4QrItH48dwwugPAqKSverx9cpeSEaSvS%2B4EkB856cujm2qoJEDEyToA1WZ4smKuok&X-Amz-Signature=8546d504919e6abdb28086894b5f9c61697822739ae8ea3d8ed9b676e2672744&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DEXKS2R%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDh01STcdtBooqk5ZX7ErnbkRkqkNPmRdJQw9hsuG7DxwIhAMPEFeRcwTjvCOMAZR1aFB8N8s75vcddk13Xd3bFBpalKv8DCHYQABoMNjM3NDIzMTgzODA1IgyDQjOP2ysSz%2BWY4goq3APmqFQRfXIwqteI8ELQ5NXfmHWXChwgYmrDxt%2BBqHHD6PjCoTikbkUzswurgR1OJoft7WHhjmFvPvsgILS2jwH1g9LewmsXM%2B8sZwwvIX9akKgHrLeH1i4m7JBD1vphFh9aiw0lKhclMGIyd8XhnKv6M7dbz4dKpZVLnITp3iy5CWzcgr0FAPwNcfd8UmJH8sZgqaIRxB504r3R0I8fSegrwZa4qAVW949oxN7Z5pJcBnNipro92IGrOmKMmnkz%2ByQPFjcv8eWL0CGrNiahitq50xElFrb4mRPWOzZyxQURNAueYN1j7kEbAyhlk%2FeAS0c9bjBAC0FBsjBqvFAY8vfxkdRw4l1YNI9mgDMA4BfbG6KKS5YbrzVsMRrgklw3FHfZWtvGkxYUdifo6obO0Pl9WavGBhfbg%2FRzKzQJNmh1Z%2Bob17%2BtEs3IVPEHYRj36L3POG8NSTCLvfbeoF%2BJBWnXF6aC9xlMwyrehD%2ByVSCON7LO0cPcs5J2HFT%2FcvpibOvU1CdTHXvXlQtvg32H8P%2Fep8oCw5JqZwRYfKTqkGuMTWhMUOJ5iazPCR%2B%2FKcwoeJIpNRvNvRgIit73z9cUYTLFtPBoGBxF5PBADBBN2RWMuoPo8RqAereS6IhCvjC3jKLMBjqkAZZBjYS%2B9vJrYpD79HO%2F0zQPAY3pKXkqR9Ltwd%2FAl8mH5iK4mnX9Zl2eRut59%2FOOMdVQQSPjTz%2BdwRyjlDgoaqI3EZRhAqnvudny75zRBHy68nwVqDxoV5FggN%2BBUsej9SBlEaXdSpapMeOMfc1b9Hk9Ywh4QrItH48dwwugPAqKSverx9cpeSEaSvS%2B4EkB856cujm2qoJEDEyToA1WZ4smKuok&X-Amz-Signature=8546d504919e6abdb28086894b5f9c61697822739ae8ea3d8ed9b676e2672744&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665R2RRPDW%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIByTgJwr%2BoQ5LQ0GTUfAU4T8zoWpsH65x1JNF31xfQeaAiEA0dP%2FZcU0LM%2FEzac27QMkMsH3XSJJaWey%2FYXXY%2FSDxscq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDOMQ%2BB%2B6XQMJXpVv7CrcA5XulupJiSaTFAUyHyolzKu%2BrtPF585oH3MlVhnnPdlOURnw5dFbBe1jSYFnOZGhDUpjiriuj%2BxKrBG5sZh72E%2BHZsPt4Kkl9MudtgbAdViKwsKxuOvkDiNJIgMeENNZuRBogd9GyH95nZ5PgOSLwmmQoOi4hyVSsvjBjFXbe8cYizJKYx3NzHr0JUDnLbaE%2FgC%2FRHp%2BARrUm2DRXY4UeaVyACeoSc49050bGmY7wJ8wqS3ZK4P%2FcLGvlXOia%2F0O9pU0m%2BGktEAmC3WoZNwMQEkdh5EbkqV37jpcZgD0TTxVbtz46RjKOdcsblA4pmrd5W9HFRQ7LvUPptwI8e1eWXBAo%2BH8nCTOB7o%2FtVum0e%2BXbO71ZJWsLXGf6Qbr99pC%2Fia1YXxNpJPDnzVpgx7KKR7CaFkvfnaqGyi3K1YFTpnRM9ubu2NFh8vQxbQeHYnkoFKhi0dKSzK%2FFOtw%2Fwa8B4H686CXHqwW5twnSQMqS%2BzGHCSRz0sywwoq0H24llRjMMs%2Bu%2BT6TEM8HhCFMp4EyUuwKYBDMdKoVOiTRrVtBGl1kxYDTrvQmj1zfk9V%2FKS1qwsERPMQpCBI3lwr7eAq81v8t3fK6KgcIQK%2B5wHcaAh9H1fQ0eMPCbDlWg9sMOmMoswGOqUBJRALeZnq98OWtJoP47IAntSxvOkNFgNEE6UJj53rah5rukN1G%2BFt%2FG7H%2F6Szqmgwnz%2B%2FnoIyphhaXXoM1%2BJMJ1%2BzTx%2FjIVvEB6wjtTwDNnY7zLQ2Xra67fvGVueiZhkpGIfTwZfy4aeoiwBTbW7JmaC0agip%2BZt3JbkE1TlX321RkkgkzkQui0hkyRbv65fOO0VUah5LbWR13W65tE9xTjK0tcFE&X-Amz-Signature=1d790d6b417625be9a25b50790293751235886b226d83eb43aa4df4b17afe593&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637G3OVMZ%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRa3T2ieY18yHuD7Eju69FQSYtumkmnCOw9xMwhG6Z%2BgIhAOySSJevhzQ1QowyWcNUZQfyVQBoizGCICuKVwul9hxYKv8DCHYQABoMNjM3NDIzMTgzODA1Igy0ZoOgcyGuHir6O%2BYq3ANZULqWF%2Fpd%2BytN2RHbpvWLCdJo0ajWVwdDUud8UTrkd1m3ERPzLrHCX6TgxgrAZwwIZl3qMcVI%2BuMAATXbvYAvuOT1kPUpjnVTnX6%2B%2BOvsiUrMDEDpSbrSJI3i17wKDl90P0YULkSYwcHAMttg9ttBbpj7QoZH74%2BsgLBrdUO6CCJYCdCnuH61DETip74M7OQ5Cs4KmeGcSF%2FTYsTH8grltpg6ex6zQAzBJxO2aDDkvb9S44rVx4IaU%2F%2FeJvY6jxKb0R7x1GP5HyWAwY5SfEhBJnBYuKXG0apRAdAQlY%2FVlAj9zzsxEaDrJJfb2NHN4YUTobaQO7SAh7n4o%2BQ3E1tPKikGkT9yjeSmzCQDcWOG09ARIl8aahFcHv3pYD9ttx%2BUHyZbUjFIGkvrgTK3DdiUdP3YUdv61B5FhkRWBoZnHre80vpgk7yr%2FFe%2Fyzs3niGmWl5Kq2tZNKqJJWGtTq6AcZHN%2BVyBT2RPNNM8ZAUE%2Fmzn0bnVs%2FZq2RAh4O9xvGP8e8GldsDLLHWsv2JajE3lacCN0nesh5cM61YU0tEwW42UBLxzTqzOOkfTI9KLUPZHzfhaq17wRBFd4E9Xf1XA1AnEpm3ON%2BAmalFGYD3EEAUrH51TH4hYCNR%2FWTCPjaLMBjqkAVTYz0Nedxa5%2FOCl6p%2FKao1k6aypm0LsJDJWfsmKNPNfKPdHmGRIucthxQuCwws7iKxgH3lP4iXRHDjTpj7E8cwgPCm9jYBsxDXBH%2B6ZhYm%2BOlUr2c3F%2FUvHO4anEDyciYJJKzlsV5IRTnxeEH1xpGE4nobdhqfY%2BW%2BiukSS2CAb7RWqR2eVteDNVcBMLn4QN7p6I05qCvcBQHbko7xYU50r0EyL&X-Amz-Signature=6a52c179e66265e7ddcd727ba90b41032e47cc1be039ee266187ac7432a1f875&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637G3OVMZ%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRa3T2ieY18yHuD7Eju69FQSYtumkmnCOw9xMwhG6Z%2BgIhAOySSJevhzQ1QowyWcNUZQfyVQBoizGCICuKVwul9hxYKv8DCHYQABoMNjM3NDIzMTgzODA1Igy0ZoOgcyGuHir6O%2BYq3ANZULqWF%2Fpd%2BytN2RHbpvWLCdJo0ajWVwdDUud8UTrkd1m3ERPzLrHCX6TgxgrAZwwIZl3qMcVI%2BuMAATXbvYAvuOT1kPUpjnVTnX6%2B%2BOvsiUrMDEDpSbrSJI3i17wKDl90P0YULkSYwcHAMttg9ttBbpj7QoZH74%2BsgLBrdUO6CCJYCdCnuH61DETip74M7OQ5Cs4KmeGcSF%2FTYsTH8grltpg6ex6zQAzBJxO2aDDkvb9S44rVx4IaU%2F%2FeJvY6jxKb0R7x1GP5HyWAwY5SfEhBJnBYuKXG0apRAdAQlY%2FVlAj9zzsxEaDrJJfb2NHN4YUTobaQO7SAh7n4o%2BQ3E1tPKikGkT9yjeSmzCQDcWOG09ARIl8aahFcHv3pYD9ttx%2BUHyZbUjFIGkvrgTK3DdiUdP3YUdv61B5FhkRWBoZnHre80vpgk7yr%2FFe%2Fyzs3niGmWl5Kq2tZNKqJJWGtTq6AcZHN%2BVyBT2RPNNM8ZAUE%2Fmzn0bnVs%2FZq2RAh4O9xvGP8e8GldsDLLHWsv2JajE3lacCN0nesh5cM61YU0tEwW42UBLxzTqzOOkfTI9KLUPZHzfhaq17wRBFd4E9Xf1XA1AnEpm3ON%2BAmalFGYD3EEAUrH51TH4hYCNR%2FWTCPjaLMBjqkAVTYz0Nedxa5%2FOCl6p%2FKao1k6aypm0LsJDJWfsmKNPNfKPdHmGRIucthxQuCwws7iKxgH3lP4iXRHDjTpj7E8cwgPCm9jYBsxDXBH%2B6ZhYm%2BOlUr2c3F%2FUvHO4anEDyciYJJKzlsV5IRTnxeEH1xpGE4nobdhqfY%2BW%2BiukSS2CAb7RWqR2eVteDNVcBMLn4QN7p6I05qCvcBQHbko7xYU50r0EyL&X-Amz-Signature=7704f64e8aca47e9b886097347b822ff54c24ce2522bcebd45b6c8852c0b4606&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMFPG2CF%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCrUUeugwCp02XWXzV%2Bww0omK%2BC51HR7FSNdDow0URrfAIgVco8Vc5qCm0Ie%2Fz3k%2F7kD%2BSn%2F2i8tkfM56HefK3hOeoq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDC67UsKtxNM1TFbqfyrcA8NvAtiTBPvVEyurUOaiWLrI2FVHkgFFuZ2ui2z5eDbwOG3it2M8UWmbkc%2FntBwG0FVQzOMDXnxOODIAIebN7VRcFIJ%2FzOi9RoJgklJwtqXE%2B%2B4WElDBDFeCkfnrvkUK2rM90Ht28L36AWU93KukJwJIhjXDAw8pZazhQj8YTeiuu9rgWJivfJJfmAKj0geDmGilKS6sVCRExx%2BD90%2BFnQCyc%2Fhg4Z3kjPpAgiobOueXUk3eNlkUQFTOgM8S9lfm3UXjUmgGhzOb2HTeHx2uFhXJ1o29SC1yBBVyHMne3XHFed%2BoK%2F59oEVr%2B91Krk8lpcs9LzPftTCBH7XQLhwXxozEJsVGqC40U4gpoYtpPnT8Oi4Rm5FvtX3pt%2BKSkDNVCTU%2FSXCdhDEvZ0LhPVUzCf3b6ltMPPChn0Uwrt0E%2BOLD4PYwu%2Fr2WXSEh%2FUyp8LGui7mu05yj4cGWrg9PqSe5ch69Hx%2BZjs%2Fa7%2FhIn2Ja8n8UmpbYVOLu%2Feyacn7tCDSW0izLJRUL5NeIAIo1YbqFjaWRMw%2F1pgdIMbZQfIJCVGP9YCKDongjPY04%2FsIhUHDA8O37woJmUKE2Nj4yDoVc%2FvEUdM8TGCFs2Qj9d7LiECC3rYuafepq%2Bi7ABFdMI6NoswGOqUBnklBlH8dj1CZHRVcNZ%2B69LXWJVI59eQuvjdzAXgac3uTB6CIa0%2BdjeSpeX7ZQoR5WdK2jdTStA6H5GrreW5f1uOZ7OmTPlRO8k2Ncp%2FauNkfJ2%2BD50FEvXB86zKoEJQrAmDGpun2CvF1urib%2FHlkX4XyQ51pTHABSlK8ax63YOJujLhR5Q6BnVBJ2TtTeBRkNYyL29Y%2FFAFiX9NZCVuUo6mHrwa9&X-Amz-Signature=34410614bc433e1f4a46ca2ce1687fede318b93043f005acca8b26fc17acbd8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIVOCLHG%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCH9UApWnHv7C82Kv0OR2pTUVotgRjpiEj5v7zQ8KHNXwIhAKYvUJLOS%2BpTmYZSruwOxPNQQQc3hXjd1nm8iI8cOfafKv8DCHYQABoMNjM3NDIzMTgzODA1Igyse%2BN3TYsqpimi7rgq3AMrTzyNY3SxQBDuJKyCR6HhE9lWGpW0O90PlNyvI%2FejQQ2fCG4UqmzZsY6GgZEIMHuA0AKWcA0WYV%2FRhX4j1cIlT3kOWCyOkO4kyQ9jonYRI1xDqxOGAHs5VRo8gC0cuCXpaJn52hv6nI4uvyYdkhBeNtLDT%2Fz43SurV%2B43jU%2B9x1E280oonnJk4%2FnnO6iqSCijohiGe3Q%2FU5wyHovlcj6MA2h1ug0HWZ%2BanJ%2B90yhM3lhreR7B3BNLb1RIzfWZzyUMsqJ5Vz0YmhUKS7o5TYJKS7741Hw0%2FwZES7RRcmE6q%2FrNeaJeDddeJ3tfxcD0yWcef%2BhpxxEqlnezmI4bnY7CS4cIyg76Cc9z0PcGDikkgiMi3QjKGqi4d0KapqiAmzScBhOa4E8z3W8NHEcmjbdxsuChK3GKvVxt9m9mx4x19WRgMLnNCEfr6QRPfTjWBNcMqgedy%2F8WE%2Fx1LOuhpwbD7SsB2e4L5uBUHxjZGZbL7jbRQaiOhXgHujwmqanPqc67%2FHvnXqXhh2m824w4TWLKYEV1ICo3OmVruuFHnKugCgWH%2Bhf9TMmYh%2FzcDcf6KPPkYlWDBqf72%2F%2BK9sS4jdIAsd2DNKBzb1eBA6rQISsimwfzle%2Fz3aP5LDSXFjDfjKLMBjqkAT6kA5%2FIxXAeLQuPDJ%2B9NK7EB%2FOOE90EtJ%2Bcvszhy5p%2BdSvRHZ%2Fxg44wcvW0ZqY7YEzJQze3r9r3OUsH7RoyjoZ6N6SMyLsGqXSjdikDqkYFJd%2FCbL%2BsZnducGodWd0bVIAt%2BKJVY2e7BO9KD8Pxs5Y80sFzcGj09l8J1JTOoILEsVxIGyR0OGfXJw42DZSaFzk0lvCMRIbfcaGEjB%2BZCsju%2FUUH&X-Amz-Signature=86f8d775d166fe4ba8b1a85d28e169ff00bf8dd6a614c324d6b62a195270b98e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667W2WOT2F%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC4uE13bvhcL7JmGGTsa8g%2F7t%2B7OuWKf4gIWmWQDHtB9gIhANWU1knsTdkR8VfsAjEHVf3ZxlGg0rx22JuILoRebwEjKv8DCHYQABoMNjM3NDIzMTgzODA1Igz7ppOl3vgMnhMNiHMq3APe35j5rm9odRAfvENU4BnBzaHDVrxV45bDjwb48zshlCx2jQWsd9YPcRiAuF3gTIzQfP4ttl5fas9v%2FgOWrrSWdzvPP66MdDYSiiH2zOuNsItG4kax2S2qmmOYcrwd6x3Y6veEkIOhmkXOsfHbXMoLZbxAazqcw8d2rruj0zqhQBe41hftxVau1IEvApOhqdJIpsla%2BnawUdxaZP7eb0ay9gQm9%2Bge3gRwgAOIJqrh9YfQS5%2ByZyy%2FReuvGiwwDsDdQf%2FWWQIEts5OM6UTn%2F0Tz12KwxcKHSwufEfZHbsmLu7TyCf2f2NKFAmb55W9zpsqEjPNDqjAmoIidtHBdzfqZAKnNXqz8HEcr6XHgo2LNftOTqotvN107KYzyh%2FeUZ10aPRvKcjaOiCAhSrqxuIAhca84%2F7ftlKDkr3AiF%2Fp2Y3UjcviEeJ4SZEi71Wv%2BDMM%2BdyGoLVuP%2BWAKR5xRgdrVqs2TK9xW2%2FsJK1KXNv16eita1Z1vLalgze%2BRa%2FMt3xGQKgTFACKimJ%2F%2Bk%2BKWhxNN8n%2FWNQuGdnPmPFDRo9jljC7BdtIj6%2B5pSWZw9oFIUGjDShh8XRhZKUcnd17JVHfxwY1SbKU2pznFY9xfyHPG7jF6uRyb3RHZ9DUojDHjaLMBjqkARFAcNJK2%2B1lSjfLL3TrvKSqdBH7b%2Bzi1uBb6jqOJavA58ktxULHKHgJbY%2F79V66HTyszW%2FTPiYRfwowmkCmhddkymaboALfvwpwGhZEa5RMXF5fkjs2izlCFYQWjG%2Fb8LdktSDO5kkRXytc2KbskHs6L4pYZjmCe4Nq1FLMHX0paOTGenUOEn5w%2B4a6VSIzh9b26EIAHZ9yVbC%2FPDQ5D5g4C5ce&X-Amz-Signature=5158417e10bcb6f891b06f31c697420da80489d1550663918d7e552f4001cc0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KR4EBRG%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGRG9NHeB54%2FFvazH2YVFx4vmpoRjlcZK%2BH5foRXK%2B5AIhAL%2FEBz%2BRdbREHpEVeXh1VxlfA4qqj6pc3V0E1srqyfpeKv8DCHYQABoMNjM3NDIzMTgzODA1IgwBztVkrci05Rip6LUq3AN5uozGc1zUR4NJ4Z%2B3fW5RvEkyj%2FLe8e8T9iUPYGGoUw5zeNS6XbwQqGBCgaOjVFArAsYhLgFOeRy9eG3Ow1Jd4%2FjZnBxt9731NoMforffEQmQkjNg47vEF1hO7O9CiMwRkFJeONkZzrH5IK79qfzKJYXAKkI%2B%2FbHuuVwi59Wi1FSV%2FGbA1C6tBXincAmsr%2F4vmmKMMZZ0%2FcK0%2FyO3f5Xw8aeTS279GApp6WSDlTv9MGwgrJORILO59a5%2FAraCNsG1LIO5ObBZW7%2BT3TWK8geY23QOkFhrNcMkruzHOYGEU0IR9x9FMgUqzZTDN0K1M3Mi101KAvRHbrIyGJJJZB7Gi85spJ%2F6C%2BSMeVF6d3geVkYPizfcX1HMWssImEePIXixyxXfMgeTj%2ByN4Qfsq2vNXR%2B7R%2FISNjBWX7B0iKjvQ6YJoAUiDEWKXh1YEvuqTRWNOCsdVURLAo40sg71BHfXSSPQqoTL97DZXBRF9s9AcZrC8nTE7JQ8yihV4HnqPeMm0ikqS1uJSZ%2B3ekYbXzkgHQ%2BYw4msmpJhDEbUn8zjzI7dtULstsU4OXF5fYshvnBpphi9BwBMuT0Lng9WRA4b48jWGInNdSuH4Xrg8l60EqpvrZhhdYnuJbE6SjC5jKLMBjqkAQRtV2eAQVudJxMefYbyXCpFWXiY3kCTOLS3gvIb1Q55pYdjADiALUFnGhSxYcfZvKv0AuQJ9QVqtVwDhtN6zUeJudHp1UYdh6OovhFDUpzfQ1cqf8AVtxbNNNfrunJAKX3jgaMaUa1Qo5iGx3iQ979LQZG7b0MzK2%2B4mrLyI5Ikg9X4U1ydko%2FiMT1MwQvZXs1JA1dFecZVrBfc9%2Fjshny5xcAS&X-Amz-Signature=54594bca3abf63d4c1a6afdebd13e94d609635c7ede26cad371b75aacba12cd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KR4EBRG%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGRG9NHeB54%2FFvazH2YVFx4vmpoRjlcZK%2BH5foRXK%2B5AIhAL%2FEBz%2BRdbREHpEVeXh1VxlfA4qqj6pc3V0E1srqyfpeKv8DCHYQABoMNjM3NDIzMTgzODA1IgwBztVkrci05Rip6LUq3AN5uozGc1zUR4NJ4Z%2B3fW5RvEkyj%2FLe8e8T9iUPYGGoUw5zeNS6XbwQqGBCgaOjVFArAsYhLgFOeRy9eG3Ow1Jd4%2FjZnBxt9731NoMforffEQmQkjNg47vEF1hO7O9CiMwRkFJeONkZzrH5IK79qfzKJYXAKkI%2B%2FbHuuVwi59Wi1FSV%2FGbA1C6tBXincAmsr%2F4vmmKMMZZ0%2FcK0%2FyO3f5Xw8aeTS279GApp6WSDlTv9MGwgrJORILO59a5%2FAraCNsG1LIO5ObBZW7%2BT3TWK8geY23QOkFhrNcMkruzHOYGEU0IR9x9FMgUqzZTDN0K1M3Mi101KAvRHbrIyGJJJZB7Gi85spJ%2F6C%2BSMeVF6d3geVkYPizfcX1HMWssImEePIXixyxXfMgeTj%2ByN4Qfsq2vNXR%2B7R%2FISNjBWX7B0iKjvQ6YJoAUiDEWKXh1YEvuqTRWNOCsdVURLAo40sg71BHfXSSPQqoTL97DZXBRF9s9AcZrC8nTE7JQ8yihV4HnqPeMm0ikqS1uJSZ%2B3ekYbXzkgHQ%2BYw4msmpJhDEbUn8zjzI7dtULstsU4OXF5fYshvnBpphi9BwBMuT0Lng9WRA4b48jWGInNdSuH4Xrg8l60EqpvrZhhdYnuJbE6SjC5jKLMBjqkAQRtV2eAQVudJxMefYbyXCpFWXiY3kCTOLS3gvIb1Q55pYdjADiALUFnGhSxYcfZvKv0AuQJ9QVqtVwDhtN6zUeJudHp1UYdh6OovhFDUpzfQ1cqf8AVtxbNNNfrunJAKX3jgaMaUa1Qo5iGx3iQ979LQZG7b0MzK2%2B4mrLyI5Ikg9X4U1ydko%2FiMT1MwQvZXs1JA1dFecZVrBfc9%2Fjshny5xcAS&X-Amz-Signature=b81bd5a17fa1defe923270fadb0b26b6b0c89ab3e825f87cb883c07c4098bc58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662V3ST55E%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFI4XClFT8JmdBgQAvIm%2Biprc3ELYumaPtmQqxuF%2FJBVAiAY1vAOIy%2BjQzjcO4I0mSrGPPfJfoGMy%2BVaynWww3YKyir%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMGmM9E%2BmhJjREoW1mKtwDsTv4q03ghR1wc4U1oMqyR6Kpf2gVr8X4TJz%2B8njROtXoJaLnFW9C%2BiEMyE4R7mtbSa9p8p42%2BcTj3BRMzg%2BNkDpHsadMYwuL4m27sMZwZHuf7XLldYZ3DCFHlaggPV9KhKBpOwfO5xOrLO0MUgfX9RQ148YSQEgxryUYFvPRsGMPdenSush1LDY3oHc5rAUmWLgcZT5oHF7LfKjC14YHLCZAPUv3j8KmmKTWEwSdq5Sywn1Wty3PE30jARWBUoYJnkBD7OYiDbPSXf2%2FCJyJqvlKQFsIL53RZHkdYsVhXFOscG6oUOZhdrnfQpHbW%2Fi4WGqEI5Pc9no4bKcV%2Fk5gXP1%2FP0dcYcK%2Bx8RL3sFOcRJkbooLweYPLouRtjB3%2FjV9KFw1fh0tt8TPCgmt6C%2FVah0wVa1lfJnOKPQboQQj0w95jKx0man7y%2FaluQ4wYjb5QU7n1V%2Bw9X9RQ%2Bdnm%2FnCTvdIL22M94fMb6lOXtk0sZspaFmVrLZTpuw3cHPUXwaPoMwa6o6k%2F2X6LYR29GAiyuc73AN5MjBWyRvn1jXj8sgnlPp3eqlXX5y62ggFSbUuI8Cxl7Y25LmfZY%2BqAGfmMTlTkc2%2FladogLY4nJpz2eecbeFSMSK20%2Fa8MWsw4IyizAY6pgEmqWf2bD%2BqDY2a0PFHipETcLRUxLh6TwZFqFizVaF%2BVD3perJGD2Wyxw9GCSHVUtkSAF9r6yBTMNAL6bGMo%2FXDClsrSsUM7mATyffs94sw%2FuFtl43xIXkcUcc1S%2BgKCGo6SkpQEOEtPXHrR%2FUxWAAS%2FTyDdxxfdeuONqj3k9%2BhZLasAVpH3MQO9SBlFGybU2rZCkYXjc%2BBuzAZ9koa6ca4WUHIYVBB&X-Amz-Signature=e34663b12f6f15395f43fb98fb9e2528669bc397f916be16be681d0bd896128c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNRYYPX4%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFqjc1cD1WuHYRWfEeydtpCC8WRxfwBWQGc3J2Jrso7KAiEA8flVOOfMWDBmSKbHSqdaFZNLlAkFkjcgNMbHbrhRuvgq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDMGT16Locs%2BvILbC%2FyrcAw3PVzq8zWvcKyIugV%2FycDAYzDQppTLfWi664Tgi3PSKdM5lcrFY6bHmdHFPwuyp%2FrXeS42%2F8MILeGvR%2BHG3keyz7OwBMUl54pdYxhCjxhHa63hVNSaeUPrl7LNX13%2BeG9cLjdAB8CbQb0TEFpnKsWFdM2EfeU%2BEek4q0JEyuFeUN2y6AJibiACR2WDaTd88UC%2BHHlR%2Btrg0IReVOjm0rI6MUJuUpSukqlvyNiB%2FoH4FF4%2FIPQD0LOKIxXS3sjYl6H105J9gcNJ6TTjachcRbTP%2Bh6WJA3%2FLhuJAneRAhySpnkYEuw32nT4LvqbSNjqffCl21EtT2%2FE0owfyf1ANKwjzxBHcwMDaGC0Yn0zBxw345GE%2FrnAvefsx%2F6vY0ZzxNSnQ70OZ%2FJqTkb%2BnXD7jMzsMt5mZ48JzLRx39OOdRnNNLTjF99x3xVzO%2FvoWnER6%2BRU7Rd3BcCpdWJQR1hlNL5nvOtWtlQDQQ%2FblaPYqvwxmu4Ec6%2Foso9yQCkR%2B2cSWkXogbSzwPzGwzpUdi5yQ%2BqmsyADDqpWl96njeLK%2Fb81lTh9pX7AVSuA2ctlOi%2FdZi7q9teXbX0PS1HvCwZRQdlLc%2BhxPOPgekVgG6i5KHUYjicrhVjQdPFF6GWl%2BMLKNoswGOqUB%2BElY88V3r8ZgZP19u4gYKM4uaJ%2BaapHX9S5fOUWmLmqd1dJaf0AzMAK4Yf0xVIIbpGLKlISfhTB0GbVya3loJl%2Bay%2BUytzeu63TGd8REG036dwL99vowudsHsmNHYT8XJVadH6x8rR2yYTopO1PXXiKV92GaB3%2F27nNby4A%2BlpRtglBIPMq62dNPaB7sblmIYIBD3kelP8Y2gHRr7vQ4B7pPx%2BoC&X-Amz-Signature=bd5947caab1fd9bffc83efe6e9aa35e81ff7d02193edec70b6b3050d8cc18d9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNRYYPX4%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFqjc1cD1WuHYRWfEeydtpCC8WRxfwBWQGc3J2Jrso7KAiEA8flVOOfMWDBmSKbHSqdaFZNLlAkFkjcgNMbHbrhRuvgq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDMGT16Locs%2BvILbC%2FyrcAw3PVzq8zWvcKyIugV%2FycDAYzDQppTLfWi664Tgi3PSKdM5lcrFY6bHmdHFPwuyp%2FrXeS42%2F8MILeGvR%2BHG3keyz7OwBMUl54pdYxhCjxhHa63hVNSaeUPrl7LNX13%2BeG9cLjdAB8CbQb0TEFpnKsWFdM2EfeU%2BEek4q0JEyuFeUN2y6AJibiACR2WDaTd88UC%2BHHlR%2Btrg0IReVOjm0rI6MUJuUpSukqlvyNiB%2FoH4FF4%2FIPQD0LOKIxXS3sjYl6H105J9gcNJ6TTjachcRbTP%2Bh6WJA3%2FLhuJAneRAhySpnkYEuw32nT4LvqbSNjqffCl21EtT2%2FE0owfyf1ANKwjzxBHcwMDaGC0Yn0zBxw345GE%2FrnAvefsx%2F6vY0ZzxNSnQ70OZ%2FJqTkb%2BnXD7jMzsMt5mZ48JzLRx39OOdRnNNLTjF99x3xVzO%2FvoWnER6%2BRU7Rd3BcCpdWJQR1hlNL5nvOtWtlQDQQ%2FblaPYqvwxmu4Ec6%2Foso9yQCkR%2B2cSWkXogbSzwPzGwzpUdi5yQ%2BqmsyADDqpWl96njeLK%2Fb81lTh9pX7AVSuA2ctlOi%2FdZi7q9teXbX0PS1HvCwZRQdlLc%2BhxPOPgekVgG6i5KHUYjicrhVjQdPFF6GWl%2BMLKNoswGOqUB%2BElY88V3r8ZgZP19u4gYKM4uaJ%2BaapHX9S5fOUWmLmqd1dJaf0AzMAK4Yf0xVIIbpGLKlISfhTB0GbVya3loJl%2Bay%2BUytzeu63TGd8REG036dwL99vowudsHsmNHYT8XJVadH6x8rR2yYTopO1PXXiKV92GaB3%2F27nNby4A%2BlpRtglBIPMq62dNPaB7sblmIYIBD3kelP8Y2gHRr7vQ4B7pPx%2BoC&X-Amz-Signature=bd5947caab1fd9bffc83efe6e9aa35e81ff7d02193edec70b6b3050d8cc18d9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QY64FY3P%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T133624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDSjtkYyMIqxip3mDPlZD3KafCg8Hz%2FYVexbt%2FMzf9%2BPgIgBC2ST7Op9i%2FpoG0L4cxT5MnmS3Hg3X6S2dElRpGfG5Uq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDEQ0NKrxxurefss6OyrcAw5cCArixz2Ju6cHcmyBbGaqw8qcLsUlAl5TQkrD%2B5ser8ofFzUm%2FrsIQdsU4OhnuUf29cCNqkj%2FmRAMIva7j6CaamNHn0v20K%2BmOj0W7qNbag%2F4PmwUpdN%2Fvr2p1fdOy%2F5p45SF0wiAXefRhiqino5iePe8%2Bge%2FO32K2P52F1pHtB31iRG5zf6w3zrBQL%2BS6W%2BkdQBCU9IXI%2BQm94f07zAQMwhJXF%2FUjO9FOuoqaFqZqCVdaw%2B4eX1iTfFux19ZS5l3%2Bvn85yOkIyDv37546EnRVWBxcw6LQMO7jsCZy5FKLmCNOJkxxozRgiIT%2FhLl8Yh5JnSp585F5h6qyxKSp84WngXb34g16euAAqGh9s6olN0R3ZR7YkZdjNyNTWCSLRo6HHZ9toof8r11mTFXg8jW5zsfa4pwWuZCuYIOMF2ghpOwlgCkdAyfQ10uuwfiMRFRup3p490ASfkmCxgLHOATpM1g2LQES4GgIE0%2FdQCO9OH6f7584K7gFYspU9rrReqZYKsz%2BXf1EEXTzF3PB7UYJQIsyrjL4JwW9%2Ba3yRiCTR8sWMwfNWxUTnlYOpTEFp3piRlQfp8y5BKUlxZPEycUI7fP8hLcrc35vzn3fC%2BhwkLAN7MKR2uyWRacMKyMoswGOqUBJHIYMia%2F72kBDtBtFY%2FJEKHo7pdISMw2PCy8MCUJN0EiHFX7sVJYLuvoIOr5bL12Y%2FupW0KeqAfALrP1C6Zttg0tCe7QvF13FX0H1ET0lM7pMjftmbEf%2BUeMFZY0xR5W9LutrtBuBx8EtZzTHTvdD%2BdspMUa6TWCI3rnpPXCvpTs86utfoj%2BUg88NzB3ZpGm7EUrdAxCXlhoLrTEE%2F0VEl0Xt7zt&X-Amz-Signature=d9cc14ba9852d9fdb2f53f7a493fcbc377af306daacd3a9d5b05e2c5bbb4c58b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

