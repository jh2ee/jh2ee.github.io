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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665G2Q674D%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIFegKS6HRnNhvudrkb%2B3T9sV2nbWyRDAjXFyJSKGT5wsAiEA3yMTv4u9LWmalR0KQMBYRMQPApTfXwAR%2Fp0r9TuYnlcqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGE%2BnIchhLijc31Y2CrcAx3UQuvonEM32oHVb4o9rkkrrKTjrAhgwHjJzRBIotXfBuONBFlJscxa%2BOWlSsWGvYi6oanNht5XyFe9VaInDE8n2epmmypAn3%2FlrfXjFekTO1bA3mRhLL0p4%2BpOkO7C9rokBi6b61%2FW%2BGuZWXRQNOdQj7y0OMxJCcUT679zbsXDnpD3EaNcR74uyv9DZpDRqQ3Xx%2BQR0imjmnKOy51p7gqyC9cfx1q9DrR6kXVgE%2FBJUmm11vMXu6gL8S4jkT4PhhZKFA9XCFKZY8uixEQpOVCV9BOlZ5WSOZKILj9cGql1bkGhm1DIKCIPiNF7D0nQeYfVq%2FlqfvgXYsGzB56Vgup0%2FRKA1%2BgQ5AKw4dPXmpYvmVEG%2BmvpKICVOcKf4CNzFvPV1GzsQYGCjBNiKFSWxq9VQ5kGjt5lh4iqtUOFr%2FvZ1KsNJrW8sP3gfxuo6EGH0OXJSBXo7BLHSUJCOQjrt65tckFK8DATxK3BBD84kvFpf%2BX9RRKfyYbFCh8SdyF3AkTEOAWRKGzHL1pwwbwuf%2BZiHycOSnxu1lU5Mp%2BqaZ3%2B%2BsXYTQ4bwaXDz6ttzzu%2BiJJ94jSZTB1q8i%2F9SqYb62HxAlPxdtSN1dKTmuRPWE1x7ZDZIwDawr991s6AMMz%2Fm84GOqUBY05PztMGeYe81A1Z9EI08d0FU3DPMlJe0BZBEQdSHmX%2FQ12gSKG0Mxr3pWaCq%2BGuFwK4nkW%2FfaG1gw%2FjZw7yKkiKZ5Cw5bWYiTuhAtAWzkM%2FZVURbpq7A8KHaVKt1hmuxUJ5EkuV9JXVO1%2FFOUP8gg94pZNbBiawSC7%2Bs65a0m2z2y6WYSVcwPyRBes6RZ2CsKKqcZzXT2cjXYg%2BpVQwa5jss8eh&X-Amz-Signature=96bb55ffa7563c2eaf5737ed9ceb3355f8311597a4a261b7bdab42e9509ff14e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665G2Q674D%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIFegKS6HRnNhvudrkb%2B3T9sV2nbWyRDAjXFyJSKGT5wsAiEA3yMTv4u9LWmalR0KQMBYRMQPApTfXwAR%2Fp0r9TuYnlcqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGE%2BnIchhLijc31Y2CrcAx3UQuvonEM32oHVb4o9rkkrrKTjrAhgwHjJzRBIotXfBuONBFlJscxa%2BOWlSsWGvYi6oanNht5XyFe9VaInDE8n2epmmypAn3%2FlrfXjFekTO1bA3mRhLL0p4%2BpOkO7C9rokBi6b61%2FW%2BGuZWXRQNOdQj7y0OMxJCcUT679zbsXDnpD3EaNcR74uyv9DZpDRqQ3Xx%2BQR0imjmnKOy51p7gqyC9cfx1q9DrR6kXVgE%2FBJUmm11vMXu6gL8S4jkT4PhhZKFA9XCFKZY8uixEQpOVCV9BOlZ5WSOZKILj9cGql1bkGhm1DIKCIPiNF7D0nQeYfVq%2FlqfvgXYsGzB56Vgup0%2FRKA1%2BgQ5AKw4dPXmpYvmVEG%2BmvpKICVOcKf4CNzFvPV1GzsQYGCjBNiKFSWxq9VQ5kGjt5lh4iqtUOFr%2FvZ1KsNJrW8sP3gfxuo6EGH0OXJSBXo7BLHSUJCOQjrt65tckFK8DATxK3BBD84kvFpf%2BX9RRKfyYbFCh8SdyF3AkTEOAWRKGzHL1pwwbwuf%2BZiHycOSnxu1lU5Mp%2BqaZ3%2B%2BsXYTQ4bwaXDz6ttzzu%2BiJJ94jSZTB1q8i%2F9SqYb62HxAlPxdtSN1dKTmuRPWE1x7ZDZIwDawr991s6AMMz%2Fm84GOqUBY05PztMGeYe81A1Z9EI08d0FU3DPMlJe0BZBEQdSHmX%2FQ12gSKG0Mxr3pWaCq%2BGuFwK4nkW%2FfaG1gw%2FjZw7yKkiKZ5Cw5bWYiTuhAtAWzkM%2FZVURbpq7A8KHaVKt1hmuxUJ5EkuV9JXVO1%2FFOUP8gg94pZNbBiawSC7%2Bs65a0m2z2y6WYSVcwPyRBes6RZ2CsKKqcZzXT2cjXYg%2BpVQwa5jss8eh&X-Amz-Signature=96bb55ffa7563c2eaf5737ed9ceb3355f8311597a4a261b7bdab42e9509ff14e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QU7TAROC%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIFdRkOb9qws%2FUtdvySiCgGzECux4hiVWMNswZ7gkrT1iAiBZBGmpF8aPufLuvwkp3G1WM9jADk6zrL%2FU7KZSswxlmCqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtXISl7EgF2nARO%2F%2FKtwDo7y8nM7Ih4%2FLAs3eh3UiqGQ9uPkIUrXd7JeY6pb4KaRUhd5irBeta3yNpGs%2FbuXo3ntyv0PwEwzEz1VbUapj9lpnsNODkbzAQUzEvRYC6QhlXeD6meOEasYHhC3zTt29vQK5bWCTLU%2F54l5hltR9X4nHG7DFQjZi0CP5guvZNusDhRHEy0bQuAEdKtUnXChtgJ%2BUpAyGJWgY3tuVPPh9m0gQ2aXJuDl%2BDW2snws0mx85UlaxGBaD%2BWXfFOPNMKCOmINyq13HGVv40O%2F3Ga%2B93TSR8AKV3m7mJzGXoRNm8udImIi4ixYxpNRDrifDP9n7SA0%2BWwWm%2F2H%2BC1vFQrpidxmyOclopX1H3ZPphJlkfKQn2RaXOuGeM2w7RLFC8tgvUxcXS1tdTm3co1LD638OYuno8Ny0FG9JSUGJ5ekCWF5fVsXk0xFDoKAEJR8foJBt7h8xdtqnwR0NU78Xb56Z%2F8aWxawoqPOhRdTOizZmjxxCh7nzXuT46OK0MV2rRP%2BsTGuoxPoOAd2JSwQS%2FxVtVcrxA9ciRJf7eYzFizGVuI1YJ5vRqU3YzbSoAAQMzPdAGRXYMQDowjRHrDbFFlE%2F1LOV3dqlCIPaePyzwFJTySxgtBYaaWOqC1QjIZww7oCczgY6pgH9MBuHHWBGs6hN2YOCb7HXLaWZ9fSztBm4tDXuMkfTz6%2FqgzDNWyL9yknFWwH8EBSb4MywKh7E3Q79T2gq8s%2FKi1IkXPhiJEePY9wJ57r30mBwgue5fPdOkPyDw2sxUUYHaI12J93MqwhcuPFbn2ZtMDIeM6hixGZeMi%2B6ob38ki7nTaT%2BOYV9J22Xr9DGHCTi7Y%2BnCR%2FeH%2F3M3hx9XY1gF24BeGK5&X-Amz-Signature=4cddd98a3431ba9f96ea8062520d45b07a421b4ff502fb82237ddb7836cace3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S3K4VPE%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDMpm86zGzgWZTWYj47ctKQvYfpwMTRKYcF%2BM2N6qITwgIgBEpGm2cO1NnJfrx%2B8t4eOGu5MIAEyZdzN7EB8FQt%2FRoqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDDs1DkRJsbmVNpqgyrcA8Vf8OWmKrbYxh5cgZZSrbPbvzumoqKRZAhlWYdKcI1irtRVR2GAyTctttsqrq0TbcdqruR7deaKgsJh4o7U8HVtfzK2pPnsAXoUkbZTyiHchc0B1YMQ9vcgWMiUk11ZwJEauT6brVLuKuPPvnV0fSyfpDLB2YQCqWOIBIa6RFIaEKQ%2B%2B9l6qs9GxTkWVHzYrjpsHEnzyqEP3bKjrBW4xhSxeJ5VpuYLob4YYsnoIUjfi%2FvQeTbR%2BcQD%2BdjamfV3cjjaU9sNxNC0XCQ2OGMkJUgqll2yPw12kHCIjyStrDDcsSUllCAoET4VWUNiuxrqk9cmohxH0Itdj%2Bia1g1E7m64HTmF%2BYV7CIMiTq7bPiosEwxJOY0Jtend2m2Gvb1XGYjVzSEuEdWwKlxTDdWqfVuKlZvO0OL9w9fEQTKYylLsJbgqDEU%2BfhzLFISL3rUXS6hCC%2BIrYDOhkhN6nGrUi8K8nmaEb34iW5uHDi52gvzWzvhr0Vl%2B9JTJs%2Fjrk1dDBlYL8CK9kYwr3SwCo9Y%2BR7utq%2BcB87nwVjgD4K%2BUrqV2H48vmMJYBQB2LJWj9rlEvYPx9XQDa8jhYwrSVM5zJ0yRoNlNl4vBKDKSxZ%2Bz1b%2FE2jFoM7el%2BSNt%2FlgZMOz%2Fm84GOqUB6xuIizSpFHxl7AuZ9ULhPIBh%2B1jjhCJLxBRLkrKCrcfeYjOvSSRy7ZiIuMur4A%2FSYOk8iuRaIfuulsT1ziMTEUMeAKszJtEi5YP82ToxsY0UC8Xo8Oinc2FaDauRfOXnAOKDnHH%2BD7TE8GmF61FO3DNTEgmmBh4jlr797l2Z8%2Bc%2B8NEVI6S7m81Q%2BKq4pBg5OvOOmIpx7yOfA46wBYQa%2F153hhLj&X-Amz-Signature=b26746605ac461137e9a57dbce3a1d73ff97e2aa0253fb10f25eaa2a1a0fa9e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S3K4VPE%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDMpm86zGzgWZTWYj47ctKQvYfpwMTRKYcF%2BM2N6qITwgIgBEpGm2cO1NnJfrx%2B8t4eOGu5MIAEyZdzN7EB8FQt%2FRoqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDDs1DkRJsbmVNpqgyrcA8Vf8OWmKrbYxh5cgZZSrbPbvzumoqKRZAhlWYdKcI1irtRVR2GAyTctttsqrq0TbcdqruR7deaKgsJh4o7U8HVtfzK2pPnsAXoUkbZTyiHchc0B1YMQ9vcgWMiUk11ZwJEauT6brVLuKuPPvnV0fSyfpDLB2YQCqWOIBIa6RFIaEKQ%2B%2B9l6qs9GxTkWVHzYrjpsHEnzyqEP3bKjrBW4xhSxeJ5VpuYLob4YYsnoIUjfi%2FvQeTbR%2BcQD%2BdjamfV3cjjaU9sNxNC0XCQ2OGMkJUgqll2yPw12kHCIjyStrDDcsSUllCAoET4VWUNiuxrqk9cmohxH0Itdj%2Bia1g1E7m64HTmF%2BYV7CIMiTq7bPiosEwxJOY0Jtend2m2Gvb1XGYjVzSEuEdWwKlxTDdWqfVuKlZvO0OL9w9fEQTKYylLsJbgqDEU%2BfhzLFISL3rUXS6hCC%2BIrYDOhkhN6nGrUi8K8nmaEb34iW5uHDi52gvzWzvhr0Vl%2B9JTJs%2Fjrk1dDBlYL8CK9kYwr3SwCo9Y%2BR7utq%2BcB87nwVjgD4K%2BUrqV2H48vmMJYBQB2LJWj9rlEvYPx9XQDa8jhYwrSVM5zJ0yRoNlNl4vBKDKSxZ%2Bz1b%2FE2jFoM7el%2BSNt%2FlgZMOz%2Fm84GOqUB6xuIizSpFHxl7AuZ9ULhPIBh%2B1jjhCJLxBRLkrKCrcfeYjOvSSRy7ZiIuMur4A%2FSYOk8iuRaIfuulsT1ziMTEUMeAKszJtEi5YP82ToxsY0UC8Xo8Oinc2FaDauRfOXnAOKDnHH%2BD7TE8GmF61FO3DNTEgmmBh4jlr797l2Z8%2Bc%2B8NEVI6S7m81Q%2BKq4pBg5OvOOmIpx7yOfA46wBYQa%2F153hhLj&X-Amz-Signature=f972da563a01e4d8941d6fe12ecfc9a95606bb9a081bf655b8e949c6638b40a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWDKUXLA%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCOGXK5%2FIazr7AAo2mlFoT5XKSjofcBhMNc1DmdNh1hVAIgUmv7whHf9H9SAIP4aN8u2H6ri8PPhS4%2FClOLlC26ohUqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOvfWdY6Zv27HwlN0CrcA%2BxpX%2B13UivRXOaz0lxDreENjjrBY5LjFZa4nUfDoN63%2F2cRfaJkqGGnwq%2FR7xs%2FsjUywgGx3f6zvXyS27nt%2Bqh%2BJr9vKygBqLGAWNcqFmRhcHntLeD2DlA5Ga2X7NF%2FkGki0PUcGDBvFMqVmj4k21EFLdgRogN%2B2BVxf1jxeD7UXic1fs0lxbVbG%2BOGwVhiABlREFxKh%2Bt7kk5svBi9mq8Zq2QbPLd%2BjvehVZZF9cRPMYG3vTn%2FH4WlLru4MfYNHd48U6Jw36zJb4d3kyoaSla1isnIuBGxBxltqq8xcxPb2SNWD%2BCPLVEboW%2Bd3WFQCAS9NfswWe5bfg6C1aIrIJIRVPEraCNYKqPzynDqhtJdfSOZnkKUlsLOjcu5cGiA8EhOQYYzNvUkVbSjZbjqctFbRCqg5fZ2lUq%2BLABejuMnUUNPnqy8KpMbQzrbYW2fRynY5oNIIw7cLrkFEfJ5g%2F4oVWYYbOhzzMEsenXXCw6NBuWxm3Ypm%2BdF0f6WgJux5zBg2sQto0LT%2BZG8cn8AsXz47ss4%2FBtIr2oLIfoBhuIDvFAaU88p%2FasQzkwnGG2tQNGtMke1xYByBwpugDZ%2BzXAmtUqcTQJbMZ1HfLz5CD02B%2FjAj5PDD1Qgrzk3MPD%2Bm84GOqUBywTR1zFgZRvv1lPB5WpOZZRQbyypvozgRmkdZGPrt4nFn4baw4UJbkNPfb3hYU2xji3AeUC%2B%2FEq6p%2FmA3ZcCIUg7h3al9%2FH1facMgMTefRZFWO2s2Q2eVEhiqKfMSPL0WtDL2XUdBY3ca4TEr6Ha34C5TQwcrbUW8aLSBUnE7NM7%2FhT1WHQk64P8Ap3MmGbpuJZpMHpfKr9XEw9UNEnGwZVQZsBS&X-Amz-Signature=dacce22ca82d41a2b6e393468b8ea3133b224a941f88753b4f33347d0a8622e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVRLVYL7%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCs7LpOodDzy%2BZfmnZ71rTIsOUSkPOI2zj91WOoq%2BersAIgAT5DDRmROwv0JDV%2Bqk5vs1CIZZqsEJZ%2FtCgqQChWq6kqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFkxOKAmoR2gj%2Ff2tyrcA2MLZV38SJKok74A%2FGqzCQ0NbrixziZ5TUTrL6%2FrXzZwS7oDC3wcSBwAu37sWswz5LBi1XnY2L4MOlo%2FSOKLwfkSezBasIZheDXYfMXzqHuG3%2BiUUu1cBbq3u0z0enM7cH0ROdWSqtB1VxWInsn9t8S8xfZfvUWjjdNfveleSq51HrZ4agt6dCZOv6hBc0ErrJMGtWzmL8Q%2BSKU4KonnpMoFwMeuVIF%2B%2B9VcWA3YK1k2iBiUkCgNvxg1cTPyUabQl%2BYoXeM26psXSr5iTsyzerHz%2BTUVzimJSaeLPPCNgkIFJ6qC07SdULhxiYaNj2trnn7hzarBCpoQfRt9Yq4PO9ZxVus6tDyKMoXWg7fPa7bQqFPlqS2FwmcICWZwwh4k68cEbA97UQnLwEGzXH1YHPcCJzLM6gbAiTgW0TS1LFEbO1koIC0NI0VMiv29OkHC4cY5GrWTtGJIsDQttMgEntossD4NeBuECKzTqCAKnhX0QhY8rpjz%2BeGQejRB3vPDazjg%2BiPRpR%2BFC2UnHXdW%2BjgiFTp1zDmkYUWgvIsQnLSjceimqQsPwGHXKDfVRUQGvq2pa%2F8n9Su9vhUJy33wpmpHJ%2F1bLICkgEq6qKC2dVxfS6JHGxL2jNrJqbtrMNj%2Fm84GOqUBLIDUuZV%2BUbmzD5bEFwoK5H891cLl7Mh%2Fn%2FfUUGoz1DabwcwGok1r9FViHvpjlXthMdochnoKha1K0nk8FlsBX9VsH7wJ1l4oAmTcHNxAvF8JZ5XfqySCpQPneI36%2FxKZca%2BLfP6Hc%2B0Y%2BCUl5cR%2FacUxgTXzNhpX8IVulSvBg9ILEZp9MItQszpdxlhXfyVX8rhEfTXyrYS5%2FtfBfcOCec9rKNQ%2B&X-Amz-Signature=9d63e67468580bdcc788c1e42c57300dbf9bf3323611c75a82c5fd4fea48fc8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3TZOTQW%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIG150MX%2FfXP9ObZZEiC21QRgNmP%2BZQ43%2B1SGVFrbakz8AiEAiCF%2F3ZoF8epnAKuRFJT9rbA3MIQD5Ij9Wm0qtAhBV0wqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBcpdygWQd8%2BwA9rjCrcA5LKlfjtVF5fk7hks24zWBK3PLQinhWrcGnlqKfeaBUUCkFGs04nL8WO0aBgovKo3ctYXvqOEqCYUt1n1MlLPHgfnRfvblfg%2BsWjjR4yIYIxFC6JGx8qcTDxIs7jNi1DAi%2B5VNyCA7fngMjHfPmfzGaqMnT5oIZk3mlLZgvh%2FnLjHU%2FznPJXDH%2BlZVVzYLBsx0WC89A78SICf7WJYD7T3y7mAWYoqRJ7VZqkNnSt1p2PSNUaURfP6Oh78d3aVfHYw%2FQyyRTkH7iEt8n%2BJc67eTSm%2Bu1zQBYBHmK3PIEOphIrateA91U8tcH8fvxhShn8njAiuvWlCgHNMYzCkjBzlQTvj4epQFQ%2BGVMwpk%2FxkZafO1%2F4l3FgZpILpztUCYNsy3VkOpZ5uggfdVqdCPWOVgjPBnAWB%2Fzos8mPbbc9Nj6j8l4IeGEvkLW3YVbAMkdJpMzGhvEj5NmCIEI2%2FJ83LXAzS9FCu%2B1EeGyjA2tDYZWH6MVUJgxEfdetKQ3aFrKVFaLhbh82cNi1fOjd3O%2FuD9Dtp%2FJGg7PdAotk3q1CLr1jYDai55FAZBWoE5%2Bte2CZIpAWKFCut7lFIGPl9STXCyvD%2BalbnZrINhtlWYv57UCtrLugU0sfSlKVztBCMM3%2Fm84GOqUB0EhGABbGqdvzlnQAm6ulrpWVL0XcFemD4S01r9Bsopc%2BynOqBQqB9yiphqUXpWFKOsJufxNXfwQDxlKrCedgQn%2BDcLSH2nhMPmlhBw6Bz14bkmSxYOn26jF68UsRr9hhiJbwrqCs0Nns5QpTSi3ElLNQDNtprTyy0M0EmNm5c6h8uinOOf7kKSaEq5mOg52Rx6mkcpgzSZroCbhzukXK5IUlBlhj&X-Amz-Signature=fae673e4e5fd3e768ab2d97eaf9dbf4d6a594e93ecc996b4c697754998e3a1ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DE7PGWV%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQCfBBl1f7uURtqpSs%2BhLMZ8NIp6l9e%2FE5wXI98%2B4GZw%2BQIhAN9EJ8DJZQU8xznWsiftuByzzpcPzgygndn1zKUWmpddKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxWK3%2FrHku0%2FplWkVoq3AOPfPSJiDDoXxZ%2B1dlelEd85ntE2t%2Bs17ZPVIQhTjp0XKzwiysc3Y%2FCbJP5LxFqrLfpSg7L2Nsf2T62hhFAZ8A4ewUn6JU5iOWpJqK0IqY53i0fRLiNdmHfMmOcj%2Be4e%2FJM8T5zxHrTBuaQUygNURGjDikb9MosszfFX%2BtDhyMcvozXJY7x9sr0CjW%2FLOy%2BfXXLgWfDnf0%2F17zLwKtGbXSN7GohryNm3dyjiAv9mHVENph4n%2FFzNU93P1BEygSPccjADHEJRwMr67rWSFf97ZSYVTg8j8XS2GQOjNzYMauzgFeZnJQylS3D7zXmF26wukYMOrpB1y3OxDkOGD0qiT20mDIzItbo%2FwFuKiYTTzS2QjRekSqStY9LhyIJDdfpJaTEhBqW45HQp3NrZFu287whjtLW5RchYA58No3nbgCoUUlHxkcCU%2FA%2B6Mqjbi4YGLInRlVsILdIsDnmJiLXWCd83gUcAjSVPAmZpoGAebZbf388xuzwOpiovdozedBTxZAviY1d5%2FX1Hp6dJyovzeClovn%2FThtmSQ4iIRaK%2B7zZ%2Fw%2F7bwXABlnj4cGo4ZAlxZE9MEHI6QEdgN05Lt%2Bo2zE2ICIUtKalK%2BkHh0Q4TZV%2FnZLgg0Waemwk4Q5b9jDG%2F5vOBjqkAe4qu07p5Hpfsjj6BWMXEWfckSqV8A1mFWWHdp3PI%2B85Zf6UW52z2ch02ibUU6kbbkn4zfGCtNFUxYkPOQq%2B2Na8bOsKDed5N06td52T8Fcu6ZpNYR0k%2BQZrY3euuFQ8DhlWtEmX4iiq37SWUsg%2FajQAddLMzfoPF%2Fm5m02MVA8fwrDPjKIq%2BSAWHyYePR2nPXWzNhhpvgWp8YN%2Bqs8vHFvQKhhy&X-Amz-Signature=e4cde9e711195344695ab26a1b11907c62c9cdb10537f98fbf8cdd86579190e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DE7PGWV%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQCfBBl1f7uURtqpSs%2BhLMZ8NIp6l9e%2FE5wXI98%2B4GZw%2BQIhAN9EJ8DJZQU8xznWsiftuByzzpcPzgygndn1zKUWmpddKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxWK3%2FrHku0%2FplWkVoq3AOPfPSJiDDoXxZ%2B1dlelEd85ntE2t%2Bs17ZPVIQhTjp0XKzwiysc3Y%2FCbJP5LxFqrLfpSg7L2Nsf2T62hhFAZ8A4ewUn6JU5iOWpJqK0IqY53i0fRLiNdmHfMmOcj%2Be4e%2FJM8T5zxHrTBuaQUygNURGjDikb9MosszfFX%2BtDhyMcvozXJY7x9sr0CjW%2FLOy%2BfXXLgWfDnf0%2F17zLwKtGbXSN7GohryNm3dyjiAv9mHVENph4n%2FFzNU93P1BEygSPccjADHEJRwMr67rWSFf97ZSYVTg8j8XS2GQOjNzYMauzgFeZnJQylS3D7zXmF26wukYMOrpB1y3OxDkOGD0qiT20mDIzItbo%2FwFuKiYTTzS2QjRekSqStY9LhyIJDdfpJaTEhBqW45HQp3NrZFu287whjtLW5RchYA58No3nbgCoUUlHxkcCU%2FA%2B6Mqjbi4YGLInRlVsILdIsDnmJiLXWCd83gUcAjSVPAmZpoGAebZbf388xuzwOpiovdozedBTxZAviY1d5%2FX1Hp6dJyovzeClovn%2FThtmSQ4iIRaK%2B7zZ%2Fw%2F7bwXABlnj4cGo4ZAlxZE9MEHI6QEdgN05Lt%2Bo2zE2ICIUtKalK%2BkHh0Q4TZV%2FnZLgg0Waemwk4Q5b9jDG%2F5vOBjqkAe4qu07p5Hpfsjj6BWMXEWfckSqV8A1mFWWHdp3PI%2B85Zf6UW52z2ch02ibUU6kbbkn4zfGCtNFUxYkPOQq%2B2Na8bOsKDed5N06td52T8Fcu6ZpNYR0k%2BQZrY3euuFQ8DhlWtEmX4iiq37SWUsg%2FajQAddLMzfoPF%2Fm5m02MVA8fwrDPjKIq%2BSAWHyYePR2nPXWzNhhpvgWp8YN%2Bqs8vHFvQKhhy&X-Amz-Signature=7d9883a9b0a608f2a929b67d7f37b244f15e1cecd27737a9904ff5421a54a8d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P4KPO6H%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIBh9NrBXBkd4rKE4KL34AzruPLoqoJD3Yvpaz0E5wsDPAiEA2xjjfmc2iqcHbxCBzanoeyVl9R7Zzs1FPBOaNhVXeOkqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBFLLhsO2nuvjG1vQyrcA33zxidnjfZUrVeGMG6I%2BfWziGsqAIRsrWoxpa6d%2BPj4axxTaaijQfeC%2BdeTlY6eT0LSH%2Fd0mi4hZTRPjgiz0zgOOPOwG2b65AGFl9i59T9UEvYurmx0Kb4zdpspJo3H%2B01%2F%2FX2rF%2FJsRNUedjJiCYwb7EWNs%2BBPMOLEo50vbtyCLKAQLTSS7mAe6WM8ZYNQI2SA9tzzBfQV%2FTl0NctMxNQlwefnlvipD8P9H8mKrX5XxECfXnKuU1hoY8s9YsqMQ0tDkkfo7ZA%2Bgn6u%2BlJFn6U1nz3YGcqOKYvmQbeSsa5pawv6VpB0Lfn4hvUUbahAKq3%2FM925oQsFTTEvuHyi4LIyq%2BaOflyB8HkS9A2Q7yvS%2F9gzLholltI1rJ%2B8RP%2FK%2BYO0jngz8t1psDACakJnpvF3X4098Dml8VtLb8ia4GWdccJLeOC1yw3ad3dkE3JJREQeH2yB0acphbSKqtuaBndmRjztXvdQKEkQ5DTkKefzcCqc9yPXy3JyR3QRypLzHLfOzPIuiHxVidz9ar0HuCtsguUeyUGf66bcZ%2FZIENyx%2FXItoT52TRn3WIYC8Ytk%2FKvAEBi1%2FJsf0QWZKCwYzmNeF%2F6q6j3MU2ZljpnghslMc5ig8YTHWOtFErt5MImAnM4GOqUB9XMz0GbHsm0eh9ZSh5yEBXKHKBnBcLjFRdWyCHwTUdk3w2FRX9ETPQGAQuwR1MibpIckNnatVVRGnKbL6k%2FwEkfEIV0tn06HMlKewNqupa3jvLsFecm5rUz8rYnXjfOdj8sv%2FIg%2FHE9LDOhSSmHbVmRZxXyfn8Mg13ez2lX4aPbeoI%2BFcIBWJ8QpdB4m7yqw4ceTibOpZTJMEtm0WZgb9HpKsVjk&X-Amz-Signature=2e020dffd968d25a96a041c5b93332039af6d56723f3f8ff1eede2dc9340f284&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUHMBTWI%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDDYfoMN%2Bc%2BJbsn58kU6kQwjNTgkAZFbM4MonPmJ1ZCswIgSESYl07Fe%2BXjlK7a71UD2xkXuanNG8zcBWFB8J%2FczdwqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPp87K1RcMbeIBNMcircA9Euc7dNsoVpPrWgN82vb7adPTgd7W0xlMsDywPy7OdbNQouGe5%2BWhHf%2FbWnR9Qef3qEiPuP3GVlZEpYMpe4%2BwLu4QZfmOtGvmqEHw%2F1zcrAgOpTL1IPKeHbpfL2TiAiVpgjXcOp%2FZULLZA15PVIVW%2Fud5qQKWYnn1rnF%2FOtxI6V%2BMjW%2BQ3bn4w5xmnVWCF%2FLOpoJVocrqNOlXE6dZaKNjkdaTJZG%2FOTu4vP2iC0wQ%2F6%2BMIX%2F2%2Bla05n7IahgtEiCG8kn%2ByON0uZKPn9rEqo4hv3aGo44XOVinEqLufQRfTs0rBm%2BVujLG8CsIwbxvZyAAKtpUEqxVTsIw5G5tOjUxp6k6J8JXEATZO%2B%2Fwd7ReFANVP9kL6sumngPF3YWJGGX9XP6ykLVoEPriacxM3URya2nkdvdwq7CK47zacZm5gjSDImQya6K%2F5wwpjQbswww7nZlKzIXcrrJdBd%2BJxzfu%2FKWWpfW6i8R7t1XzQWrhieoCWXPYgRJyCzCotnrbk4upIvvhbfyPrzisUkbIwTeYpUwEC3r1I2HT%2F0CmZ0E2GWn2ADYdXNVJUeyKE6Y9DwZrd7DpVWTAf3fAreG7848BCk8oxADpjH7GuV01raG0LeUydKZYXBC89vaVfJMKD%2Fm84GOqUBuf8RF9RjaplpBP1fc2CYz4gSHH7Olq%2F27G%2FGqLNM6y6KqxEFoZgrqXUetrBj5Cp7YZN4qJ45tcz%2FGw6t17VoUye5NZAgkzhjNkahrfa9y7%2BphQ6JlgO7z7QY1zawMZe0uXwZ355IDlWM71awNmxH8rlrywf9tBldDmFNfhqsYtcin2TLbi8RYdo127OB2Kfhk7d%2F4mmLKFz8oFdWUvF%2Bs9bWraIA&X-Amz-Signature=89f307e8d03a003091cdcbf5ce537fafe3390fb85bd5327893e1c723f5a72820&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUHMBTWI%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDDYfoMN%2Bc%2BJbsn58kU6kQwjNTgkAZFbM4MonPmJ1ZCswIgSESYl07Fe%2BXjlK7a71UD2xkXuanNG8zcBWFB8J%2FczdwqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPp87K1RcMbeIBNMcircA9Euc7dNsoVpPrWgN82vb7adPTgd7W0xlMsDywPy7OdbNQouGe5%2BWhHf%2FbWnR9Qef3qEiPuP3GVlZEpYMpe4%2BwLu4QZfmOtGvmqEHw%2F1zcrAgOpTL1IPKeHbpfL2TiAiVpgjXcOp%2FZULLZA15PVIVW%2Fud5qQKWYnn1rnF%2FOtxI6V%2BMjW%2BQ3bn4w5xmnVWCF%2FLOpoJVocrqNOlXE6dZaKNjkdaTJZG%2FOTu4vP2iC0wQ%2F6%2BMIX%2F2%2Bla05n7IahgtEiCG8kn%2ByON0uZKPn9rEqo4hv3aGo44XOVinEqLufQRfTs0rBm%2BVujLG8CsIwbxvZyAAKtpUEqxVTsIw5G5tOjUxp6k6J8JXEATZO%2B%2Fwd7ReFANVP9kL6sumngPF3YWJGGX9XP6ykLVoEPriacxM3URya2nkdvdwq7CK47zacZm5gjSDImQya6K%2F5wwpjQbswww7nZlKzIXcrrJdBd%2BJxzfu%2FKWWpfW6i8R7t1XzQWrhieoCWXPYgRJyCzCotnrbk4upIvvhbfyPrzisUkbIwTeYpUwEC3r1I2HT%2F0CmZ0E2GWn2ADYdXNVJUeyKE6Y9DwZrd7DpVWTAf3fAreG7848BCk8oxADpjH7GuV01raG0LeUydKZYXBC89vaVfJMKD%2Fm84GOqUBuf8RF9RjaplpBP1fc2CYz4gSHH7Olq%2F27G%2FGqLNM6y6KqxEFoZgrqXUetrBj5Cp7YZN4qJ45tcz%2FGw6t17VoUye5NZAgkzhjNkahrfa9y7%2BphQ6JlgO7z7QY1zawMZe0uXwZ355IDlWM71awNmxH8rlrywf9tBldDmFNfhqsYtcin2TLbi8RYdo127OB2Kfhk7d%2F4mmLKFz8oFdWUvF%2Bs9bWraIA&X-Amz-Signature=89f307e8d03a003091cdcbf5ce537fafe3390fb85bd5327893e1c723f5a72820&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VM3WXR6%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T221807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDukPd%2FMMqz%2Bde3pX9oC0n8bJvHos4R7eKY7VbkouX%2BswIgfTWFz5up7YRB7NRNWrOl5CyG5aPEtJnyDwVNloladXEqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEC75uXP3O3esznHFircA3Qw0E3wwgTPCDC7uVT1peM8dVt30gqT%2B0gqATIReGpQORtYNANKKF7qAL8lAe%2FXZ79XMpEltt7sgEg%2B9wpeYGJ%2Bj8uS%2B%2FxsI6vXfWy9RUw73B%2Fmy3L%2FGxOf66dTL%2FP%2BlU7RuhjYkymc5Sx8WmOPl96YuZGQ2rdscH6JCfRVp5qhjFmG1ZXYMXF7DfF7uDbXUMBwLjKyxalEdv5D4i2bT9uHEo49KU%2ByTINEea%2Bo2lLQCkzVQfBsM7FCBUyDyxjom3vpK0JDklbyX8CNCctK4MkpyrKRa40sPHlqY323h3EvFTdQ3z3V0Lw6j3NtWb%2Fs269VHf53adjMXu3hUnphpadCMUQzDGpF8X7JP9BTPVB8YO1%2BRN16dvjL8%2BXUO%2F5h2xoVGkA7lKVUKKVk7qCyco125bq9K%2F9hjKHLC47B9TaD2BrWBQYcFFHvYsFPJvuRHjNCBLRcGMIvgvWAWF3JMADJZbcz0NTf99pFMNRyy8Bb1x3F%2BCzyDrlecGvoY%2BqBloMletAeooPya3WQfJg%2BvF%2FRjtaY1FsHH%2Feaf1XVkVctpjOdDUyT0Abpyh9EID6%2BoMdPBcOkxn2Jq7hmxea3nQ5ZRcBl0mBoYtdKuaaRVbajXsZkWBQ8EpS%2FoHw1MJL%2Fm84GOqUBPIoXZ%2FSdF9TD%2F1W3ajZF94x6uVVNmznRpoWuTrrK1jkRiW%2FJYxeaZe5oD7R4X%2B4zB%2BQE4ekmEXKd429AfYcUl%2FWI9bK8%2FzY116Zgh%2BW814iypkB6BpTcx4UYz4JuE0ppJnNZlDiDuQNNgzpOnmioLazOnKfwmIA4F4noaADeEaaYkD%2BSppM4udBKWjVf1KHejVkgI%2BmCfGMlbnUusNIwC%2BKpfOtq&X-Amz-Signature=c49ceb5e2607656b40bd11a85f4b00c3bcbeee58321147cec93c9ad14deb54cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

