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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665Q4OZMLL%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCICROPhvq7vtl6zJH1JjZptU0xnFLE0HfWQ0Dj1cr9D7%2FAiAxMo7%2BIBLTPDsBVq5Kibp9nWrX2%2FDpHQof%2BTwBiqLtUir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMFT6apddVxTaMA0TlKtwDJwdRHqnWB5GuuyG2vynqIBJZIc269Sc3lmTbtdWeS%2Bxbg2kVSU0iz38B6uIreCCuTL7W6vHpX%2Fmg0VQUJfhZNVr3R3msxH6OJAnve9pgoKMmOnvoeWE3pi9tcd9LtybnZM%2Bao9ACRNzk8hJcqHg7NSF%2B0zeFuCsV6jRoOtUXHylRKwFEyu0xnWkWvMzmTFjsGQdnElbwW5mWLkjTievahtn9Hz2zfyuv%2B3qqsUO1%2BOWieGg3sdsYKPITVCK2FMlLccXEjBN8GhUxY9yAO3UWwNTULbRCHWWm6eEeSVinkGY9DyOg%2FKVjgeKc1e%2BqPGtmjW7yn6d%2BbPZX1ExPPAiKLtRMPVeIoKLeoApzqKwROpEwEGnF%2BGs95%2BtUq7pmopS638CBoJ5UROhUSGufUCmjwRLybAneIgU2Q1Qi9r865zFVeQBFPN261fM5Q1CBH6Ea4x8tKibQGlpbv%2FgLj6t1j05PAeeUR07m7tdbfE0NGIhxoANgk9YdaVbnuEsLoA8hV3dchcRyhzVar3G%2BdKiiJ4zXXH51WqLX4xHz9q2EJ8eIhi0rZR1b7EfmfkPM2jO%2Bt1Ll7hLc2ufscCUlhDeqZdzusHaP97gi1vhDRzJ%2B1SWUf11LXbz6IKzh4%2FowxN2kywY6pgFgC3mOyBrXIXe8%2F5q4UwJXbXAfiNRmN1cFQ8DHuY9CqR7ZJei8AwAn%2FuQ%2Fp8AsCAeSAHq0jFys0dtWvN6q7QgJLX1EXko6ZBmTGD%2BZDcQxoa9WivTj%2Fj8AzyyvGMd8ols9henSmspYBExXiRhINNdhG%2F7isBJBvdhg9%2BZMhye8v6qS2taga5hSEs%2FJGDDzrdIjoF%2BPMAFAKSkyY7gOoza2b4moEHaN&X-Amz-Signature=b7605a569718720b54f5bc9a7a368cb0beacf5d123f440a37cb9b50d4830e5d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665Q4OZMLL%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCICROPhvq7vtl6zJH1JjZptU0xnFLE0HfWQ0Dj1cr9D7%2FAiAxMo7%2BIBLTPDsBVq5Kibp9nWrX2%2FDpHQof%2BTwBiqLtUir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMFT6apddVxTaMA0TlKtwDJwdRHqnWB5GuuyG2vynqIBJZIc269Sc3lmTbtdWeS%2Bxbg2kVSU0iz38B6uIreCCuTL7W6vHpX%2Fmg0VQUJfhZNVr3R3msxH6OJAnve9pgoKMmOnvoeWE3pi9tcd9LtybnZM%2Bao9ACRNzk8hJcqHg7NSF%2B0zeFuCsV6jRoOtUXHylRKwFEyu0xnWkWvMzmTFjsGQdnElbwW5mWLkjTievahtn9Hz2zfyuv%2B3qqsUO1%2BOWieGg3sdsYKPITVCK2FMlLccXEjBN8GhUxY9yAO3UWwNTULbRCHWWm6eEeSVinkGY9DyOg%2FKVjgeKc1e%2BqPGtmjW7yn6d%2BbPZX1ExPPAiKLtRMPVeIoKLeoApzqKwROpEwEGnF%2BGs95%2BtUq7pmopS638CBoJ5UROhUSGufUCmjwRLybAneIgU2Q1Qi9r865zFVeQBFPN261fM5Q1CBH6Ea4x8tKibQGlpbv%2FgLj6t1j05PAeeUR07m7tdbfE0NGIhxoANgk9YdaVbnuEsLoA8hV3dchcRyhzVar3G%2BdKiiJ4zXXH51WqLX4xHz9q2EJ8eIhi0rZR1b7EfmfkPM2jO%2Bt1Ll7hLc2ufscCUlhDeqZdzusHaP97gi1vhDRzJ%2B1SWUf11LXbz6IKzh4%2FowxN2kywY6pgFgC3mOyBrXIXe8%2F5q4UwJXbXAfiNRmN1cFQ8DHuY9CqR7ZJei8AwAn%2FuQ%2Fp8AsCAeSAHq0jFys0dtWvN6q7QgJLX1EXko6ZBmTGD%2BZDcQxoa9WivTj%2Fj8AzyyvGMd8ols9henSmspYBExXiRhINNdhG%2F7isBJBvdhg9%2BZMhye8v6qS2taga5hSEs%2FJGDDzrdIjoF%2BPMAFAKSkyY7gOoza2b4moEHaN&X-Amz-Signature=b7605a569718720b54f5bc9a7a368cb0beacf5d123f440a37cb9b50d4830e5d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWWMCP62%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIAK7dY4iCPDrKk2Jn3EMfEMyCZdw5Ebefc4ZryX%2BjzfKAiB9u92j9FgP5o2P%2BPTOXXwsldkwf5DF6rrhv6BKBPYFCCr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMTEhynMwQetMIH2LBKtwD%2FDC4jwXKcd6uipMRxpzxFzzdSJ%2FcHYVs3CxvhhB8C%2FPSxD39V29BcPamygzHUpSIcnwzwcQbzuFmDfJjqIi7wFKxCz1DTaMLLUS%2Fwvt%2F%2FPPhNbJ4rjK2fYcCqPJofM3Crb3gj5eF4cZw0FJNDCir2GgZf97fEeXrdxd%2BK0aY3pyMuv5xCtTi%2BYLeozSXpS9fQLG2y8ZHuGDi3cEzkfLzRvsut8qkDuK05kUHQUx8z%2FpBFTI%2BSKg%2BXivJdre098rv8EZN9sgJ8Q6xQnQxKHCEh9fiHURiwlOjIev5LEeU6dxwJas5rK3zDmmg14g%2BPKoRFwvUdInWiKfCXHRng5m237GB%2BBd2VOoxK0VcTXfzJRL%2B0bt69i%2BSmL4YwMCjkrymI4N5cSFz9HtDekJGm6t7xu217OxvTax%2FOMjd%2FOiUiB8UgKYO5mxbc5eMW121BNeDtHthCRGBVn9k%2FYtvPwSU96WkKn79tq0%2BQO2x80glyJ%2F%2BKJHlCasiAPQo7MeMU4uzweVyRDA%2BdHf3jLOfRLEP0F64bccKrz1TagCSUM%2BsBN0Msu4xW2lVrZX9ye%2FQi6F0q2GcrYd1nuvaGLs8D7eiEwYL5FvJRqGJ8epphbhIEBSw%2Bl%2BSSUmQnGbV9pQw2NykywY6pgHODT%2BOhnP5LT2Mx%2FcGu52dbiIsOdoNBpXCIJvtjXn897cSkzUfrkyGYkoAmWE1CuxwZGC89nDZ%2FlhdVrFiYvd5Xvxevbbi2Dcj3eKFk%2FcGcJKaPVTS%2F2C2R7HjU%2FHG%2FJr4ZSEPTBI2FZ8UHKETloy7eE2kikCx6WVb0tVSRsEgp%2Bj1ptSPjDYiLPUJ79tomXfxPHta4Crcrg1hS1TSrcpECobzmbjD&X-Amz-Signature=7b54d42aa0af35111c3f7f6ac4de919618d6371a7dc6ba4acfab5d74e95c01fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ETO4L2B%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIHdwxkTRP9do%2BiJdcnqgXkNHTDwFTzGcwWjYnzeHTxS9AiBCpK8a%2FMj6Ytsm%2FJKsp6Yw5M99lDZa%2Bj2a36n%2FotHnGir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMDforbJmYqO%2BJyWwfKtwDhTfmMKIrTPBQPbBhAilv6tFdD7zUDnL%2BtDmaiyECO%2BTnwpJAmPOC7EGMC0apIvMUlqCr%2F%2BuJv237zzDPQ%2B9cSgy7eOGepSLAqtOvoDqnV8B%2FrPGNYBFygAtdqvxmEAGqe4pGF%2FsDYUAfiBq19zo64j2hNzJVzARLGgDll6J4%2FfraRTFQC3hA6u%2B489VkLzaHXWKKtx1dX1UYaqiN2GVOB6db8rMFxY03Ta2if1GoM0jHFBEHdi%2FOyvA9Rp2pS2vHQBRQ6vVMGPgelABh%2FUy2o6ID9Qvu8aOO%2Bej%2FRLc9legR7Rjfno8r41q%2BDpvUk8uo4XhM%2B3G2VHbR6Go9aGc%2B5k4F2pK6DVrjd6VIzDGH1CS9ZKWdfvTFU0J3qURcU16ZPeSvLevGAHx1eJJMYuwIDy205euhTYXto9XIhH5iv08OV%2B989ekjrm1R%2F76kCYIxqT7FRYvBvm284ooxWjJIRVSLp%2B15VLgF9ZNJLLMeJWPXoMLkFR%2FBn9EXnJNqQPHPbzHdirfNIO%2BFKkwxkjEQiaRZosU3jrbbnfCN%2BrJ9jUJN4IN0V%2FHN0mSdAafd0kjuMsxQEISFnbTO5aZdpS5s1AWjxh42fZXqcmjTWjpkI8OwYN5h78RfPdIy90Qwot2kywY6pgHrnRSEvqG6fENB9jigBXpDfCxWvwkPsmpqWJNw3jjFl2RdFGxCrVTIZU2RwpwKgHh%2FAGV%2BiaXE2YNjWqNXKvXnBaIdbCCeBZX5v7tRXluOGWN8S3yQMYmLAlhSgQ1pdBi2IFvWjG8L60Kf8AH6DeIPZanJ9mlrnE4PA%2FSDgcMyDSbU1sH2AFnM8i5bZCe2mQHqsP3rcMlWqSGGvwFPmtvzfOOSsy11&X-Amz-Signature=02f977b007bf27ee2bcef5d7d3d66c7549e1bebd08c3e7761b184a248f285180&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ETO4L2B%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIHdwxkTRP9do%2BiJdcnqgXkNHTDwFTzGcwWjYnzeHTxS9AiBCpK8a%2FMj6Ytsm%2FJKsp6Yw5M99lDZa%2Bj2a36n%2FotHnGir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMDforbJmYqO%2BJyWwfKtwDhTfmMKIrTPBQPbBhAilv6tFdD7zUDnL%2BtDmaiyECO%2BTnwpJAmPOC7EGMC0apIvMUlqCr%2F%2BuJv237zzDPQ%2B9cSgy7eOGepSLAqtOvoDqnV8B%2FrPGNYBFygAtdqvxmEAGqe4pGF%2FsDYUAfiBq19zo64j2hNzJVzARLGgDll6J4%2FfraRTFQC3hA6u%2B489VkLzaHXWKKtx1dX1UYaqiN2GVOB6db8rMFxY03Ta2if1GoM0jHFBEHdi%2FOyvA9Rp2pS2vHQBRQ6vVMGPgelABh%2FUy2o6ID9Qvu8aOO%2Bej%2FRLc9legR7Rjfno8r41q%2BDpvUk8uo4XhM%2B3G2VHbR6Go9aGc%2B5k4F2pK6DVrjd6VIzDGH1CS9ZKWdfvTFU0J3qURcU16ZPeSvLevGAHx1eJJMYuwIDy205euhTYXto9XIhH5iv08OV%2B989ekjrm1R%2F76kCYIxqT7FRYvBvm284ooxWjJIRVSLp%2B15VLgF9ZNJLLMeJWPXoMLkFR%2FBn9EXnJNqQPHPbzHdirfNIO%2BFKkwxkjEQiaRZosU3jrbbnfCN%2BrJ9jUJN4IN0V%2FHN0mSdAafd0kjuMsxQEISFnbTO5aZdpS5s1AWjxh42fZXqcmjTWjpkI8OwYN5h78RfPdIy90Qwot2kywY6pgHrnRSEvqG6fENB9jigBXpDfCxWvwkPsmpqWJNw3jjFl2RdFGxCrVTIZU2RwpwKgHh%2FAGV%2BiaXE2YNjWqNXKvXnBaIdbCCeBZX5v7tRXluOGWN8S3yQMYmLAlhSgQ1pdBi2IFvWjG8L60Kf8AH6DeIPZanJ9mlrnE4PA%2FSDgcMyDSbU1sH2AFnM8i5bZCe2mQHqsP3rcMlWqSGGvwFPmtvzfOOSsy11&X-Amz-Signature=4bcf04664579435fcd794ac659dcbf39b72b8cc5a1c1dc8c0bac5d1f9227db26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEA635GK%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIGnjqv7ktIE9WK9BL%2BjXvEsuUspYjLCrPRsZN89PkW2dAiEAlq2N%2F1bbcyxZUJpkR4w9vuTxxBVrCUoSsbNP5weagqAq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDNO6U4Q9MA9fuxwDICrcA7dKxp8QIkatpYoBtAAav5DWpofhJHl91C1jbGSrfoYEb74DEvToFtlClWuyi%2FfYjGm5k7iEcFA4CiIze2dwAlSsILS%2FDkgHLcA28hUODIZquOAJvUpZALN%2F32hPqb%2B63W%2FYQKgGL2JB5mHvLLby8JisT0%2FYPyFsLgpMm3DfHnvNA4TngL%2FaIFhiku4F51dTagnGwaxJP9ffX0zjvDcKIcH79BFPf%2FEUHtyrquzp4vkBJqetECtc1PaFoMEePNVtnnYYzJfPFEdS0IHQrmv4t2qP4qr%2FYYLvCjl%2B6JDWEx24S6ElcBKEdQ7nQb75mRtDytFzm97Stf1Qitcj3Cb%2Bauo1W3E4pUn2glSTkoHW3FIcrt%2FalSB6GG3xD2iKK%2BLjHapLfItMQgqHUTImdB4Qerpebj84MgHyaPiTrU5gTiP6ZTC%2FGOLvf7xJttfRNHEbHbmIQAdMaH95k0gq7ZBjfS1Cnc204suMxOcCG9bkPnWP%2F%2BdSOXl80GbnfOAEooZOC9Z%2FRr8JcbvIB4zR3uVRKyxmdU%2BkXXCbik%2FwP4pfkyiyM%2F8wBHixG%2BGLnygX8fVkMT8sF%2F6d36XncOu%2BVoomHqZ2xBq8l6vhmpnmrOKKYiCa21P86ZgvxFEt1XRUMOPcpMsGOqUBDjtMn%2Bovvi%2BTnWfJCgPXVU50yVucyi4Yz4mtUfy%2BDMo9v1XUvenkSMRpLf7Ob1fImvRC71mTIZzLODyf9ZJoZ6XLrKpbVhUaU8UsMbE5x5zSk4%2FXE4wnSSHb1Bmq%2Fc6cvjFMRz2O%2BcTJerQAAHMMWuLvkz8G3vxWm%2Fui27VIQmhZJksKdf6bmfSmdRvJaXhaxKxCjQhWpKVplnHlocdJEZBicYte&X-Amz-Signature=376a686099fd817f922cf0370c3cda3fe677c3bd420316b00c01ba38c2703447&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVYC72GU%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCICywVOL%2BtMoz77oEAsQm%2FIxqIgNvpgWyo6Q4ASLgFEZOAiEAiwkL0KbaGR1e7WJBYgfnYY7ZnLXNuwi8OnNPT%2FFJT4cq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDAoIX0IqnurhRz9FbSrcA8uPAe5T%2FD4OPmdmz4lJOAfxfOwf0tj6WuDeYMlk%2FIqmQu2px9yJC5WBI6A3XZVFTEZ329HQmJ32LbOenWdvaca6AgiO0OQ1nbhqmp5V5mETlvOL25JWm4Sk7hzH4EbyVLkPxBmLW8JgVmnnFehkvLx71AhZkDok7z1FOtPydq2L1tVIDqCoJxXtcLl2kI0SG3X1%2F9D0YCnO4dSHAgSJ96SR9yqwwwpJLwscsiYeC1jbVfrhW1u23bJ8iRXVq25FdD0wNt%2Bz2gfeLg5QKWE7MfUIpmOP5t7yUlt0qatnMk6pFpz6UO5bow0j6yPzsqJgdcfVjlac37RKZvk4UdTLx18ci%2FJq%2FdBEwPZLsXs5ri7JoYtx2ZhpY%2B7Rv6%2BWQmCrlP7xwj80ZoWqMvlcaWuN2OgS%2B8OmGqVCQGVyn7lh3qO1YDfvoKjDnQ%2BYDsFGBSWpGXCP18To0tPalAHKeqCVpJKrRriMjH8von7hXHMoRBEIrBdlSuLe2yX72If0uSPbHy5KKlzJHc%2BqShQ9Ftn9qGBG248gbtXovbPJru%2FpNN3Au%2F1MHfGeJ6UxqKsTLsjdrgq8EAAdsXYTj%2FiKGG%2BK%2Fh%2BFGgxqjjXhL4o35g4KBMXXaNx3YOLA%2FSDCGJUHMIzdpMsGOqUBFhYZHtSAET8X3GB8atazDECyRCJsHFiy7L0qtE8kVtl96fqXz3joA1pc1u%2BXMRGbfmiaGhH8Uq5FzvXVUZZMAqLRdCJDVUpWvyTuTCoe8Z6q1R2TlCm4OPIdngYkeM7vXHGMFhowNVQosUQke1gzYpK7Lh530XqKPe7HBVVfGFhVCwFwHpLASfLj9dRbqOSqUY5IWzELFRIKP7hZkvO%2B7eTUAOU3&X-Amz-Signature=d96cb001f2bc75a1b75d1e463203c8aab2b33b87eb6098fcc52e26ae72383da5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667675KYSA%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIHdZhum%2FG4Gq4pgHQhix7Yhgr%2B2RMAoVUQPQtw2ko70%2FAiBqnJrK%2FB4ZBd%2FwpCg%2BHMJGXlbRLen6wlpf57ul99WBsCr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMYhZ%2BPxfFekhj4DMRKtwDsEDnzRL8%2B2FGFa%2BUnSQM250iHDB7JECv5N6UsHGGmZgYkf1qWq9hS1mfG7i1LbvjG%2BWzGTKRwBqq5WWaGSTgOcPTD18tftyW%2BOU7tC7pnhbY0T9uxXQ0%2Ba%2Bml1Yp9u86VRE9NWfr2agNmzcP66M%2BZ08doe5pNtlcEvEsSs%2FasHtCsdEtAcCRJMGBsANBXO%2Bqh%2BsOV2bdim5xBGlYeKeNcwZL5OxKMUPu14TLK71OTXrXQNzvtVm7BvtDCguM822yIeSapO%2BXztPnJFbi%2B92Ss3ZhkxjlFCjyUAllT0H75D4hddfn09Vl7y50ItAVhgJc1WI0jMhzjSG80EZnPgJr3wthJcPF7sG2PDr9guEurUILilrRhSIfWLyzmmh9QoOuRfWjH0A%2BYkrqMbOHY1Z0YdAy2lRLv6d9J%2FlEjmXhFbFy6VtIpfTBOCfVj2K8c1f2Z%2BqS3a5pyu3YIcNt8BnzB8Psa7eJTKWqQyR%2Br%2Fr215zHMUaTp33Q3rQ0N%2FrsCGK4S3G0HVJcxQfBJa9%2B%2ByavOPoWmQrE0KAKrzlwTf7vbPSpL50eoLKsRhUdtnyHz8M%2Fbhar%2BWm9WBlp492m32BXEDZ0sZjdwuWxKYO%2F4DALsJIlAa5HMQjV7ScNucgwxdykywY6pgFfvp%2BCY%2Fc0pM6FKq9wVmCKxLi19e%2FZOTB%2BAZCp6WatsxvyaeDfvy%2Fok7YYxgNPCKRhMUUQc3KxzhYeLZsPM0QrjuDYJOf8%2BEm%2FKUnKgGrgOkwzwL%2F3sB83ied8%2FRoLYtrm9H6RQGjoHJiHN691IziuVRJAIT2gqo%2BJjVpw7Ghy5ZAtIRbC3aQGcWqS13c32ksmqKbGLdWXmOPT7COCJE1j9ALgA9XT&X-Amz-Signature=642e0f989fc76942472e8a7ab53afff26e22c71ef2ad69e24ea962e974e1695a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643F5PGR4%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQC4XlIh4FMK0VX9dHbNR73%2B2uKN%2BnKmQKLv%2BXzSVNE2igIhALHG2ZqsjFhHVNo5poIBSAs3ARoSuu1GeBdnIbwZvKpkKv8DCDsQABoMNjM3NDIzMTgzODA1Igy6kxDv%2FAVwysEmX44q3AN78ChIH7YJmo7IFMljxm5qxZKrYMQ3cnyK3v87dyBPbj96XQW6bkt1jS4dY2HOaKZ5VF0zExVaN3QgFBZuC0sjwkgy9%2F0pyQg461841iBp2p3mkWh4%2FeYx7bHZgAtC5%2B4LGZ%2FLsUag%2FyIBvye8XbfXn0l%2FHC61V7B8avvVYYLf%2Btan5aFhdgj22W7sBnHQSduPGc8Bp1ZqHHKdWgbaldCVEFO3ACipkhVnsKce3EQYIHaAb7sxeCcDbDeRmKiTog%2FdIY3ewu1XfmLrvmpKEkHgpTpdMBQktbfqdAKAZQdRqvQKZVWT%2Fig4bq0ysvZJNqWvSQKoarm1ByjF3HRlJwJvr7MZUellSY4vXBOyh0isCI00FNSk2o0NEEhW3e4GKoztR0PljPmkg0uHiPeYN9M2ryPJKeoWoa4NXbZBoxoxzEJVpY1pJQictIRQVThx%2F8mQiCKvQSTghspZ6es4wMUPTSQteD5ZWfDSRx22EzFyVhHdHKynI8L14RmjV0aNWhEcJsIoJeBVVhvXJ60bNa0mdkTLZWzfNBs2rzhKaiup1s5EkocZypBYOTVVOyYox%2BnTC6GVOqC4%2B5n4QqR4%2B4HCewBbRioM8%2FXxIs7E6N62nvYCBAL31yWetMcvvTCO3aTLBjqkAbxfA5U%2BAqED3clzptSVXlgwde9Qh0rK7stuGMdIPXKBRkloNu0RXudLLGj3d8qoJ52X%2FA9xu2tCGdIgxde2zEfRkOf%2BOqMNd43HjpkXGyTdSU0oO1rHH%2FcUAtpuJAyuBdw6k753FAJGhHIEBqtEh1WQYHA6P92yYSIVUNnddKgOL%2FqLOkYqru8dalJeKL6uz4hXTwQCQDE2K2GXmdpOxc5d6Jvw&X-Amz-Signature=a54cd4d5c14ed525f8f2ea3e2fce27fed5c96370a3df97000cea64c999e6efa9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643F5PGR4%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQC4XlIh4FMK0VX9dHbNR73%2B2uKN%2BnKmQKLv%2BXzSVNE2igIhALHG2ZqsjFhHVNo5poIBSAs3ARoSuu1GeBdnIbwZvKpkKv8DCDsQABoMNjM3NDIzMTgzODA1Igy6kxDv%2FAVwysEmX44q3AN78ChIH7YJmo7IFMljxm5qxZKrYMQ3cnyK3v87dyBPbj96XQW6bkt1jS4dY2HOaKZ5VF0zExVaN3QgFBZuC0sjwkgy9%2F0pyQg461841iBp2p3mkWh4%2FeYx7bHZgAtC5%2B4LGZ%2FLsUag%2FyIBvye8XbfXn0l%2FHC61V7B8avvVYYLf%2Btan5aFhdgj22W7sBnHQSduPGc8Bp1ZqHHKdWgbaldCVEFO3ACipkhVnsKce3EQYIHaAb7sxeCcDbDeRmKiTog%2FdIY3ewu1XfmLrvmpKEkHgpTpdMBQktbfqdAKAZQdRqvQKZVWT%2Fig4bq0ysvZJNqWvSQKoarm1ByjF3HRlJwJvr7MZUellSY4vXBOyh0isCI00FNSk2o0NEEhW3e4GKoztR0PljPmkg0uHiPeYN9M2ryPJKeoWoa4NXbZBoxoxzEJVpY1pJQictIRQVThx%2F8mQiCKvQSTghspZ6es4wMUPTSQteD5ZWfDSRx22EzFyVhHdHKynI8L14RmjV0aNWhEcJsIoJeBVVhvXJ60bNa0mdkTLZWzfNBs2rzhKaiup1s5EkocZypBYOTVVOyYox%2BnTC6GVOqC4%2B5n4QqR4%2B4HCewBbRioM8%2FXxIs7E6N62nvYCBAL31yWetMcvvTCO3aTLBjqkAbxfA5U%2BAqED3clzptSVXlgwde9Qh0rK7stuGMdIPXKBRkloNu0RXudLLGj3d8qoJ52X%2FA9xu2tCGdIgxde2zEfRkOf%2BOqMNd43HjpkXGyTdSU0oO1rHH%2FcUAtpuJAyuBdw6k753FAJGhHIEBqtEh1WQYHA6P92yYSIVUNnddKgOL%2FqLOkYqru8dalJeKL6uz4hXTwQCQDE2K2GXmdpOxc5d6Jvw&X-Amz-Signature=a6273ef7f4529698ff296a90fa2c91a5992a754e21c4002a868cdaf4fd56ac26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676ITWZQD%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDZB4h6ERakWKLS5DN3EUZ8f7iO80Er07hTpTvezzfNIAIhAPHwwXtJ%2FfCjxCyXAOdY%2FXOCL6IDvCCpTqeJvsEZ6nYzKv8DCDsQABoMNjM3NDIzMTgzODA1IgxC2XTqdP1XF%2FV%2Fztwq3APiO2iVJ3DIliDVkOhFMN5ZYpjUs4oFFt0op6hwD27GZhtyYsWVGfGTU530bk%2FaJXJA%2BVpW8qSR9X5WP61O%2BVwhmm3soLMJE8AKA3HwxrdmJlNST4DvswrgPgenohXZxbzzGma05LzP387jXY%2Ba%2FP7bhjNBWAyjGxZNqXcOyG2wIVRVZBvuzUw3%2BN2aw%2FO%2Bp3eFXIWHXqY0T%2BZjvK2KB2H67ILhoiKTCaKjn4UCCdUqzcHmq3MzPIVcXSmjuJSCdONm0cc5wV9GBgwQdoZS9RnCreF4jOQNSkhVwOthNMEYS98v6zxqH03PlC06PZQXH8FhpCCtsKfzrKU%2BxOAVs%2BImdt1RvfgT3YUXCRSeqUaEgbuqxQhavpIM%2FQr6RxDxPcP9uJAiN%2Fvr%2FagxuvdG1KXnJ07eJIH2tl3bFrH0dhhtjkH7Lt7K20yUJGEVhLlgmPSLhU%2B%2FuMKILBzc%2Fq0u69rqOoFJz6APZ7yy9B7Ym5jnrSacxh9wo6xOpA6IO5J8q2znVq8SeLWiK2%2BITXewTqgkwq5jcAarLi%2BwCiEJ5mjevZiL%2F3QvmblX3x6Nk3YaDCqAi7IoBL2eNV2avHgc0hbu4j%2FdIeoxi%2BsriSpfaXtwASTV3wh7FHrfUqRcAjD13KTLBjqkAfzn8bn9BOP2FYKauIZbA1nH7gRnpEHa5fP%2BJIi6%2BNwGiYeaVOtfArsl7QxsqY3MUAUE5Db4AQh9cmm%2FAinIdjtybnhLHqX6n6VjJ7G0S8t7LsgQJQaaKGf5hG26taISFAmeZc1OQIWT%2BjonEnsqiwBrCnZoBr1lfnQ%2BdaYQvOBCdn7YW49tmENJGu4ySipbCSFBswP3pRZ3rXyHmNTMyyFS760q&X-Amz-Signature=31ee5fb7d2040e37412a7cf42965bbcce0b55b8aa5e44abcf1f1201fe9a1c4c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GXCNTAZ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCICo1v8W6KN%2F2jWVPQzpMpGDrZNrutGT3vKW6tTlHsq3yAiAUJ30bAr5dp9OshVua7x3qfj0NkU%2Ff0VbKqMrZ9RumRCr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMgVPGDu2lhS30wraiKtwDPspI%2FspAd0%2F3CffZuhAUUyrte8AY%2BCWj32eu9SLgO5ZEkRkdzVre055gXpRgDviXVJhe%2F%2FMQos%2BmOKKD2yjlyBaOTCNkIFovJs0P7XvJBeDCBcjNZlXIhS7uHsKM%2F05qL9YedO8U8%2BtOVO1GLNfJ69%2BT%2FE5sTWURnFz1M%2FUJ4HoGigKvgWxNcHRzMy5vh3Yogk%2B%2BWn4%2BILXbFVmCPNHWuaTfxuTDxypcr0GhxSleJWEkANUAnnI8ByuxPWTzdtuSbF5IkZB7%2BClnpjW0zFYoZZ1kfpk10Sw4whhk7WqWGw4I%2FdMEkvWFgcRvZuNiOxo2dk3OO2hYczb7H7ni7PuXVk0cRr6NHD7HIKt9sw%2F4UG%2B1%2BSEMMylUepJTke6eD8LAeV9muMv7zKQz6UOjqovIOJDlsz1L5Q5xpA0Mn%2F89tB%2BLBh8fDlEO7b5pQ0c9cLJ9brGpXiceC1A7VnRUnP%2FZdZX5bKTxz0yIVPta8CGDWSbg0rgKHcTrMgp7%2FDwld1HambJfELwya%2BsgnrK7%2FSfofj8khLAJBhftNhN238VxTB9lcZ0V6g7PHe%2BhF4GzPnIckG%2FpqGhjj9uS%2BaNk2JdZKbGRwD%2FFjs61hrntTDzokRjS0LZFt4VoqPCiXfEwztykywY6pgH%2Brp%2FduXfHDeTPuNY9Cg5ldvCvGiTt6dc3Pz0uk3kmR%2FYd9TwqkRIzXNMKokxp6ffrrVFSdA0sWXgSPlbBtb%2FwXsxqlLp1gGv7yPoFcuob2373wRJqHH%2F0wFgTPiBQJ2ONQBX593zkRUW0rsh27IFVpNfTx3PvWVoIwe%2B7Vukly8jBHRz68juUhaD3zNgHl1LSuB6zJDPfCwAnqV4AiEk%2FEZbFJoss&X-Amz-Signature=642968a5b5f08efc53692348d3764a15b2e7a4731b7f6d6d32fdb29da52b27b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GXCNTAZ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCICo1v8W6KN%2F2jWVPQzpMpGDrZNrutGT3vKW6tTlHsq3yAiAUJ30bAr5dp9OshVua7x3qfj0NkU%2Ff0VbKqMrZ9RumRCr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMgVPGDu2lhS30wraiKtwDPspI%2FspAd0%2F3CffZuhAUUyrte8AY%2BCWj32eu9SLgO5ZEkRkdzVre055gXpRgDviXVJhe%2F%2FMQos%2BmOKKD2yjlyBaOTCNkIFovJs0P7XvJBeDCBcjNZlXIhS7uHsKM%2F05qL9YedO8U8%2BtOVO1GLNfJ69%2BT%2FE5sTWURnFz1M%2FUJ4HoGigKvgWxNcHRzMy5vh3Yogk%2B%2BWn4%2BILXbFVmCPNHWuaTfxuTDxypcr0GhxSleJWEkANUAnnI8ByuxPWTzdtuSbF5IkZB7%2BClnpjW0zFYoZZ1kfpk10Sw4whhk7WqWGw4I%2FdMEkvWFgcRvZuNiOxo2dk3OO2hYczb7H7ni7PuXVk0cRr6NHD7HIKt9sw%2F4UG%2B1%2BSEMMylUepJTke6eD8LAeV9muMv7zKQz6UOjqovIOJDlsz1L5Q5xpA0Mn%2F89tB%2BLBh8fDlEO7b5pQ0c9cLJ9brGpXiceC1A7VnRUnP%2FZdZX5bKTxz0yIVPta8CGDWSbg0rgKHcTrMgp7%2FDwld1HambJfELwya%2BsgnrK7%2FSfofj8khLAJBhftNhN238VxTB9lcZ0V6g7PHe%2BhF4GzPnIckG%2FpqGhjj9uS%2BaNk2JdZKbGRwD%2FFjs61hrntTDzokRjS0LZFt4VoqPCiXfEwztykywY6pgH%2Brp%2FduXfHDeTPuNY9Cg5ldvCvGiTt6dc3Pz0uk3kmR%2FYd9TwqkRIzXNMKokxp6ffrrVFSdA0sWXgSPlbBtb%2FwXsxqlLp1gGv7yPoFcuob2373wRJqHH%2F0wFgTPiBQJ2ONQBX593zkRUW0rsh27IFVpNfTx3PvWVoIwe%2B7Vukly8jBHRz68juUhaD3zNgHl1LSuB6zJDPfCwAnqV4AiEk%2FEZbFJoss&X-Amz-Signature=642968a5b5f08efc53692348d3764a15b2e7a4731b7f6d6d32fdb29da52b27b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VB4F2DGG%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T191535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQD4pl4nQZilYMYIBFlF6GVtgdLPVZDQU8PGWswb%2F%2BmlKQIgf1CPcF4S%2Fzt3LWs%2BVw2LKS%2FwH%2FCD44rChsD11bFJA8Eq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDNs5GLpjpxY%2B04Xz%2BSrcA4sSuymAgUsD12UfhSJ03f%2BxPLjNrK%2BmeqGrkM7Ccqf5iJYH37aHukuZ0kxf9DglVFWYFGeaHOGB8McXUSrFFWanfH3NAZVuGycd3%2FtGDh89lYY49dhFvsnDTowIjHJN4T87sw%2Fwtig4fnsXH4Ei%2F5WDv6XLuoZLHsHZBLpRaJ0e%2BBKaSfjlx5mnEO7RKcGieSQ5gQ2sWNQLk%2FT07XMdPT%2BNeVqoO4b%2BeLvKqIWKGFFh00GLcsxQW%2FQD9sp0Vs8RFLFR2cbplbz%2Fp3MR7NyHyVgr3so9rGlOrX7j41xTLG%2FxvPJQnykz6KARHdVwZ3td%2BoonYpvGi%2FUC65WvsaIm7GMHN%2BwHywVY0U4Z7HTJ1sPy9O2eTxCePkQ7N7qYo%2FKhELmQKsZn9i67moaOmfZIRh9xk5PfRZfQgrnnXaYRr1M2pHqQTd3O4llTMTrqEzeA4R1zeltzEcTdOQNWjrPgUO%2FXslEcJOGovLIi01GNsLXVz3PIpXGPq9BVgUOrsYhVKXqaiYtxjtDYVP0XYyPQkhMiCVxqx7YQcSuf49pgwkBxeCTY8jHo2ymRmmSbzzXow1kmjJM0LTPpiar1Twzggr9Iyi5zEY1vlaghvMDfpnik%2BpfMkJW5lnDAd4%2BjMNLcpMsGOqUBwzXi5R7TD9uuyUXaE2FmK4zn4KtZw%2F0vXoyOlky%2B9ZQD9MncfjzJ0vTaSPru7oXoDycFY1VR32dGup7maDki5tNlmgHjqgcvfycLuMDpU%2FjTpOXavt8CIkPImW%2B%2BPPZe0MDbjM1v3os%2FaL6%2FoTR%2BvTVxShkTaPP2yXe1V%2BOW7GPaDmMma3o5xvGSKDHrQgeNoDPUViqw%2B1UTMpivb9StLnxf9WDS&X-Amz-Signature=5497bd1e925234eca836b149555041fdf4df7b1cca1a6e6be7bb98a53e45913c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

