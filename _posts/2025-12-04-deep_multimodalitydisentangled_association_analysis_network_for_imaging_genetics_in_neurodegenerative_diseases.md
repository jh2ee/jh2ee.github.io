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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ULUIE2W%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCXYqVwKg8mDuuH3cmLwEuI7xku5vobeuDX35wY%2F6ZloQIgAe5xZ2dLbS6x%2Fis%2BVj9RtDegZAixvgwPdoIIdYXcfAEq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDDfiYV0IWbMdFzjyTyrcAy87tszwJJmrUtEFD7Ett4lyP7Vt84p%2Bslv3yQAB%2F9nfIiOBYTQmYgSC8YvUeNRBffSEE4F5arD%2FqVKUIPCQzuiqyprFoaJM8cf4xLGwPzyNy%2BiAcUJ5CFQqqAUAEYfBHEftAOKdnhqVo2NbyQvFPyYNlXiDEMDNXqWA8hyz9gr8duAXMMQXmaVgyVhMMYKq2E1n52erVvXb8eleX965esl1PMAxuitrxGih1YlnyMhTrWTuXcl9csvsKW1tBEHEZHyTIWhSvPhlk6YKQ2nN131mZKmBqfdN3MSwvQHGcSbVrMoai9oFBu9TMjV9maItDlVtmKmLUPPCsOtre0TZV3MXqaYE3TkUMdoeoKhyZVW%2BL%2F3AGVvd4MxQThnT%2FNbMLDojBei418kKEZQvGWMo92DYeFmE57GsMK2A6Ey9nZXmmAnssY08jnl8LZrnLmlGb42WNgbqB7FqkiS0y5LWWdQ3kNAXCdWeyvokFfxPDOxDDkftx65yYTQwlBWz%2BBo%2BR9TT92%2Bobvc6w9OaLEuzvlzLMYWxbJXXYqerqq04cRCUHR%2FqCM5bvDvAyO1ZHPWTk6uVKY1PpamCVwuX1RKEMyZ%2BYodHq%2FCjTDp%2BCQMmwQ%2F0lnAgY9p6mbfMgEVwMI7r3s4GOqUBKpL6Bj7d9VfcGCd%2BGkYCJKCJpT4bcyOa%2FfW8%2F4MargMTvbCdLJtzlLvwdbLYz1K0GaLd8qo9F20hzitgbnraZ0KMkqkAG7PFzx3zXolNWwV%2BsNCaJ4brC3mmIabNWCjnPrhregllWZ1WvQ7rQ%2BhJisWWLyaMulz7jxqeSDy%2B5KEJXgYKKCBANHpWOmkMIkPR%2F%2BDQkYx2lZtEFi%2BJ88XpfBBbt6j2&X-Amz-Signature=3a970b7689ded11df37e8738f89c11798984d27e34cdcbca4ff10dc4db37aaa2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ULUIE2W%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCXYqVwKg8mDuuH3cmLwEuI7xku5vobeuDX35wY%2F6ZloQIgAe5xZ2dLbS6x%2Fis%2BVj9RtDegZAixvgwPdoIIdYXcfAEq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDDfiYV0IWbMdFzjyTyrcAy87tszwJJmrUtEFD7Ett4lyP7Vt84p%2Bslv3yQAB%2F9nfIiOBYTQmYgSC8YvUeNRBffSEE4F5arD%2FqVKUIPCQzuiqyprFoaJM8cf4xLGwPzyNy%2BiAcUJ5CFQqqAUAEYfBHEftAOKdnhqVo2NbyQvFPyYNlXiDEMDNXqWA8hyz9gr8duAXMMQXmaVgyVhMMYKq2E1n52erVvXb8eleX965esl1PMAxuitrxGih1YlnyMhTrWTuXcl9csvsKW1tBEHEZHyTIWhSvPhlk6YKQ2nN131mZKmBqfdN3MSwvQHGcSbVrMoai9oFBu9TMjV9maItDlVtmKmLUPPCsOtre0TZV3MXqaYE3TkUMdoeoKhyZVW%2BL%2F3AGVvd4MxQThnT%2FNbMLDojBei418kKEZQvGWMo92DYeFmE57GsMK2A6Ey9nZXmmAnssY08jnl8LZrnLmlGb42WNgbqB7FqkiS0y5LWWdQ3kNAXCdWeyvokFfxPDOxDDkftx65yYTQwlBWz%2BBo%2BR9TT92%2Bobvc6w9OaLEuzvlzLMYWxbJXXYqerqq04cRCUHR%2FqCM5bvDvAyO1ZHPWTk6uVKY1PpamCVwuX1RKEMyZ%2BYodHq%2FCjTDp%2BCQMmwQ%2F0lnAgY9p6mbfMgEVwMI7r3s4GOqUBKpL6Bj7d9VfcGCd%2BGkYCJKCJpT4bcyOa%2FfW8%2F4MargMTvbCdLJtzlLvwdbLYz1K0GaLd8qo9F20hzitgbnraZ0KMkqkAG7PFzx3zXolNWwV%2BsNCaJ4brC3mmIabNWCjnPrhregllWZ1WvQ7rQ%2BhJisWWLyaMulz7jxqeSDy%2B5KEJXgYKKCBANHpWOmkMIkPR%2F%2BDQkYx2lZtEFi%2BJ88XpfBBbt6j2&X-Amz-Signature=3a970b7689ded11df37e8738f89c11798984d27e34cdcbca4ff10dc4db37aaa2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKJMWT5W%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDLWLl0a03dtCEoYgtn7rXe6KfnmWusPj9TMNULDAbzUgIhANLSZWx7BrR7g6K%2B%2Fq9tBXRrqxkU%2Bq%2Fo6m%2FazUA3nlFzKv8DCBcQABoMNjM3NDIzMTgzODA1Igy2ivW21N9GsaSiOTQq3AOsQgo9gSDq1LFkQnYfPxmUPsDzIXhBMFevbAxgX9iV%2BPiZ7PPR0OaXU0lzDKY9FUMR%2F9UcRmIquulfEO4vMeycvLdikvYv2R%2BmfGwEHvkwo2Ko8IxIc9czgs6Y9FM4u1zxrKgdoezeJKQAkIEbwXwqDB%2Bc%2FSaxq%2BHeL7zkpqwk7YRLmzmYzBTjTtn1bMIOsndW8wQ%2Fs7eq3OJIwD%2FdzDBSfSps2iP1zU3E783LlAtI2xANIPgKzgN9sd%2FlOPMUHwo4JT0Pd1mOEQwqxeOGi8z5zrTLGi3UM1qiDCipczP635VZw6w4hT%2Bty8XOGS2NwTgZ%2BVFqN7D%2BLcWt274P0klz97iXjCTuHGm482xjGyv3%2BPYnzMxqKoO1%2BfgSTo%2F%2FEDZImLC8KREnnRpA1VsqTZqMbH5L73fFU6oGd77ekZHe70T0VY14F3W4XdCNTVj%2F3a4dVNvtcyfmJgzBYpHz3njoO65jS9Bx5Ip9xpaHReIOK%2Byx4GRwRB6KeHK1rtA%2Bj6upYYL8gwVeCZ570t4BcwDiEHFlgcFBrM8xb%2F0pZFDZrHxKCCktvaYKceFXWu0vfIRhaOuGj5eFeNaBCEOPKtzgQQ9R8BdDFfVRWZy4iXVB11KbVIh153kzy4sUVDCl697OBjqkAd2xhgdzAV2698UMX8RtgCq8FixWhy4DFYbj0cl3zrjeMtF4DmqWxxx2hwZdJk9%2BitekQTKN0Vxmk0rbsX0wtTAPwSBrZjf%2BjppDxcQjWMYXrVFuI2GnE8S3pYbpTCXxkkgtNPUDFAocztdcR42ZyrC5v2IfIG5V7BmyyiYi9HmhhNZ8QDyz7z7Gld97Wr83AwLjze9kWie8dK3xDTArxJQbEC%2FG&X-Amz-Signature=7931614e07a96ee14202830330079b0f96a06cda9c7cbc726dd13eb2bbbc657b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GVDC32F%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQC2BD6t1USuphsLfVohcF7AGWh5ihPl59NGyZwNNZxq3wIgEtdC%2BDuhNwEIWdIfjrkRn82scjp6nMiQr8vwE3VafrAq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDJaY1CpWTqYRaYqhtircA84XeoJp241RWL2yXjPKPoDmqVlfWYv8PbLLzNg5KFaNiq9X4rgpsfXLEw9Wu74xaBCscVhJjaPZDdOYiWdI9py%2FevwaG%2Fam%2Be29CVMMlpQ%2BEc77REl6uJRGFQgm22lyfWhpnZdOD12DVbGHkzMrHv6Hp638SVC7qdDgkZy7ZHHpzBrhlXYveFFHtYmD%2FA2z7xj1U3UlDZHrLJzZOc5P01x4rb9h0FA2WssE20XAFkWno974PvQTe6DjIdctm9xk9ZHdKY0FxCrm1kSo5Sz92w7QGoTuqPXV%2FAaFnSGPbOxFWAzqdnDdF6jKa2Mxe6rgfB%2BOJtOO%2FSgKfLTo01%2Bk54pkHEINhPl71I0NsWi3JgE5KSJJbz1G28hF4UJDbNHhWuCOCVa8oeaom9rEYEMZo%2FUsZjL3LMKoGimkjw7VkVmqNHZ4ASGIhE4tE5JbpHBa5jkqsoecK9MLsfe30JqAHEEBlC4ZZFHkZ9vk4iMWpP%2BN7loCb%2BNS3yB3yD1WiKdmbKzC2ReIJtzRaFk11pdRr6cmaaEAniPB2XVebYIKj%2B9FmkDmMDM6mbTu6ns5ZT7JPuHBIl9mC%2F%2FHBq3QUwMhaoHQJvgXFD0iT48ItQWYB%2FOLSKWgRrUsgYNd3qEeMPno3s4GOqUBtN9FW77SCt1jL0wTdGiXcBeScggI%2FKUeo2NNQc%2F18bzqpfCytiUI7oCZeXRx69%2FVzrLVXJlo2cLD7bB5zCDZ6iCN9fUwezz7%2BoCI2qhKMPyldKHYBTIdpCGQrjap65xgc5DR4W5KOa7kx5B52aJTNdau8LBTEZgd%2BTwTKqiggpIw5BChcHgHbsqUb%2FmO2jrasmJWy4vivaFamCg%2FKhruXJLKgMh2&X-Amz-Signature=be50c324169c1c35c7149f20f31d542aec1820c171e5b0b73ee23c0696ab2fe8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GVDC32F%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQC2BD6t1USuphsLfVohcF7AGWh5ihPl59NGyZwNNZxq3wIgEtdC%2BDuhNwEIWdIfjrkRn82scjp6nMiQr8vwE3VafrAq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDJaY1CpWTqYRaYqhtircA84XeoJp241RWL2yXjPKPoDmqVlfWYv8PbLLzNg5KFaNiq9X4rgpsfXLEw9Wu74xaBCscVhJjaPZDdOYiWdI9py%2FevwaG%2Fam%2Be29CVMMlpQ%2BEc77REl6uJRGFQgm22lyfWhpnZdOD12DVbGHkzMrHv6Hp638SVC7qdDgkZy7ZHHpzBrhlXYveFFHtYmD%2FA2z7xj1U3UlDZHrLJzZOc5P01x4rb9h0FA2WssE20XAFkWno974PvQTe6DjIdctm9xk9ZHdKY0FxCrm1kSo5Sz92w7QGoTuqPXV%2FAaFnSGPbOxFWAzqdnDdF6jKa2Mxe6rgfB%2BOJtOO%2FSgKfLTo01%2Bk54pkHEINhPl71I0NsWi3JgE5KSJJbz1G28hF4UJDbNHhWuCOCVa8oeaom9rEYEMZo%2FUsZjL3LMKoGimkjw7VkVmqNHZ4ASGIhE4tE5JbpHBa5jkqsoecK9MLsfe30JqAHEEBlC4ZZFHkZ9vk4iMWpP%2BN7loCb%2BNS3yB3yD1WiKdmbKzC2ReIJtzRaFk11pdRr6cmaaEAniPB2XVebYIKj%2B9FmkDmMDM6mbTu6ns5ZT7JPuHBIl9mC%2F%2FHBq3QUwMhaoHQJvgXFD0iT48ItQWYB%2FOLSKWgRrUsgYNd3qEeMPno3s4GOqUBtN9FW77SCt1jL0wTdGiXcBeScggI%2FKUeo2NNQc%2F18bzqpfCytiUI7oCZeXRx69%2FVzrLVXJlo2cLD7bB5zCDZ6iCN9fUwezz7%2BoCI2qhKMPyldKHYBTIdpCGQrjap65xgc5DR4W5KOa7kx5B52aJTNdau8LBTEZgd%2BTwTKqiggpIw5BChcHgHbsqUb%2FmO2jrasmJWy4vivaFamCg%2FKhruXJLKgMh2&X-Amz-Signature=347cf9ad7ebd88024130813706e0d61f85fc9ba9a8e33421b3e54a559284e26e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEBT52PE%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQC1y3IaefkFlosODwR3RQU7WiwKbfg5FIPO4Y2CZzKU7AIgX1vIuy12TrCjzgEnaN3vqQiDaFaxzHlUr2YNnYOgdkcq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDF4U%2BQh5IcO1RaXlxyrcA0m5DnMHRS0ZgaSrWYs2iwoN8AuD5inYfjYb60aHSNtvRsW6lvI66Fs14NHB%2BOEkdYXEuKO90nhtglyM%2FI2GQpkpLE4qC3apxZYO2glM0ylz1u3q8dQzamBr90Ex5VwuVBW78dYoV0dnRl2idbQbFEKfoDdfhyFpG4Amd6YGiHemnavQDi9Ns17mfmBg3ggwljfF1Jl6SthSovt9Ak0twrzEQAtMaEKqvQNGIrsr7jNjfFwHDov57pFHlsHGyJM4ymlINE6yGLtzpy%2FnH9Aq1QwMgS55WfTM%2FLdNnCNxuvEST11kjqmlrzf7fSsNH4pCLdhZL3QGfKriWaXGS8%2B2%2B0hUvAjtLJQfH%2FAomyK0MzVVZ5SVrCA66kXUiCMrMTv0sRsPXgPdu2CN8IwgAqIsRkTIzvMINyXTWdk00iJ2tje2paqV1PVorRp696DIsHJjtOsI1SfFAyP8xjkaSZEycJjeFeF7GGpjwggWtpRiibX05bBB5C3Z1cw%2FtpRu0NJqqp4X2yDGkCN6n%2F2GjFFEKcxFb%2BjDPT7GdHMBvflXmGrL4o3eb2n9K3eP%2BAuZ3H1nvr3TFnNR4zaSqYY3hCFb%2FqB1cleobOTAukiRMdkLVviQq1Twd4Yt%2BGicgIWqMNzq3s4GOqUBFzjqxYWFKZK7PIh1PTGj9LqLuftrFDJmsQnU9U4N9wQxnrrzF8zEc5ZaPgTnxxsrLSO6%2FULxMESCrkKj3y0coG8CavtCGTrJHQsaeHur3%2FKWjrbKJkAlO8bWLiTNE1mQ9nVs0Qky6H1nyZplXwiGCWa2UtVcC8b3O6%2FicEMNkOg0J5A4wzY5MU3uDoPP2HIWieBHZ9RB3ZqRKF%2F0B6TxMnLheGrb&X-Amz-Signature=fd881cbd696187a01aae06255474f1e998a50bfbe382dcdc0492f0116f2c8e03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYDTCUTI%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIGAJ9w%2B0zrwXV8KeIl3kjvhXZiwc0wXXQtv6oO3SIOPjAiBZnJ%2FGIwmK%2FTUJH7ADgJ3efi9wEYM2UCKNVPC9FKxGuir%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMpxbt096rG%2Fl7G1GjKtwDXYyHyLb%2BrfsmJL%2FuU%2FaSb1L3UBuCh%2BWENYf%2F0s0arDQiblmEbPeHRUagNQ46mVtknuoaCaIczK9fgsnUG01u44S07Msqr47aPSbumfkrgTthuT41pR5C9xCXClEXWsJ2mxOI44SBBI8EpzrrS%2F67Xk%2B4pt9lVUodC4bWtH1W35UCBYEOEh4J8KDJ8Yjfap1cJSqsMrROvU16VMRHnMww6bfP8RfMvoqSKQ1NmrJ24bdWY06e5EX4imFhAwDFzTcGrX8K7piFD8QKoAFmHKfj%2Bt5duWJ1gfoMoP6hhEucWsIk%2BCD2blcRWLSsige0rNQGnKDVR4DhyAbmlZKAuUe88Y29V18750SKIE3EHiJluh1G0xSlTMRarL96HXnRLyHMenDqRziVBTX0PzeaoJnr25AYu3uY8B4FxY2SWsAcJa6LHCWVD4JTeU4FqOEHbAgnqS6d3rwUg0hFlUFwQqK7vXt7mIZtTYVdaBjGio1Iq%2BqO24hJSfDe5E2%2FKZFaHwJzaSvH4uQSwXlc6qevobNJ%2F%2FOYf%2FzxDmjk2TUPlU8UiJpqgtRhUhxvDvtxhzCf%2BHU6yeJpPv0%2BQC00bwpq9AUrlz8P5wx91OXygeO%2Fwm5fOsgoC0qZpyx3KJO1acsw%2FOjezgY6pgEQvBeB0SIvdrWn37scyh%2BeUgXPA7wlVx1g7kv299TDkOXZOCLWbm9NBd9CjwrPHyZEqTKUQ3hR%2BLf4QRM7MeS188g5zdSxyVMVYo4L0pR7F4tN8EGYDRXj7iPl7cgHzFLWWucyG2p2YUCbB9EInC5v4IVNJpU8plP7yGFaLJRWlUo4SPPK1G0QHh%2B%2BWXb8ZvAlVMpSeeA8RLuhcvoOpete41GhWy6j&X-Amz-Signature=bdbea7570925ad03ebe70eb99fbe2e9a043aa62db8aaaffc2cc2720fd2d89b40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YYQFMEJ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIHCr6CQ8xdLrPqnBtxKH3xqW3X2q9L8bJC23CiaqQfelAiBexfiWudTCDxbr0nqT8bn9dfbfF8OkOyKTnZO%2F4jr%2BoSr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMNIZwN9Er6bwpzBWvKtwDJ9iN%2FM19NqsGdkCN7rRafRHRby0qpjJWycYOn2FGoo7Y353jErQv5wOu4uB71aVnGflEAoAnC20HujCkMCyP1oJmVD2uNz4QRgufyEtZSuKVv0QeXqXo%2BNNeNDv1cMhgCjHuTRghmj9fojUpIu%2BnNbbiCXtLmi60srY1aDu8DZHqaO%2FLdl0iPIzIAQ8mAZULD%2FYrh%2FoIzaW1DkPG9NMRmMcOYj%2B%2BNrE%2FZsMZbK99kPi%2BK%2Fk6qkjvmnXlL8C9JDhhpBa3iHFq5ed%2FoWGoIa3kBPQg2dlS%2FMtaOQ4E8cJu4ewxrZRxGuNn0NRBv6JLHgyHDpE9gvutsXNOrAE2hq7VPoIUkTV6hOkVfdg6pPC%2BhbsF87AKlU5Skw%2BjX9pyBwnVqbSB0E45FrruXX42G47LJCda%2FGglq8PMIBfJhJR608AQxpGg9d8r2hyvYSx5ovmfkSDMCzbaBjULZEqbN6xLRs7bZW4aoUQWQGS3761k651hOzQ9poa6Ylp%2BhQ4Ka%2FKUhpxPKZGKGPi8aLi9Oo8kCfr3WVDubxzUxGxtUHFEoz1rdCMLM4eVfNjzLRpoIgp2%2BtY9dyCGzghKxmfZknbR%2Fe7ElYIHOjtMNEGGErFv0zVrWGBf%2Fh%2BJrhxElrkwgujezgY6pgE024OX3bi9oI0Je1Mcv%2BX3PcJqsfb4jlONTLhxPBdzPRVrrDNT%2FGpZQ5jRRfERnaCEa8W9Zl%2Fx27oh0P2dNGqXQcQ5yjt%2FL7n42FUQqGyf3V6HtTR68ATH1W%2BfweZOI2snCc1nvewWySBVJRhyRqVi%2BdKhhodzfullCNz3%2FzG%2B%2BfkxLEJjQaMVz3pVh1zvZPD6HrivsMA3BNPF2PShAopkUq1Q7vDd&X-Amz-Signature=f3c8067da3352bf672346fde703622e1b932d3b8b4a6a2c426bf396243c007d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRFJZIRO%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQCHtAacymPYHNVw296N2IOQxcZeYBWxjQ7Mth2lHv2l7QIhANrW7XkyYzvCNmMj9qHO7YrlDTasKsaVDwopLZwZCiAfKv8DCBcQABoMNjM3NDIzMTgzODA1Igw2uOgfR%2FdUh8u7d0Mq3AMqCjs8Uat2LcrrbsWrbVq9waBmty7zAoWllNZ7l1nOCctQYzoj9i3JPbpvQl%2BM7gB%2F3oVbPSeERMoVT%2FNKqrqTb8qvaQy3d4OJB94uSEOXEGFdkKmWPFWjnIFFhX8t64AEOfrUsQ2%2BFHEAhzQEfVgilz04XR2LjhJqMWU19A5s9g1vJTM2jLWJZPpl90iJP%2BN2aRvPZiYtZU0IgF%2ByP%2BOVxyWDCSb4LFnHpnHnK66WW2Og%2FGH50nQE5pN0WxvZirTmR3bC1dvOeHnd9UoizHXYBVipnQB6dfOA2KZXX4TbpAYPBgp7%2FGH9ijxBDH%2BxiCNLxF7MstLk0N1NbChjyuBoRkhtejjgHQimD73GUiV3BthiRIwNRkDFlN1GUG7OpEe6jttF8myn8cD1Eiqjs7FI80XnC01RRNddrZsGSxoNhRqOOzmMHItWedbF3wu0h9VgTyz0u%2Fmp3TcUP9tx711cTLjQsfZlSkH9MFZX2murKMN0Fqn%2BRNlrlR6amzTjNslICEjrpr1DcaZnSWnWfjCKybzynAkWEE%2FtI2odnLO3Z%2BdlB1%2FDUj1zwnGjSTA4N5Qd7Ym5w8NFUugfL2zq6UWgtG0HZklptmQRxwEaj0SuYA9PgGONdA5RBVd%2BBjDH6N7OBjqkAfG1vQA5msY2BfMJZwCLu0ymO8fxj%2FF%2Fx4mnEeaIdKPJgUOdL%2B8f9CJhODqxc3eozX1h6Xub0HedhCaMiKhePg%2Fhtqd62chgiygjy7wHR42sD7o8JPTi7c3VJ4gWTJep49Qxq%2B3XIrwaI1Wfh%2FjxC03LO1SCe1zrKtUnFs%2FdSln6YwrR2sIMg2XMCB1T6FN3SQZBYdUe%2FQrPqAf2hzOryl1kpUdx&X-Amz-Signature=b7e2c147f55b05a36624cb82f0f7258c6a33a3c32d752a36982f71ac7ff38c17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRFJZIRO%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQCHtAacymPYHNVw296N2IOQxcZeYBWxjQ7Mth2lHv2l7QIhANrW7XkyYzvCNmMj9qHO7YrlDTasKsaVDwopLZwZCiAfKv8DCBcQABoMNjM3NDIzMTgzODA1Igw2uOgfR%2FdUh8u7d0Mq3AMqCjs8Uat2LcrrbsWrbVq9waBmty7zAoWllNZ7l1nOCctQYzoj9i3JPbpvQl%2BM7gB%2F3oVbPSeERMoVT%2FNKqrqTb8qvaQy3d4OJB94uSEOXEGFdkKmWPFWjnIFFhX8t64AEOfrUsQ2%2BFHEAhzQEfVgilz04XR2LjhJqMWU19A5s9g1vJTM2jLWJZPpl90iJP%2BN2aRvPZiYtZU0IgF%2ByP%2BOVxyWDCSb4LFnHpnHnK66WW2Og%2FGH50nQE5pN0WxvZirTmR3bC1dvOeHnd9UoizHXYBVipnQB6dfOA2KZXX4TbpAYPBgp7%2FGH9ijxBDH%2BxiCNLxF7MstLk0N1NbChjyuBoRkhtejjgHQimD73GUiV3BthiRIwNRkDFlN1GUG7OpEe6jttF8myn8cD1Eiqjs7FI80XnC01RRNddrZsGSxoNhRqOOzmMHItWedbF3wu0h9VgTyz0u%2Fmp3TcUP9tx711cTLjQsfZlSkH9MFZX2murKMN0Fqn%2BRNlrlR6amzTjNslICEjrpr1DcaZnSWnWfjCKybzynAkWEE%2FtI2odnLO3Z%2BdlB1%2FDUj1zwnGjSTA4N5Qd7Ym5w8NFUugfL2zq6UWgtG0HZklptmQRxwEaj0SuYA9PgGONdA5RBVd%2BBjDH6N7OBjqkAfG1vQA5msY2BfMJZwCLu0ymO8fxj%2FF%2Fx4mnEeaIdKPJgUOdL%2B8f9CJhODqxc3eozX1h6Xub0HedhCaMiKhePg%2Fhtqd62chgiygjy7wHR42sD7o8JPTi7c3VJ4gWTJep49Qxq%2B3XIrwaI1Wfh%2FjxC03LO1SCe1zrKtUnFs%2FdSln6YwrR2sIMg2XMCB1T6FN3SQZBYdUe%2FQrPqAf2hzOryl1kpUdx&X-Amz-Signature=3caf2f07578e36772084cd06b5c1f091231cbd4c961c4e8fea3bd29c122721f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSHN3PNI%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQCsPZy6c%2BNiPrM%2FkJ98ybe01CvBMUi8SDKoO5kZkxYLPgIgAJI%2BbL49n3N1nYnH8o%2F5XWQsYRyF2%2BMmxfVg6yF58vcq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDAb1VdDOurzU9Gxh7SrcAwe%2FEeU2Bg3eAmJ%2BjHkPXEjScaLNeOtCFF90y%2FLKyVVcIInbjVRKiXlroTCNIebGTr%2FNyF4Lc0oY4lDEF9hX3wqrEt9sC8%2FE1lNQRCV9b2Kp2oxkwMVB1%2FyM3Rf9lGRaTeFGuTTzCP1K0ksfOpJeOC0ovCiON4CbG54AI856acHNCMTvCtwXICI%2BCi3%2F63QKzi3DU603XX2M1tij1aFa8YbU9XVam2iLn4EPaRgxGKTPRC0qNzidUb4XuGHR7b8RJOp81IdZnGsNM9uK%2FvJRVixXAi6Z13Jnp6Bh%2FBAq1jArecghYIel5wazg66UR2XsaFaWqUf0xmukKpHpCUlmOh%2Fqj1uJrqIpi4dhzfw%2BjI2i4rw9wQbDLXZivccANuGFS%2F9epL1UQ60TwUX2M46b85hjKy7mDHgkmhwWcUtmR%2F9VUJiMnlQ%2FGqdBqEraGaKNk%2BB8VHbY%2FiVJG2IVKU86%2B180J3nDdIgsSBt4ppmxPWI1NcSYjGhA51mLhXJ6I%2B9uFqZ%2FvQxtkQoh%2FRvPKJCaAyKzhms%2F8oW%2BPLHAa6LHj6sEsLCH%2BmJm%2FrcJHZ%2BTTXEPvsbnjs74aUrMiMnWjr%2Fh5Hg1JCLvewidc32FIXlx5wVBX6fSDodlF2TqKoKjMM7o3s4GOqUB2CYTAigt7hyrpZQug7m7MTtgW4lJmBwiOCzkVHlVKDBGdN%2BcCoeFXeNhcAf%2BkT0IJR%2BrsiepueMaw3Ixa4hcaFKZraTzR1gs7VwP2eLqknf0iPADh4%2B52hz4h8%2BEXO8tUaa9zsVDsCXkTEoXe9%2BGooT7tdeSV4XvSMumiv7Kw8HSpn7zJlNQZfX1FzdLdU9H6S41a16Dtgmz%2FuPANXEE9n%2FdY%2FBU&X-Amz-Signature=5ab9113168030a2e881c84ec2169edd470d2d803ba1604ee2c345bc90fa04dec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGUTUTRB%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDWinh1fogCNiSvKX9VU5MoxfjgTdFzBqVdcpPo5%2BOkgQIhAPcSpsA%2FRmRvc%2FG2%2FNjfAh6Qy8udUKXiHcfUNFxOt%2FdKKv8DCBcQABoMNjM3NDIzMTgzODA1IgyhEWHibuXc1I6lZQMq3AOVgFSnN0EZ32krLIqXZAVWfIwDVoGMI2uMrRT%2BM3asy1lej7SYzDSmsiDO2Xw1QJ%2BriRuYPyMItPR%2FKM5It%2BkICXSNOTUyitDZHfTNExetPmGnqDgRGaD%2Bh5a5B6J90JwDrAd4OWCFDYwp6KkA%2BoVdcZuGzJPzR4mJHu9Av1Yw%2FqwiwAmeWEshNHT66OwsiXE39DtC4m32eqDEZX1Xu2JbPTBsSzB9nja8yOupSgQtCZL2W1QMzleaG%2BmuTPnwWwzQ%2BDIIvCz%2FpU8ivCeLe6dWwVnNQxViZ9fV%2BLA%2B33dCrZ3GPHZkX5S%2B5puzLiIevDmTxqoMlzsJmfMNRDpkTqxNHUrXepDqjVPpznH9A3Mo5G2AN%2BK9hlJldWzo6NhymA7%2FA%2FMTtAzTX2yjGdpySRzHsHp5Vi1nY5pscKEEIJAFrw9KO1iDRFy7a5Odc5MaFcolmk8m3J8L4gbnvAwUaGdL2kWiN79vc4CUJspSYlkMn%2FLDoyxcsftnNWSkI84jmRuTIXwywBdan8J%2F1NBsgWfHbkt2dLEz8xtx2g9rxHqacz4B2GcxMt61%2BLj0CkdpIyu5duecQNRpQfUEytTUr12EnmTaovSpbUncGpnikdQhI5ajNJWJcgJQ0uKf%2BDDA6t7OBjqkAS7VXI%2BQt9OZsqGIkYosF3ybgNji9QKDbaDZoaWGK2hSHQ12c6lgUTvp4WsVwcinchhhRM3xeA2FPvLWmqMvyEYXhFdwGNGFlifLk2S85g3MYPvMIR%2BcJKDKY2eEeUySSRKQlxMGRv32i2clSlIAoOuHmS7QHHMRII1aI%2BUWrrK7inE4LqkpJChdHuoMHKAOt8s1xm3ZP1ODKN0kJ5ZZsBDfoo6C&X-Amz-Signature=c1bfd77345fd5622f3fe0051b613f9f021e6b81cd0d5d584f9fad2dcb5b39014&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGUTUTRB%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDWinh1fogCNiSvKX9VU5MoxfjgTdFzBqVdcpPo5%2BOkgQIhAPcSpsA%2FRmRvc%2FG2%2FNjfAh6Qy8udUKXiHcfUNFxOt%2FdKKv8DCBcQABoMNjM3NDIzMTgzODA1IgyhEWHibuXc1I6lZQMq3AOVgFSnN0EZ32krLIqXZAVWfIwDVoGMI2uMrRT%2BM3asy1lej7SYzDSmsiDO2Xw1QJ%2BriRuYPyMItPR%2FKM5It%2BkICXSNOTUyitDZHfTNExetPmGnqDgRGaD%2Bh5a5B6J90JwDrAd4OWCFDYwp6KkA%2BoVdcZuGzJPzR4mJHu9Av1Yw%2FqwiwAmeWEshNHT66OwsiXE39DtC4m32eqDEZX1Xu2JbPTBsSzB9nja8yOupSgQtCZL2W1QMzleaG%2BmuTPnwWwzQ%2BDIIvCz%2FpU8ivCeLe6dWwVnNQxViZ9fV%2BLA%2B33dCrZ3GPHZkX5S%2B5puzLiIevDmTxqoMlzsJmfMNRDpkTqxNHUrXepDqjVPpznH9A3Mo5G2AN%2BK9hlJldWzo6NhymA7%2FA%2FMTtAzTX2yjGdpySRzHsHp5Vi1nY5pscKEEIJAFrw9KO1iDRFy7a5Odc5MaFcolmk8m3J8L4gbnvAwUaGdL2kWiN79vc4CUJspSYlkMn%2FLDoyxcsftnNWSkI84jmRuTIXwywBdan8J%2F1NBsgWfHbkt2dLEz8xtx2g9rxHqacz4B2GcxMt61%2BLj0CkdpIyu5duecQNRpQfUEytTUr12EnmTaovSpbUncGpnikdQhI5ajNJWJcgJQ0uKf%2BDDA6t7OBjqkAS7VXI%2BQt9OZsqGIkYosF3ybgNji9QKDbaDZoaWGK2hSHQ12c6lgUTvp4WsVwcinchhhRM3xeA2FPvLWmqMvyEYXhFdwGNGFlifLk2S85g3MYPvMIR%2BcJKDKY2eEeUySSRKQlxMGRv32i2clSlIAoOuHmS7QHHMRII1aI%2BUWrrK7inE4LqkpJChdHuoMHKAOt8s1xm3ZP1ODKN0kJ5ZZsBDfoo6C&X-Amz-Signature=c1bfd77345fd5622f3fe0051b613f9f021e6b81cd0d5d584f9fad2dcb5b39014&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFZIXWEJ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T144542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIB1amdRUCljhhfVFoOrTRiAKKQNHCVLe21RvyDiZo30WAiAjMy5NaRTELbO6ex0%2BP3nDocaS323X910y5kYz420zNCr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMs3HziUPzTDa3%2FED5KtwDw5iXGUSp402z4nrjS1XxW7oCCPXiTGyb97SOZk%2FiPdYOdHuSC5ySIAUOHeTzwCnLTv%2BGZMQ2pmRkHfp6LtNW7p%2FNvOk58YorX73PypW073EbDy%2FPuvlmnqtEfLuXOMS%2BFEUETnxU86UujOFf9WoweAJ1m2OrthwkBIujPC5D2NEpRf2e%2BYrONZtT0n5ebwbgNhP%2BdyHHyl5jl3T1rDp9eNVHIcTq3qTnkLegHZHDITmac%2Bxljjy%2BAf5I%2F%2FIHUqb8e59cw76ZAieEl2%2B73ZaokVV3mW3iZ4%2FPkMx%2FMSE0yOvR8IjvZCBdXWnqhupezd6iLSNyFp92LvtBL2ich8AxQbcl9BxELGMB9DO5edgReW9mi%2BDOVvnfmHGCSVPfbx17KJ5XT2ZoRUJb8UQIXz5%2FXJrqCpClcovgk3dfsf0W1n4w1E%2BahstXKuGc5Zfj%2FF0K7AVKy%2BLc5B8uoQHbo%2FmOJCIW1pRuRyUC8wI26DMUN14O1eZurOagvMh9%2ByX49%2FEizjSdo9%2BwJO2R7rQ%2B4hvf0fGenf07Zg3HGGCURe5ygeenWMb5MicXW6tvwVAGSK9bCCG0tYoe5yH2AR6CdU%2Fr6mUik%2BhByefZE9C74cxMi0C9AduUi7jULypM7%2Bww9ufezgY6pgHBVGVbpSx22NzzNtcoCUHvFJBSWVlnhtjbi6gHVKbj%2BNA1zgYWdAhpA%2FDudyr27yXjAZR2XYCw7D9UnlBA%2BtgRQgfciryeWFaLiNT%2F87fAChUlGDVUSTMI9EETPWpzB3j0lHopR%2FLlbhTJuCyzXaQFavfxT50IlcfiRuX6IIfzDIOCwHRx0HXlTW7MJm8Zp%2BfAVeUiDyR4%2ByF5rk%2FiZ4P1RZAedWYF&X-Amz-Signature=3286c99c983b35eb1ae07b90cad974d28ee4b23b31a0f5b86a9d70689e33f650&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

