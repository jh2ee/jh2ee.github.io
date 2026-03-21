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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663A5Y5WTU%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDd3gK2U7XQZqWCMeE%2FJs0ftmvZvaN6ByUX%2BKYY8W%2FjuAIhAMfQW6VAPvS%2FjgrxmF9em6%2BoB2eYcK6vMMHJlEuKOwYKKv8DCEoQABoMNjM3NDIzMTgzODA1Igw0Hp%2Fo2K%2FCAyPPPEAq3AOmR0XRB1rl0D9DVqOrwhPXurzRYAVIaXs33sAJtFxmmFkC3OV7oRjsP7mCDpaqUD0VTALIHv5QPo44%2FPTB4G%2BAc8AYnIKLmIZjN3fC90H%2F5%2BEpneuFiyfXj%2FKmKambUutajmMAQsDUC4Sf7ImE27I9UGLwWQXmFe8n7MNwc2uaBTQKWAKPgD5fbKFNbaBiDMS8Yn891uf1xQ%2FaesS9F6mlfvTtyTj7enFVns1vx27Bvx15138rJ1MkmXKk2mXNQj%2BJN6smnxAA%2BnU8CzJxptpZOfdRusYxJQ9iPLRqHwrDMuUYwSu0kKfLbLNtZpNZsRk1%2BkS%2Fl7bQf2Y0j1bUvGrqrQgAeOm9cbtvta3C7KgXlToraYplEFS%2FNa%2Fez5g060tE%2BcY9dm9MZNX9d5kkaw6CUv5lCgp1AQOn%2FzDu9or7KFdi%2FgckbGrHziOvpt15E8JtjDdVlNIdf99TWBEV4R4LjASPZL1KPZgqRSJN8hr2dSHQ7TM%2BPs4DD5t9y5cYMDRKRMlYAKzVc%2BXEXpzqMjbeDkY3kqwUZJF6v1%2FZ8qmz4%2FIH5%2BMWmKoMkanNAR9mYhdzz1yeu5guQTINLwpybT%2FdmPwSFydHoU7MVVbNI0bqQazOYA2TDz%2ByMW9EeTCxvfnNBjqkAfzvUMqxSWHoKcB8nZ9RQbY8Z76EIu1VpZPuM9iMc1eQz3h550HHPK4M%2Bk%2FHrj3CvgMoOv67lJC42%2Bkde0ADEGZFGNUKctGn5VwJ0HrdmPIjzhhTtMxXfyNAN4Z552G85P%2BlFE0r%2F98bgzAEkYwM4QzexM87mcDsddlc%2FK3IIoo3pHLc5CEoyNToa0PZZKSDUxD5dK%2Fcl9%2F8W0FFYdOdMu1wFhTR&X-Amz-Signature=8492ea315008701e901cbaa284a629cc32914e9b6ab62995f790f95d2f867bab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663A5Y5WTU%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDd3gK2U7XQZqWCMeE%2FJs0ftmvZvaN6ByUX%2BKYY8W%2FjuAIhAMfQW6VAPvS%2FjgrxmF9em6%2BoB2eYcK6vMMHJlEuKOwYKKv8DCEoQABoMNjM3NDIzMTgzODA1Igw0Hp%2Fo2K%2FCAyPPPEAq3AOmR0XRB1rl0D9DVqOrwhPXurzRYAVIaXs33sAJtFxmmFkC3OV7oRjsP7mCDpaqUD0VTALIHv5QPo44%2FPTB4G%2BAc8AYnIKLmIZjN3fC90H%2F5%2BEpneuFiyfXj%2FKmKambUutajmMAQsDUC4Sf7ImE27I9UGLwWQXmFe8n7MNwc2uaBTQKWAKPgD5fbKFNbaBiDMS8Yn891uf1xQ%2FaesS9F6mlfvTtyTj7enFVns1vx27Bvx15138rJ1MkmXKk2mXNQj%2BJN6smnxAA%2BnU8CzJxptpZOfdRusYxJQ9iPLRqHwrDMuUYwSu0kKfLbLNtZpNZsRk1%2BkS%2Fl7bQf2Y0j1bUvGrqrQgAeOm9cbtvta3C7KgXlToraYplEFS%2FNa%2Fez5g060tE%2BcY9dm9MZNX9d5kkaw6CUv5lCgp1AQOn%2FzDu9or7KFdi%2FgckbGrHziOvpt15E8JtjDdVlNIdf99TWBEV4R4LjASPZL1KPZgqRSJN8hr2dSHQ7TM%2BPs4DD5t9y5cYMDRKRMlYAKzVc%2BXEXpzqMjbeDkY3kqwUZJF6v1%2FZ8qmz4%2FIH5%2BMWmKoMkanNAR9mYhdzz1yeu5guQTINLwpybT%2FdmPwSFydHoU7MVVbNI0bqQazOYA2TDz%2ByMW9EeTCxvfnNBjqkAfzvUMqxSWHoKcB8nZ9RQbY8Z76EIu1VpZPuM9iMc1eQz3h550HHPK4M%2Bk%2FHrj3CvgMoOv67lJC42%2Bkde0ADEGZFGNUKctGn5VwJ0HrdmPIjzhhTtMxXfyNAN4Z552G85P%2BlFE0r%2F98bgzAEkYwM4QzexM87mcDsddlc%2FK3IIoo3pHLc5CEoyNToa0PZZKSDUxD5dK%2Fcl9%2F8W0FFYdOdMu1wFhTR&X-Amz-Signature=8492ea315008701e901cbaa284a629cc32914e9b6ab62995f790f95d2f867bab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EYHO625%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE3qZgio0D%2FwevM15k7dm8ba5ixpBHaboBKbwewxEA%2FwAiBHyudW%2BbtHERlqchcPY1qD5PpYuzUTj0JxzslWqE2nvSr%2FAwhLEAAaDDYzNzQyMzE4MzgwNSIMC5M4O4wbFJd64UthKtwDONEKcp%2FhSnGc6kJ090941V1Q3qDEqlJk1TOdDMxLgjcPwWWNlZL3zM%2FPi5tyPlwYunvRVZLG0lr6yXE0Xz7XimAcUJI%2BOHsIcqwv5RkAAaWAx65eRuUCOXfA5jDePt5SYQmqVEPa15zP3zHDGEkkZubne%2Fg4P8baZtD8v53OVaVrqcg2ayQZ4ZP2Gg1sNz%2F30s3f4XieVv%2BLFshFA5fhYrjtCugmtKJxa1dUvlykQL5wmKnPb%2FCyRJlBY6l7vvVrfF2MUjckX5Tiw5hQCrPqWeflyyFszVmbaSPqw0MXkWvSfkF0sWApyw7YbrkQ5AVZK%2B8mY3mMFQE0uznS9NEduswdbuuO7ft9BPWdv7%2BpkYx1iZS4H2mys%2BPgycxcTdg0KI5A9q0KSInZAW3Lhyr6KyDOzBbMj57yH1hIHtJXCIgLUifKZZ5zde%2FGO4CD2XK%2FRdtJIROd%2BLgAf8xvnYdigq3RlaQCTane9ps7AMfLKiogLRfsOZZ0H%2Be3k2CQJ%2BWnf7j%2FOJnGWbRZNZLAw23qBlWkoZf2UBoqjOnVXKtH7ntzEq6dUb0KhtI3LX5YhtOHH9QljrfdUmGnFLJk51JFFfa3jx4X5wIDodXNUwLEIwmO5kPEqVUfHaYUSjswk9L5zQY6pgGGlwhiS4%2BVTB3wVhmUlQtzknQRD1ZkWfs9p558YSCgOYxd0QjCGAb%2BfkphLgzdqCDUADtZDFwngLTMKXSgYHrYC8W5hCnP52RNJtBoZFij%2Bq4GNh0sXtLcVRc72bEEkOzbTrXLi1TSI8MGPZqRhcv2hnPExYiVKuIcRwe2UCBGpIaq71bF01OphnV4xzFgCkD3frPHf%2FvFbF6UKelI5RjyW0ch3hdY&X-Amz-Signature=a3f0b13fe794f39deb15784c6d07bbc864b2536e2e5f5f085a1ee78d06f556fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ARENF5Y%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDn5SZYhJ9Zuw8aE%2B4%2FiXNtX8fiyi4XsrNviBEd6pEFLQIgD4fO8JlEL02kkHDZ%2FLoWI9AcO0YSYzwwvWekOCUEKNwq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDNVodb8iRafb0%2B7e4SrcA%2B%2F8z7PRYwPrllcGQ3qRLBbFYVVCpA4CaGEeuSTS3SDHKTUCbpiG%2FSqINabQlTmrmu29%2BlPpeyqnFMNzp4%2BbvS2okaDxGOLxSqACWRQO0AWU47LSDO39c%2BoLfa10HkSaKfZzUfzy3rGHfIRLdto%2FNjs8tj0th%2F5CZJP2lxRaQSis6rUTt11k0CbbU4KOEWoe6wRr81FIy8zN%2BllVMIm0e6JfZbZA2Zi%2BksZ1HKp3kwlFaeq0D8j3W1Dl5roQyq7nRbZqW%2FkilQQqXT0bsvGTlGNjPEKkZ49OS%2BcIjIrT4Y3E4L99vsdBzsZLBL9WbEEZDJ%2F8utolA6Kawc%2BDqiJ8V6j6ZL8cawhjnWmKbX0wOi7bWxrJmeKN5QTnBQci7QMZFUUSlAP0Bm6UXrMYmP%2BF%2FU1MpHb1r%2F0YsZ5a13RVzk265Q%2BSA8qEtNPoKOX9qMTZ0awEwLpavdCHXAHtCZC07keGF%2B%2FZHCcW5z%2FcQSY3inRyNyXjkPdcD1Qnzp0dMWa38sNVvySlA4hbf7HQyI7e1xECxECIKQGfaozsE6pWAQ83mifSz0CsAypnvKj4imKN40CSdgj9fbRfrM1fBpr2XQpTz9PnlbJPTAA8RBkqErMV8nfY2QuPepOCJU3RMOK9%2Bc0GOqUBaLbd9mDNvE3xoXn%2FpQ8vSHALJ6VbTnA4pxWYnqbO49SEKuHFllPnrdjLk5UjHK%2Ba9EcEtRKDdEvif2uAI2dm85NrjVtxaUE4F7lixaOVYSdxAfWqFjbvaQEo4DJ7qi90Vl4ahF75Xv3%2BF4ChXEG9pqMUYD%2FpZebXWqO2frEiSSE1i81DBD3SI7H%2F7VqUHtPbv5G2TTfmnb3BhAc4uJfAg6da3IbM&X-Amz-Signature=2953073fe0f906a47f316da2e4dc4bf9a3f990e7c84830f86453b78b434f730b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ARENF5Y%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDn5SZYhJ9Zuw8aE%2B4%2FiXNtX8fiyi4XsrNviBEd6pEFLQIgD4fO8JlEL02kkHDZ%2FLoWI9AcO0YSYzwwvWekOCUEKNwq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDNVodb8iRafb0%2B7e4SrcA%2B%2F8z7PRYwPrllcGQ3qRLBbFYVVCpA4CaGEeuSTS3SDHKTUCbpiG%2FSqINabQlTmrmu29%2BlPpeyqnFMNzp4%2BbvS2okaDxGOLxSqACWRQO0AWU47LSDO39c%2BoLfa10HkSaKfZzUfzy3rGHfIRLdto%2FNjs8tj0th%2F5CZJP2lxRaQSis6rUTt11k0CbbU4KOEWoe6wRr81FIy8zN%2BllVMIm0e6JfZbZA2Zi%2BksZ1HKp3kwlFaeq0D8j3W1Dl5roQyq7nRbZqW%2FkilQQqXT0bsvGTlGNjPEKkZ49OS%2BcIjIrT4Y3E4L99vsdBzsZLBL9WbEEZDJ%2F8utolA6Kawc%2BDqiJ8V6j6ZL8cawhjnWmKbX0wOi7bWxrJmeKN5QTnBQci7QMZFUUSlAP0Bm6UXrMYmP%2BF%2FU1MpHb1r%2F0YsZ5a13RVzk265Q%2BSA8qEtNPoKOX9qMTZ0awEwLpavdCHXAHtCZC07keGF%2B%2FZHCcW5z%2FcQSY3inRyNyXjkPdcD1Qnzp0dMWa38sNVvySlA4hbf7HQyI7e1xECxECIKQGfaozsE6pWAQ83mifSz0CsAypnvKj4imKN40CSdgj9fbRfrM1fBpr2XQpTz9PnlbJPTAA8RBkqErMV8nfY2QuPepOCJU3RMOK9%2Bc0GOqUBaLbd9mDNvE3xoXn%2FpQ8vSHALJ6VbTnA4pxWYnqbO49SEKuHFllPnrdjLk5UjHK%2Ba9EcEtRKDdEvif2uAI2dm85NrjVtxaUE4F7lixaOVYSdxAfWqFjbvaQEo4DJ7qi90Vl4ahF75Xv3%2BF4ChXEG9pqMUYD%2FpZebXWqO2frEiSSE1i81DBD3SI7H%2F7VqUHtPbv5G2TTfmnb3BhAc4uJfAg6da3IbM&X-Amz-Signature=89b4185a23fecb4329d456b10bc7d7561c43bb0abd5759e89f848cce13d221dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7NXVG73%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC5rwESqJHsLMqvvuPLrkM0c111LTHTQS4qTVHyF4pMxQIgBWpMf91wW%2BGLRkhFDrPYZPa%2FqB9u4MuljADuPOskiYoq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDHliijfNdKNvMgXPjCrcA%2Fgo5VkWwJUr9fb%2FyldGm2LVfHeBzE%2FoNQ65Y8ivcXNfRL877f4FakgNLNCPP1TdA9oPNWw9JftjrwdPfkj%2F3%2Fl1Uw7zSe4%2FJtL0cpTjHEPq3OumIvaRe05AvjRboRJwnAlA2mlcskm1xY2d4Mh0adWiUKDZsKY%2FcqiE8SMuNOiqz%2FPRyGmlIkAjGvBPct9wQw51Bvv%2FLw236hW8AA%2BuYtF2E6HEGRUj6XdItsCfgNk8yVZ8YSlGJvgqAg23lLGJQ3NC0GEFhCiFBULWf5V7SaILAhYhUS18on66%2FCOhEuDbOaKIYQsEmx0ZRNPX6iGyFeo2C%2Fv17tkH9%2BcjkeM5Vh%2FA2jPwRsYhXk3uIlyq9%2F%2FprVcoFl7%2FDLLdet5vVQpCJzdLGUlm%2BoVGD54ZKvtAJ7uQ%2BhLnjwH2QrkJRYapTBoi3zsxdX%2Fqy%2Bom%2FTOH8oCjl27uZeGb4%2FsehhGkEDnYHEsaEpdc%2B%2F4pP%2B%2FdwUYeYgyCdPm4l0lEcfh3u5n1G1D3sPJZWS6vEWcnVIZMP%2B0CZ78qV4thHAQISanOpfq2fINRyLk63z2R4x99gn0%2FlRxlb%2FYFx3i7vOThVIKA1loLdxx3mRKjVI3TZoDsS%2BRdFK6RWcqaVvJZWAv%2BMFTVMOe9%2Bc0GOqUBYW0byCa19FD2wWP%2FGb7PU5lVcaZVMijGxBq5LoKJHgEOGFiGS1yzg0u8qxKpKVS9ndlFURA7kyfyijgubxFS1dSJlalg%2FohhBygeYer2hn%2BkgabuJKdkChkou70NTqjhIaMX7jeSGneb%2Bnsr7FK7W6uRlhcPo4AV79PbjLlHdbCrKcacjb5%2BEY5z3iiRcoR6NglRqFEMR%2B%2FE6R3L3Juy81UIkjVJ&X-Amz-Signature=07141bcbc14c5aea1d6bf49848cbecc54c0786591189aa0db5031d4e18e2c786&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4RTVCFA%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC50YIsShb2K0L4xlLzDYobJny5pwfse67hX3khSVI%2FRAIhAMjm8xuVogLDscG%2B%2Bw0F4l7HprpOxH4ZX4KVm6UcyRh1Kv8DCEoQABoMNjM3NDIzMTgzODA1IgzkhNJAFx2UDbwyC5Eq3AMlB531Vsv5nNHjPJ0W3GS%2F45PRvWSBOoNw%2BkK0A%2BeAU49XkJn8ZqOPhAVKi%2FsaB%2BRJOC5SFqP1PaZ1lPe9tSUc4fKZ4rnC5H3x4SLv0f7qC02RQIH%2FSU4lnb3IKMMPybFaUQzUx6AUqsKjbpe4BNlTIZ198FMkKjIODCmZf5mMQH4ZVZ8CdS10V%2FUCE00tj2m3peZzCCJoLHczOpYeO0KIDQ8X%2FIwrmKxkC3XTHW4aSBMg5vey8XbJ4aJRbDorcBXCB4LGMHQ479cS1j1kz%2BMagtubrgf5WeARcTzxmIiaO0h%2Fz7ZoGzVYk8OjvkpfBnYsKpYND1bjQYtk%2BVT51aYcFuTzNgN%2FaObK2%2BFfcIb9PshtGIT9Un6jrey81yVs2U9WCHDvZpZzPAShQaEGpltQArxoFYBNTkHti%2BudeSampv8Dcn3Rt5iNO9wG%2Fpd%2BML9iA3ju5fzsMAIhAPTP5xYRSdW%2BRkGwuFFfobu68PaKE0ctlFuHDF2Ui1yAXJNil3J9knBJuiIV552KtOxPGs%2F6mHt2qh3gisFqy1KhPhB4NhAV2O7xrFiEGKl6lh6SonLWXN9S6jeM5DRIF6e4O0Xp7V%2F0Kxt1ukOWdJjHAOIt7%2FjVp7drmxghSvdrHTDrvvnNBjqkAWQE8UU3EkfKLTrJEGtodEYMmph7amKGZG8%2BysP%2BxfcvyTNRqA402HED6%2F6FuIuO6jcs0ERngkgB8qP0Hfra5e43AQnpgbvSDSfpe0GyBrbw3d6Ar1RloNZlSmE9JaM6OsxbsQIxMYd3WfYaV9maqJDpD8Cb%2FCXOQ%2Fp%2B3GXPnK%2BxyfNvwrXQa1jDXGfAqTeMyzuZC5DNkWA%2BV1%2FypGJF6ZVLkTiC&X-Amz-Signature=3eac2d0d98e7d911700e66c1b1be7872aa8a5bdb9a7249e1633b6b22a8c300ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673JJWIGK%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHEDPC%2Bt4nRUYL9NgUEGEe20YecCvaY08twBW4DUO5pMAiAT1%2FHvg15Kjxop1SpCQrvmxz7StKiF6K5zC3LIz8NaDir%2FAwhKEAAaDDYzNzQyMzE4MzgwNSIMS%2FuGr2Z3kuLO%2BSxzKtwDxIN15iAVfMUgCt8TYTpEkOwA0o%2BW%2BHmbid70FX3GVpR584sCh4mERxsWX2BfxGrtiC4kusBjojTV7kbjs2YPY%2Fbj6JV4%2F0%2FJGPdDiUqIjLlXt2AEv0u0wKcnkVGRUP3fNyRTJcRoI7PouSYNb0gBFXJsXzQecCdqEHwgbUydMuT%2FEjB3S9iSDh5QeirSyCqMjmBm6%2FZHJ1U9AgadSPh8kFD8yDTdt718tL8i9AzsbKSvlRNTfTPY7EtE%2FcQoJIa2Nee7JjN9ukLZdUliIrFWWNpvOq3wBv1PQ6v88s4soMW5E1UWnQ5E%2BCl4SmjlGqO%2F1hicCLDho0zjUeTH0jMJlJy%2FC3dHu7%2BDxzYECDqC%2FoETQDn6tOH8vCMCT%2BNFWyLPoA02eQRIBxapUdURjEiOol6nz8EOwPeLMzuRuo5F9z00zUfJbEUZWO%2BlMaM85FYMzHMaiQpZokCVwjbPq%2BH%2F9VxEXZ9GglY5aMNO%2BtQU%2ByIhecSnab%2BGct6GTOJfI1EnRWhzjvyFZmPwJCiK3YhJuWaFsPBo7xkuDoO9U6HuK9KhQYPOgzqMNDzrC8SGsaPfiJgHj61O%2BdCgHaYlW68PhbMjMD5nH4TPb%2F%2FSWizg2H%2BYYsSJ1auwOmxv6uww5r35zQY6pgGFY5%2BcEnEGOOGgbQBF%2FlYyrvMIGJdrhdMiGc%2FUCTZvFuUybwiGSdPfjvSXCotcin62zT3k8Crdo0%2BU7O6BvTQdcVmCwUbxFY1fFibckroD3eglBxA6dBYqS57vs0E7%2FQHtGq%2BHA5CT6dNDV81mu%2B%2BHnVeliQIaizBBPZjKJqcpEJZAn1AtieFHKa1ucHtIePUAqLNglui%2FITF1Dj57wxAZP5St3JL9&X-Amz-Signature=efd1e332e7d09c2d6b9e7e9a71dafad04948230649bb12b770515bc5b63c3e70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJRSNKA5%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2F%2BP3aS8YfJj84KHqX%2BS2Yk4LxgrH26jU20je2Tx7cLQIgaorch%2FyL7qQhkbL8esb4pBV5HNLJsNvh6jnGKgMQmlEq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDO0Q6gycEAt3kr06WyrcA%2Bn%2F7N%2FEdCgSndk1sobA224aGK2kOOSgUJ76suIAkxkjMuyhth1l%2BVWMdBkh%2FVb2xHuDhfZjh9QuPr40%2FVMDZROaHBvahgjJa9PyRTvz%2FKrWSJrRsGSm7weBZ5%2FIxcQP7hpwGwBm275ZVk549%2F4ExgQAsChQgr21GcBzZO38%2BX%2BtygFHHJPsjPevh92YLlIRVrdxQqaX5VuA1edAj%2FLPnSbT1alE%2BGbLjowN8V82NqcN9k6jtaGXGt0F%2FYVtseO3cjJL68GqTSLow2JNpSZP3R0mt8IPezg4ODO1VIBCv4u4vdFBC8oy5OMTdE78VxCaziu08Ly5KV4owmB1bo4imk1RLkdd6OfI0bmx2ktKHpdimlT6RhNZAmhl3zjHtl9%2BYPMSUWd5Lecg7SQwp9%2F8uYHsTAdtVMAUh92VkW28%2BriIMq9koKxsItVL%2B38lX4fm%2Bfxsj6bHEkqD9mgij6OQwjyXpczB5nnfXAR%2FbTerX3gRfypCCTru%2FhBdj52NmGpElkT1hT2g4DoI1cHtKMyTrL2qymiy6g4%2FLcmJxVUuOlmv%2BLa9Bbr%2BnmRWfVyJ3UPQ08n3TudhgvSL6aZAfOmgYgrBHuq1g%2B%2BbvpOWwkctkRy5DSkecdfnm6DO2BM3MIy9%2Bc0GOqUBmtTNigM3j4NU3jdMstaSMby%2FaxMUP%2Br4R0WWdxc6%2F469eDZA%2FpzhQtn2qzTzcpcz7rgGOuOP6QqRP4V3EPmYQp1kKKKa4K12vrS8ywjD6gZGW2YsiymB%2ByIum7mJlgLyqzoVMQOxzA3ujWpYJ9gtL6orpBmdgLx%2FOxa6zN2LwdDTJvAKxTjXTBbLmt7R48jc%2BLLYTmXBMI5iJABl5eWlQ24EZNvj&X-Amz-Signature=2b4aabe34fb6378927453583336a706cc82c702b4ed342347250c5723c7046af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJRSNKA5%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2F%2BP3aS8YfJj84KHqX%2BS2Yk4LxgrH26jU20je2Tx7cLQIgaorch%2FyL7qQhkbL8esb4pBV5HNLJsNvh6jnGKgMQmlEq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDO0Q6gycEAt3kr06WyrcA%2Bn%2F7N%2FEdCgSndk1sobA224aGK2kOOSgUJ76suIAkxkjMuyhth1l%2BVWMdBkh%2FVb2xHuDhfZjh9QuPr40%2FVMDZROaHBvahgjJa9PyRTvz%2FKrWSJrRsGSm7weBZ5%2FIxcQP7hpwGwBm275ZVk549%2F4ExgQAsChQgr21GcBzZO38%2BX%2BtygFHHJPsjPevh92YLlIRVrdxQqaX5VuA1edAj%2FLPnSbT1alE%2BGbLjowN8V82NqcN9k6jtaGXGt0F%2FYVtseO3cjJL68GqTSLow2JNpSZP3R0mt8IPezg4ODO1VIBCv4u4vdFBC8oy5OMTdE78VxCaziu08Ly5KV4owmB1bo4imk1RLkdd6OfI0bmx2ktKHpdimlT6RhNZAmhl3zjHtl9%2BYPMSUWd5Lecg7SQwp9%2F8uYHsTAdtVMAUh92VkW28%2BriIMq9koKxsItVL%2B38lX4fm%2Bfxsj6bHEkqD9mgij6OQwjyXpczB5nnfXAR%2FbTerX3gRfypCCTru%2FhBdj52NmGpElkT1hT2g4DoI1cHtKMyTrL2qymiy6g4%2FLcmJxVUuOlmv%2BLa9Bbr%2BnmRWfVyJ3UPQ08n3TudhgvSL6aZAfOmgYgrBHuq1g%2B%2BbvpOWwkctkRy5DSkecdfnm6DO2BM3MIy9%2Bc0GOqUBmtTNigM3j4NU3jdMstaSMby%2FaxMUP%2Br4R0WWdxc6%2F469eDZA%2FpzhQtn2qzTzcpcz7rgGOuOP6QqRP4V3EPmYQp1kKKKa4K12vrS8ywjD6gZGW2YsiymB%2ByIum7mJlgLyqzoVMQOxzA3ujWpYJ9gtL6orpBmdgLx%2FOxa6zN2LwdDTJvAKxTjXTBbLmt7R48jc%2BLLYTmXBMI5iJABl5eWlQ24EZNvj&X-Amz-Signature=e193322ff11a0af791854abc2ef04bce5b1809631f85100705b40a8fd0ed60de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJ4GGI6Z%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICQcBz2AniZOqSJdGgQTIbc%2BfaZV6%2F5i67LfkJHE64L0AiBUZ3BUnFbZo%2F3QB%2BowEAQGy%2B0GBAWM9DwVumgeQk8%2Bcyr%2FAwhKEAAaDDYzNzQyMzE4MzgwNSIMfCZ77m%2BJqfp5KMG0KtwDLoQP1xojVkrZNw8xvhLTPrq4tWbajkLLHSDg7TUuLJGZjcBRaB8cTCuWeymSvBLX9YArkQryOd2E63bAH5Nvgm%2BhYLl4VKr102v5lVVhb3qi%2Bc5kAV7sSW61Dd7c%2BULxP3CAzL9fJg3Y0DKxp1M19sLBjeZNu%2FQ%2BR1n7X4TpW0l8nJNob6Wbik47i3c1tVwk1uu2k9W%2FrXjawZB1hDaCDL93PCucS7yygTr9B7pNKb132L3z9kRdfQUSclwDpRBVohAOvo4%2F5EDva5qDzBBI0ApRg8ikRRj%2FTNpM8J74bhN4qwAaKr0K0QSEffWlx1ErH8PNNuTZW88lkFTxduR28rC118nR60nUfXHey4potl%2BboG8ex5fPyhFuNq3ofufxvSCuuu%2BZj0VIL77XZt9xa8uZqdKEYZm0OOvPKVbLssGZnY%2Bo%2BcMv%2F47Xv8i1L8lDkNZLbsMim55lY2Vj1QPeFqhbvy6AN2J5iq%2B1x%2FedsXRt8sa8OnuFZs06sUYfRjPYhVvQtlP8tkSSGTpo%2FnU0KQQPmjDIV%2BL4HO262ajJBT5aBaCKUbbd5sZk6QPHyNSd8TTOIxXrD2s1XdUqa9lJfeA1E%2FKaFwBxZNpTvHSZPIMD1fpQw0JOt82O2nsw1b35zQY6pgF8MkzF5hKf73QTA5e2eB4byhh7vGCFHpnUlIlfbCEFGIwZ%2FMIVcVZJns2OyZK6d6KrlhN%2FwDAQYTf80zIKtKGomlogFZpFBeOTmEs8tq9YMRQXwnA8Xw5bT2MVo6r9QwsPRyWO1oJpv8Ai7kYoWmUXzieVDZE7XrUID%2BaMx2vkj6bGgUmFNgiK304da2PRER1MbhHPjNWxZRrHt3gUhKaBgLQzn9%2Fo&X-Amz-Signature=ca6cc906c1222cbc9b686b25abf2d15e84ed0851fc9d3cb5441ea178ebd69208&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXBK4OM3%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDsb4Kbue9XQbSlWyQBOk1H1eIpqU9olRki8GXEN0Jj0wIgbOoDEF8WMr%2FXS63%2BZ44pzkREyIUB21l6N9IHim3PiZwq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDImdlQYdh39Scz9j9yrcA0BGLDDF7y4GLdMnrZWGZLs5AZiwzrOPj1Ue5G03ZJnt9%2F5gPt93qYdEvZxdkSk65Wybf89qHjyWeoKF8lZsJMX72boMKeShWENLsxcUZ74J4ABBHbuN2ShlN7UlB217USYPdEZjmeAP5JAtYRQ8zRAjVBf25XUnD%2FXm1R8y2xOoTQw5jkLAZiDFGLfFK7SmXo3Jz%2FXf7PNw0ZmEZmshW6n%2FiD%2F0fKuX9pCO1%2Fogn03eLZsNmqzThV5exYRIrqk%2BQVXdDy1QUx1qSI%2FMzuZeEN%2FPTyRvMDMw9%2Fz2bt9Gyc3oiv0XEb3ZwhUPivGmFMcKyXme6C92btD5k8KgjhwNmZqySqyeC61%2BoNyXf%2BKnTfkOIcmBccQT3weHgnwwz%2BykJY%2FZrCwpp9X4%2FacnUzKCPy2OxIzaFAZfvFII758jLBXcszL1FvPnaG3G890eTBVLefvrEHUEyu2%2FnnZ70aerXbGw%2Bixa0sMPP%2Bxzwiuk%2Bj7oYbK7gsjr7Hq4HKfiNwr35Oy593YqznjVGVELXSOnvw7vJGdefQGwBaKeqwfIJ9Y4Zj%2Fq0BlFpUlmllkD0BrZpgFUFiqY8j%2BnHdyT4Q4LT%2B9Pp%2FSU6oORrHMyU4HTCovb0zJYtxb7d3dSU%2FjDMJm9%2Bc0GOqUBhmLn2QcufwExHzT%2F6%2BeHVta4ozhVjIHMf%2F1aXbGueqeZVRoqIK7GPtbqbnXBzEj9QQg8vk60c2Cm%2FevUpvG%2BnvlpsjrnnNvnk1H0JaI3P7LxPwb5ne3vPsKghHOoIy0RMsDVGouOD3LWiSFUyBio6Wg%2BX7T%2BZ5fhD3jMcHUd4OKqKIGIN%2BvD9AG7We8RuawrOCFjF7rXQesh94zrepFd3LYkEm1a&X-Amz-Signature=54df9ce852828e1f8c21b58c0b900ec5f994c0f40aba2b8d6f206c66a56670b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXBK4OM3%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDsb4Kbue9XQbSlWyQBOk1H1eIpqU9olRki8GXEN0Jj0wIgbOoDEF8WMr%2FXS63%2BZ44pzkREyIUB21l6N9IHim3PiZwq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDImdlQYdh39Scz9j9yrcA0BGLDDF7y4GLdMnrZWGZLs5AZiwzrOPj1Ue5G03ZJnt9%2F5gPt93qYdEvZxdkSk65Wybf89qHjyWeoKF8lZsJMX72boMKeShWENLsxcUZ74J4ABBHbuN2ShlN7UlB217USYPdEZjmeAP5JAtYRQ8zRAjVBf25XUnD%2FXm1R8y2xOoTQw5jkLAZiDFGLfFK7SmXo3Jz%2FXf7PNw0ZmEZmshW6n%2FiD%2F0fKuX9pCO1%2Fogn03eLZsNmqzThV5exYRIrqk%2BQVXdDy1QUx1qSI%2FMzuZeEN%2FPTyRvMDMw9%2Fz2bt9Gyc3oiv0XEb3ZwhUPivGmFMcKyXme6C92btD5k8KgjhwNmZqySqyeC61%2BoNyXf%2BKnTfkOIcmBccQT3weHgnwwz%2BykJY%2FZrCwpp9X4%2FacnUzKCPy2OxIzaFAZfvFII758jLBXcszL1FvPnaG3G890eTBVLefvrEHUEyu2%2FnnZ70aerXbGw%2Bixa0sMPP%2Bxzwiuk%2Bj7oYbK7gsjr7Hq4HKfiNwr35Oy593YqznjVGVELXSOnvw7vJGdefQGwBaKeqwfIJ9Y4Zj%2Fq0BlFpUlmllkD0BrZpgFUFiqY8j%2BnHdyT4Q4LT%2B9Pp%2FSU6oORrHMyU4HTCovb0zJYtxb7d3dSU%2FjDMJm9%2Bc0GOqUBhmLn2QcufwExHzT%2F6%2BeHVta4ozhVjIHMf%2F1aXbGueqeZVRoqIK7GPtbqbnXBzEj9QQg8vk60c2Cm%2FevUpvG%2BnvlpsjrnnNvnk1H0JaI3P7LxPwb5ne3vPsKghHOoIy0RMsDVGouOD3LWiSFUyBio6Wg%2BX7T%2BZ5fhD3jMcHUd4OKqKIGIN%2BvD9AG7We8RuawrOCFjF7rXQesh94zrepFd3LYkEm1a&X-Amz-Signature=54df9ce852828e1f8c21b58c0b900ec5f994c0f40aba2b8d6f206c66a56670b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XHC23DD%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T111237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGK7%2B7JGEw%2BxJiT2bYtKxy8l9QGruQrlRXVO3wHAw3q0AiEA09GUcduSNikwTBpPucEP2TYegc6Cxau0DY4OyUxyLrYq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDCF8s9TcSAfrlns84CrcAzsudNFfep9%2FI8DJVxsnlMECCpVHkFus8TjBA2GYksshh6pb%2Fqpg57emit%2FZ3Glqozui%2Biqz5GM%2BpNPfMHm1iAy6ZaFq6xpGwaOwLcnI6xKounVpQlElhWcqlXAspa9JDVDsGOPD2IJjuhignzvX1twx8R%2BhkqC%2BAmtWvzhWRnfOeMsB477xzySNlw7W%2Fn94rBLDvteeTKyJlaBGSz%2BspvehpzmNmrWo36DeYVMcqP1hT76kQHVZseePZoq6eRbsq65QIoXMctH4RhrsqjKZ%2FVkRe6F70PDw984nS7UmlyakA%2F8VCDTytoxwskW3jAMMlIzD0eueMa8KcauKLXp3ji%2BP8G8vJML10A39Xr09XJMNyPS3z5TnurCzgeimYFtK92dAstpmXA30KSOFrqz25Nb4MgW2gfdcf7EwYt88U1KQaYESz2QnUWsf7iOHQzlsHDaSOqoD9aajjYppDH0XxthGEW3e8KSr5iBvfwyFJd3XOIsjhx0PRoTXsUOImh2fNzW4mhfBGL4Hxm1RYv%2BNEhd2Onagj6Ost3lP1OZ%2FcI43X3E894%2FuJXo0mm%2Fl0dc7UQG8HoAGHYYBgQgIzcs3enE9KMx8uT9ELbUrZbR64bzV%2Bod9bRJwusLUX0oYMO%2B8%2Bc0GOqUBeHXbPY90Mj4KungrKBfHBS36229sI%2FdKwGST5onX0rP2bRdGJrFv2HuOPI1Rn05JXoHu8oh8Q4Ag5xbwfcWdpnhp5A4Hpu6%2F8ZDRXC%2FO5isjJgzVIwNPri4LjfWj%2B%2FULd9Js74kgFRQ9h%2BTrUBOFegM%2Brqtd4c3otgsU55YnKZ1IFWNfjKyDxLrGmw1fAwLQbM1GwDyuFhlHtmkdQguM8JPQFJGv&X-Amz-Signature=d5c2e6335c3bd65519134dee290b1d9b5f33cb9399d88839b98eda0aa0ba16f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

