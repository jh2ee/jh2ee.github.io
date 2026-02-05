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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ74PFVD%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIGTitH736PwJuBR3tcP0Z0MmgHErk5MQG44KYa945rz4AiAD1%2Foxknk3YDTc9mpl66uYYzucCIq0BOqh4FYbjmYecSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIM%2FvGegncc4h7kI%2BODKtwDOWClWrx9wW%2B7vK98DEhetFSvu9mow85FxwQ6MRPz9D5l3mHnD3JCejPToxNJQ6nETuxx2f%2FnORD7njubQH36pjENcqsCoqBy%2FDmYkBwCHQ9QyU7H%2BFe7yBwdMNqJttGMrO5VYtjz2EecelkNMwGeJq5ql6Lsgx3TcPKDYcMdRgV%2FuRAXuhxOTGVz%2BzOQRaZGGGdhcKIcCIpEsPREkqqY1KAezy%2FovUOtj4R%2FyYNb8ANzCSWQBON2%2BIpPNnw%2Fk9UgNz1ZYLPu5WE45So%2BL77jpUxJ9TkEsV5kJaLFfeCZREuc%2Bp%2Fhg4yizwHBFeeTVbNtqqRaSLIZB%2B9maR3415yaRfwAAIKZ%2By7UB3Gzxpfoi5RuWRn70ilKa%2BqbQ69hu8Q2Bkt8L556H%2Bs0I7UheqOx4BAwZuwqbexl7ZlDvFX1SWoku0tbWWKwZrUsMO9wMZBZIqnBmKGCmbJtJEDYuv%2BKCFvni5HwXMyCKgYr1niJGBNFOXK7sKp%2BzNmj%2FC0lXnsSZWMDrvLUMpbsoMCLDk5w%2B1BTsb9XYgjS57ScU4tREztnnX%2FVd8d9Zw9lusRETLkZ8NAjC%2BniD1hFVI7fSJqBQ0BTbHRxTou6zPb5YnUG5If%2FMh3aEYylQzGOZX4wmqaTzAY6pgGeqNSMkpZxrn%2F%2BjWw2i9bWhpC9%2BL7%2B11i2jUpGK42w2%2F9oPMJ7jodFEc5HEv8uJiLEAFBZj8T2a5eaTkelc95RQ1c47W5b6EfqLVGgyGM6w9TqjsUrfsR57ImXCzdU%2FmPVAktUvfUbBxs7kA8M%2FbXj3auM1U%2BScxCgFgwgAjz8IMw4c4k0xurZmEGtDXqPSxSrWHPS%2B1R6DI7ZcwQGvgdNAF%2Fjmtgu&X-Amz-Signature=028d0a9d79100028729ca5747ebd824a7a5a4563ca6436d92fadc2f584df0d6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ74PFVD%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIGTitH736PwJuBR3tcP0Z0MmgHErk5MQG44KYa945rz4AiAD1%2Foxknk3YDTc9mpl66uYYzucCIq0BOqh4FYbjmYecSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIM%2FvGegncc4h7kI%2BODKtwDOWClWrx9wW%2B7vK98DEhetFSvu9mow85FxwQ6MRPz9D5l3mHnD3JCejPToxNJQ6nETuxx2f%2FnORD7njubQH36pjENcqsCoqBy%2FDmYkBwCHQ9QyU7H%2BFe7yBwdMNqJttGMrO5VYtjz2EecelkNMwGeJq5ql6Lsgx3TcPKDYcMdRgV%2FuRAXuhxOTGVz%2BzOQRaZGGGdhcKIcCIpEsPREkqqY1KAezy%2FovUOtj4R%2FyYNb8ANzCSWQBON2%2BIpPNnw%2Fk9UgNz1ZYLPu5WE45So%2BL77jpUxJ9TkEsV5kJaLFfeCZREuc%2Bp%2Fhg4yizwHBFeeTVbNtqqRaSLIZB%2B9maR3415yaRfwAAIKZ%2By7UB3Gzxpfoi5RuWRn70ilKa%2BqbQ69hu8Q2Bkt8L556H%2Bs0I7UheqOx4BAwZuwqbexl7ZlDvFX1SWoku0tbWWKwZrUsMO9wMZBZIqnBmKGCmbJtJEDYuv%2BKCFvni5HwXMyCKgYr1niJGBNFOXK7sKp%2BzNmj%2FC0lXnsSZWMDrvLUMpbsoMCLDk5w%2B1BTsb9XYgjS57ScU4tREztnnX%2FVd8d9Zw9lusRETLkZ8NAjC%2BniD1hFVI7fSJqBQ0BTbHRxTou6zPb5YnUG5If%2FMh3aEYylQzGOZX4wmqaTzAY6pgGeqNSMkpZxrn%2F%2BjWw2i9bWhpC9%2BL7%2B11i2jUpGK42w2%2F9oPMJ7jodFEc5HEv8uJiLEAFBZj8T2a5eaTkelc95RQ1c47W5b6EfqLVGgyGM6w9TqjsUrfsR57ImXCzdU%2FmPVAktUvfUbBxs7kA8M%2FbXj3auM1U%2BScxCgFgwgAjz8IMw4c4k0xurZmEGtDXqPSxSrWHPS%2B1R6DI7ZcwQGvgdNAF%2Fjmtgu&X-Amz-Signature=028d0a9d79100028729ca5747ebd824a7a5a4563ca6436d92fadc2f584df0d6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627AA3ZCM%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIB6tZ5APkEysS8S55QPjyQAcS8iV4tVskWCp%2BtKQrBw8AiEAsebCfJTz7JqO3mkmnsuI%2FnpppFeILdqR%2BC7V1GfBeYUq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDFdKGJTfI6X9ZcyvXSrcAyUzYXxb7VhfkUUoBLU2QzwH2ipXwFDPSBfBxEUGpf%2Bty8Qi3IvwIc7p8Txz4QdRepaJNBCTCtpdwCpBtZ2%2BpEMuUIxYAWxV%2BeCx8SvCDrIHnOxfuyQ39%2F4HqvOEa7VdHsH%2FoiGa6vMg5MJ7JwBRyacRwnUVJOsOmLHP2xxH00CLNdw9w67o90Q1v%2FaWpsa8CXAt3MDXoYLJLMPCjuVQ7oBmu2GcmoyUSJa9eqIzueTZHOet2uRqqotagrqbCZUtwGRlIa7OlZGsZ7IJlW83TU3KBiramoyBHU3YMHWtneqFXA09VxGvoaYghnFYtmE4GS1EtOjWbXP0jkj%2B35Tc14vWVDNqWd8AJ3OPEI3mPS8A0CPV16FD43Gdz84cvZAyO2nZm2O3qThaNaejbVrxIxJw9bABNZ4dMVUicytOJXG4Dz9q%2BB1P9FUNx1HIVr4q2DsMlyAHhVufFAAycrsnfT6J83fvMZraabGpI2IQ9HXC8ria4bHVddOD0K3K7sJZuRPabWerJJ8L8J7usU%2BuiS4jVhFKHCNwwaF7%2Ba%2Fep9rWMLOezkUHd%2BwrKChoz2te8h4T5tDWW%2B7jHFxWETYKfiOdPY6hvs7%2BvjmQ8ZYjPktYY2AUdSXYa9qOcmycMLmmk8wGOqUB8n%2BDYNykhXd1sDqJ901ARVvnFPxErBg7DndGUcB7MMCzrHrn%2BYvd4q%2Fav8BKahsSBOz6PKCut0iunMOviM4rKuLc2STV96z%2BDTYxJi5cdN%2BPD7wK9WabBFuw7ONYEIzIXhl%2BB5Er%2B2CxByDXL76o3mAkhyVjt7WgSXdqwrKxzK71PvdGJnHIo2ttu7yopnf66M8n2KoOgSBtB1k4%2B1NsAXTc1wAf&X-Amz-Signature=3b9ac15f21498ce0d8893013f7401ca8620b599a58c3e5a19db91ca52cc07baf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQKL2GAY%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIHIaLRJ4aOh0blVSbslJwVeC3SYJ4zYL3ShpBMEuzySfAiEAzWO3M0wI1BZyHYadBTadCUTCnnIHiSev50j2kYFWjfsq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDATAcrvvYeTw3uEdFyrcA8KfrkfvhpqAFcPgTrdcxd%2BssvXePEc4SbK84YYgsUuVn7f5Ur3NOHyQ25nXDJNysxklU9bJEc3q3SdygHYLzgI1p6n0zN5vl50SQJFXAT1JsjkWk5NUzFhRC%2F7pV2LkRaq1VUhfxZM40qPNOR0Y08El8w4p9LZmmffUXfEIS6V%2Bpw%2BLrsSDonlu7X011%2BMzLzZFLbfldy13tpSMVcn1haT21rvW81aSwjSFApXCVlk1igdIH0LINyeleAkg6Ni8rROMwMeyuqXB2M7loAOQoY75wywTTH1PEwZ8QluH03K4COFlTBy%2Bc7%2BUJEuvjuF2JKpEiDmNZs3j359TGkx1LxmZwwaXZj%2FBUD3fMlxjXRVLKN4Z0QvpJRbN6VcETT4o6Rc7rOr3bYstujBkYXuhljluv5uc6hCiPjPFEj2cnRMMc2x1AlFB11GqlC8qO8WXJ9CGtb4C6uHdQjAJ6si349BUflnanBh%2FdmSBrizPvKfUx8LphCI030WRfeW%2B3E4StC5r8znHPmn3SMTHv6vz%2BjdaJNrKLVpdWA8xg0kUtb6%2FSqYudclvUY3S1pazgCfWuDYmtFMY6ErbFvVOBak%2F8B6elxaf6bSTWbQ0ysDio5uw4HPTjXGEQ0WAer9%2BMKGlk8wGOqUBeTzyg2wMECMA1riPpc0sP%2F7UMYBLHW%2BlfTbqXOFubtrXRxR%2FhPcPUp17BStC1d7HhLWqLKBaurQE9k7GTsrvaTjHT0bN9vJJFdj0JC28YZUqEYqfJeqJF8D6uIrhnh0xkmLLEEU5sA4ipoI7J3fquqiMvMOQlKVn7XPySKCJ9cthZbeFIEmStdhT1cbDQcvC1vNkhoqpOK9ZHIA%2Bw%2FK2NVD7TuYD&X-Amz-Signature=f09ff0b21e07a617aab2f0143b25f49f61e2629d6bcd251d5f2433ed1889553d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQKL2GAY%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIHIaLRJ4aOh0blVSbslJwVeC3SYJ4zYL3ShpBMEuzySfAiEAzWO3M0wI1BZyHYadBTadCUTCnnIHiSev50j2kYFWjfsq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDATAcrvvYeTw3uEdFyrcA8KfrkfvhpqAFcPgTrdcxd%2BssvXePEc4SbK84YYgsUuVn7f5Ur3NOHyQ25nXDJNysxklU9bJEc3q3SdygHYLzgI1p6n0zN5vl50SQJFXAT1JsjkWk5NUzFhRC%2F7pV2LkRaq1VUhfxZM40qPNOR0Y08El8w4p9LZmmffUXfEIS6V%2Bpw%2BLrsSDonlu7X011%2BMzLzZFLbfldy13tpSMVcn1haT21rvW81aSwjSFApXCVlk1igdIH0LINyeleAkg6Ni8rROMwMeyuqXB2M7loAOQoY75wywTTH1PEwZ8QluH03K4COFlTBy%2Bc7%2BUJEuvjuF2JKpEiDmNZs3j359TGkx1LxmZwwaXZj%2FBUD3fMlxjXRVLKN4Z0QvpJRbN6VcETT4o6Rc7rOr3bYstujBkYXuhljluv5uc6hCiPjPFEj2cnRMMc2x1AlFB11GqlC8qO8WXJ9CGtb4C6uHdQjAJ6si349BUflnanBh%2FdmSBrizPvKfUx8LphCI030WRfeW%2B3E4StC5r8znHPmn3SMTHv6vz%2BjdaJNrKLVpdWA8xg0kUtb6%2FSqYudclvUY3S1pazgCfWuDYmtFMY6ErbFvVOBak%2F8B6elxaf6bSTWbQ0ysDio5uw4HPTjXGEQ0WAer9%2BMKGlk8wGOqUBeTzyg2wMECMA1riPpc0sP%2F7UMYBLHW%2BlfTbqXOFubtrXRxR%2FhPcPUp17BStC1d7HhLWqLKBaurQE9k7GTsrvaTjHT0bN9vJJFdj0JC28YZUqEYqfJeqJF8D6uIrhnh0xkmLLEEU5sA4ipoI7J3fquqiMvMOQlKVn7XPySKCJ9cthZbeFIEmStdhT1cbDQcvC1vNkhoqpOK9ZHIA%2Bw%2FK2NVD7TuYD&X-Amz-Signature=e0ff298c352402ae2dbe4611141dcb553f1243b88219a93c8ff650625344f51c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVUKMV5J%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIBSQ7bBZ73TQQvLFjhgcqVvz3yFhptoWIHAVpVgwvAukAiAa5zvvVPYC0P2bPijQAnVKTKLhOdTzyRqHuQi8Vsvu1Sr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMzb9%2B2yCYtY5gb4meKtwDyRQRaZAbpQdKqe7GvqU5LWxNZACPSQcGwX2JzCrnKjqqZf1TBGJWZa3xqnk30nfI1G8Kh71K%2FrN1t9zpHAI5K2Fhu3v8Q3J3DKJoaBIeUhzhFILVU08EXFDtAtSCT4a8irazNTCj%2ByvQJwfkrQV9LBx4gB%2FlQCLiRFnMrxJ4vnJl79FPzVTunPc3vVGyj9WE1UkK79J4%2FdUEGkJfKYTSr3Yd5Kerv3ZKJZ7AAl%2B3vlZqZr%2FAt7ma8lErKczLK1YJe8ijlmDhfAmvA8Kl0AkFqGsnOJuxJuey2RqqFC6IjB7RQ7Pmr%2BhXS590%2FBb7vs%2BxIie9cr3Jx%2BZLER%2BFTsFbkHkgT9FDdo1A1awPkkg5CQqbDmLnPmMnQ6dqL6EjdhXsCNuT7MkutfsMjSLZF5L71RiMjcCtb%2Fj0Pc%2BVDM4nfliTO%2FgdYt54Wu0TwNsiJGhG9KxWlnGHi%2Figh%2Fbe2je4S675Z5hr4yDjPTvHJbNYxUl0VhG9gxswZJ7JkOdlzf6%2BTgFyBLhjgp%2Fi1eTyHrFw3ok0VeTcf%2FsmzKRS3kGoL4eVMQWj2nzcYG9oBWWsu37JmXsNltCA6t4XwSNKovM4%2FWCLtv5L9YLfZwhYEk5%2BK0EONtN4jUXMbEyeVFUwu6aTzAY6pgHYuZycucpxRHwUjoBDaxTkRR%2Bi16b6FAAqSbISoKEuuPiOcIXLqiM00s3qesZ%2B1NmE%2BzMQ5vRKD878Ml0hOhWhefM04I0vpVYDo%2FUE%2BLbIXgqOFtbbA%2BnHd4oG1fwaN5D0JCUxb6vjsd4ahvEnpyCW0r4P%2FVcjaY1ha7RBQ%2FS0QaoTgxh2qlTyjGpuaN6ujO3PEMwJBBXUJmvN98IMFWNtaknODDir&X-Amz-Signature=637573e8096ec4bce35caafc2e7092dcb7f19d963afccc96d473b958fa03ea03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Z7INFFT%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDsQ2lQjxbtxLcJHNXtJDIlg13AU%2BjvP3LuIJsyVVoKbgIgR96nNHBzRREsa4diIEIvEaQ3PxXkBwz%2F3mao%2BK7tKCUq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDJOdIMeMetLjekNd0CrcA1zkOkwNyUlvhltq0Xuob9C7GOjR%2F1ogVwjJ178IuP76ijD2jWhutzlUZV%2B%2BYvvcaH0RInSSBIpL3WsuCZne1e8RS1FGiy81Zk8X%2BL%2B7keCTnGXD0Uyh1aBL1kXe7fXDUSBK9BU3rr5teIC0q122Auk5F%2Bx4hfh6BmMDcd7W3r2N1%2FaagCCEo3ZGID3ppDblUV96ALCPx08fpeiT2F8JiIZY2D9JzMyfvnaLTL3S4l2ieFklEBXBkiypdMZGcC1kbvbrqXm6kdRF0TZsoJNMUnCrBpuDOSr2Xn%2FaTJcuYyycRo9pZmfKUYVmd2BPBQUgiCMEAWfVRnUCIXVkz0kV7JO89k4uKZJxZnly5gu29eOW0cywtqrMyZB1k7M64zP6t5B0KvBHFq6zN%2FEKBd6sPmM5kb9%2BkWbhEJ%2FGY%2B2kOuQH11LzKsjh76OiCjb8vUapMzE2alq27y7bEL1SlQlxoo3T7R9376gVGTqHbGsJJ4bkccq92IFctxNq4oMtIQWBXKkfwpPYT22B2JdpeNugVed%2FrsTPUC2x%2BMKNGlV9fxp98Fvj0m%2B0LttAd38dgaCPYgScx8MBINw9kn9xbQKXFyNxmtMwkaSkStoMCSuU0qhQXlWv3gXBcoN2ijL%2FMJmmk8wGOqUBaZKqNq94cp9LEUWrVo4EQP4ZqHqXbN6AYhf2P8K3CdXFqZy%2FYaFfgOY4jBhbmizTe6oy7Fad%2BuMiS%2FR6pYqOLzTotjUjDvusKRhEg8KNruenxABHSCHd9IG9MzMRFY%2FTXZ4OEGCGsmdgu84MhnEiSVltcZQ2wO5Eaxj%2BouJ5R%2BNkCWwCfCVJKShHUR8oAymHPY4ZBZkw4yCLOtbSbWlwZJj9i4Rs&X-Amz-Signature=c04c7c8161b7f6d6a3d3c5cc1c16fafa06f5ed8c706027de465a5cbd71ec5666&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZMKOPD7%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQD%2FvPbNMGj%2B5jisf4%2BKutbM3JMQV8nRoKZTjZkdvoYuFwIhAIwjFzk80xwLx187PlU%2FMOHy%2FUHsb1wQh%2BaBUd0uU9zcKv8DCDMQABoMNjM3NDIzMTgzODA1Igx2XZA7DqYDHUeI2q0q3AN1zhfXiwuoIt00413xSbauRVDf%2Bljh6J46UtytEGu0vlRSf2PnA2yvDAtdOckke4dPJ%2FIU%2Bt1HsQo5F5DSUab4egFXf%2BfbYYPkNRoW1bYWCgBJmtTscxb7Xu%2B%2B9uYWubbp9FK5zvZLt%2FwBhOoCGq5GqVJWtAEkMhXtBLpHmG66PLtJBoYYp8DcjOpKN4usLtLn%2F4uNtzluoaLy9xJalGlRkQ8ZgSQb464UhaCkZbf0%2BXwYDEYkmMLOBkkcplrjCK51k7fR9zcRujukVqrBRTorCAeRDwZp6xZjRRKVvzkMyxnFn5bAh1bAHaXhmjuT9nbG0z6DkD1ulTIoOe3y%2Fj8SrzXaFIJHQshExygCj9UNG04wcuez6rIo0iNQXterAJfXDWKX4tNqxXjmMTNkK%2FS4TddtzNKwE0qiRm6QRIDwe7Rv3TMJABwLhQM5LqP%2FD4yo9Grgps67N9R%2B%2BQklNG8CherwcOZ0%2BDJSyYp%2FjN4mR4dZeKVW1qmI5gi4GSbOG7dco1pYCOfyJZiB1DCYS0N5EckrDweGYOjiNrCbncfWMTUthCzprIo1NLFtIDMdDZyt%2FsT8HcAAXz6T13AkJmQNabDWlrlxpc4bcpq90Tj67VVbRfDULxfrZjZZkDCrpZPMBjqkARmr4kyig8Zg7dXYb%2FZbvwrmrjdxHilG5K4WtUQ3FgA130vJ64%2BcG4cUFGMJh46JW4q5edMrG3w%2FEqxK7EOkulnxGU8bAp2JTklyU2WEX0rF%2BrulvB2MtWzB54nkyJ7IEaSfebpZTVJas0ZudObP0SNk6MecIE0GQHhM%2BhwTP03fQ3QfO7%2FIe%2FyIL6Cm9lahoL%2FB1vdXFlYsvKLSt7U1TttW0a1%2B&X-Amz-Signature=1429b76522f765ed78de40539a17e3dd90467b36adf08bb36a1e62149692096f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ2SUS3Z%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIGLUGr7NPPhncwY9woEv48NrxOUjY%2FTTY34BLDrtRn8WAiEA7E4enN9AJLWGLE%2BP5LIoR8evFkyRTYDEh4a7aRA%2BNngq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDELjYTw6lRa6S3EYrircA28qXC3kHz8h7ZetTzKL%2FwLLZnCxnKXI2aYE7wIl%2F6LN2fF0XIphNxvg1FZTXLLunSwMKcF%2BkQtqzRs6vZkwVHFepBRdeMSPyJv1NoAsUevm%2FEegIvZF9QaL94G1S9ZTDrC%2B2Orom9BkWKNfHILzG3b3%2Fp242bFPLB%2FLvFfUmGizPcnh1GmVNMGNvS9KirBCCOwvqsMqaO0vWyBtBirsZiLwEZmFSsTVCEdwRcPV7sA%2Bsj4s570prwdTknSCIT%2Fn%2F7qyxwLQtwnJQYStSP6D3HVj%2FYdztPEnnhY0Zf495rGRyxJCUEiJ%2FIn0E84D%2BmeFBP3GHKngrJ8M3aTknjoxLjIvMfymQ44QYwNlpgF%2F9p0t9SF5XkwWKFJj8PNP1vBc58Y%2BvTmrLE8Oo5RYvzo9LUvIB7fstti66rAddlrVXlaiV9PpnMuCoQSoZXHR7w8CIFqbRtRYlc93zsGQCjkNpRX7xoYjgwbHu%2FjDsZbPRb9RSIwgizmhVASLbhXMGehfKpYB0Z0ceWaMC0t756BnUIR3W2sDaGenxpzXwP7GtAUBpQux1g%2BwO6FJuLH6Ty5BPzzcAMHHl3cwBy%2BcZA1qotVRJi9z435CdQh1q2UbIo0oV3Oqe29wN8vEhhlUMJulk8wGOqUBA5YUduewuuOKhRNyJxRqqE4ZE7rbud%2BqymV%2BqYD1JbZ45cw%2Bo8W4nFAir%2BOB7VOuGDOEVxiWrM9UPIX%2Bq6JAIUjznVok07jJ4qQMCU2Cjl%2Fl8XWM1PGiUIhBzosxpjmmWLUweg2T4ll74E8zxBwkoKO4vGi0WcjuT3X5lkdN94DoU125kRYpVDNHq%2FWbeSSN9OEq6T2eVqit7r5rN7xz0FQWTqDA&X-Amz-Signature=f9cd9897c3734cbb29a1b2ce9b553e7b615d73b9c686d40d51239116f4eaa292&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ2SUS3Z%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIGLUGr7NPPhncwY9woEv48NrxOUjY%2FTTY34BLDrtRn8WAiEA7E4enN9AJLWGLE%2BP5LIoR8evFkyRTYDEh4a7aRA%2BNngq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDELjYTw6lRa6S3EYrircA28qXC3kHz8h7ZetTzKL%2FwLLZnCxnKXI2aYE7wIl%2F6LN2fF0XIphNxvg1FZTXLLunSwMKcF%2BkQtqzRs6vZkwVHFepBRdeMSPyJv1NoAsUevm%2FEegIvZF9QaL94G1S9ZTDrC%2B2Orom9BkWKNfHILzG3b3%2Fp242bFPLB%2FLvFfUmGizPcnh1GmVNMGNvS9KirBCCOwvqsMqaO0vWyBtBirsZiLwEZmFSsTVCEdwRcPV7sA%2Bsj4s570prwdTknSCIT%2Fn%2F7qyxwLQtwnJQYStSP6D3HVj%2FYdztPEnnhY0Zf495rGRyxJCUEiJ%2FIn0E84D%2BmeFBP3GHKngrJ8M3aTknjoxLjIvMfymQ44QYwNlpgF%2F9p0t9SF5XkwWKFJj8PNP1vBc58Y%2BvTmrLE8Oo5RYvzo9LUvIB7fstti66rAddlrVXlaiV9PpnMuCoQSoZXHR7w8CIFqbRtRYlc93zsGQCjkNpRX7xoYjgwbHu%2FjDsZbPRb9RSIwgizmhVASLbhXMGehfKpYB0Z0ceWaMC0t756BnUIR3W2sDaGenxpzXwP7GtAUBpQux1g%2BwO6FJuLH6Ty5BPzzcAMHHl3cwBy%2BcZA1qotVRJi9z435CdQh1q2UbIo0oV3Oqe29wN8vEhhlUMJulk8wGOqUBA5YUduewuuOKhRNyJxRqqE4ZE7rbud%2BqymV%2BqYD1JbZ45cw%2Bo8W4nFAir%2BOB7VOuGDOEVxiWrM9UPIX%2Bq6JAIUjznVok07jJ4qQMCU2Cjl%2Fl8XWM1PGiUIhBzosxpjmmWLUweg2T4ll74E8zxBwkoKO4vGi0WcjuT3X5lkdN94DoU125kRYpVDNHq%2FWbeSSN9OEq6T2eVqit7r5rN7xz0FQWTqDA&X-Amz-Signature=3f639990277d40aa22c00a7db316770ba23b4d141ac57a345e6626ad4c94ccc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDESJGIN%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIF3sFQW3rpoSw4FlesDQrjSmuUYyl70xApzIAUFNqq4wAiA8OzOYzAQ%2BzYjerCK0%2FETuhWVRBxgM69jbbQtTDkSEAyr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMeroyFacRDS%2BdRkR7KtwDeeuj7OYMF58Rc2plQY6fHEnqDbFTDkRWNAfqe4ZwsqtCX7gP9Tz55k4%2F%2FI%2FYnoK0SHCFk9HB1oDxmV65H8vQjG%2FfotuwRLBh5%2F5IRKNHqNpDbPKv82uzrHh9AjstcECsV62M%2F1h9kXZ3gsW5%2FsCxrfgWaz361S%2FIbebZRdVjOUQo5SkkCg8DIBhK04J99g7n5n6YJqwBcdSxOJPYVhxaWHOYVrLCVlWtosJVZiQg32ixf%2Bdmc65PK5YafqaeMHcIesFWp%2F3fy0x1TbZvmPNiIIli4nHcMusgqZMaYa8n1Ph0IDPC%2BgCrBFFrBZKnlB4rU9L7uyyIkI9AUjdP0FPfASZHtlqExFU7MbxQvInPHKsWqJ4fkhuqLnzmwdSIyZBsNIP04x%2Fp3bcuHiTGhaRsyQm2ZGNLu%2BtRPaZ8lyQcPcszUloOT%2FwuWq2Jc3r%2BGnRUWNpGpcjJY24AoMK1SLOA7wt60RFzAg9EPo6OI6XRG%2BfUu8YwrCEqs26AdLPUUyT4HUiS%2B2TXu2NICJjo9xp5aIvL8Z%2FgbjqlhmIKj3N9dJjKHVm4CaYksR%2Ba4dQNxCtmbuS%2BTDei2sAzgtcV%2F8V9nlx66F1FyJcBZDxWIig6OYKL6wk8EpUvRY27UsUwq6WTzAY6pgHYzXRwdcBWZTZhURD1gs%2BuxHv2IybRw8RNnA4Lxk8EKtuUo4kuXIH5nx7qgOBmefiVeux28%2B2Po4P6LfdDtZaQmTWeDcZF34gY%2FwAcHsyUQyLYzo1Yi5oZ9PLwELRqIksk7ACs2smdNmFIRHkr9AHwe3%2FOTdvwJxJ3j2BXPR80WmtvzWjtylKHsMAfQgDFzM7FxX5vxVE%2B8egydZFM9hjlY1lEjFz%2B&X-Amz-Signature=b53c35a90718700b77dc53b5bf1a01fe3cd471e0fe29d5fbfbb36288d522e388&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKN6ZP2L%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIBTR0AXR4yibocd6XZLEtSB8L0UDQky91ygiGKmBSAZDAiEA1Bp7RYuvJBtICxTeVZQhi9a2dSyzF7o62MdZ%2BASPiH0q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDKqX9NufY2ljVl9QUSrcA9yvsYfUnXvyzvp%2FiQBcu%2B6dWbdDuWcdhhHxyS8l9kf3tqr4jighvezENk9W95KEV7khYOqDhZ5pZLRAlhJQ%2BhufZl5%2BVJF8j%2FUSoCMzKCg0bYFRZ9rnsQwFk8vOxLWtXhORpuIrnxXpEcz3%2FYwChwEWD2BLyrQptOiU5cQ777hXkcAe6OYTqyQxiOGO%2Bqvylhy2DwBzWuwbBNL86YQ%2FTIsWAVoQ7EvH%2Fys2P6KjDfdgp1NXh4FpakgSTBcGr8R5AWHe8iQwCmkohYEUDStXjfrFObtCEsZAvi5Oc%2Bp0wKZkMsoSZNhAxjgPwcVHyNXzfO6HVf49bao1lfcJMcokpzoH%2F1RkvgDf6AWa5GJ3%2ByUBWUEHZ61iGf1M90RdNRPHIhEBmSXV7QOCJ57x8tNdnghpjeU%2FJKPoNeiV%2BaejDIfcWRE%2BjKV%2BOtE95XUKParxTrzfSkwgzqAKjDliY2gy2IEYJmFgx2p3nxfQpWYXsv2aEkPMeICUuCOONKTHUX%2F9jRTyP%2BqXjSMfar3I%2BiH50p%2FfO2eOBKnoDb9%2Bxz2vlun76JBWXs%2BYuvxT3Caz6v3olRFUoh8MAwGXNzNSmzLyr90W40n%2FjDrHk68%2F%2FH3mYOFSXvqmApomm1wIanqOMMmlk8wGOqUBcrvv05p59LwEubNDWu%2ByoCP%2BdsUi5wQKWYumfyn%2F6CbUOTO8LOAphn0TxoShC5%2FiMck5T1k4tDI7enQ8Q679E%2FLSCLkUm9ScfsnSRc1yZR0ipL4mOsene8RzqGrmHYiIy%2FblLPgLuK9TqU%2BwtWK33MT5P8rSYKvIjTXNMNnWg2CjUyMfzQ6HFwWjjLSqsZCuf7Jr11IaVhQSEVHp4F7xOKcYUvOg&X-Amz-Signature=7f9ce0e930724d42d654a1aa89ff31cb0e821ce08836e8f3c68ca916d5f7540e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKN6ZP2L%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIBTR0AXR4yibocd6XZLEtSB8L0UDQky91ygiGKmBSAZDAiEA1Bp7RYuvJBtICxTeVZQhi9a2dSyzF7o62MdZ%2BASPiH0q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDKqX9NufY2ljVl9QUSrcA9yvsYfUnXvyzvp%2FiQBcu%2B6dWbdDuWcdhhHxyS8l9kf3tqr4jighvezENk9W95KEV7khYOqDhZ5pZLRAlhJQ%2BhufZl5%2BVJF8j%2FUSoCMzKCg0bYFRZ9rnsQwFk8vOxLWtXhORpuIrnxXpEcz3%2FYwChwEWD2BLyrQptOiU5cQ777hXkcAe6OYTqyQxiOGO%2Bqvylhy2DwBzWuwbBNL86YQ%2FTIsWAVoQ7EvH%2Fys2P6KjDfdgp1NXh4FpakgSTBcGr8R5AWHe8iQwCmkohYEUDStXjfrFObtCEsZAvi5Oc%2Bp0wKZkMsoSZNhAxjgPwcVHyNXzfO6HVf49bao1lfcJMcokpzoH%2F1RkvgDf6AWa5GJ3%2ByUBWUEHZ61iGf1M90RdNRPHIhEBmSXV7QOCJ57x8tNdnghpjeU%2FJKPoNeiV%2BaejDIfcWRE%2BjKV%2BOtE95XUKParxTrzfSkwgzqAKjDliY2gy2IEYJmFgx2p3nxfQpWYXsv2aEkPMeICUuCOONKTHUX%2F9jRTyP%2BqXjSMfar3I%2BiH50p%2FfO2eOBKnoDb9%2Bxz2vlun76JBWXs%2BYuvxT3Caz6v3olRFUoh8MAwGXNzNSmzLyr90W40n%2FjDrHk68%2F%2FH3mYOFSXvqmApomm1wIanqOMMmlk8wGOqUBcrvv05p59LwEubNDWu%2ByoCP%2BdsUi5wQKWYumfyn%2F6CbUOTO8LOAphn0TxoShC5%2FiMck5T1k4tDI7enQ8Q679E%2FLSCLkUm9ScfsnSRc1yZR0ipL4mOsene8RzqGrmHYiIy%2FblLPgLuK9TqU%2BwtWK33MT5P8rSYKvIjTXNMNnWg2CjUyMfzQ6HFwWjjLSqsZCuf7Jr11IaVhQSEVHp4F7xOKcYUvOg&X-Amz-Signature=7f9ce0e930724d42d654a1aa89ff31cb0e821ce08836e8f3c68ca916d5f7540e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YXVCAKH%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T183229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIGmGvsrxDhKU%2FoPHt8Mq21zeYmBujjNQFqj%2BX%2F8KLbulAiEAgN5SFqVUKeUsH5oSuD%2F5O9Wij2cU4FoMg%2FCoeBt0tzQq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDFEWw8uQCfTRUloYXircA5SfkzQtLS%2BPFJkADIcCUX0HLk1M0G2IpRMwNpZsTMrVCUb%2FocAsFJv3SK4s3hi%2B1rrmGD1X4ubfpROjm2%2BT5qK7uqn%2BbD30LoteDkR29CWYQboYalpcxMtKoPp8IBWRShKqDrdFPMLA7BD9lVUGXbmjW4%2FNtMbPCygH0cuFx4yvs%2B2ALDEGKLYTZQ75f6kDWvPoS3UTLQoIvJu4zir8%2FlwrxlyQU5nefb0U8QSWY%2FaCF4pM%2Fk5Xl%2FiHXLc6aHkIGDvSlH%2BGoV5Hxavwtmvu4u4Ajow2euyB1u0CmaVGYWdlHFEjPOSw2ow3TynLKnlO3IgIh3Mh5qRIBe%2BoE0RMJwJ8lefkCqWiMRQMp7E2YwuR1pnJ%2BNrIq%2BsOTiS2kO8EEGdP7WBuSwzzyPD208Y%2FSEEeeMcv5FTQqwx4O7sKqqgjQqw45VaEAbhIR%2BknYTQnwyR8RZsZhvYFrEIcCV6WBbPagOuYRmtPNYAxOPEb4tCIxKUb40RmQebux%2F2yzDuJvlWqWuxiUeuB5TFkIrkxeXQUTGaqmV%2B0Kly48zQOFWj%2FEFv1S7FMIEJoyjhIKyO%2Fe6pRpfE5ATcZQW0Xg21FE3Phn3EICoPJHMwXwMcAGqwIM1diQkTmu%2B6OoqQ5MIalk8wGOqUBXjDxcioobSwocDEak%2ByCDYG8HKpkJyTwcItX595ql7KoVaMWh9jmJ6YmD1YYjyiwbctNTLlMfyG8ymdz0g0uewj3zNV4e1uGtXNcGICDEja%2Fy7Trt6OcZkIIeg%2BymbE4tptl6Ket6wd3xKs9bZ6JxkbomQdbVsK8%2FaQFR11ImQx03hB8y3Ojge8ktnR83rgAx8tIK5cd3e99GH1LKVigLkhC347l&X-Amz-Signature=0d844e4393a76c9ae86e4a61c70f402501bf67b4164e821e8b87c3a27ac15530&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

