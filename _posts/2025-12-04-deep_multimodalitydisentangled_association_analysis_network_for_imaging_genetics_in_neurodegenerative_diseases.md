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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNYG53O5%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF2rz8LxoM8F%2FF4NMVbC9b7BuVuiJJhiw%2FwQpKx9BA%2ByAiEA8q5VqkANJATyETMK11AAIrMGJbpex7wwWHghNsgoNSoq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDEAjtJWdR1yvJWcOgCrcAxx5BNYhtCmG2nh6niRfu0UdpGNRm6UO1gFsiKeSAGvGdqKau67bzV0iWrvpK92baunXFNAApVTrWqDWCowCusUy%2BHvaBejE5uv3UhHcrR%2FoeJe9X45B7NjqlO1BHAX44H7CWirqwpNOXkxex0MR7uAQVcqryND8e5uFDT4C%2F6wg%2FORIZU5tOfY3iK6KntMc22kLOJa4gtFLzpQ0TpOMwQazzIfaBvX6B6wbcD5uprvV73YoFL5V%2ByhUVrSCpAoQXdK5YC%2FNLmfoMCgPyoIiGkrrmGBSlmf%2Blb3eWnQsPp7bqPbVgG8I4WIM9RUekWBOe%2Bd%2F2nvCAhg5M321A97WkmNlIqCvAJqcBv7kUjoU4cZe2JNNY73hQDoFyfhKXXDmBW5B%2By7NDgymL8Vi%2FjQmn5MIjF6dP4CQjTOcjZBFJJgPhlwe0X%2Fcz8stAMtoWh4qVq2cuNGf%2FyJO%2F41HwUgj356uNrGsUk%2BiyT%2BiT23G5EK3iirSig4glbWul2NsPfhVk%2FIu6XaBU1V5aAF%2F0kG82YDolGcSutEfZB0PXQuS1gLxwzV6iNLBVdcEcqYXdqz9mezERbwQpVvULCDUMMi%2BTXqRr%2FjTiKh1RlcKIoET3dns74UgAqv5p744BoVRMPj4s84GOqUBuvsOjPzZh06Z993PfZ5F0lHEaKoY7oNdaXB6xXlD%2BBxnq93PnZZeIEtGI6ZrlLwx%2Fgffbv4NM%2FqQvutr8zitSTGDZ4OC%2F7my4ZNtszhY6fYY%2FLWu%2FS7Wl6%2BlRC%2FBRhJwo4WS2kvpbSRxc05rLwdDLefSZ5sIC70MbsUjP3KDhA9y51IM66D2qU3EHG5fO%2BcWZz%2Byy4%2BtxvncRSHSX65rENclMfkf&X-Amz-Signature=965b669d51e97b5330bcd78386c77d66ef92f5a92c3e369ac65d09e329bbdc19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNYG53O5%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF2rz8LxoM8F%2FF4NMVbC9b7BuVuiJJhiw%2FwQpKx9BA%2ByAiEA8q5VqkANJATyETMK11AAIrMGJbpex7wwWHghNsgoNSoq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDEAjtJWdR1yvJWcOgCrcAxx5BNYhtCmG2nh6niRfu0UdpGNRm6UO1gFsiKeSAGvGdqKau67bzV0iWrvpK92baunXFNAApVTrWqDWCowCusUy%2BHvaBejE5uv3UhHcrR%2FoeJe9X45B7NjqlO1BHAX44H7CWirqwpNOXkxex0MR7uAQVcqryND8e5uFDT4C%2F6wg%2FORIZU5tOfY3iK6KntMc22kLOJa4gtFLzpQ0TpOMwQazzIfaBvX6B6wbcD5uprvV73YoFL5V%2ByhUVrSCpAoQXdK5YC%2FNLmfoMCgPyoIiGkrrmGBSlmf%2Blb3eWnQsPp7bqPbVgG8I4WIM9RUekWBOe%2Bd%2F2nvCAhg5M321A97WkmNlIqCvAJqcBv7kUjoU4cZe2JNNY73hQDoFyfhKXXDmBW5B%2By7NDgymL8Vi%2FjQmn5MIjF6dP4CQjTOcjZBFJJgPhlwe0X%2Fcz8stAMtoWh4qVq2cuNGf%2FyJO%2F41HwUgj356uNrGsUk%2BiyT%2BiT23G5EK3iirSig4glbWul2NsPfhVk%2FIu6XaBU1V5aAF%2F0kG82YDolGcSutEfZB0PXQuS1gLxwzV6iNLBVdcEcqYXdqz9mezERbwQpVvULCDUMMi%2BTXqRr%2FjTiKh1RlcKIoET3dns74UgAqv5p744BoVRMPj4s84GOqUBuvsOjPzZh06Z993PfZ5F0lHEaKoY7oNdaXB6xXlD%2BBxnq93PnZZeIEtGI6ZrlLwx%2Fgffbv4NM%2FqQvutr8zitSTGDZ4OC%2F7my4ZNtszhY6fYY%2FLWu%2FS7Wl6%2BlRC%2FBRhJwo4WS2kvpbSRxc05rLwdDLefSZ5sIC70MbsUjP3KDhA9y51IM66D2qU3EHG5fO%2BcWZz%2Byy4%2BtxvncRSHSX65rENclMfkf&X-Amz-Signature=965b669d51e97b5330bcd78386c77d66ef92f5a92c3e369ac65d09e329bbdc19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PXKHBRK%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCyGuUVFnFBExNfuK8ktQ2Vok035heaRRIDlRGLU4YohwIgQrbznfGmkAjAq5DXsgnrRSnG2MXYjIGiDF4CEFYSidUq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDABTQp4uAR%2Brc4mn%2FSrcA0e707IJXOtHV3M%2FgJs3lYJLCzTlWSaIBNuBU4T%2BtiS09wIRipd2QtoucQfrtTBpJvbkeObrA0vkmwNoSGn39vechaReUWMSqjm5MGtSfbFNh%2BynG%2BvjkrrdX%2FzZ66DhzviZ7km5FTbEy1RIXUmXChrSUdXWgrVM1QrouWFhRnOVRVUNMzbi2Q4xofVi07wqSNXn134M2Qd6TPPYvYrRAz6p%2F4mGVy%2BCyI2sNqBXoJSvrpXGQfqYy3e7HHkMYwiVMYEYG2qSPRJ%2FAxOFgjnUm8z%2BDSx7y5sY8fyP%2FVRl58dzroSqWeyRuhTCDcffdXGzim4Dl8eXbSnnDnKfyIjhio5%2FFyia11%2BwSAZ8GYsGZ96kTC73hlDJpVcIgjt7Fe3lMmweTtclDd6AzMrDTt2DXOI%2FncUKscHsGwsTu4cyj9ZUQh7sQnCXlUB5cI04N0qeceg%2BFBP2cpMl7tFaPNHjoh4i%2BS5nYbcUZSrtj4MKSkPzQ0KAQfGsGE%2BFGuN2RTuUn9PMgWKqUJKyWXhBoG5uHMu544vXKrhXj7gml7dmiDLcu2qnH2B5gn8pmV%2BkoTOIz4Cjfzjan4acRc4aazRdCtfbha2JMSCY5Sfo4LXTj%2F5l7MiC5%2FwwnAWSorAYMN35s84GOqUBgLjlml2dFjBIKBSLp10VXM0bqlmz0Q5xN4UGvb1r%2FgkNfNKIhCTM6Db9Hv%2FJjRLjo2QOwc8H%2BdwiumnHU7GUfErDaznm%2BmY8%2B0KlVYUYvu9H%2BOBUI0TLb%2BiOa5ktPg9mKOY%2BK34h%2FP3JSfemqBUy%2F3UjfHO7Zg6PbEoXWV%2FbJdNUUgsEgd5dxwfqat5GwBoQVpN2SCvg480QJe9m9HO1HdAEgnfd&X-Amz-Signature=7cb9d45c48bd5673090c8d65add070df6afd26349e8ad3e2271387008830bad2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HDFVWJJ%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDKqoeeY7gdNyBmZItycm835sGp2fKUNNhDixVV%2FgvB1AIgf2YzWN4wts9H9pxoVC9foSo%2FteohIrxAz17TnDVTCTwq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDPz0HFKvgxFZeQ0XcyrcA4oJOW717fYUuT5miCoKCCzU7yeZyKLRY6iCLmTHelhXvoob1OQqPzakeYSj7de3bbRGpbgP0vpjFW161VKinG6LcBsFJxbsIEsHqhBSmZuVtExrPYc2vCvjJld8jqXKCDN5xQOtOo%2FjX1Q4JisK3fwkQ0yDDhNmgf0XBC9fD9Lr1%2FB0KJdxvXcyGiyxE5pcgPMuOU1TDVKdb0qixorc8vCtlW8vny8dh5VNNYlQSC3QUTH%2FONcE0Hb2b3W%2B8Ksv12foWgG8dnt5CIXy5tPLbgfVetk%2BYiqKcb3Hw4zY7NwMoQjTf48q18a15slN7jQ0GQll4ILvopi7QjPHZN%2Fvo3vCWh9Jjs7EAooCf9pY5aUHGqkdMt5E%2FraWNBqJulPatVFWe%2BnNn%2BZ0Vobx%2FZnrmpdw9hyCCvR71dKPoEBc8vdho30HT7ZBLJpKZcCUhwCLwsonPAdksbfb552qO%2BW6kIVcC7KBJkU724UYZ3ReaSkOze4aGlDtkyKY%2B4AhrQtYrE0GCT8EAu8orHGa1QYYMUpD6a1ejCqDHqa5fIsLdhaFNtS9nH5GH6iQlUNxmsT6EHwqtAbqoQrIAZsuJ1TONYSLgakQPlAVE21rfDSfd4oHigEkyXHEy7IA68bdMKT5s84GOqUBw9%2Ba7ZW4jrOwPJHRA1AxPudo6zobEz94iS%2FrInWaseLVXzaJL6XcyDijWEB%2F0twEGDYNpMG4abxqlUkUnWc0xlGvJLYlmF3SSNuZUFY6OGu%2FWpqcUh5zWhwZsmNIqXYbmKFTbzXel90BtkiWpNGW%2FvxR0unD4gBtjFlClqX9jEP7BKXIF8mmo11bvOJ7AS6oICp0mvlqbOUHIg%2BCf3oRs6A5Az%2F4&X-Amz-Signature=1c6015acbe2a285cfa06f13b085699540563c435c31dfc191d64bb6aedf67c76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HDFVWJJ%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDKqoeeY7gdNyBmZItycm835sGp2fKUNNhDixVV%2FgvB1AIgf2YzWN4wts9H9pxoVC9foSo%2FteohIrxAz17TnDVTCTwq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDPz0HFKvgxFZeQ0XcyrcA4oJOW717fYUuT5miCoKCCzU7yeZyKLRY6iCLmTHelhXvoob1OQqPzakeYSj7de3bbRGpbgP0vpjFW161VKinG6LcBsFJxbsIEsHqhBSmZuVtExrPYc2vCvjJld8jqXKCDN5xQOtOo%2FjX1Q4JisK3fwkQ0yDDhNmgf0XBC9fD9Lr1%2FB0KJdxvXcyGiyxE5pcgPMuOU1TDVKdb0qixorc8vCtlW8vny8dh5VNNYlQSC3QUTH%2FONcE0Hb2b3W%2B8Ksv12foWgG8dnt5CIXy5tPLbgfVetk%2BYiqKcb3Hw4zY7NwMoQjTf48q18a15slN7jQ0GQll4ILvopi7QjPHZN%2Fvo3vCWh9Jjs7EAooCf9pY5aUHGqkdMt5E%2FraWNBqJulPatVFWe%2BnNn%2BZ0Vobx%2FZnrmpdw9hyCCvR71dKPoEBc8vdho30HT7ZBLJpKZcCUhwCLwsonPAdksbfb552qO%2BW6kIVcC7KBJkU724UYZ3ReaSkOze4aGlDtkyKY%2B4AhrQtYrE0GCT8EAu8orHGa1QYYMUpD6a1ejCqDHqa5fIsLdhaFNtS9nH5GH6iQlUNxmsT6EHwqtAbqoQrIAZsuJ1TONYSLgakQPlAVE21rfDSfd4oHigEkyXHEy7IA68bdMKT5s84GOqUBw9%2Ba7ZW4jrOwPJHRA1AxPudo6zobEz94iS%2FrInWaseLVXzaJL6XcyDijWEB%2F0twEGDYNpMG4abxqlUkUnWc0xlGvJLYlmF3SSNuZUFY6OGu%2FWpqcUh5zWhwZsmNIqXYbmKFTbzXel90BtkiWpNGW%2FvxR0unD4gBtjFlClqX9jEP7BKXIF8mmo11bvOJ7AS6oICp0mvlqbOUHIg%2BCf3oRs6A5Az%2F4&X-Amz-Signature=9c7afc87a11adbbca6fe5878c398e48f051b30c312ca0008d9fb69eba3afae57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LAW3MBN%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC5ihwEgN5qr7L2z07yLUMXtsEzODzp5B4Sx9RK6wSexgIhANFDN9mjT%2FREtCeYTThfQ6ZURYAzroxrS%2Bj%2F2jbABGEMKv8DCFQQABoMNjM3NDIzMTgzODA1IgzCDBlFx%2F%2FxJdzQ2Mcq3AOYCEY93UBnPLwqowu7gA6O%2BAHOY65MOcCN36N9i1U5eI0MlXMPMwsrA4%2BtVLMpOrKh%2BPPkBXefGpLvMCGDEYjL99L4fIkwxDg3iKp5nB7%2Bu8kI0lXdBcHbfRJenlGTtS7ga60%2FQthCThmzztng5aH87Ivlc2XgOgS8k9ekpkGghoUGK6qKF2OawYHsp0xPhIrpc14eX0QJjQJPiNG2X9RGYXJS1g0YIywovvia6GCa9rGBbv6SCdU8lf6CTnpt9ZaV5QHzQHU%2FGnMXP0b9CqvkBaS%2BwXAIcXLnC5FMa6o1V5D5eI6klzfxW%2BPaFQ%2FqGKB1ySPzwAB%2F5YcaZF2oHXpLA9Y443izw%2FByrn8y%2BuK0JJjnTaZCrODf3FR4pbUWqBkkjKi%2FfZ46ZmRUYSE3Qg770PPSkV%2Bga%2BZyV7McVeVmKB4cwJQGZaStujsvR66lRmGrQFjruAUwKGJXysiQtDy8yDjwiJ9ZDeSU4Gio0T8oWGK9z7L1NBhJzQJQnKPRjsyaH4PFljJ%2BRyBWGCm7A0z%2FwGhNjyKFTyy8ikXWn%2B1iw8HuXRbWLpqM9A9N15W3LeXFJZYWfegd%2FdqKY15GdgDUbUUELfsdi7A7cKJyVJniIhjOWSa4RKIml48h1DDk%2BLPOBjqkAVwAIgC%2FT1CXmkeV%2F72TQ48QFdcLcIONkpS9cDlECatr%2BWoCseYF%2B30cllMkZiPE6sjus3nnENNpSEWhcZLV1WqNpTZmtUxacXkKcKw0zPK82DjP6I%2BXbjHdDjhYMTztVgE%2FSsQiTxGpOBPYrt%2BCyXZ9GT1kiF1yXNmVjBnbyGltGtrhoJEmZrrlTvqPk5CPPUNV%2BJbPuc5bD4r65OoUvika5B5l&X-Amz-Signature=336a4da3bfd44a4d3633745259ab404226a155f3c362917fdf3797e3fec4c136&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SXGAC3A%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2FbqYxc4gqCXj60XZ42knrbz1agGH32AFN4uf3%2BcYcSAIhAIWagJ4tN8vASiZNwEtZ6dalqSqCW%2BzNI2GG%2Byw1bFhzKv8DCFQQABoMNjM3NDIzMTgzODA1IgyK4vpvpzS88i4%2F760q3AN%2BeL0jNAVd08aejF8PZ00%2F%2Bs5VyalY%2FIi1lQghtrWqe5CLio7snxAstRyCwEDWCQU7Tm3gotqexu%2B%2B4fLXSa1gcEZ0GkDM%2BJlVKdkPUqCec6FGsBoD%2FF4RKjxhv419UUCM7mpYz5N2Yfxxii7%2BVLRHYbaXZ1g%2F6acxLWemlGL%2F%2Bc49kby8ntsI3axXsFPXVFMSckheh4oOq4EHX8IRc%2Bar5%2BRhWyYUghACHSasABClnsxjdmFzDdOOlH2vcM9Lz3sXrzV4JNUPez3dpd%2BKCgfx0RiolopiYW7EPQhHai8%2FrBAWBKmy7sz%2Bbrb0zqZwNm3eRClh32ug9pPkRMrYehWEYG1DdaFkPstiI3RqNeKXvw7TdZ%2BoepHmLvuMDDNCBRMZwQq5tm0mrW6UW6iqW3Hvkg5C7o3SV%2BsMiIqfBsuwpBjF%2FAM8s5gJCgW8eP92nYpcvF0Jj%2Bven7hIfAUZqUYO8w%2Bd33PvBY%2BejASgaiYSln81i%2BzsP0DEPFIy%2B6Pd8X2zCtY1kadXBDQ4j%2FidNpJ%2BNGnBPUqIIb28Lt%2FJHmlersxtTnrZGMS3oC5aBKAUv6YpROROb9PbM%2B9K7QPX3Fe2xxyxJfpxJW9LxkA%2Fpwo1D5Sto8TeEhN3dAFEFjC9%2BLPOBjqkAepdajEfwBGnfrC%2B4aDrAbZdzo0HJiV%2F6WWmfc6jFhDs%2FvqI6POVcuxuIrMuRL4jJBO569OL9UR%2FqE7CS%2BMRiNXNgsJ2hry69xRAEHg2XjkHcXgMw2%2FmQwtgkSpEehYSOxXbcf%2By%2FkEmHmq4by0R%2BYyFK3HawYZemOrwxUQNZEuH0TyVCvKpy9PNJTf3nVdOkBNcdr0B59Z%2BupM%2Flaxf%2FhCbm392&X-Amz-Signature=6ecaf00377a152e6426836cb81cdadc46c5d631ebfff30ec82c235fb80290e24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKXDFE32%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHDM80t0w%2Bf159BrU0MGhR%2FsWjNKrwu7vOW%2BSRs%2BbuksAiEAzz2w7ELY5mnwwRZfWx19haDBWTSss2W9SWzPUe2Ekpgq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDMw%2FDp9Mb%2BFs9g5JOCrcA%2BVsMD9FbQR7soHeNUdkWtWhY1O47Uow7nTF6ZH%2FNgWsvGu91yBA%2FDafZnXBKnij%2BaIbQGVEXApgHag96ofhcFaFXRzYLvCl4Df75F%2BFqD4ImI1%2Bm5wfCaqXI%2FDrdYyKpmlUv3XAU9X2QkVcLxblz9n%2Bz9h3dmcPmllTCw1HwnG2cSE4Cn3BnFa5Rb9zKMZZB0l%2F%2FJpDM5kjCCrcMGjvfxbrPi2TSlziQVArflwqETmvF0h3DnJXh%2FyTnBqEzv6kw9UpflZ5XLuV%2FUVF5ebgAClRPwlSQfxrC5SHWSagMF3oNZ9HjWDW1LZZ0wAk5mR%2BXxQaX%2BL8U2%2F96r5zcE0Cam72HKtBy1FdWVkr4dih9EIswV3qUYTib0CtvCG65lry4P7Ea94jkFPPHeevuaTYeKAvMAHpTmvS2WtEi3HPBjxee2zi%2FRAfl%2FuaVsu1ja0NB69wT1xfuf%2FWET11GaBuO2A05sPLn%2B1vnrZN9WvKdB0jCZveN09DD%2BFRq4y5d3VRFsS4gTQJTgfAaE0nYeF1xoNYrC%2BS2JAuePKIDWt%2FBJjikqmhRA%2BnW%2FaaCcS0W431ekPRKnVsusOHnb0ZJXKGpDmIlx6dDcbK%2FBvy9xfQ%2ByKjeckgkS%2BiWqjoA9ScMKX5s84GOqUB5mQ%2F8sAdVavH%2F5qWzHeDbbho6TQwUUczCarcX%2FjQl%2FZ0MyQROkScq2JBGTRaMTppyJkbQd5uyOay3HIt%2BLWKAHD3byfNdzPKAnYt8z969qEsj2BINSWvJuYc%2Fc5SnMtvrbPCsKPtxzFWdxCmam7BhD1LcnFhSdI1VWO85YYlBOBGDTt4d8LsccWrNyzQGmuidCEsBo4t7dKKByKj8NTZWrucJOYD&X-Amz-Signature=4da7c871770abe22e5cd839ce84c96e63f24c2fdc92109cfc906fb63ab51792f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OKCGWV3%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBKZvOooeALLD86G2FaMY%2FqTj2RpMrPdbvsaCRhbOv%2BrAiAkdcqsOe9NC%2FPKLjkHm02bSoGQQhtSckUZVRuLYlvngSr%2FAwhUEAAaDDYzNzQyMzE4MzgwNSIMdCLkaVIe%2BlM5TgK7KtwDFOL95trQwJY2Kgmj%2FTUpqC02R4yC%2Bcts%2F8NwgE0cxo7gZUTga2PkGEaPKdDCKDw0IH4rzD6kdoh6lr8veObV1cWjiHZTTNS0k9m2%2B2RrmEw%2F9MsC6b1xoxLUPGa3rSx6Y7HcazlU5mIZ13%2BjP5vVCfe9MTPhMACzzxILGik0iMvNRwRepBzh2HrgQjCzj9cIgRdg7rBuH752tKYuPOq5ozd7eKSpFJFqeqtS31rNVZLVAdt3ika0iByEFeP%2B%2FU%2F6LYx0fAEmj5C7GE8L%2BGVXc8s%2BXpt6vAcflwAgtxtdwf74cHYvYmdfctKtoI1D5IGMi7xRgPpHP3OToys%2FFaS8%2FtZqQfbEs27iqZ7Tf5NN9RVjownDgbCxNeJsY7QwqlfT7yfVwM1llhZQWfXY932F3EpIjwvX1H%2FtA3yTEBhZWmxTcUUU8V1eb%2BUVwY7CoXbZv5arbLvip6NByP15hHlfW80Smz0JmZe%2F95CkxaM4UBllpZgBOZsnpTf8Te1G7yQmTV01vbEpGzWojsJ%2BwMU6Isy6aiE7CPMT0gvqA%2BchWBRuOcRX8HPglaaCKacZK84B7joDZ0JIMjSp8SO6BLlvY7O2nwoqqL6aLBPQUn1IX%2FaPJgTGOEL9gBhhu4cww%2FezzgY6pgE255wnxpv%2BUQV3b4kYRFxcz8%2BMmUChRaw12iikaWbv0MxLHiX9pXGqvS%2Fz3qQpmxGWZZxC8p0WXPmRyzss14idS3GbaSUDLTdfl5MTkdDvrAtWbwvsgrdzmBgOgtDvAalI9LfK1rpUVksHDLcfwoEf6ARlaUc9JjGYWcbRt5ambpGHPTXvRwl1uDaPw19Io3ucovWLkpEZB9CJZBNVFk17%2FztdWXBx&X-Amz-Signature=8a1eaadab571b1d57f48917c3d577e40d30aff029dd298c7efec2e25f50b1892&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OKCGWV3%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBKZvOooeALLD86G2FaMY%2FqTj2RpMrPdbvsaCRhbOv%2BrAiAkdcqsOe9NC%2FPKLjkHm02bSoGQQhtSckUZVRuLYlvngSr%2FAwhUEAAaDDYzNzQyMzE4MzgwNSIMdCLkaVIe%2BlM5TgK7KtwDFOL95trQwJY2Kgmj%2FTUpqC02R4yC%2Bcts%2F8NwgE0cxo7gZUTga2PkGEaPKdDCKDw0IH4rzD6kdoh6lr8veObV1cWjiHZTTNS0k9m2%2B2RrmEw%2F9MsC6b1xoxLUPGa3rSx6Y7HcazlU5mIZ13%2BjP5vVCfe9MTPhMACzzxILGik0iMvNRwRepBzh2HrgQjCzj9cIgRdg7rBuH752tKYuPOq5ozd7eKSpFJFqeqtS31rNVZLVAdt3ika0iByEFeP%2B%2FU%2F6LYx0fAEmj5C7GE8L%2BGVXc8s%2BXpt6vAcflwAgtxtdwf74cHYvYmdfctKtoI1D5IGMi7xRgPpHP3OToys%2FFaS8%2FtZqQfbEs27iqZ7Tf5NN9RVjownDgbCxNeJsY7QwqlfT7yfVwM1llhZQWfXY932F3EpIjwvX1H%2FtA3yTEBhZWmxTcUUU8V1eb%2BUVwY7CoXbZv5arbLvip6NByP15hHlfW80Smz0JmZe%2F95CkxaM4UBllpZgBOZsnpTf8Te1G7yQmTV01vbEpGzWojsJ%2BwMU6Isy6aiE7CPMT0gvqA%2BchWBRuOcRX8HPglaaCKacZK84B7joDZ0JIMjSp8SO6BLlvY7O2nwoqqL6aLBPQUn1IX%2FaPJgTGOEL9gBhhu4cww%2FezzgY6pgE255wnxpv%2BUQV3b4kYRFxcz8%2BMmUChRaw12iikaWbv0MxLHiX9pXGqvS%2Fz3qQpmxGWZZxC8p0WXPmRyzss14idS3GbaSUDLTdfl5MTkdDvrAtWbwvsgrdzmBgOgtDvAalI9LfK1rpUVksHDLcfwoEf6ARlaUc9JjGYWcbRt5ambpGHPTXvRwl1uDaPw19Io3ucovWLkpEZB9CJZBNVFk17%2FztdWXBx&X-Amz-Signature=d10a9cda34fb74e6b5f311e0c01229c6a83bbe35241de2aeaee2bedc3ab28ebb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OMZQZMX%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBCgF5enZtegVpIzF9AJivlXulAH6jzm3lzUhFDxAFpXAiEA8wQCvz%2FytV3A8DIiYITa3pnY%2FjPFObihHyyBg9%2Fc3gkq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDMyAKuOPWc2lzEpnbyrcA59qSUZoA57SyCbIRmCL9wwOCv%2BCM1lj26KhyTdtP2RLvzOa3LEO5KOVR4xFyDkPcyHiItTn8IPBzSvnmT7b11oFx83w2hGNPJh%2Fhp3FpdVOXvM7SggJg3zQRGv10apj%2FeZLbyxxvEer9%2F%2Fv6%2B3Lphwcj1ChQmB2cl%2Bc%2BhxRd9BgkJn4C8vtvYMaki%2F%2F2hbnrnny5qxUBMgk6LKPjV0xTwX2rRuXM89zpE0aM4%2BIRjskaGzgqY6r%2FtfdaMm6QM1xEfHMrz1strYySsnK54khdqOx6mq2jnF%2Fz7zKznvp88dbo9MBIoo%2B7Sth2JMQs%2B4%2FaGUM6YxDfNhRT9eMDyFhj4m2Z52Sz%2FUN9DKcum5QcsdftrC7e3GueE8kVY2GIk9dJKXMjFzJVJOd%2BeDoCotwlD15ROP960R%2FitAhpM3yO96YDC4ZXyJTlmi%2FIVgva6Zd4oNVDfBJoydnZ6Up9OUqQNVyisj9Y6LWZVzJ0HjxS7b%2FsfeX5ARnubngd5qFdZkP1AZm5BRLGCcCtzgL4pkC1YSyDFn1qINoaQFWLzf%2FP1WKer%2FIkaVUN42HqVKoLuv8z43pbX58K33u7y%2BnS4vJ%2BEwvX%2BKttAlLWizK614MeDuNDqBE8z%2B12E%2F2SksyMLn4s84GOqUBTvDq8ttfWjmDK5UxtJtJ7dtuUedYX%2FmEZHw6LnFnS7p4k7U%2BeED28jrvIWG2l5L5mr98VufMHIxWPTawo4W%2Bxa2ZkMLohJLiiRj5RPLN%2BsWrktH5GCCWmhK%2B7aQ1ZpMSPFhh6UOrPselltXl2V3AToLwFtkBsUkOlj3hQ4oq4CFQuJUmJ6Jr9P6wAsdRW%2Foac7uGrjcKzwUItaSKmmtsCduSlp53&X-Amz-Signature=7fccaf1ef875ae4e014f05911b59ea802de91de701cf01d5456296432afcb2c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJAOYAW6%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICBm9b%2BXr%2FO1buiARdEPTEkcC9MDCIVdvjXdFl8sMquQAiEA7322jm%2BA8i5PbizS68frALovFaAkfmy6lzDEjS4cwp0q%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDM3Nuh71s1ihsIt7gCrcAw8s1wu3%2BDvvxMEYFmLSJabCZUoUx2ILHbdhwtWlDmQi0DtKyG0VY3wjDcCtCXMycdNBLEK8JuoKxr5RdrAuMFzDwS8ytrJDPFH9j1xbEX4T53%2F1FYcH1rqRIjcwFlY4rvVgXYLmpEuM4D3a6KD6RI8ZCIZ5FsGIO%2BfM5jG4Gy%2By26Dc8UEjZnQjL6lssNx%2BIP%2FAX%2FCEryOzbuf4GnqwK0GeWG0j2sPUNbo%2BEe9fawb6IXBoBVqqg5M08bLlbggRVNM1it7bsVYMDQuF4fWCP%2BLnuvfpWRM1HuSSn%2FURnyIrZjaGc8ky4V6X1p0kQdijeRCdLJa1RFubu19YRBFHJyVVhzriErCDpvoOr4ttaWxyTeoPMkbyBqmnz3pV0h0FsprFNiH%2B%2BDt1Yw1LrS0zV8Ii3eC2b68N0kRYfLRtuQH9TSatOQzw8HUr9N4CtoAsvgr53kbNYP%2F6CzJyB8dts9qdmzW5nLFW4PQxUkwWbhUCYGNqkmQKHk9e38O2QtrzGKDK2oZp1XZjzPCfWLAGMM0Yl7Qi%2BsmdSkjBVm%2FjFjonT0mQWXvQtYJmP%2FITUKajrZZczcfnnKOsV2YaS9jXM%2BGOp1nvilo4kASqLyijYl9YlV8YldY6h1iRXNnqMN75s84GOqUBee62eWPESNZsNkIBiyjpto8si4EgQnt0e87L8J1p76K266qVFnlUJ14y2dyAANsVrokV3fK2ARmu30bB5yk7Zccy26FNfhNxxtjVhzcsPJYclZB16o6NbAFPPuIEwFC%2BrgukXFuvhAOLAEfRLidh2OHgyNoY7SF%2FOTitvUFZaWw7c2Ui0ERAykLH0a6xb8EkIzvtBdtuP6mZqW%2FecNZBIzW1YYEq&X-Amz-Signature=a8822377b1f1a6cca7da7a8d00a3f10cdfd1a2c410758429346c783b2cb20cb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJAOYAW6%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICBm9b%2BXr%2FO1buiARdEPTEkcC9MDCIVdvjXdFl8sMquQAiEA7322jm%2BA8i5PbizS68frALovFaAkfmy6lzDEjS4cwp0q%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDM3Nuh71s1ihsIt7gCrcAw8s1wu3%2BDvvxMEYFmLSJabCZUoUx2ILHbdhwtWlDmQi0DtKyG0VY3wjDcCtCXMycdNBLEK8JuoKxr5RdrAuMFzDwS8ytrJDPFH9j1xbEX4T53%2F1FYcH1rqRIjcwFlY4rvVgXYLmpEuM4D3a6KD6RI8ZCIZ5FsGIO%2BfM5jG4Gy%2By26Dc8UEjZnQjL6lssNx%2BIP%2FAX%2FCEryOzbuf4GnqwK0GeWG0j2sPUNbo%2BEe9fawb6IXBoBVqqg5M08bLlbggRVNM1it7bsVYMDQuF4fWCP%2BLnuvfpWRM1HuSSn%2FURnyIrZjaGc8ky4V6X1p0kQdijeRCdLJa1RFubu19YRBFHJyVVhzriErCDpvoOr4ttaWxyTeoPMkbyBqmnz3pV0h0FsprFNiH%2B%2BDt1Yw1LrS0zV8Ii3eC2b68N0kRYfLRtuQH9TSatOQzw8HUr9N4CtoAsvgr53kbNYP%2F6CzJyB8dts9qdmzW5nLFW4PQxUkwWbhUCYGNqkmQKHk9e38O2QtrzGKDK2oZp1XZjzPCfWLAGMM0Yl7Qi%2BsmdSkjBVm%2FjFjonT0mQWXvQtYJmP%2FITUKajrZZczcfnnKOsV2YaS9jXM%2BGOp1nvilo4kASqLyijYl9YlV8YldY6h1iRXNnqMN75s84GOqUBee62eWPESNZsNkIBiyjpto8si4EgQnt0e87L8J1p76K266qVFnlUJ14y2dyAANsVrokV3fK2ARmu30bB5yk7Zccy26FNfhNxxtjVhzcsPJYclZB16o6NbAFPPuIEwFC%2BrgukXFuvhAOLAEfRLidh2OHgyNoY7SF%2FOTitvUFZaWw7c2Ui0ERAykLH0a6xb8EkIzvtBdtuP6mZqW%2FecNZBIzW1YYEq&X-Amz-Signature=a8822377b1f1a6cca7da7a8d00a3f10cdfd1a2c410758429346c783b2cb20cb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466367I7WHC%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T114030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCynqPmghuJVGAm8XabKtom6YFV7q5V3kG5CLk8aF%2BXXwIhAJZ26iYxyumZAS7ypbEtmjJbi0krmYy87qdIF2OOoPPfKv8DCFQQABoMNjM3NDIzMTgzODA1Igw6vYWEHHRZ2Z02RPwq3APf16VK%2FXekrYXvCR38sHmBdMHXo%2FgbUyS%2F8GUULRrJyKBlDw0UBtWzv7vkxA09mcB91szeo%2BF0yRmCIvAAn6FnnFE172Cu9%2BXNcb%2BNdybcnGw3JBHM26AtTcaqByE9D8zjR9%2BBmdY14OygVOR2KZgB3vBYrdRNKOmfrRjqEv8oSfrLJgF5L7EvpKsvJGWJRabJh57XwNwElaY3yAZmf2cfryRm4KZ1nGVZq7X4S16promgr0BbUyuVroUCB7uf19jRmbAV%2Bl3w9UL%2BplS5CXif3XnhKANX582%2Bx6NNmYjqfHSshAQ%2FJfN0DwNqCqiriX0SItr%2BtvxbpDsjkiJBDQlN3rGz7421WAIvYlDEiuaLDKJV2%2FiF3Gh4tOYqBzt6D6EihgvWwQUzBeATV%2BWS4lokOrlWk33cuYaTofRhtycjNpI0rkhR9b2wIZMBCc2kb04s32NElP2%2B7ZxEW6QJaOj0%2FiU779s3tnSY1wW6%2BzAfuCo%2FQ97HQlm8hP%2FiJfPDJUTfmKnBpW5G%2FhbJfER345F3Q9h6kn%2FQMRTSRPGszgfNRnDwAHQXVivxjMU%2BfBKAsSbBTijaXibC5e565wV9BDcGtfVo%2BOgubL%2Fj8jzxFcTsgI0KBWUO2mhtRW25%2BTDX%2BLPOBjqkAY4wCTEywcoN5RxN8rEtODnH8gFuNr88eKkomXIiJKj%2BPmFvLk3jHX%2F579UH2jXGuHth9ZX5iEmnvqSYl4gn2LwKORHBYt5cHdLA82edErgcp3BnRI0eCGvWzT2zyaInLe%2FPg4ew%2F52BRxiOvKmV8C1h6Sr4FwRtUNd1sGSdp3ncQD9CS%2BLWgPdTCQ9OQijptwtcC2BFOEudMgDnRS%2Bf%2FtPh9yQY&X-Amz-Signature=6da7a7cf87cc535b3482636ee848b319e31ed20bcd87fbffc2290037074732cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

