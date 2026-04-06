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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRZAVEFH%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJIMEYCIQC%2FFQS%2FmM3t0SI%2FopHIjTZlI6c9iUV%2Fzm2J3Nga%2FJr9FgIhAKt9ZIPrN5i3r53SgbnwmYRciCJUgUfj7u9FO8GML09MKogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2FB4yjTGFm4JNbmpcq3ANOa193J2ut9McnQ3xyQGb2hI8EiPTR0EkCl0m4S0zUcY6uH%2BmCoe818658rt48GH5rlKaAHlB4LrtmfLA1Ed%2BnrM7T70eBMbst7wo6Z9ge%2F%2Bn30cOQThBABE%2FV419X1fNx3MYuaVQrYtIzYeLDJeAjPHX%2F8DFuWY673altHraA1UZ3IYbPwdwZlzVHRJ5iArUXyOaLaX%2BNfGzH%2FoBsewxvDE9ykgkrifvCxW%2FZXCa13B8ClFsDQsFFc5QVld0CSQc%2Bs3VQFR4J2F6FtEkqIsc2E1vmnyY6DOP840nq69Yg%2F6Q12Tlugu1M05uQLbbtTs%2FeiDQgE2KRZDHHQ6%2FS3vcvx5PI4IZ7ETGAjn5F9IJ2uOvKwxYVMOlf1nqDN14MwHLm8C2G2tLl4gRVWZ%2BuFTSMh4qWYnQG2AAECzpqSzQs3aWDr6M4sqEvyXM7rMn%2BOfiAmsd4XYEgLMPhPptdYHc7xuPK0xXqafz8OEHEgtdFaOinzfc00ve0s27UHcnxW5eEr5IAtiIRw%2FY3npoRTzOb2KTN623ApI4ND8deMvYyQ84R5XL0vMI54nTQ%2BaAg2eWjmqI4RMqjHk5Oz%2F5QPPZi3DyWPqnMnH7FUaVOQwaS%2BDzrJTy583am74xcGDCgqM%2FOBjqkAYlBC%2FIAMP1XrRdT7Y0eAGuTla%2BnDL5%2F9FVYQwqlY%2FsegLospBKqvGTDXT6a4GzBp4A8N%2FZiEQYMN0kF3VXKeFPnbH8eMhMmYr1YzvggKNJk%2BUSLjRkVgu5r2c2qDUorEtBMxCn3drawaIxtguFlYS1SmkA0v2rbJWZtjOSk%2FmmocZCLqAiTaPeci%2BZbmKdMECbKlvcmAtN8zLH3L2lnVtjA70U4&X-Amz-Signature=73d5757863a2f2ee5ad4cd8098e74d03bcc3dea7bac337a9d5022b8733ad6270&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRZAVEFH%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJIMEYCIQC%2FFQS%2FmM3t0SI%2FopHIjTZlI6c9iUV%2Fzm2J3Nga%2FJr9FgIhAKt9ZIPrN5i3r53SgbnwmYRciCJUgUfj7u9FO8GML09MKogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2FB4yjTGFm4JNbmpcq3ANOa193J2ut9McnQ3xyQGb2hI8EiPTR0EkCl0m4S0zUcY6uH%2BmCoe818658rt48GH5rlKaAHlB4LrtmfLA1Ed%2BnrM7T70eBMbst7wo6Z9ge%2F%2Bn30cOQThBABE%2FV419X1fNx3MYuaVQrYtIzYeLDJeAjPHX%2F8DFuWY673altHraA1UZ3IYbPwdwZlzVHRJ5iArUXyOaLaX%2BNfGzH%2FoBsewxvDE9ykgkrifvCxW%2FZXCa13B8ClFsDQsFFc5QVld0CSQc%2Bs3VQFR4J2F6FtEkqIsc2E1vmnyY6DOP840nq69Yg%2F6Q12Tlugu1M05uQLbbtTs%2FeiDQgE2KRZDHHQ6%2FS3vcvx5PI4IZ7ETGAjn5F9IJ2uOvKwxYVMOlf1nqDN14MwHLm8C2G2tLl4gRVWZ%2BuFTSMh4qWYnQG2AAECzpqSzQs3aWDr6M4sqEvyXM7rMn%2BOfiAmsd4XYEgLMPhPptdYHc7xuPK0xXqafz8OEHEgtdFaOinzfc00ve0s27UHcnxW5eEr5IAtiIRw%2FY3npoRTzOb2KTN623ApI4ND8deMvYyQ84R5XL0vMI54nTQ%2BaAg2eWjmqI4RMqjHk5Oz%2F5QPPZi3DyWPqnMnH7FUaVOQwaS%2BDzrJTy583am74xcGDCgqM%2FOBjqkAYlBC%2FIAMP1XrRdT7Y0eAGuTla%2BnDL5%2F9FVYQwqlY%2FsegLospBKqvGTDXT6a4GzBp4A8N%2FZiEQYMN0kF3VXKeFPnbH8eMhMmYr1YzvggKNJk%2BUSLjRkVgu5r2c2qDUorEtBMxCn3drawaIxtguFlYS1SmkA0v2rbJWZtjOSk%2FmmocZCLqAiTaPeci%2BZbmKdMECbKlvcmAtN8zLH3L2lnVtjA70U4&X-Amz-Signature=73d5757863a2f2ee5ad4cd8098e74d03bcc3dea7bac337a9d5022b8733ad6270&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663C5GV76A%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJGMEQCIFM4WZGTX%2BJ5vhyEGWiCxU8NMJfgV5KCGDDKbXa%2BZll5AiAxqUBRTxCgRAkVeTq%2BMVJ6sp%2FmZETBTUuhwgW%2BIUFGfiqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6wAsTBjZJRmmiuI4KtwDGIhCZf4OB%2BtniTYZlBf3ynmC5Corc3PvFCePgh5jJzVN4BflseUOIbKSzSu73lSd7DuUPtI5jg07Bwv9hSLwrSfDLieiEnVHXrih2aBK8pZGQD27gmoEsDNgR%2BULnjd94zaRatfTAP2YoopB6VJNl3ZZOZlhEAHC5pcNPR0cPl3J8EoCMpwi82AWPTdRlf9OIPr6VRs4YyQgwFxa%2FEgY%2B1Iznbj5%2FMGqIqYDvDjG3rnyAiV3ppAuuh0%2BwRVQolZ%2FBm%2B1AifAsSBiQSFf%2BhXgwWiWQddIXQs579R%2F6j0Zr84VcjyZ1nuAA3naFn%2Ba1JNAME97LRYG1ipfdd5knw7u2ru7M8lWtAafLhaqlDB3hsYBA%2BpZdgbGTrbxbD2eOKGDSgaXsQ0ZBNPRnKBBBKIeW5dH5RqIGto1AAffla3o9iOG9JzPwCJe5jSo5KGMb7dOPel26IZ8XZ3Xf7Rhc2Oo2luYS2yJSp0dIE1%2B9nhQEfJgxS%2BhRX3CANoqXJPOi4LSh831mS6u66kA3ZGZ7BqmH%2FX7Yt7oNk28kuB3fDhkHeLKcA%2FA5Ryk4sF4UJP5mRX2BItsrPsr52zijr8dnuFmR85XpGsrVu3HjK6PJwKxdlzspNdzZiXno%2B5JgNYwt6nPzgY6pgGWbfBOoZTZj4uB52dtMmTOODQjFtxNKRt158GWQWiKqNawkiShivp%2FHAfD7NrtJoWYVzUWcBYTtjaGrlEn8pJGvyIqNJOZRu%2Bf7vMS6ActhvOsnoUxI7Z8OKx3ZGzl0%2FmS40PdoTcROYcnpy3ZXqh6wnxpx0awsjWVtIEdrjs87U%2B9rqLZL1hPksunWU0iK9fLw8Oe8ERKDVGt9SdU03tfZIDOYt%2BA&X-Amz-Signature=833bc5bba9f42edaba65cd98b4f7f7cfdab2da46299a2c48b4e6a8a3154b7b51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6TL3JSI%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQDGLtiwoNWt20gmlaPlz9gUAbgO4rQQizob5vhYvYAVggIgK5%2BkHl0ij2mGvRv1d5YAd3crHnqqruhbcNfgREsoFdYqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOwwSDsxd7%2FhDEdtGircA8ZlS2e7WDMlV5BixFtuBNAGF8WXUl5Zxmsjoeq%2F%2BYJR40n7UeIE7nobet0Ufyz7UnanMn1ONMBTdSofaXUs40d2pW7%2FYu77bOyFhIp5h9iQvRrv9Cv6a0iNMHlNBtB95k1CEeJA9ndsdiRhf5hMumaV2B6zaIeySn7UxIzSV3jMowzmVNDV0RmCPjfOWCvonOAiR7sEIgvvkX3cg6oxSXeQGdohPWDUIqbJrWS358n%2B%2FEGXxuJvh6Pwz9dBYraL9tKIlb%2FeU%2BNVAqnxADIx2DBwS1Y8eCt%2FjqbqAkSMmHjpn2HLCI3BTsuHdAUsL1YojbWmHxK7nXQ57cGmPMlFuupqKEaNa%2FnXC1W%2FAG7dNLJYNOgL9A9MrgrhpQF1M6rTbhTj9GFMnB3Nr4nfWpQIR3O515nIa%2B0EmpzEBg4lBNFYAmM7PRnuOtz0HpqqlZ2bY2dNV%2BXyZoxxK6dpsvGJJRNtKgE8dfZ8gUV9YxIAdFa5nbMKuBN6wTtEbzeTaDyOrH8gBgpBdO0lzZrKSFIMz8pUucvGms%2BQkq0PFVP0nEAwLIU3p6t2qijmsU%2F4a7YpUyCTYx%2F0%2FvMP5k4bMpvaYCRArr2FH95EBgMKWfSMZQIT1G1T1i3s2%2B9NwSgwMPSoz84GOqUBjT5YbfFal1xxi498P7Ea%2Bqrt7OxJBJ0VFkJO%2BQpOtjKGuPJB3gqqOvNI%2F53vVeHodcechlsKp5FOy1Md7SukJutxrjM59UfDQmISh0l6lvuhBt43l0gu25Lhjy4iwGu%2Fte%2FGVoh2dmNs0r0IFQRyWqlWHCrIcyI1JItX8jAW%2FJLCux6Fyxjp2XIvYYwvME9c4QFNlQOPBik9c5IgmRvelmsqyyO3&X-Amz-Signature=1730eae31c7e13d4c02ce1470ffadfdae0085ae4933e5e876322c3f653e0f2a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6TL3JSI%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQDGLtiwoNWt20gmlaPlz9gUAbgO4rQQizob5vhYvYAVggIgK5%2BkHl0ij2mGvRv1d5YAd3crHnqqruhbcNfgREsoFdYqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOwwSDsxd7%2FhDEdtGircA8ZlS2e7WDMlV5BixFtuBNAGF8WXUl5Zxmsjoeq%2F%2BYJR40n7UeIE7nobet0Ufyz7UnanMn1ONMBTdSofaXUs40d2pW7%2FYu77bOyFhIp5h9iQvRrv9Cv6a0iNMHlNBtB95k1CEeJA9ndsdiRhf5hMumaV2B6zaIeySn7UxIzSV3jMowzmVNDV0RmCPjfOWCvonOAiR7sEIgvvkX3cg6oxSXeQGdohPWDUIqbJrWS358n%2B%2FEGXxuJvh6Pwz9dBYraL9tKIlb%2FeU%2BNVAqnxADIx2DBwS1Y8eCt%2FjqbqAkSMmHjpn2HLCI3BTsuHdAUsL1YojbWmHxK7nXQ57cGmPMlFuupqKEaNa%2FnXC1W%2FAG7dNLJYNOgL9A9MrgrhpQF1M6rTbhTj9GFMnB3Nr4nfWpQIR3O515nIa%2B0EmpzEBg4lBNFYAmM7PRnuOtz0HpqqlZ2bY2dNV%2BXyZoxxK6dpsvGJJRNtKgE8dfZ8gUV9YxIAdFa5nbMKuBN6wTtEbzeTaDyOrH8gBgpBdO0lzZrKSFIMz8pUucvGms%2BQkq0PFVP0nEAwLIU3p6t2qijmsU%2F4a7YpUyCTYx%2F0%2FvMP5k4bMpvaYCRArr2FH95EBgMKWfSMZQIT1G1T1i3s2%2B9NwSgwMPSoz84GOqUBjT5YbfFal1xxi498P7Ea%2Bqrt7OxJBJ0VFkJO%2BQpOtjKGuPJB3gqqOvNI%2F53vVeHodcechlsKp5FOy1Md7SukJutxrjM59UfDQmISh0l6lvuhBt43l0gu25Lhjy4iwGu%2Fte%2FGVoh2dmNs0r0IFQRyWqlWHCrIcyI1JItX8jAW%2FJLCux6Fyxjp2XIvYYwvME9c4QFNlQOPBik9c5IgmRvelmsqyyO3&X-Amz-Signature=89f5e24c95c3993041a031ba1ce03a3270fbad223c34e0aca245a5fee3059a14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNDNA24P%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQC7SEVo%2FUaMj0sZ67Hv5eKwftPnwotx9d39h%2FNQhQkuowIgYFwBcl5CkQC5npY43x9Uq1NeqM86jkTOr40KRUsFfWEqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOGEaFt742IIAZsUrircA1xKG3iMxTMTHnQ1jABBLNcxhRensFbfEXo3%2FSxrzqmVFKAeM%2BwpyQYuYiWMLFlxXqSzE%2BsV6wvH2cx8Cv3lvVdqElVg8Zcf8I8O9ntWESDfB5GK1m5wLxC98AScsbRF4m9Hwv2aY%2FL1e%2FVc%2FJQvD%2BeuCjfuYqhxCdMw05zHc7x%2FtfGixi3xn96zhIfq5hSYE7m%2FsQbmTrOhxBJktJti40%2Buch4SEETcOQm09fUTie5jWBJeHBN5m8Yg4JqNy1ujurJ1X59C8QwS58vUMho61YamUcCg825MTRSiX3b01qXrf12S855gY7Siw4m3jWyW%2B5fDrbBkKebKr5fZv2%2F2AShJ2C%2FzHK5btTJDbCJ4BmQ8yZs4F0Ggl%2Fd0V3i4DcYLQ%2B6GvoXQsGOj94BU3FPGRTJ%2B04JCmjZ%2BRZ%2BFdNS%2BOD5mGF6gGEDEwNGt0K1wy7bYKxd%2Fzkod6fFYWU1pXHpP2sDwHg17HJAElXc7%2FCMrBuBlXdwdAZ1QKd4YCBjR%2BAeDI1d1sBqHbBaxVGhaIzxQZ%2F2AJ2xnpvxaqH%2FIjE1PJ%2BjbNAmol4IAMICnHLZryMSAPi4WdEdnG2k5Q5B7tV%2BNMTZ3p%2FzjKPUD%2F36BOuIbF90j2T%2FdjzuFT93hAQWcMO6oz84GOqUBXn2%2BHr2k7OM2LMETBfDLqnCnaHBB11wUKsZ%2BhpPylPYMrKJ89CFvVZbuKxf0SmQ%2Bm4FCNuo4EJpig4XoihFJa2VMBVQ%2BQXPa68wxYirf0an5MXRN48TIZlGqfQSNqwBcdXWnPiY%2B%2BsgCnaa91STLfP%2Bcr%2BGfITKe%2FPTIUHL3k84kNvYHmZyno%2BxE84zQ8tP92OmAXvVxr8PIV1BGzIfKICgYjjpI&X-Amz-Signature=a0e6304f7b5ed044d4b082d025c0d9df0bd19195cebb5d4978abed692e84bae0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQO7OPJJ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJIMEYCIQDzqVod3XORS1XhmnYpqcHdrLMSZ%2BrV6cNC2ThlIvIXtwIhAKa58%2FLuOpM1ITivtkFdQeOp2bZPs7Hf%2Bi2NFPhAv5LuKogECNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxQtLkIjqwl8Pqzx5Qq3ANQipLCWro%2FxafywOXaBkXfC7tMIz4P8odwZLICXjbPnsvRyE%2BOrq%2BZQrljY%2BSVAMerxQFb%2Fm2aAqOoz6lOJFXT7brgTOEu0Nfv22AV29aaflOcf8gLTKfslZ0aVVkOeUSBRua4CEnR8qLi9pPDUIDsTJbEJSDXtxR%2FiHSsmWDvP0D0sHSf%2FPz78bzI1JqxUzcNmkAHbmzCa%2BR%2ByFMaNYngbbd7Jalr9bHDDDNzJJHoGGg4150XDA17QvQwEdo9VluIJT0WSa7axMWeXHvcWBx3THECrL09B5Gfy7lE8OzZUyJBZ4xL7NG6rBiDXeWo%2BRp3JFekdOgVCtgZzEXOXoWRkKy72ieGJrUdv7b4XlsjB6mHDEfEqGF6xvgefv5hGRHhXrAtc%2BFo6SlrrI39lLk28YaqnA%2FklFQDV4tGfQ7TjmsbiIhj8ka8V%2Bha7UF3%2F5WHqpS8J5InWc%2BUp0KK776gaf1BiASuK8RXqidt6298UgTCh2cOuLOGV8ztlXP25bVXL8svtUsYNFSMZELNdlR8uPEWEx4Skj3miUf5QtZV9jQdGLzLomFTfdTmg%2FfpLAAIoOV0O6XMwwWgGHXc6hT2%2FWtsgw6SUd3SdlCwkvzkr4COPI0DMJC4SKbHxjCLqc%2FOBjqkAek2goaKT83zSEQUYPPO4Wt5g%2BH2SJbNUpxubD1zwjAlzSZjxg6XI%2BXFs%2B8JNMIYT%2BUcgCgDGn6o7%2FeciQifnkAEPGu4JBuI%2BGbD3gg2%2Bw9kjS%2BjaY6lXkdAZGEgv4Kx1e53H8GghNm1C7csQa3q2JAcVrwGhJ2vQBQJeQd8F6ty2jfhbqqS5NNWKkvGfmnUuLbjJHI%2FW4w5vByor7DTxJPYiUIO&X-Amz-Signature=b43acad6624e23748d003a3fec59110ab01362000a07863df0e0425c08271c31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663U6MOHDN%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJGMEQCIENa2JrLrBIY0LuWINd63e8rjOea73kJ6p2B0wTW6wZuAiAaFdxEWuJy6ubDM0fZ7YclJtoRK0zL1UheRspcGx1AiiqIBAjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZC0ed0wm0HJr3sEzKtwDFgLW4WYJb25Fxg658A69HdFgjqIfwOf1SAFQW%2FA4%2FoQWvQuDRHFxAqm5CrhXlNqqSb0MJabe4LNF9pzciWgKH%2BRNE6jjE7m%2F5AYBqL6IZUlajIO6gWVadNO1ezlH2fGm8i3%2FKurvhg0NT7mCnQaZx2r0tEDFRD5iB5%2FnDEgN%2FADbsfnkJRm%2FaR4hTBiZdGG5MPilo1yMEiE2AnYhrpwM3sI%2BnDHsstSXYO0SZkCaOj%2BaC5VyPsUgxy1sy0K9ASfZN5zWWRofgmuiY1vE9v%2F4Go3Kl0PHBP9EoZA0bQoLnIjvGjv64Y1s%2FjwjqXiuplYmkOCXRMoPpjvlno0dS54vw8e9JJlOY%2BXtn2DbuZoj%2BIjYopjEamTkr%2FraTM0EkdjfQh%2FocnTlDEvJfjbTikhjI0mBaI55C%2BKgmPpzBtQqj%2FDdL3zNhxl6OmnOOHKwhoZRe92ZJhLUdDO8R66VQwESoZxdd7PAjdlc53VwbeTyjypSmJskYIuVn2CFwmMMW8Z0wgwqvPeHXfHFWKWVHhzeNRPLsXecDQ4u%2BYF63QXEIkyep7H4kNsh%2F1nnMpslYbg93icUu%2F84%2BtiD7jejamlxdJRjFJXnQGFk4UUx%2FaJ6ZFglar89urc1G%2B9EOxAw96nPzgY6pgFEpW5xwA%2BF0HzKVRfahdxQlBIijToyUxE6lrlwI4zLmzy0PsuVFLR1zO0fcYVniHaPTpr6aIR4SK0B5YfAQCzfqDPSEJK27aK4YfDWvbVpxdu22dH%2BTCQ7qYfpabi9EdQPm4FYT83HcCc7vcgQSSPU9srvHj%2BZtfTk%2Fk7D80VhJVz4UKThFm8mXRXZlh%2Bj19ThpdhULir7XjJRjauorPOBfhGrvaXm&X-Amz-Signature=1074f8f18412c9319f5704c0c92e8b47a5a1a51ea6a376c95ba35d1ba1a24269&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDJ5VMTP%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQCqXHrPA78YQF95pLvi%2Bi3OqLgEtPbF1gaM%2BnUXmJWLcwIgBAC52QY%2FqRR%2BY7ikdCTuYuZcN%2B4NFO1nIjWQPnInETMqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFr9LEAcfgCkOmq4tSrcA2DT9S%2Bl9rzDINeLbjQ435%2FyAw3BiHJWlxs%2BlO8jXBBFeZo%2FLCeVlcSPom7iFfAFAiKHOkOo5IRFDgj5pTTqxgRp81PPU3XngvRpy4Rpztjh%2B5UIiU4kS%2FC3ntmfw%2B3%2FoU7bC5NodM240v3f7IBT%2BouzlyELXiTaMl%2BB3dNfYzi5TJ8%2FJVwn172C5cf6HwmS9ud1w1nC7RkHR2SE61v2F0obXVQn4%2FPhtFwvsj2ZJQA8BtKB3EwW2zoCfxZ%2F7hz00JC1IdjKCfDBDoOfLw5jnD3dnRENGqVoBnRMPgpjzitxNOkhKpoPbnHaNGTyOZRmkPXkKVbPOM%2FSWoR%2FTsAQt2uY9d32iJDaaLDMdWGG5qEfya6iY7G3OFrsX%2FnXu597SfnJS7fx1XvKIGM%2F8urIAVVMKoEHDS0fkx26qLYIpntpjFxtXcEWJHV9WFG4VvXGV%2F0kAZQA3YOmu5rGQks9woWhx9vOcGVcJdZ3mG9WH2PTTQliHw04XBnnuVZcDdHJml4TsR%2FBizt%2F25PZXWjgdoTj0DEzk1ri%2F9fO%2FSVWgtb9gkw1oas8UoGToKbRumNRjWnF8uc97V7tXJT7DC%2BZXm5PBkD%2Frg%2BhgUFRJYQ2962Sd5Gyl3S%2FCWbFoWq0MKupz84GOqUBw%2F2yGBf8CMYg9Ko8W0%2FpJN%2FHvXGSlJPcr%2FtKnRO6pmWMp%2BhoPe%2BfAvFruhw%2B12t16%2BneSzZQ079idJYyRGsjAm6hKgIZaeNGgL%2BOo27Mgkr9K6ERQ9qUU59zW8dOmH03vrESpL2osmmPSXOw5odNcxn7h6zj3itTzlNs9HhN47YNeSJgZjworaOCXiFkwAfK3CGwYBJOAfx%2B5YHaw53SgI3s7Slp&X-Amz-Signature=486802510b8c13fa56aa60cad63e029eceb499bc7cdc3c7a6d192fec8e850f04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDJ5VMTP%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQCqXHrPA78YQF95pLvi%2Bi3OqLgEtPbF1gaM%2BnUXmJWLcwIgBAC52QY%2FqRR%2BY7ikdCTuYuZcN%2B4NFO1nIjWQPnInETMqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFr9LEAcfgCkOmq4tSrcA2DT9S%2Bl9rzDINeLbjQ435%2FyAw3BiHJWlxs%2BlO8jXBBFeZo%2FLCeVlcSPom7iFfAFAiKHOkOo5IRFDgj5pTTqxgRp81PPU3XngvRpy4Rpztjh%2B5UIiU4kS%2FC3ntmfw%2B3%2FoU7bC5NodM240v3f7IBT%2BouzlyELXiTaMl%2BB3dNfYzi5TJ8%2FJVwn172C5cf6HwmS9ud1w1nC7RkHR2SE61v2F0obXVQn4%2FPhtFwvsj2ZJQA8BtKB3EwW2zoCfxZ%2F7hz00JC1IdjKCfDBDoOfLw5jnD3dnRENGqVoBnRMPgpjzitxNOkhKpoPbnHaNGTyOZRmkPXkKVbPOM%2FSWoR%2FTsAQt2uY9d32iJDaaLDMdWGG5qEfya6iY7G3OFrsX%2FnXu597SfnJS7fx1XvKIGM%2F8urIAVVMKoEHDS0fkx26qLYIpntpjFxtXcEWJHV9WFG4VvXGV%2F0kAZQA3YOmu5rGQks9woWhx9vOcGVcJdZ3mG9WH2PTTQliHw04XBnnuVZcDdHJml4TsR%2FBizt%2F25PZXWjgdoTj0DEzk1ri%2F9fO%2FSVWgtb9gkw1oas8UoGToKbRumNRjWnF8uc97V7tXJT7DC%2BZXm5PBkD%2Frg%2BhgUFRJYQ2962Sd5Gyl3S%2FCWbFoWq0MKupz84GOqUBw%2F2yGBf8CMYg9Ko8W0%2FpJN%2FHvXGSlJPcr%2FtKnRO6pmWMp%2BhoPe%2BfAvFruhw%2B12t16%2BneSzZQ079idJYyRGsjAm6hKgIZaeNGgL%2BOo27Mgkr9K6ERQ9qUU59zW8dOmH03vrESpL2osmmPSXOw5odNcxn7h6zj3itTzlNs9HhN47YNeSJgZjworaOCXiFkwAfK3CGwYBJOAfx%2B5YHaw53SgI3s7Slp&X-Amz-Signature=b0816bbde4f5e1fd7dbff231d45270434626b87262c525bf6a7957c7c9f6ca94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHQ4HYCJ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQDrHpgCf%2FBsFkOuqUWFSQOEptvo8v%2BG%2FK2VFnZW2uD6MwIgGS6zVZJEj6gzJrYCUzXY5nJS4gT3zheU1qtV8cxfKlYqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH5TtKp9gB36PfbwFyrcAwuUOni9qZ1w5CjC1vai7WW%2BnVrf4PmXoPiO7ZPv937ElTMw%2B8pZUJq9RPqzAes8sB15tJwmsLadmEi4bBagOTypnXGhYgS3%2FeO%2B4%2Fs%2FfBWgf6H%2FkDFlIsma5BGMO8EiMvyo5m7fQRPJo%2FBNQ8%2FvXnvAkS7k7ShxjEvmnHSyi4DuqKiTDr%2Fet81VLX4bnl2OJcVSCzTxMhfhoux9%2Bbl2pfT1QreaS2yuHdXWNGLOmRre1vbF3WPWFyrOzGnubzV%2F2dT7Hz0Pa7D6oigRZ0lS3rfk1p%2FANLr3W%2BNS%2BCMbQKCWKcLosgsefd9nc6%2Fcir3gg9yCD6Gqq3XvuHxoNkuzQO6DyLcH0K6iL0owAxlvw89rtiW5C3V4gc6CpXLFEbt17zJDDuDJLujO91gcqBcRu74QGhtSMGVrsGL6hCVIX%2FwbdIT4X5mVqopcXTg%2FfIzDWOMvGVPIECOmBxFpefBwlEXGiORNmjnIeASp%2BWm8IUFOh4gkbyoDfnyUMFyqc74kZxRwPcNHI6pLzVUySFEJxngRVM8Y42yWn24nkDFJa3ErclM4kY%2B6hW%2FZpMEZvezfF46erNg223g5C1IMz45VjRKRP3SxaFU8KLizAVDch%2F3iy7tLV9%2F5cA8iepeNMP%2Boz84GOqUBJyrL2TjbzqGNqDk8N6HNTMaah39glMURf7Wf4QlVERjkeVcljXeuC5ICzeRtIItv%2FoBO5BTCypOljn703xgD4e22whItazxYO5qAueCw7AcOA2p0rd4Gv6A5m3UOz%2FA38Krl6FJVLVIUkI7V6qp%2BYPBWwSK7aDSzFSEM2VXu2s%2BTL%2FrNnuIItrvq8D7Ko0U0BLzuhTpnMu2lWhdzBeTUBfwZVdUM&X-Amz-Signature=61bacffd313dd5c39a39117878b6a3d83a9a2db8f909651316555db93b2bfedd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVFJ2PN5%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQCtFDgJfgSmVpahkrUvmkkKqTZARhFhTNQp%2BD9IT9wT3wIgCWGyvo1se%2F82qOPmAda5NLoeTRU2IST9kp8ARGABKdoqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCo0R3jFGYoicY0a0ircA63dvHIYCVBlIXvAtuzilG%2FgMdyPW8cZE2jgngPeWHRIaDTlpVFWdsBJsYtZ0NnTJn1bVQtGISeRcgIMjEU7XVC%2B3vBmDkWS9j78%2Fgb6fBxGiZBRqJbWoDphhe1dmDOYJKZT2kecM9H%2F8tntdV0ac70%2FaTACrdF3qkLdGPg2MGEHE%2FlhpY5ATg111e5fYF1y%2Fm8Lm%2B60IjsC6eAku4WrrgaTqqk%2F25lS04nyZEPia9a72S7ce%2FDN%2BT0XPoLG%2Bua4hAMZcG5CtcoCCvPcdaCCq0E%2FFAyDJ5CTrFajeO6opur1kF8bOBf1TbAPnof75AcfxaHtEo6WUGqS%2BkzfxRT6H%2BoSH42K9SXkWtIL4JZsraUfmdRENKZtAbUQHU1yuwPor04ntuoqPYjWza5YC37foYOhIm6BTS%2B2%2B8bhgHSTwuvz5hpQggJd5KeqYRQj3NmE40WAB7lOlHw4W65sHJVnwGjBAL1LM5pRsAuIduP3jzx87oiEN%2FvNGBDN0i2HVdiKh0XPzyHgJi3YfmMDj2QXKG9pyFYdNsJu0p2LDdQ12CGi5H8SOJ93erL5yk1EuVA3ssPpJaJXbhnG2r4krx%2Biqn7G4FSY4Dd18YPf2HQL5qZpitQuzXXqJh7qPPsnMNWpz84GOqUBgQV18qWm4eH0qSTPahuo94Qb26yX1M8VB2ugkUSycOxqqLQaaEiSBwl7uWMl%2FPZgv4dS2DkXzOrrDrDbiNr5ELyJ8FOkLB3654ulAe%2FcAkxyT8hP9b8gsvt6EF%2BXctq2ywQfMR3b%2BE3Hf3w8r3WEF%2B7pjTmHNZTt7LNkHzdqRlk9NSmwi97UTZLBkOSj1J%2F97bWxA2TOIz61g0ZGkshJuyoiYdvA&X-Amz-Signature=011f2897c26558a351ed104942c70ea14b280684ef81072441f5bccd5a1fb860&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVFJ2PN5%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIQCtFDgJfgSmVpahkrUvmkkKqTZARhFhTNQp%2BD9IT9wT3wIgCWGyvo1se%2F82qOPmAda5NLoeTRU2IST9kp8ARGABKdoqiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCo0R3jFGYoicY0a0ircA63dvHIYCVBlIXvAtuzilG%2FgMdyPW8cZE2jgngPeWHRIaDTlpVFWdsBJsYtZ0NnTJn1bVQtGISeRcgIMjEU7XVC%2B3vBmDkWS9j78%2Fgb6fBxGiZBRqJbWoDphhe1dmDOYJKZT2kecM9H%2F8tntdV0ac70%2FaTACrdF3qkLdGPg2MGEHE%2FlhpY5ATg111e5fYF1y%2Fm8Lm%2B60IjsC6eAku4WrrgaTqqk%2F25lS04nyZEPia9a72S7ce%2FDN%2BT0XPoLG%2Bua4hAMZcG5CtcoCCvPcdaCCq0E%2FFAyDJ5CTrFajeO6opur1kF8bOBf1TbAPnof75AcfxaHtEo6WUGqS%2BkzfxRT6H%2BoSH42K9SXkWtIL4JZsraUfmdRENKZtAbUQHU1yuwPor04ntuoqPYjWza5YC37foYOhIm6BTS%2B2%2B8bhgHSTwuvz5hpQggJd5KeqYRQj3NmE40WAB7lOlHw4W65sHJVnwGjBAL1LM5pRsAuIduP3jzx87oiEN%2FvNGBDN0i2HVdiKh0XPzyHgJi3YfmMDj2QXKG9pyFYdNsJu0p2LDdQ12CGi5H8SOJ93erL5yk1EuVA3ssPpJaJXbhnG2r4krx%2Biqn7G4FSY4Dd18YPf2HQL5qZpitQuzXXqJh7qPPsnMNWpz84GOqUBgQV18qWm4eH0qSTPahuo94Qb26yX1M8VB2ugkUSycOxqqLQaaEiSBwl7uWMl%2FPZgv4dS2DkXzOrrDrDbiNr5ELyJ8FOkLB3654ulAe%2FcAkxyT8hP9b8gsvt6EF%2BXctq2ywQfMR3b%2BE3Hf3w8r3WEF%2B7pjTmHNZTt7LNkHzdqRlk9NSmwi97UTZLBkOSj1J%2F97bWxA2TOIz61g0ZGkshJuyoiYdvA&X-Amz-Signature=011f2897c26558a351ed104942c70ea14b280684ef81072441f5bccd5a1fb860&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJ4IPOKS%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T163250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAgaCXVzLXdlc3QtMiJHMEUCIFL2iZxTAk9kPBeZEdaPG%2BxtNsdUXB4wno7Oo7QKsWNeAiEAs%2BEP9WUWIvmWZ2PpfJe5Jr%2Bi8MKwqt6J8P13e3z9WX4qiAQI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCe9P2ezQL2kzwuyWircA68iUVx9zoFpC%2FOYXwzUQLH9%2FLUYJrCv4rGl5AjHVYJxEUFtZRNvC1HLfZ9aUS3CWYSlBp1vHnZtPnSAdx4KtG0kECMerBJegHW4zpI2sJw55rKFg14O5YYJPnLPmZB619eqoNTI5srgo15oMPlgn3Z%2F4NV7A660CEKYTRIj5BCrQ6rT%2FSgTL2KeBY8d9bsWNZznh%2BEK%2B%2FS3NdD8E52%2BcZLdbSSZTDI4eiVRshrbgm6ymqu2GTzuHy5MPe9hfjBtgkV%2FaIV1XTuwqFuou1mGwHBog88FNSKYxa1ZxjES%2FPFaogfHMDdD3bjhrGc8u%2FtNny8HQGrDsJNwGS1WnAzcuMC5NTaSKF4%2BUREep1jeU%2F1H1W6Hui1wXhDRaFbXSUaHloflNlbqjDuAuB9k6%2FPAjKd3lFBmnJRhiIfpMSmkSLsnXV2SwQc5LJ6Kbdm8IGk1CnuHrUFKR915rHIWw%2BzERFhlRMm74EODZq0LvmDs3r5QVPHjuGmmUwe%2Fmy7XcayGuSLSL8m8kM9HacC6%2BJTv%2B42tOM8CSSXBWjjEuNI41%2Fn0%2BtGo7Z%2FtJ7ebx31HKl%2F8wWdSbwNR40cH%2FsbJEZkX%2BOSCO2Y51VBV7tT%2BPjPhV3FJs13ZUHrBtYudtPd7MOypz84GOqUBjg4L1Dww4h8Zw6liOBfRL1qRC8X05boMR4q2z0MZ9ZAHlNx81qvRlUkm3UEnMAxR2SA%2Fi0m4XRCYMaTUsqfWGFaLVAb5vPVkLLQq70OA1Wdx7ARM93pfFqKzkJX%2BDxtuBo8pYF1l1uKQod55tCAXaB15%2FsaNyOhiEapKjwVLlTFlXv%2FcRL8CsIZR%2BmfkLI4E385XhD0%2Btdyp%2FOx%2BmqtnH7UYJbWF&X-Amz-Signature=34610ef7f6bba0226d06265f024173490bae42e85d210c8e71a1befb49e21521&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

