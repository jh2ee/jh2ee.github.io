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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UK62TVK%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIBLPE8ZImE9Llblj6zPzdJWRUy04BTP9Ec1l1nv1qraaAiAVe6oMOPNrhtKQOi1AZ%2Fa7BoIwFvcK%2BlCN6wnoJhiF7yr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMCHnhSE7lQpFT%2Fd59KtwD8B9aT19EW68fVIhFxYgpGBE5HybK%2BXi7LTLJF5Cr%2BeYdUvHBdT7ltSYStiDapVQY8Q0c0OnteuXkVQyZe7a1eULhP6f96WBA%2BnFYedfkd8U350aunfNd2RxwivBpFMWewAGguTB5mAiQyp7OJ7J%2Fr%2FWMLHDJy%2FTPnXaq4mCcVTORqcu2So1Gyzl9qkEjhIxSG9ovVdog6WLnWVHBEdV7NMGFepBz4FAJ1h39q0vxoUKPC%2BjqVBX3f1t%2B7CVE3TUDeYeK0GTH%2F%2FJA7nW7OmdDq9RbkmzdMWXuNxrNvhfumAiRgRQdaokrHjJOMSkzd0AuZXYXWaETeo9Y8NguZ1TODl5sCT3Oo0pfEn5zpP%2FLZ01LS1vA49lqaKitisGIVgZnkwUUwsN2%2B7ZUHc7TdOhN2L1D4iLB1Kju%2B8mkBpm399gge%2BfWi5Z4nST0J9pCxxNf2uzfBBQP7pqx4PcReGL06qccX43JskhjaR36zrMQbmJUg7N6BDgWqUgkD3iM69ls8e%2BaYQYUx5GZ%2FgSfhoNAI7w21vJfKYl3Ddpu%2BKjkAzOtFRf%2Ffx2ECvixn4%2FWtAm3dxyfjyEP4LrzqitxPUzNh3KE%2BrSu0cYN%2BebUEAKkEXZ0KGleKt5ABpn35l0w0oTmygY6pgFiysDvu8fCre%2F4OnmC68YZzCK6eiduvZZv5g0OOrevj4lAbH6uLCOld9YEPVry4hhc4ZlWtj6iu9dfwXYdvBqW1Q2w%2BgLcfnFEoByrmk8WN%2B5loniCgy%2BoPS5JCs3X%2B4xDr6rkxmzRcre1MDSaLbCP5fFoxQxHClH%2FBtRmEbD%2FckLJkLniW7%2BphOX6L1I2js89ck%2BrLSfGmrFnxUi2hfTr7UwBCfLm&X-Amz-Signature=2fec18eb70c1284196a2fab9911c9edaf9b46592c5c5ad95194e5964219b9d2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UK62TVK%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIBLPE8ZImE9Llblj6zPzdJWRUy04BTP9Ec1l1nv1qraaAiAVe6oMOPNrhtKQOi1AZ%2Fa7BoIwFvcK%2BlCN6wnoJhiF7yr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMCHnhSE7lQpFT%2Fd59KtwD8B9aT19EW68fVIhFxYgpGBE5HybK%2BXi7LTLJF5Cr%2BeYdUvHBdT7ltSYStiDapVQY8Q0c0OnteuXkVQyZe7a1eULhP6f96WBA%2BnFYedfkd8U350aunfNd2RxwivBpFMWewAGguTB5mAiQyp7OJ7J%2Fr%2FWMLHDJy%2FTPnXaq4mCcVTORqcu2So1Gyzl9qkEjhIxSG9ovVdog6WLnWVHBEdV7NMGFepBz4FAJ1h39q0vxoUKPC%2BjqVBX3f1t%2B7CVE3TUDeYeK0GTH%2F%2FJA7nW7OmdDq9RbkmzdMWXuNxrNvhfumAiRgRQdaokrHjJOMSkzd0AuZXYXWaETeo9Y8NguZ1TODl5sCT3Oo0pfEn5zpP%2FLZ01LS1vA49lqaKitisGIVgZnkwUUwsN2%2B7ZUHc7TdOhN2L1D4iLB1Kju%2B8mkBpm399gge%2BfWi5Z4nST0J9pCxxNf2uzfBBQP7pqx4PcReGL06qccX43JskhjaR36zrMQbmJUg7N6BDgWqUgkD3iM69ls8e%2BaYQYUx5GZ%2FgSfhoNAI7w21vJfKYl3Ddpu%2BKjkAzOtFRf%2Ffx2ECvixn4%2FWtAm3dxyfjyEP4LrzqitxPUzNh3KE%2BrSu0cYN%2BebUEAKkEXZ0KGleKt5ABpn35l0w0oTmygY6pgFiysDvu8fCre%2F4OnmC68YZzCK6eiduvZZv5g0OOrevj4lAbH6uLCOld9YEPVry4hhc4ZlWtj6iu9dfwXYdvBqW1Q2w%2BgLcfnFEoByrmk8WN%2B5loniCgy%2BoPS5JCs3X%2B4xDr6rkxmzRcre1MDSaLbCP5fFoxQxHClH%2FBtRmEbD%2FckLJkLniW7%2BphOX6L1I2js89ck%2BrLSfGmrFnxUi2hfTr7UwBCfLm&X-Amz-Signature=2fec18eb70c1284196a2fab9911c9edaf9b46592c5c5ad95194e5964219b9d2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3YAFFIG%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCICiaol3QY8q%2FVOq2%2B%2FS4IFpChO5HVb6iIHT5AYAJKtkBAiBd%2F%2BUoXxcrtn%2FvbukmaTtfl4M5nd2jkGfF1sctmbT%2F9ir%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMS3HyaSOUV%2F%2Fljub9KtwDGGvoyoW9Lfj2HVQdWU3U47ZY4IZGpfKFojEXNk79PgpVQp8v0Ey2PDTd%2FGSPAFSTTodKdb0hcPxNCnA3ZKtCKrvpeChb52feChLc2PjdcX%2Bo%2Fww1Q7ea9ttcZGUjLw4OQlrAwl4Owz5ZAaFblkJMPSkwBYzOPHbt4c2aApRTb9nPnQuGCoGdug19Y5Fpy%2F5HhUFDtbB8qtCjesX2zX9Q629T7KAz3XQhNXDB9IXvwuOZ%2FH4ED4ay9%2F3Il3RJ%2FYMKZogfW8NdSC7zg07pThN%2Bzq9mn4NdtrAMgNy67zONOYpySqrm6DjOgUbYadORmg%2Boozm9%2BKab3ryjpiSO4Urt2TVBYplI6kuInDndr8bHcyGxHUx%2Bbt02FSP9K3HBjW9%2BSopq%2B7lG%2BAxe5CByymFhY3XJwqXqE9doALY12ei8Gij29WF%2B15NRjDKRdV6ZKhIMsXfvp4RP2Q5ZKLaZFI0uWRk96Uq%2Beu4hU145dufEquqkWgTAhmfFEgdgBSmyc76YDlEIqmzRMoxVLM7tOrWvLcjtskzlZh1QZ7hNXDhlyRpSEunpmYPiEeIb%2FzHgR0FzHIr%2FvG%2FLfou%2FenC%2Fq2%2FaSqmnJ810b%2B1k%2BmKaEu55wlR4H%2Brg83XQVaAy%2FXQwp43mygY6pgFyUZ%2Bg4wEnc99Kr6D6ytGubBDdqFxRaNDGAhe6XhpPBjjn0Ez%2FAhfuDmjPTrUSmjobVH%2BO%2B0auoOfiJmhp0awALXbcsAZRMwGfn1s0riJUTvBKk2cgkHbOzAfKXqRdxfB8zSkdgJ8tCpUvclSV6y0MpClBzij%2BfQdsgkVLFr8032quRqBlv7WAy3%2BJdFc18BuwzqV554a9MLXnIhuUuagp0frQi6dN&X-Amz-Signature=29a355a36811e1babbeaa7992f3a1864ca5366608d4e20a3d3ebb14e770db898&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DPF3EDD%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIHdW7d4sPgUTouSB4VEcC2iS5ksG30U5i1zloWjZ53R0AiEA4jWNX3YIOqY3CDMGQWuOtYgYHSp6ggkZ1sXOns2Q274q%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDO5L8iUFs3Jo3tQQYSrcA7dreYtLy88ggQVb8s2oGRjKePdxw7QA%2B6I4fYVAfbnDwYBKtrS28EkAk%2FPdnkHEs7LDLbCihJoIlmyrEfzkgwZsNKm7q3y4GPcfFXLn7vRCcpNVyod6MKFVgBrgJNbJ00inqVsSOugdkbSmQRAuzkQR0pIBBjpnm7bpSlumT1GVHLfEpkx7w9UZFmUec1cca961pBGCh0q50rMD14vIJbMwdndIvNmASb8g%2FmzZrn%2FxeEFzFHz7K%2FW6ETpnRd5VTEieN2xy80EiSRGhRQ9LGUK%2FK3iEY5iW6d%2Fiyg0%2FgxAVJknn7WwIcND2mrHi9q%2Bb8WqlVZIEKTW2cqh8TBNYTrsHMcbtrcT6NA6GLbqZzogchVPhm8bO%2F4XFcuLQVz45eQT85q3Hpu11Ne4A4F8WgOxgdfCGhJyiWIQIdsarYaWxDSffUcgIfO4UnIaDYCmpJKTIP1Gnk43d1pon3Ya3hJXvTTi72ikXuphcJeEN4JrNrFetnjO%2FLbdsE13UTAbUCeroxxQI89e%2FhBEcrsVeo3Q6dKNSamvH6DPJ%2FRKSpmvRFz6n57u0ApM7PRGd6ByFq3jyvaF%2FRYBL2M2cLiyZ8xzqWNCUXyqKNvqfzR4lP4c4ro54P3lKKzKxIKZXMNOI5soGOqUB8cUiwtu8WDJ%2F7J61t5uF9XW6EGFkQOhzL6i1Jbc7t2RdMS4PUF%2BqxTVmsOxpyRuapDK2l1d1ZVtnpcAe32kP8NC4x9w7nWPG%2BsEqNXpSNgs61tiq4ewXvEMkvXWYv4u1DhPH%2BWgcOKuZhU9YHVM0DMLG88UZ3Aq%2FuTyC%2FTlpAwKrrMkhLgHAcYAEfTnF98Zcky%2FlppBQUwnLvCcoiNx%2Bs0FKir7d&X-Amz-Signature=0a5f4142f44b10bd213efaea11ebd6288002a76fc04cdffd0f31d07344dd4924&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DPF3EDD%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIHdW7d4sPgUTouSB4VEcC2iS5ksG30U5i1zloWjZ53R0AiEA4jWNX3YIOqY3CDMGQWuOtYgYHSp6ggkZ1sXOns2Q274q%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDO5L8iUFs3Jo3tQQYSrcA7dreYtLy88ggQVb8s2oGRjKePdxw7QA%2B6I4fYVAfbnDwYBKtrS28EkAk%2FPdnkHEs7LDLbCihJoIlmyrEfzkgwZsNKm7q3y4GPcfFXLn7vRCcpNVyod6MKFVgBrgJNbJ00inqVsSOugdkbSmQRAuzkQR0pIBBjpnm7bpSlumT1GVHLfEpkx7w9UZFmUec1cca961pBGCh0q50rMD14vIJbMwdndIvNmASb8g%2FmzZrn%2FxeEFzFHz7K%2FW6ETpnRd5VTEieN2xy80EiSRGhRQ9LGUK%2FK3iEY5iW6d%2Fiyg0%2FgxAVJknn7WwIcND2mrHi9q%2Bb8WqlVZIEKTW2cqh8TBNYTrsHMcbtrcT6NA6GLbqZzogchVPhm8bO%2F4XFcuLQVz45eQT85q3Hpu11Ne4A4F8WgOxgdfCGhJyiWIQIdsarYaWxDSffUcgIfO4UnIaDYCmpJKTIP1Gnk43d1pon3Ya3hJXvTTi72ikXuphcJeEN4JrNrFetnjO%2FLbdsE13UTAbUCeroxxQI89e%2FhBEcrsVeo3Q6dKNSamvH6DPJ%2FRKSpmvRFz6n57u0ApM7PRGd6ByFq3jyvaF%2FRYBL2M2cLiyZ8xzqWNCUXyqKNvqfzR4lP4c4ro54P3lKKzKxIKZXMNOI5soGOqUB8cUiwtu8WDJ%2F7J61t5uF9XW6EGFkQOhzL6i1Jbc7t2RdMS4PUF%2BqxTVmsOxpyRuapDK2l1d1ZVtnpcAe32kP8NC4x9w7nWPG%2BsEqNXpSNgs61tiq4ewXvEMkvXWYv4u1DhPH%2BWgcOKuZhU9YHVM0DMLG88UZ3Aq%2FuTyC%2FTlpAwKrrMkhLgHAcYAEfTnF98Zcky%2FlppBQUwnLvCcoiNx%2Bs0FKir7d&X-Amz-Signature=2b27acf4439c01731909aed1fe5ef0c741d0236e5b46ab2f9f89881b6a5ac83c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAJGI2ZD%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQCPT02j7qvas2H34088NjfUIwIC1yIVNxEC1Vg1GOwiCgIgX5naoR2GFc0TtThGD4CS9LbZ1ngvwVVRcfZYmra7wUAq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDEjnONV%2BJztytHRkcCrcA%2BjcQu%2Bo%2BXfp4qOBpgrSPTlqQRlwO7Yh2L5hKSX9NRWKCFxVcRtvbejvYNoP1ERhN1e0jZsn%2Bed6rvc5YHTjOpKhOSEDlcncesZ9jdQq60XYWyQn3IG%2FL3qhUiXZOGBq%2Fa9348xphnx7tFx2vo7FXYtQt1drqneyA1f3NWiUeQqEs05DRcgsMDCEX4BtS88nlj7PPNgAn7dWn2WtySOZbZCjBtYVpKJObjmnV524%2BgvODkozn%2F4XwJkA2bvAl9Tol9dwtsTWjTeBBOKEnwg9H7vCOqgA2jZumZIrEaPTkj%2BB9AiTUkSCcmVjglBxz79YwhTOWofnlrxXL%2B7694z9aDtz%2BQkKJwxsoCCXpfPiszl1Smd94k5tfkgHwtYleZYfLUxDraQXPbW3akh2H3d7847hTk0x1o%2FyMfcFTg1u%2Baoycwb%2FgPHCFyaiSiEcj63FoFJ2UDhjtVqcOvdfo6cfu8H8VeMmtWbge7IBPamAyNrYrAuluXaxxh%2B8nUlRDV9luNH3VlUbP38QmGEpwtTLCrQW%2FDx3MHgyuWlnJtN5Snz286h6TAn4GPSRuljVsvdp0eziMwI7CaBVJUIUKMjbNmHI7b%2BwCubHbsBfu2liRYvXhTB2jx9s5X1xsoZ3MJqM5soGOqUBO3eAwn4WUVbFIqPDxn80KntV8dkl5s7QJBztI3JdxFJaLGl1GDtnVoYbSta44Ft7QORQQ2B8OcL%2BAAzbF4RXJfvGUJSkjp7JVPkPaXbqi70FJUy3Eai53%2B74Bj079Uy4Sp0oUgHmjstyr5niZ53wixJhmJrYkAHC9jk4yzF9jRCFF7Nl0zND3AxawcuyDqGG5gs9c6qpjTFt5a6hO1PT17y6QoPi&X-Amz-Signature=7e7063ff519a80d94390b8c4d726e5ec54a6a330dd766e42e881f79eff352d47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YS2LKJR4%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCT3nIMR9KLhPcXsvIMz1YwGsb74FnT72mqlafRjN%2BSqgIgVl%2BbgTfCYOfzHKzU89Q1%2B1XVo85lBCfJDUUn4Lq50Mgq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDGGq3gzwP4Vfep7x8ircA7SovaRKcTna5r4yXankaORQclNQI%2FyQC4Emtd6V972Gcs5tVyvNOW2gqAkn8Q6ufviB4GUEDlSMEBTtN5tG11RaNWNIjhwvEnCjv12ARS6gGK1FXpOn%2FiOVoBVlUHYYQ5MLmI8%2FLTAVEsGj58f926vHH3p%2Bf8dXFgcUEwv5ZIAN1ygBHyWp0nR%2BMZbvbFOaadOa764uO1FwCGvWx5Obzlxrka96KDWyGuGh81KwrGSI4wV%2B6tXtPDhMhV684VMqwKeZyL07uM4%2FOpzNg2ELRKC317kb8LNiRba8HH7EI%2BCWW3yLubBToKKjmCQZ5KNtQCMHHoBh6VqeiKdzFhIJXuSbbsZ7dzkTu2GkpgVfqM50LvJFRXmdWHHTehk40SNLVOEeMl91gK%2BUhNRth%2FnzYGza5I74Xbk%2B4fDCWkWy1X0hHyhCK%2Fl15kApIDopx85jOiXQ3VNl3fBjdR7c7h79Gy%2BgUNuJn%2Fq05hm0DaZxJYuWrCVB8kLg8%2Ftct2zHxm6PgkNMdXqJKIYFiDzpHqEy%2BQQ3pTudGnw4HlTsiFKSm%2BjDGm6V96E2SB33wi%2Fl4PywOXx2IiHat6BR80GrffRNdc%2BZYB2bhiM3QVNLffAfxIP9JqHldXLDlfYWakmRMK2V5soGOqUB1jS7AaJRx8lwEzic1QnUb%2BZWUGjNPqnOWIEzN6H2WzYuuxP%2BEos%2BUpbipZY%2BhLqO%2BBSqqnZbZ9xV199dF164a63hKnVjpgQdqwUm7xATkRnFBb60CXgt14ljTZWYKuxG6gTtYEk5gsCEchNQ6XUxL2b%2BDeV5LihyUhnp1jn%2FMbN1smjBLiPLtVmXYqb0WuU3PJJdzr91eSL8T1UJwOVsq2pg4zev&X-Amz-Signature=bc36bfa582a4641043146ef3c48f3a7172d93417648b3a77c077b4c9a7fd6d6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGOASZZJ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIF7ysHiqD5KK1SGseLy5kFHLUhScRQH%2F1kJ3GPYxce78AiEAgGb0pxrtlyJM8PbFVxYqimxT0LZW9JDunRmheWXHuJAq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDCPwrpGXTn72UlBIKircAzx7VH96qN2rOzjsDGHY0ZVMr92%2BSJiGKEpKyJXlqjq%2Bo1JfcyEn2piIwy3Y9mqyjAPfDu0rNSJIGbtLzPn6Mwi%2Fpt2AsyLt0aug6wwQMPuGxIJspuXvmuzh%2BpshnZkoNu8QE%2BPp0wubIRVCfCeunMIKRm%2BYcWxugf4uyIa%2FGMTpXKR47Cf%2BWVB1c%2F2GAepdkKwR9FzHlpHRVjDoWeE77%2FjEBIiLsg7j0VSVqfjHaGM7qaIYNH6d9C7qUaM2XzvpRrtDoWWpZGI2Pb1%2BSWg8DoQEAZGhEjnIh%2F66cK7cNMCieGvKEt0W8nCzyvMHlI45JrBZ0PZcKwdW0dNM%2F1%2Fbdda7MQVq1CJX0GtjqFlVER9NAtZV8mCtZ%2BUIRsBY38kWpWz1PnAbgDZOjcNsC05nFxPc8WmeHXE%2B0hTIuV5E5ah4DOjZrNSauIk9kWTX%2Bz%2FHQ9DtSMmzdC8ConuYClCi8Lye1947li%2F05U9JIIi%2FAePdMUTlQhUHeO4ASNiYH6MBI2Oldb3sUQkliqFyEfE5lzCTWE8D3mFi62hYuPBrli%2Bj%2FyykNRUvmZkkmYEMWJf07AAz87vHIPbvI2qSttBNjafMKPjDVyy1rV4wuHcP1%2B8KwT9G2TD%2FJhMO8N1pMPOO5soGOqUBQZCRM6r%2BjNcTfdEikfhmEW%2FQKBiknDxPi2WUPPaFDELmZ8jq2iVTjnlA4cJRW5eU%2FCsDT8ivqZLYb5QvdDg3Qh%2FY0VQd5uZ8tfdghAGdAZW4XAAJhO63k%2FUosNiOC0MnBtxTrYt1D623R%2FL%2F9DVHlyM1phQXkxD0q3Uepwxm6eLMrk4IVJnoP%2FwlUiyVgE1XeuFjHCsQJHBlH4W%2FpC7ID6vdbdob&X-Amz-Signature=6a710e13e3fbad9571ad1f155e462c3abd3c4290ca8687be0f24ca48a86deee2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAP6CXE3%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDPvgnF%2FM2RtL65uMMSp2TMZOX79Tu8kzvnppynIsXUqwIgKABGWC4E4n%2B0ETgSRDdT%2FHsY8b5Lgmz9yj4xJ6hOAKQq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDG3mjBb89M8Bp7oyvCrcA9%2BxuwEkth2VidmJJLiEXkzIj%2FBfH6KuSah1KnTaQAuhPCibirBJpdq6VA6ZWSJCvnWgMMWPcBRo7WoXIlMzx5Iv05GSNYc5MUY%2FqqxEQ4VRbRgDRfXTI1hNdxOm4tl8rpFARdAbF0dG8qyUX2X3F2i6VL7RsIAfhKJ4MuInkUSJP4GyBtohWSaLn6CHUEkkJ4189e%2B1ymxOIZS0%2FNKPQUJQ8ttYR%2BgqGJ8fGoR8LDVW%2F2I2zXmtai7OCjcWcA2tJUdaXjBjsFj90mQ0FFqBMZLWhAHNaWjkfQ0Yo1CxEKmuBQT%2BwLMWyz0SeCsoBkFR7jvalsWT55EuRMmPM%2B%2BK%2FhaPm8dyBZ6gda%2B5w%2B9WONjWq6HGPpI6NrtVC%2BijSgwILJT4ozYEb91Glhtb6X80kIjXYbHFeB4Z4aG45NtnInjZf7AIbwX3yn50yPI0c1zO%2Fg9d%2FVECPElaNyiv2yQIgS%2F40XrCZLyuJghL0ugcggI6BdN%2F1ElMgCuzhSwvTnZ3Utd%2F3tDaUX5Y4WCu0vSD9%2BqPCsJ18Ta1qUOhnwpOtc%2BkXsIw4fiWE0wGR6OyGiJnADbItnxKyKI2yfSlWa1I2eOrYlRpy5SIc0cyFp8LwGA%2Bzz4IBi5%2FrhT%2BUxsIMKCX5soGOqUBIcFh%2BwqrjuCyWheJl83vWQKQIjR1M0JVu4A5QXsjS8EFXSJsr3uN8XGfhbHG4joSrjwbAJd9QcIA%2FxjAjI2z4VGz0DJPNP43W2BIA23G1iT5Y%2BtSu0GRc%2FgCJ0wrB7pRZ3irK731bvqRDUwLX%2BDmkemDK%2BEnyLXSCDe0xwmltr2gkWYeH8V98exoPJUPeQHtB8a6LEjUTUwoNK%2FJMdDQ%2F%2Bl3dpXY&X-Amz-Signature=5b9b46f1fe88b5b9534732bf0b8e9498701c039c04ee56cd5e547e060bfd00ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAP6CXE3%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDPvgnF%2FM2RtL65uMMSp2TMZOX79Tu8kzvnppynIsXUqwIgKABGWC4E4n%2B0ETgSRDdT%2FHsY8b5Lgmz9yj4xJ6hOAKQq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDG3mjBb89M8Bp7oyvCrcA9%2BxuwEkth2VidmJJLiEXkzIj%2FBfH6KuSah1KnTaQAuhPCibirBJpdq6VA6ZWSJCvnWgMMWPcBRo7WoXIlMzx5Iv05GSNYc5MUY%2FqqxEQ4VRbRgDRfXTI1hNdxOm4tl8rpFARdAbF0dG8qyUX2X3F2i6VL7RsIAfhKJ4MuInkUSJP4GyBtohWSaLn6CHUEkkJ4189e%2B1ymxOIZS0%2FNKPQUJQ8ttYR%2BgqGJ8fGoR8LDVW%2F2I2zXmtai7OCjcWcA2tJUdaXjBjsFj90mQ0FFqBMZLWhAHNaWjkfQ0Yo1CxEKmuBQT%2BwLMWyz0SeCsoBkFR7jvalsWT55EuRMmPM%2B%2BK%2FhaPm8dyBZ6gda%2B5w%2B9WONjWq6HGPpI6NrtVC%2BijSgwILJT4ozYEb91Glhtb6X80kIjXYbHFeB4Z4aG45NtnInjZf7AIbwX3yn50yPI0c1zO%2Fg9d%2FVECPElaNyiv2yQIgS%2F40XrCZLyuJghL0ugcggI6BdN%2F1ElMgCuzhSwvTnZ3Utd%2F3tDaUX5Y4WCu0vSD9%2BqPCsJ18Ta1qUOhnwpOtc%2BkXsIw4fiWE0wGR6OyGiJnADbItnxKyKI2yfSlWa1I2eOrYlRpy5SIc0cyFp8LwGA%2Bzz4IBi5%2FrhT%2BUxsIMKCX5soGOqUBIcFh%2BwqrjuCyWheJl83vWQKQIjR1M0JVu4A5QXsjS8EFXSJsr3uN8XGfhbHG4joSrjwbAJd9QcIA%2FxjAjI2z4VGz0DJPNP43W2BIA23G1iT5Y%2BtSu0GRc%2FgCJ0wrB7pRZ3irK731bvqRDUwLX%2BDmkemDK%2BEnyLXSCDe0xwmltr2gkWYeH8V98exoPJUPeQHtB8a6LEjUTUwoNK%2FJMdDQ%2F%2Bl3dpXY&X-Amz-Signature=eda43c46c3e105de767f6383045033a7fe8c37a941db845b6166caefcb1a81d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYD7MSSL%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIDh4e57bNDAG5Xo7Wd0cxPijcHCT5YhWv7%2BzTD1b7kraAiEAjq%2ByORI7awmqZA987Mzwk7DBuzDe8s34dNIYVzsBvfcq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDPE2BZUh%2BZI8hXtrESrcA%2FH1RIq1IiT3aLmIzACANCCKbdWGta8lCe%2Bt%2FT1KNhqhBrhNX9bq9uuEIL7RziH7S5pULwmnZJ2bghTiiT3pJPg0MOmCUBPwlDUE8EwnIVt%2FrQYk12ddHqxweIzjtb90bO5vSKBO%2BqlUUa7ILf23a1zdnTPs70T33zMEulmCI7O7Ruu3tAKsdAel8lPQw2f2LmgsU6b2NPEpuy5ZGcPN%2BoOfWXuOKQcjjqaIkaSWQyJS1zPl2G7v%2FC7hWVtGG8sT9Lw1m3cm9bK4rrRdfiyVSYmyW%2BWu7IUX3NtQGsZURf%2Bb7nbEhQwlgJg8ce6K8dlRbVy8NXYH0kBMK%2BNHhYwjThghRTTMW4DWCuNl4LZ07f%2Fgf1nity2KV%2FkgWZwvB8RC5xz6JiSgtF0T0NFTcw%2FyZ9MIP7ODceVw1pKM9P9PUKhj9YPhL13bEV%2FdzhklAIWeaFTPM4Hpwd6fPD2SmIm0vOQOSQ2FCpkIW3Alq%2Bf8Yj%2F08v%2FTE7QIMUIkbmF4bEEtDWu4MHgFZud90ZanIvuFXljTwl%2BHKgryRkHDdUFJU8PazQs6eW5ILAU2E%2B9l%2Br%2B6JE9MA%2Fzb4gWzeoy0BHOMlrXgF78PJKdW09Mq0W9bYHoIOKxHZ1NdpxA%2FnhLeMKrP5coGOqUBDVMutZrSMBLPGOaFMmBUy7mFM%2FUn%2BeS4HYn%2BIv8n6Ooz1%2BV1vy6ueEvlZN%2FlRDo5TrXkcQLWhpUbzv5wByeGuISJrVZdzbfsSob%2F1zZ1g18hHVQcPJmDKFp6fZltSHZshuo0ZGovIWg7bsM17ll6CPQT8JI5mPPtUZQ1vaM38tcytzQPkigZ25wbcxOsbJAHnkNKtE9qwLBXkM5WJUdMqKU05G13&X-Amz-Signature=4577e1a7d0c70cee17963b69549001e6b0413ad862b179c9fba0d47806d3c4cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UXR3WAQ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQDrm8B157O8uDdFFNG7sIpXtSg0%2BbU4WgFOGRWkEtFYxQIhAPabLOwvD6yW4A5ypBEbZgsUWwse5DG%2FSy8kzkxhZeDmKv8DCB4QABoMNjM3NDIzMTgzODA1Igz2vJp0K2ov9ZyYhk8q3AMnC6Vih5vDi8qGq3sg0zNhHJTUH7fAwP4Gi%2FKBa1z6TdiFQJB1u%2By7mAX6Fqt9QOefjlaUmRR4WvWWIwjpOGbndSg7uFSaK4P5dDgqmJTSkj%2BObZduJynBxx%2BvL8URnhz%2FW19vY%2BqQF8xEhCg%2BEQRgH37oK83h7OE8srCuJKWnCqymoPyB4g3XI3PWbDAB7%2BYEmehCP53NRvHTRR4%2FfYBHne7ic0uFc7elaptdzUPAolw37iLr700ZtWIzdtPIVS0fXdJNTpYRo0kFr7olO%2FXMcaae2YrxvPpRSvoIDV2%2FwBklUVkdY4%2BlzQHyPGdBHIDKj2%2FqFEFkAZWPmCiQadAC%2FwnqWyaoQFOLov3Gc4xzWE3kAAxEtpdQc80AHYiWrXJo8TECe2K%2FA7WIfXrULttTEFUpJHN2rLhjr%2FZbDDeUaX%2FP4BOFn6pJzsAgn7JP59qK6o13y2a%2BcAW%2B6iuDNSxv4RvGoT9iH2vOJTzW5aegAdeWBEYqqa8g7HnsUhTK6X1r6SF8saPndSzJNGeWrIIuZnO%2B2IEyNK8TfitzUwY%2FnnXMKxJYOwtdTFakZ00EjSCRMg1wADWkdI6S7PbEZtzaFyuhunc2an4TID4z4SMC%2FGU09BqxOzck8%2FKpvDCpgubKBjqkAXWwn2agweXTdwQk5qVJ0BMjJAv%2BJ0SaQG6YjsY8xcs%2ByYSFPKuMBDJ1Q%2FogIi%2FxdmZK3SjZ0yjjGttFXMB5zNm6xxTH0PNtsooJQors8QAWHpeFY8CesHd6%2BE0wDgwSEGZ9HE%2FlJ6%2FPq6Gkc%2BUJrtx0My7AEOLpDwBrySvpsmR4%2BkKt4Uq0mhIopO67Wt547m%2B92cfG%2Bv9XnWTcHxFw%2BjZFCb9u&X-Amz-Signature=a0623b39f91d52beed9317a4ef169b98465145e111b2edd16e6d356a1bde72ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UXR3WAQ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQDrm8B157O8uDdFFNG7sIpXtSg0%2BbU4WgFOGRWkEtFYxQIhAPabLOwvD6yW4A5ypBEbZgsUWwse5DG%2FSy8kzkxhZeDmKv8DCB4QABoMNjM3NDIzMTgzODA1Igz2vJp0K2ov9ZyYhk8q3AMnC6Vih5vDi8qGq3sg0zNhHJTUH7fAwP4Gi%2FKBa1z6TdiFQJB1u%2By7mAX6Fqt9QOefjlaUmRR4WvWWIwjpOGbndSg7uFSaK4P5dDgqmJTSkj%2BObZduJynBxx%2BvL8URnhz%2FW19vY%2BqQF8xEhCg%2BEQRgH37oK83h7OE8srCuJKWnCqymoPyB4g3XI3PWbDAB7%2BYEmehCP53NRvHTRR4%2FfYBHne7ic0uFc7elaptdzUPAolw37iLr700ZtWIzdtPIVS0fXdJNTpYRo0kFr7olO%2FXMcaae2YrxvPpRSvoIDV2%2FwBklUVkdY4%2BlzQHyPGdBHIDKj2%2FqFEFkAZWPmCiQadAC%2FwnqWyaoQFOLov3Gc4xzWE3kAAxEtpdQc80AHYiWrXJo8TECe2K%2FA7WIfXrULttTEFUpJHN2rLhjr%2FZbDDeUaX%2FP4BOFn6pJzsAgn7JP59qK6o13y2a%2BcAW%2B6iuDNSxv4RvGoT9iH2vOJTzW5aegAdeWBEYqqa8g7HnsUhTK6X1r6SF8saPndSzJNGeWrIIuZnO%2B2IEyNK8TfitzUwY%2FnnXMKxJYOwtdTFakZ00EjSCRMg1wADWkdI6S7PbEZtzaFyuhunc2an4TID4z4SMC%2FGU09BqxOzck8%2FKpvDCpgubKBjqkAXWwn2agweXTdwQk5qVJ0BMjJAv%2BJ0SaQG6YjsY8xcs%2ByYSFPKuMBDJ1Q%2FogIi%2FxdmZK3SjZ0yjjGttFXMB5zNm6xxTH0PNtsooJQors8QAWHpeFY8CesHd6%2BE0wDgwSEGZ9HE%2FlJ6%2FPq6Gkc%2BUJrtx0My7AEOLpDwBrySvpsmR4%2BkKt4Uq0mhIopO67Wt547m%2B92cfG%2Bv9XnWTcHxFw%2BjZFCb9u&X-Amz-Signature=a0623b39f91d52beed9317a4ef169b98465145e111b2edd16e6d356a1bde72ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VATRABE%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T230117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIB8qp0yKg%2F9KTmyUX12izMox4I8u%2BYaV1sHuKZLxdKHSAiAzSg4r4dDAn91oxQOc4UXWnAeEIsiaKOWufkSb8nkzySr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMH3xeeHb6%2BEwWhZNWKtwDFJlp5dJQH35FTQoEqrjvObV%2FvtM7lHuA%2BUgylwlX07TtWs9P%2F4BOrvl3OCM%2Bw%2Fo60GfWJdohDlTimE8JS35tlPHXVPBd5gVUgFmYdYP05kY41uLXxdaOvkyN1J7Q4eFBxXqMMbY9VZhYMtHh%2FjcsJb2ozqcpGVHSKl2qmbKB3Sj1fB3OCdNaGA8cE9BNJ6og7jKlmRQKrqM9msspZoo0bQFvU8eOFm04jcRngcuhk%2BO1aP9pk158o0xC7PinoDg5KqDJDLcruzLiHhGcXU7hsuM24bHM%2B7Lkzb1j%2FWrj76VY4nTjs%2BHMSv55ryRIaGUN3JJdHYejBjnHkQcLHdJrUOciQqeo7iHsDMEDK02di49G2ih9n7N0zy62V7HCtJANT0qIEx6Akxjiy%2FO68REb%2FMFLDY8QV7epTG%2FQs15SL6Jlsi3FMW1n9bCkFAvrz6YxF4v2WVqeDH4DVBucWlpeLNG57w%2B4SGg0mqNIpiyiHdioZuGKxrNvPm9WAOi0J04BL1w41FSe0Gm9oNoLyaPMVefejVRmso5aLjywqhWlVZUcvrMW7Rw%2BHpngJ6Ezhg8bqZVfL5NG7ho5uF0ck0%2FOpKaYSLja%2FYTgY%2BL0oFiz8094bl2izxhXAJPtwncwuJDmygY6pgFuho3ombIKIqcnKfuyD0Cv2r00FEswBqLe8ZwWmoPz6sD4ZuifVYA1%2FrZnuJlWlu0ExmEZK%2F080NLCeC%2Fl0Qwj6Txl4XM6O1cbv%2FTB3MQcid2pDJIyhqG5o257ZNMVVnGz1tnoUoZIg61dT19jurpLJJA1urYEWX89G5Nv0bJscoWnVNRepLUwusu23jKJ%2Bwp0bPaURS2YmPldvZI5ZP0iTLNXrcUr&X-Amz-Signature=85962b3a3d9921f3ccad5e2bdb5ddad3e1cdb838c8051126f2c2d02b141e044f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

