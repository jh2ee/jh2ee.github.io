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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNTIH4YU%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC5ekO4piwbYg98MGJ9IfmTcFx03xzuD9DyGtHsFr91SAiAX6kMJzFfLrX37ik4iFYoFQxH7q%2BwVNEcIMCRMzItV%2FSqIBAiz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkw4IFCzstNAwTs4uKtwDmzINYqOB8R3bVb4aMP0qshZV8JMr7bdo15GJ4ZEzeKhWq9gLXSct6vurYlFpGXcV39s5eLaif4pbm0zzIPpHYUXhnWUtfxcBX38%2B8YUzEb8Ijt0emhQcWyhCKZdz2osspueqVETnLx4hbyASjq1F6XC4eSqmyV7O1gerR5UdfctkngmHvmXky6ZRHQz7WWMCMhYKXcNjpEPUkE6dQFowQ32cY8fDvO9uoI2RujFMBc0fpUl0pB5lSKcXehUA2zP%2BrH6vTeKtL2AB1iswnChh3xhfh0mLsPSxTs8l6QTGil6LSiZSpqFaAuCxlzn0kAhTMVQrMhlU6kmt9iAQ9sy3i2wEWpEGtRl5LQvYLXpFYEYeMEVVFa0Tfb47jkwWTvJCxZEIr9%2Fa3yxqJnbz5h4ebPFaxmfHsTsN6f5C90ompaVMzhpMuTzlxrXuVapQNJPsB2TnFtqjBTRaub5iBOIFMeOU0iLDIlLIG4Itq5g934T17nomey0pDyNigRt%2F%2Fltm2otads1%2B2yTaIl8I0MfSmfCvwJffIR0QYSVHdznSyFKnQcaR2oRMXCuPH8WMcVwZKFB%2Bu2JJ7zdg0gwgpye9qt3K83gbBhwsvEOijG5RlecL0C41Z%2BdEvjQF%2FX4w3LSQzgY6pgFJfHGUnC4MeJ0HxrhwdOsWMc1mL9vYwkP2CEIef%2FnSorbbCVjoFll1n3AHF9%2FarYwknQ2FUiZlncsyP3WIri76OrJpgl1T28gI10O9j334Vqe2cg3NlpEkkbhFYErob%2BcnJKUG0HuUjwQOVFEO21C%2BO3WH9Vz9IetxMuDjMOaLrm%2BA87Ro954ONuVifpX5r5r%2Bk8CWLt6wApOMem0xYm6A5vtk33CH&X-Amz-Signature=fbf10a31647f868e1c562c8e6ad9905860787dcb6add8f8e537fb6d4ccedb043&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNTIH4YU%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC5ekO4piwbYg98MGJ9IfmTcFx03xzuD9DyGtHsFr91SAiAX6kMJzFfLrX37ik4iFYoFQxH7q%2BwVNEcIMCRMzItV%2FSqIBAiz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkw4IFCzstNAwTs4uKtwDmzINYqOB8R3bVb4aMP0qshZV8JMr7bdo15GJ4ZEzeKhWq9gLXSct6vurYlFpGXcV39s5eLaif4pbm0zzIPpHYUXhnWUtfxcBX38%2B8YUzEb8Ijt0emhQcWyhCKZdz2osspueqVETnLx4hbyASjq1F6XC4eSqmyV7O1gerR5UdfctkngmHvmXky6ZRHQz7WWMCMhYKXcNjpEPUkE6dQFowQ32cY8fDvO9uoI2RujFMBc0fpUl0pB5lSKcXehUA2zP%2BrH6vTeKtL2AB1iswnChh3xhfh0mLsPSxTs8l6QTGil6LSiZSpqFaAuCxlzn0kAhTMVQrMhlU6kmt9iAQ9sy3i2wEWpEGtRl5LQvYLXpFYEYeMEVVFa0Tfb47jkwWTvJCxZEIr9%2Fa3yxqJnbz5h4ebPFaxmfHsTsN6f5C90ompaVMzhpMuTzlxrXuVapQNJPsB2TnFtqjBTRaub5iBOIFMeOU0iLDIlLIG4Itq5g934T17nomey0pDyNigRt%2F%2Fltm2otads1%2B2yTaIl8I0MfSmfCvwJffIR0QYSVHdznSyFKnQcaR2oRMXCuPH8WMcVwZKFB%2Bu2JJ7zdg0gwgpye9qt3K83gbBhwsvEOijG5RlecL0C41Z%2BdEvjQF%2FX4w3LSQzgY6pgFJfHGUnC4MeJ0HxrhwdOsWMc1mL9vYwkP2CEIef%2FnSorbbCVjoFll1n3AHF9%2FarYwknQ2FUiZlncsyP3WIri76OrJpgl1T28gI10O9j334Vqe2cg3NlpEkkbhFYErob%2BcnJKUG0HuUjwQOVFEO21C%2BO3WH9Vz9IetxMuDjMOaLrm%2BA87Ro954ONuVifpX5r5r%2Bk8CWLt6wApOMem0xYm6A5vtk33CH&X-Amz-Signature=fbf10a31647f868e1c562c8e6ad9905860787dcb6add8f8e537fb6d4ccedb043&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYOC5JIU%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHZiIwuoSNBg9pSs8IuKSZfg7L58gH1HT6cKtII2OJVpAiEAt3gWkIDeiFRwNVoybbq4TsjGxSvBuEupxSdkWi9n0GgqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEhsM6P01u1IySw7CircA3UXKGnarQFH%2BuQ8dVtFNYBvbh4TtheAU%2B66R2cVIsX5wCdH5cYq7ITd5XW7sQ3iSOKyQQY27gjwiaAkKEZZdWp1qVgY0HGRzGcpEe%2B6CJgPDb%2FAoh0373VYo5RVzpKgjGGb9ds%2B%2FNwQMnHBVCIni245qBTSm2XaC6F5e8Kc9LZ5BJucQ%2FEBtoiclx%2BQfdGJNtQFJ5fH75ZSAaVWJaMa02uAryz0mzMTKFCsBllvCwY%2Fiu0J1HoYHraVqw%2Fu8DT%2B5kz6P1H3bZoc1psz6r81xQMPCrJ8PvlzYCIHV65WHthevbA3lcOvgD9aJzzF6yJb9zQ9PQNRlUHbMuU2guMlZXDHXmVX6Nq8QvIan%2BRvFi19KiC5kMUxBebScOiShhl1lnw8VBTd0ZFCpmFFxrqqmFaYKYaQRYG0US1fGpHP1Jw%2FBTc7NMS3Wwj%2Bl1X4BSr%2FdH%2BXgpBF0bt5529ZqhXUZiLDWchtHOiJbrLFbEbC1dD60tnkX4TKfpTJzYEY%2B9UvGRTJskUZe%2BXOe6mQWaknrs99QhcNSI0xsQIyZMqaVDPifJySPWBZXmOvD3ihGZKSK4cdQQN2h70kiv5f3CoDUJKk1E9VPcDTM0i9s0FJMAlJGmIWVU2fV3dN4b35MOi0kM4GOqUBt0Iep8YCh1%2Bh7Hi7PU9UlRAbsMX0gk8YhiyZvy5ds2%2BG8TH0a0BGVFQt7oBmukD00kfonDmmp0WNUIHOHbdfPqYl8rX5%2BSL3zC8%2BZgdq8i5KldPIILQWrOMY6DtuczCs98EXUyxsnPUMY7jh3ngPfduF17QZkwtkq%2F%2BxIWb9sFQ9MMEqhyDF%2FNDT6WuKtIeBPX432Q6i8TIJq0LEQ5%2B773g5kEcZ&X-Amz-Signature=c0c64855a2fbaba26abfdad5ed9c0a7b5a3a93356ff1e791b1c2b79867217ef2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Y5ROG5G%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE7rFC96HLZa2BcviaYjyB19Bqnt64xhIzkeic7vu7tmAiEAuV7fnJzCkkeRBRIRMJ5VRVoXOjh7y3%2FgGt0Df4Ry1O4qiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJz5UNHItOuE39P%2BRSrcAyN5NHhSz6VSsl6fRNHEknzvR7M0kVJ4PfxWRPshY4gMGeh8FBNqaGIpvRS9TTehBwW9PcMeWPAqoEewcKXhSeGdG5Ce9QKVT7f%2BMXvmzs4bFmUpVc8VQStpwytda5hAPhzQ8C1DlYLuCdGek7otMfd6bqgfv9dBA3gbj4zEr8qeULmpCpoTAPRur%2BwNpK76sWudoudsu5jCFsiH%2FnPZdJ2WYAnAt%2FUMCk745G9aNXGzGPyZHNvjldkg4WXcG1m8C6kEJiCj%2By9rEen8JmxDnCfIdudAEzt3%2BaDl2kOPvPiDiNWsE1YuQPVRZgfuxmvlZFXeiKTCc8bBlMRzL2%2BPJqL8C2aQaBGAq0N2pZ%2FYtr7rhkw0mpkIH1R0ybdafykSr8e2dOHDXMPT%2FGR%2FE%2B15%2Bh8%2FANvA9m%2BWgnp5otn0En5WqDgCdbItz0P1ZrKdjkJUDA8YyHec86aWzOy7icVWBW6pz5B06NFsBkLT%2FqdRgK4wVuy5uGn1qb2dFPZrYFYxoAulvHkdsvxtYT2O%2FcgIpYi7xEDnkgkdhoz0KzqkLCOuJRFU80TfYlbzIMNiLa8nlYrAULC5cNbgMPsdBmNR4e1e%2F%2B1d6ECJobH4CUEuBgDX1fSiuJ2%2Bz4R7srmTMPe0kM4GOqUBE5nboyZu8pcGJsAAG2Fo8hYvuJE1xq2HJ3EWB1JdTSAMg2ndjvhsHjEXc60J9lToXofxbAHQkLsQu1tdGoPzcO0%2FE8tSq1z3ZvXM2ibT4FX9eiO1FpS8%2Fc5gOGmT1j6wW3Xyc823zMD%2F3G7OZjO2lPpJenVCObWlwd9zrS181ObS7rRGABjt%2Bv4%2FuZ2gbs3zKmhx2zMi%2F9fac1iJAgdYUj0%2BtAB1&X-Amz-Signature=0f614238a73fbf8e156bb860b3b5730678690ae2fd0ce5759812755b96d35447&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Y5ROG5G%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE7rFC96HLZa2BcviaYjyB19Bqnt64xhIzkeic7vu7tmAiEAuV7fnJzCkkeRBRIRMJ5VRVoXOjh7y3%2FgGt0Df4Ry1O4qiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJz5UNHItOuE39P%2BRSrcAyN5NHhSz6VSsl6fRNHEknzvR7M0kVJ4PfxWRPshY4gMGeh8FBNqaGIpvRS9TTehBwW9PcMeWPAqoEewcKXhSeGdG5Ce9QKVT7f%2BMXvmzs4bFmUpVc8VQStpwytda5hAPhzQ8C1DlYLuCdGek7otMfd6bqgfv9dBA3gbj4zEr8qeULmpCpoTAPRur%2BwNpK76sWudoudsu5jCFsiH%2FnPZdJ2WYAnAt%2FUMCk745G9aNXGzGPyZHNvjldkg4WXcG1m8C6kEJiCj%2By9rEen8JmxDnCfIdudAEzt3%2BaDl2kOPvPiDiNWsE1YuQPVRZgfuxmvlZFXeiKTCc8bBlMRzL2%2BPJqL8C2aQaBGAq0N2pZ%2FYtr7rhkw0mpkIH1R0ybdafykSr8e2dOHDXMPT%2FGR%2FE%2B15%2Bh8%2FANvA9m%2BWgnp5otn0En5WqDgCdbItz0P1ZrKdjkJUDA8YyHec86aWzOy7icVWBW6pz5B06NFsBkLT%2FqdRgK4wVuy5uGn1qb2dFPZrYFYxoAulvHkdsvxtYT2O%2FcgIpYi7xEDnkgkdhoz0KzqkLCOuJRFU80TfYlbzIMNiLa8nlYrAULC5cNbgMPsdBmNR4e1e%2F%2B1d6ECJobH4CUEuBgDX1fSiuJ2%2Bz4R7srmTMPe0kM4GOqUBE5nboyZu8pcGJsAAG2Fo8hYvuJE1xq2HJ3EWB1JdTSAMg2ndjvhsHjEXc60J9lToXofxbAHQkLsQu1tdGoPzcO0%2FE8tSq1z3ZvXM2ibT4FX9eiO1FpS8%2Fc5gOGmT1j6wW3Xyc823zMD%2F3G7OZjO2lPpJenVCObWlwd9zrS181ObS7rRGABjt%2Bv4%2FuZ2gbs3zKmhx2zMi%2F9fac1iJAgdYUj0%2BtAB1&X-Amz-Signature=e57baf2ed76d9d7103f03c8ce8fea6f8d5946c04a4668786055b0aba05ef0867&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UJCR7S2%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHDlwFMOTI%2FTG2U%2FJktMu7cLrWWLYe1sZC0qZRtxLfX5AiBtjg%2FMHBLynO1Mx879oQpnqvMeT1gd8AoBR855TwbkNiqIBAiy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkUsbZnR%2F7Z%2F%2BOCZRKtwDqHcP7qUicU91GDqkDaC%2B%2FhdxtV6dUYwgtZ905oJGm%2FtL11D%2BWpTDULEkGMREt87Z5UBK92j2PjUjudYb02hc3NFqU73Qzl6V%2Be13CGPhPg6xLHLkhuYyNImXtfbCQiqWXViI%2BUBmSs2PcXL19LEbBRXIC6j74cnxat5jZjqOW3Yxon04SIm4vjB2t2NBOUhWtfIkLp8MnrF04%2FjHXNAyKh8f2NmkMqrsbl5%2BFcnl2FB849Jj2iFqqoUMO001JT0IJRbnZQJYeLbR3%2Fb1rwfOECeijVDNd4ybFw2Jh7leZ2fxRWqf%2FfzCWpsGu152RkC3vU85R7DmcRGSDcdEUsGilSYhyj10YQJXXQPFVWZ12FDjn9LvGoC1Aiw8DHuNCr1j1WPsgGi6yAPzBS3ZoYyqF9NlvNiAMSjFgsEOyg%2FMBib4zHVLOf1cnJeroiKsm%2FMsZzaPmP%2FE11jzWBx02UNHXa2hfif%2FWonCVxveY0o%2FG34v7BwierkfHYjwIZEdqao%2FXfu8nsEAag6fZCtgtHsQhFJUkT3g0pTrSeBQLs5M5kgpNpMD6Uuozw7HWzCMQS1GjN0pyolj4cKzwkNJDlKdA%2Fg3HHLHS%2BcvZ47GoMXoilBes2laW5SQ08P%2FmX0wy7SQzgY6pgFIXqQMfWatDx0sARKGQduq49MoPVaaWZFROYIPt%2BLPTRIIWpIRm9CHpOGh7wdrHgt%2BYM7FDo7xaa2n%2FhywujRZTTphiz2mBqhBAkAH7M3wNCLBbiDV55o0NAXWTwK8nftpdP1i7n1sPRGo2DYB4DqXgk6M9J5PoAqRQkgrAgzwdoGPxa3CTR3k%2FdlD3nhnxBg04ML7A21QlSViKnvjigTGykVqHI8%2B&X-Amz-Signature=3bed76958f6c8f17ab58ef73784abd768709ab29ed42104e1c6dde9208c67347&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHI2O5HB%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFLq3I8kgCOJ0h%2Fzh2YjamOtWkhkyqQfrNkQ91pWQI0PAiEAsS7l95K%2B47%2BMHvdHSY3t%2FsyAsafj5WvZ3tY%2BRKdNXgsqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPRYfOSdWFaGJUomJircAy6lbbMV%2F4kWo4An1imKg2we72HX5d1UfNIe%2FKT%2FFnmAmxZirVaPXhTyN0q7lwLwhhldP0ASZuVs3SsL7zHfeFRiIzhhNv36mJg%2FUarZbHiiKgBUFM0Ig1RCyqeMO6yIaU8twq0FVm9%2B2IMKwx%2Bgu%2BFSNIZ8XoNvkQ1UiAx5eJ8DkpfN5hQPXdDsC9JGUMVvSl01dmQ1Q03L2qc1ueLjQdvrNa7Q31SWM3HhZ658d6B%2Bn19HxJNsex6VKKaQgmnNvT5LWcVDpeC2phvo7cjPblxHuO1lUUFnfXowh3oqN6oQH8SYdYAH3Vh5ncgNX9lxXt4ykCEUSz2x3IHvUADnt5D7IBSVhCDUSSvRz28aY78ThPxyE4p%2FFY2KAGJqx%2BpV2G5N9peDRr0T7LpMzbSINp4bSmTadiFXtaGIo1XzQl%2B0ygrosfIHCByoo3SAcTHVspgdnmoIuA5OQzdeXxELCSL9Gw5FcjD9J4FI91ejMcUPRDmc1mryuNxpsGLTUyL7mUceFSX35kGsIoDs2JEHmVDVMGpRfZoitGvOPjnPm0DAqD%2F024XInzDao5ijRc6SFW1rfUFOb9KWUjESl9LH8UJcNXl0ipH2rQsk9l0ccwWGRmjOf09CiXC9t%2Bc2MMa2kM4GOqUBaJQYb8nGzwpVx%2F5MyG28ulJbZkYvMpQzq9JxPm%2F4HRvvozAhwM26%2FDKGX0I6fEsnwT2%2BWWdBWKCgcbxhnjyKYRk%2F1R%2BYCwioXiUh9nKhWH%2FvpXyuhnYFuhz2qhh84x%2FDhnfTUBnZfMxXvP7nAjzq75hPeB1OsFZHOnt72qrVNGJeYNiaVP4awM7nj%2BSngXt6xncmGa8PLi1LxqkuuJpfZrIRowo1&X-Amz-Signature=b3cae2d26a86248f21c1eaab04ba18b91ab45414505cf53f204504d67c5eff04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RI7EV4ZU%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDLbwLjfzeR7zihh480DLoWfQRp2R5kHtj4EJHbvB1lOAiB780JywYCfCaFud0GQyLBlpN69JT9IXxFBBdbBAQa6aiqIBAiy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMCR1vmoHIKi9e6sKgKtwDotY5nrs1SAxTgqGktXNDmv72wKkr23M4VO2CBdr9UL%2B9TzI1vU%2BTCM9kSxFTLcbAQhj1j7Zmrza1tlPyB6YUXa9D8i9F04u5fDFc48wGmMwWXKfwVxtAeMPn9icx4zbN18HyYJ67Ypzcj66z5haXNS%2BB3rHFAbckfpx68CNojOQw%2BWU%2F7xCrNI95YzjozTF49Hj3ReGY2BHtrzULj%2F%2F1EM9YZBOfdf2mesvTea6%2FLj45H2fsMqSC2HrA7amUEwcJFfIB8JWSY0v8o8hg57jCNnzRh6hdR%2FPJqbq3iiA3zT8dgnn%2F17tkhksmRXly9SUijtUKioGcw5XIyecmg5Av5kAA%2BQYxPJFcJ3mctv%2FJOh14P%2FnfgjX5mCdERre5XtwaJbc%2Fy0l1J9cSL%2FN41eT11EVaV8gMf%2FfwCoS0DI8hxQL73PJ2ozkqYoAsJikn5H8bjHJmCgRdm5kFrhROiarOCZvbu975osXuhmFCVe6ukuc%2FdmGk%2BBlqoTxdJFUXTzrS%2FSrmSCt9DRH%2FrFBxFgM2lI54w3uNznw5RetSE7fyX3mdWisYxA8TQTqu%2BGj3HLM8WlaH5%2B0%2F2oGCLmXqb47NbkCEf%2FSLeqmKBAgVdZnEZxReW%2Fi8xiEgQdrJQy8wh7aQzgY6pgFD%2F8EHzHFkt1gD175UXy8WR2dJIEqn%2BwC%2FjrKMMEXl0r1drnSKbqwlqu78y3C2KKRf35A3lw9DDQzUdnrgy%2FesJELt0c2cVrRGFbpc%2FCoIueFo68Z31gsMiAoVvYEzecsWCUu6lb4O8qEc3jF5%2FzVHZiBf66A%2BcscGJW5BLci1pOJ8qxOoZDYSWyP5DFpam4KU2jz6IhZhDdg0vIxUzdOWTyPT7d8P&X-Amz-Signature=eb0d82d9910a095482397d269b7b63f91b1b23af8688347c856acd9fb24b2c4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YB7FJH65%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICVHzrC1YnV7nEa7yEWK3kOo3KA%2FSsi16BPjwg8IrgyLAiEAiC6a1IYCr7%2FOb4kmvIMKbOQY0O7Z7zjxNr%2F7vuvkc1QqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKtFr4jFnUuY8vp9ACrcA5KOt%2B9rS3qJ44eOt5CU3%2Bo6s5AFX%2FB14uDBzGrA1%2BMNjK9kTFa2NRw9c8N9RV87BKrfoc52sLXwqckNIdQTlqHmFBOvEcRt3%2BzGZcSoVdQGsL3HFqjSXd0Vn3%2FaNXYP07JHORWX1EF7aNcqTK4y%2B3P%2B4xpox9CQrbMydT1tu2Dm70ZfqdAJG0eBMKh%2Bdw5vC0H%2FsYctU0fZN3772kZhi6m3TB8lPmYFKN80%2BkUqiDuJVz69Dj3LHyjeFBj%2BKhHf1rYrmMXRstSJBN6OZaFxHfaoFbsWnkXC3wzbLntBxNz4ibzk5nfPRtTXLHQ53gEZEZn0zuy2Na0266BfgsS8T4Nd77%2FQNWvgHWv67APHMlaWZQKsYMPdcw2GRAvUJ3zbvgPrtCMF89igC%2Bi4GDGrOtEZCpL3Dz4rxX6hET1Vh0RGqYpWOKqlcN7gV92GfeFKSPtI3rcjcoYwn%2FP%2F83ZRM8fGi%2FhK%2FfwDCOxQ4EIoCgA7FnE2b7GG55C8n8hg1UNgzcka53h6YwCl3u7AGgrlw0z4N3kXu7WyGmNXfYQiHrd9ZOyqEGE%2BxRDm0rp%2FICJWxPTAd2v%2BCpSl1Am5F3l24iSmKeDcn24X%2Fdw9QGq3O5HsJLftScKfTfHahEB2MJe1kM4GOqUBy2Q6ixodKfddDJPwBg50x12cJ3gWvYPWnl%2BOlI5UTbuQBn1YTz5S8wJ3BhoiM8IFzAkvkMhwJfeKVLb6s9MWFKCga%2FS2LxdggxQMNeCcobAFT5FHeu60GuQPjUvwU5TV8KBbdd4UHq6C8qbdMFzWXYNXmGMPb%2BcoD6NNj4dGtVsjWfnJf2I55pzNgNAroJE7bSuJYUAiHg3Qp62jTyMwbPcd%2FX28&X-Amz-Signature=ae9cbef8fdc0809da7b1be775f694d5b6132765db5ef4e6cd417d0f7d52050bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YB7FJH65%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICVHzrC1YnV7nEa7yEWK3kOo3KA%2FSsi16BPjwg8IrgyLAiEAiC6a1IYCr7%2FOb4kmvIMKbOQY0O7Z7zjxNr%2F7vuvkc1QqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKtFr4jFnUuY8vp9ACrcA5KOt%2B9rS3qJ44eOt5CU3%2Bo6s5AFX%2FB14uDBzGrA1%2BMNjK9kTFa2NRw9c8N9RV87BKrfoc52sLXwqckNIdQTlqHmFBOvEcRt3%2BzGZcSoVdQGsL3HFqjSXd0Vn3%2FaNXYP07JHORWX1EF7aNcqTK4y%2B3P%2B4xpox9CQrbMydT1tu2Dm70ZfqdAJG0eBMKh%2Bdw5vC0H%2FsYctU0fZN3772kZhi6m3TB8lPmYFKN80%2BkUqiDuJVz69Dj3LHyjeFBj%2BKhHf1rYrmMXRstSJBN6OZaFxHfaoFbsWnkXC3wzbLntBxNz4ibzk5nfPRtTXLHQ53gEZEZn0zuy2Na0266BfgsS8T4Nd77%2FQNWvgHWv67APHMlaWZQKsYMPdcw2GRAvUJ3zbvgPrtCMF89igC%2Bi4GDGrOtEZCpL3Dz4rxX6hET1Vh0RGqYpWOKqlcN7gV92GfeFKSPtI3rcjcoYwn%2FP%2F83ZRM8fGi%2FhK%2FfwDCOxQ4EIoCgA7FnE2b7GG55C8n8hg1UNgzcka53h6YwCl3u7AGgrlw0z4N3kXu7WyGmNXfYQiHrd9ZOyqEGE%2BxRDm0rp%2FICJWxPTAd2v%2BCpSl1Am5F3l24iSmKeDcn24X%2Fdw9QGq3O5HsJLftScKfTfHahEB2MJe1kM4GOqUBy2Q6ixodKfddDJPwBg50x12cJ3gWvYPWnl%2BOlI5UTbuQBn1YTz5S8wJ3BhoiM8IFzAkvkMhwJfeKVLb6s9MWFKCga%2FS2LxdggxQMNeCcobAFT5FHeu60GuQPjUvwU5TV8KBbdd4UHq6C8qbdMFzWXYNXmGMPb%2BcoD6NNj4dGtVsjWfnJf2I55pzNgNAroJE7bSuJYUAiHg3Qp62jTyMwbPcd%2FX28&X-Amz-Signature=f475b2af631fd25b9ea9f96c8bd966225eb8194c8ec0f9da8950a5f4ba9fbd95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWB2ZYM4%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD9DGx5NXp8TQUQDY%2FT9bU6nTtVczsCxZcukica2%2B50ZQIhAI6VuUaPHQocarApsHrV08X7nootatCC%2F0EJfgaE7tDhKogECLP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx76LPPKbP%2FOssMYcYq3APKSkVMY55NJywLBSMsHSGAoLTKv%2BvtkG9pERr3%2B%2FY%2Fw1rFCuf7DnAR%2F%2BZ6mATqClllMPoGQlVR3fZI3jMZFvygtgCWoRhrqQTLsiGkvgztyzfpqqttDAppXhdA2%2F6KGTh9pkW2D%2BK7uPt%2F6%2BkNSGX%2F0KxFwpQARx2VZjiLsDYJIjQjkQvqVo8zFTw7bl8JrQF09Aw6Mx7XNovhpu6QblD11nqxlQPn7iROc4Tew47JGMSHFHz1Thr8QD5YXxrO1ikKqtfs1zeyEkrM%2FCR%2FfQF7aZXKc7NZy2Zrzi%2FzecTZdWRnUT3gzNYLEGBvx7TB0R%2Bh7NVJ7kJgr6bRyFvJMvPgjEa52MU%2F%2BQBWMLm%2F7Y5cH2qI18tGv1GxXqb98%2BVJrIMwtQZI7pzKQ%2B4xET%2FyL%2FeshI3w7uedpyDA%2FXoxHfNvCt1qGBrwn%2FAe7XfAnQhxrgl1oLQTUqA%2BDLdDDoto8KmgsxY2RCMWR9p0SaMYOWk5j%2F79tqai%2B34YnF25tN1FQLJXVbQ3%2B7wAFmeloeW8Etamtq1Jwn6ob4wcOqgRddoztmtj0ddDCSCJk6JcOPMIMsAw5WtvtEet5hIe21ufsbfNEkTbALwzsu9R4qiVb2sU5fx5JN2LJE2ZmyvwjjDetJDOBjqkAcC1t4%2F1Y%2BtxFQQvvI8tsCqWSFtN%2FnarejaIhDhVtmeH6JM89r%2B%2FPBhlA%2B%2B8sQmFeneGH7KHJaEQjfymur2ee1UtAeX39j%2FgsSJAXyUkC5RucblTtI%2BIrntUdk9CQuQy0nwefgtDNlbgWfHnlJjwdrq%2BLAZVBNvtF9mrfqpr8QCGdRTKaMho0tgRj%2FcC2Wb7fxHmbPsPrlY98W5GMNUIrhI%2BDM0e&X-Amz-Signature=17a6de94f8b88f6f0e28771048e3ae0e00ad34290a025903926a6fb561a19126&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IX365W5%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDMA5u4MUCzHGgyuiToo4lVYub9By1i%2FVQjIC2GJmLrZwIhAPF%2BLzgZwalFKtl0VQZsqrXGFpX5bxz%2F2gWQE68oIit7KogECLP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxpbkv%2BapbQph8khcUq3AMgWlhufikpuaK%2Fu3V701K5oXzPme6QLhaUYgGNfeV8yXVxfP5LnDkubEELl5JKYesn%2FaRjbIWaNA8tcCAGe44Zc8H183aRISOCsXLMwl3BZFpnpU%2FmTpk9V%2F39vMPYKHByEZvK4pW9MAsLr4LGxNu1Q%2FoTHiMnEmz191ZI8N6gizCegsP%2F0SGFlT%2FKWWcZEQO9vYim%2B0da52DqGCn3VzAeY5xF8SfqpOKcjQ5Kcoptvmiy6nXb1U8D%2BSi0BjdnsxyqfK0EuPLxVFAV1llzL402ay%2B1MUt3n1SBGYcwCJbj%2BGi6IfDDJbz31Pt8g9SyonzLsOP%2F1ZmArfQfm96p%2F%2FhyISPFjoR5hvvIZ%2BqXfWlo%2FMkPRVhRKlzLfSeNP%2FeN8SXfeUJ%2FB%2FXTZGnBth1uhCYpsdlLIYf%2FpW3V32R1zcPVC3sCDG1ttPD6IRWf9vWlFhc0yZK3LfJhwSxJ78oAxmAZb7e1QVA4Vs1Raxhyq29%2BRRv7qKvFM%2B8a60%2FkO5pDrH45zIP2PIycj0zyhRP2P2oZRSOz8i6msQFQqeO1GFe9g6FNGq%2FpiJE%2F7KObOc%2FA1XdG7pG1jPYf4en86N0MLmcsGBmExv17LDBS6e%2FXROwDCV3Kr3qXDl%2B1u7N9fDDmtJDOBjqkAXewHC2TREoSy9GrnHGRrujf7zJjVcFqHZec0%2Buq01TKVGd%2BTxrZFqdES8%2F0c3umnq3VlGjfD%2Fb5NDOILdi0qRFz212zz908%2FdOZ2PuCtNx31NhFJuxG14EFXUT78VkqJVuMj3GJ69rsXQNVMZuAel58tUshOMuSwbjnPLzhDn%2B7jr2UHdJKgq9Ul1iml6D9w5dXNbp5ukHkSDEifeU3SCYwF2SF&X-Amz-Signature=c14d54d0c2268c043113c2856f53f130ed9e3ec44aa21622c633c25c630b94a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IX365W5%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDMA5u4MUCzHGgyuiToo4lVYub9By1i%2FVQjIC2GJmLrZwIhAPF%2BLzgZwalFKtl0VQZsqrXGFpX5bxz%2F2gWQE68oIit7KogECLP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxpbkv%2BapbQph8khcUq3AMgWlhufikpuaK%2Fu3V701K5oXzPme6QLhaUYgGNfeV8yXVxfP5LnDkubEELl5JKYesn%2FaRjbIWaNA8tcCAGe44Zc8H183aRISOCsXLMwl3BZFpnpU%2FmTpk9V%2F39vMPYKHByEZvK4pW9MAsLr4LGxNu1Q%2FoTHiMnEmz191ZI8N6gizCegsP%2F0SGFlT%2FKWWcZEQO9vYim%2B0da52DqGCn3VzAeY5xF8SfqpOKcjQ5Kcoptvmiy6nXb1U8D%2BSi0BjdnsxyqfK0EuPLxVFAV1llzL402ay%2B1MUt3n1SBGYcwCJbj%2BGi6IfDDJbz31Pt8g9SyonzLsOP%2F1ZmArfQfm96p%2F%2FhyISPFjoR5hvvIZ%2BqXfWlo%2FMkPRVhRKlzLfSeNP%2FeN8SXfeUJ%2FB%2FXTZGnBth1uhCYpsdlLIYf%2FpW3V32R1zcPVC3sCDG1ttPD6IRWf9vWlFhc0yZK3LfJhwSxJ78oAxmAZb7e1QVA4Vs1Raxhyq29%2BRRv7qKvFM%2B8a60%2FkO5pDrH45zIP2PIycj0zyhRP2P2oZRSOz8i6msQFQqeO1GFe9g6FNGq%2FpiJE%2F7KObOc%2FA1XdG7pG1jPYf4en86N0MLmcsGBmExv17LDBS6e%2FXROwDCV3Kr3qXDl%2B1u7N9fDDmtJDOBjqkAXewHC2TREoSy9GrnHGRrujf7zJjVcFqHZec0%2Buq01TKVGd%2BTxrZFqdES8%2F0c3umnq3VlGjfD%2Fb5NDOILdi0qRFz212zz908%2FdOZ2PuCtNx31NhFJuxG14EFXUT78VkqJVuMj3GJ69rsXQNVMZuAel58tUshOMuSwbjnPLzhDn%2B7jr2UHdJKgq9Ul1iml6D9w5dXNbp5ukHkSDEifeU3SCYwF2SF&X-Amz-Signature=c14d54d0c2268c043113c2856f53f130ed9e3ec44aa21622c633c25c630b94a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVVDO4AS%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T183828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHJblmlsoYTd4MHv8u%2F69jX4j%2BfP3i2jW99Qm6dIp%2BJ8AiBr1VM8vzsG2BerWe%2Fq308Tit65Gg7Ejhj%2BUlsi5qGBhyqIBAiy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLZW8pboQXfGskasSKtwDnGLHVHGLoEk3EIP7K5pm9x1z6ZrbghaWsBmgi01bke8IppkWPWCHd2%2BRqWYtECvWWSTsQOy%2F0EuFva3XVPlO4S8MHbszXpP7SVRmLMgo3vrXRr4lAYmsVVLmqbRNNZ%2FqhezhU%2FWDlyhZ%2Fmn9FU5onylmeKPUEjzr1sSkfU1yBM5yrca7PEpao17tAb%2FCfxhLbcRxZqhQLe0%2F0ylBaXqKYeJpXHuRD2dgcmFK8i65c8d0Oq46G9%2FiEKKgo1Rlfa%2BhWsMrRjmvbiG9wDZW1pZtGKFA3%2B5sxmoQv3ieKnTrBpUIU6xq8mPuvmk8%2BgTYFzvZ1JZjpo0w6Q3WcKBeLgAY1%2BvYoxfFyw2fGCSOhGG4cTXkpQ87qm7uYl06WhEoc%2FBTDidi4VSXZU921e4g2cvUo%2FS%2BxLtf0iUwOborVFilpfJGb4I3aW5FR8ZudK7F5X3cZF9YciUg4fwMSMh811RtG9yQtJPOdIBcCaXYlw4ikd%2F46XI4q8lJIuOcwLBbSGBK0Pg9j9%2FRI6SwYG7WU4ZN0gU5Zlwz9G8PWKtTXce%2F0pIWg98EtP3yBpBgtyfB9LNPg1CRbsDpO3ojJ1%2BxxlNwfdXWPIhY008mlzw2oMHMvRlIYOYbdwVvR3JAadcwtbSQzgY6pgFrLLei0Z43pQNCtOQMnDKLNcUziQzh7la1Noxklk77gBxjszMMChq31z7GJPuPNcERfBx9a2rWGUJVKiioCIrT%2FphrTHwTCQjH9sR091gfEFYEgPCmTlMyiJVorZaXStjkbgeUopRGPgiCc%2BplViK3HHtt6iCD9bjdalnXBXkc%2FtnuvXr3w9cECKxbI9nP37Kpv9xWOR3ERY7iSaJZsabi5xgFx%2Fy4&X-Amz-Signature=b5addea93a0abfef2f5dd60e376aeaf968c27514ff58f86f1c43f1a8681c0dbb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

