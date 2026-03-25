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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QV53GMCQ%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCa5XibMrMEVKDZe7pcRv3bfkZBk2AUmWBvcuzC53Kg8gIgYZbhZwHOEi%2F7Bf%2BqbQ8xxF4J1n0rAjzcDdIxI2yACzkqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJqO1P%2FPPNjTEgU4AyrcA6cy7AQFlqXyuyeaCAEzEpc816pm8Imo2971PcF9AQ9DnFvvafR%2FpASvFbDGiu2aBmUsuae3z3q76Ox7b35aoC9bispY94pSylxnzaVTnCHLmiLoz1L49N%2BcmEobeuXBsXeyDexz1OEwWijiipnwzV8opdNWak0ATbPtQAqKosVrGhK9i1nLHu9rVVsWyDcZpY2DZvS7bpanGLxf14gYJ3x1YktpjsSmuUytM9fHfm6%2Bgyss6gbKJCu63Mw3pVj5%2FaOVu6o9GV%2BkN8%2Bt9HztDc9ZmtHH8gQtY%2BTO1oZQkAX5IJ%2BU3RnMfbkzpy6Nvi%2BlXOVLhXXXy4DLtLgdzMu3soJ8J4ibyQ6Iiy9sS0Fpw8G7%2B2G0wRnhg8qSsqNVkPehzusx4itrHPeCfvJv4lVdUmMPwpq80S0UU8c1hf1z%2BjWcw%2FRfiHJgNElnXeqjT3SVyLavkQ8MePxNg66z4%2Fxlrf%2FOe2chjuRrJtjkRerDB%2B9oVeUHxZVZYQH69kHkgz38GeduzUP%2F6Ilfg%2BbiwNwRC7QYEHwPX9ukHhpG0rx2nQJ8%2BsVUUvJ6XSSbIvlegaIXYKtpDunGX8%2FOFcYhss6G8JdPHOabavMued85YINYkBDDN9DGcIHgVHRNx9tNMNW1kM4GOqUB09OuVYx%2FETodOYYrhWdkiC5a48%2FihgwUmp%2FfOLTA1PJPTTrMJfu%2BiOazDyTpRBViDQaAUIJYJ0IAPTKdyltPhiGNouWVFtmEm0OwRAQ5t2v8Clcme5DOztQMkpA%2FfjYSsr5pSphciKKpFb6M2RLzCiHlL5EcsrT8oQBC9toowAfLvk6yyxQQZzTNTte7jSa0D1FoOcs3ADyAJ0lI5P%2FkNsRDxru9&X-Amz-Signature=7726c3a171699ea8fdb836c5df704dc36a512419fb276952b060335305469194&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QV53GMCQ%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCa5XibMrMEVKDZe7pcRv3bfkZBk2AUmWBvcuzC53Kg8gIgYZbhZwHOEi%2F7Bf%2BqbQ8xxF4J1n0rAjzcDdIxI2yACzkqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJqO1P%2FPPNjTEgU4AyrcA6cy7AQFlqXyuyeaCAEzEpc816pm8Imo2971PcF9AQ9DnFvvafR%2FpASvFbDGiu2aBmUsuae3z3q76Ox7b35aoC9bispY94pSylxnzaVTnCHLmiLoz1L49N%2BcmEobeuXBsXeyDexz1OEwWijiipnwzV8opdNWak0ATbPtQAqKosVrGhK9i1nLHu9rVVsWyDcZpY2DZvS7bpanGLxf14gYJ3x1YktpjsSmuUytM9fHfm6%2Bgyss6gbKJCu63Mw3pVj5%2FaOVu6o9GV%2BkN8%2Bt9HztDc9ZmtHH8gQtY%2BTO1oZQkAX5IJ%2BU3RnMfbkzpy6Nvi%2BlXOVLhXXXy4DLtLgdzMu3soJ8J4ibyQ6Iiy9sS0Fpw8G7%2B2G0wRnhg8qSsqNVkPehzusx4itrHPeCfvJv4lVdUmMPwpq80S0UU8c1hf1z%2BjWcw%2FRfiHJgNElnXeqjT3SVyLavkQ8MePxNg66z4%2Fxlrf%2FOe2chjuRrJtjkRerDB%2B9oVeUHxZVZYQH69kHkgz38GeduzUP%2F6Ilfg%2BbiwNwRC7QYEHwPX9ukHhpG0rx2nQJ8%2BsVUUvJ6XSSbIvlegaIXYKtpDunGX8%2FOFcYhss6G8JdPHOabavMued85YINYkBDDN9DGcIHgVHRNx9tNMNW1kM4GOqUB09OuVYx%2FETodOYYrhWdkiC5a48%2FihgwUmp%2FfOLTA1PJPTTrMJfu%2BiOazDyTpRBViDQaAUIJYJ0IAPTKdyltPhiGNouWVFtmEm0OwRAQ5t2v8Clcme5DOztQMkpA%2FfjYSsr5pSphciKKpFb6M2RLzCiHlL5EcsrT8oQBC9toowAfLvk6yyxQQZzTNTte7jSa0D1FoOcs3ADyAJ0lI5P%2FkNsRDxru9&X-Amz-Signature=7726c3a171699ea8fdb836c5df704dc36a512419fb276952b060335305469194&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HNRCKKV%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCIT63jtluEyWpTgs60pexWXyIQ%2B6tw6BHui6oQW%2F2oFAIgVUlA9LmENc1jw%2BVg2Lw5gGegrgaj%2FW6oSyTL9lIcyt8qiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM0Cg1StxaHdJtkeYyrcA7hNDhapido0mE%2BDBbc85LhoB12bWSkzgZnsR54dLsVjfZbjikPauDXCpu4ZaYt1gzzbrzA%2FGkNVm9NhSgauf5f6sZ7zgFWx4kQdwwfTSxg6uBteh2GiOSEKXRmWqgP3KQLsZ3U3v4g7JJLIJ8DrZHV0FRnAwoxNv8aVJ37d1iqy%2B5jvwE1xgtb5LqVrbBt5ydCMRyXy%2BkRbXDWFBhcEvacgSqBElgqy19XRVinpi%2FNCk1pkGDNoJFEfqScwWM1ko4pb8W1iJmP%2BxGQ6vEdcCb3kuzm4UCjZD%2BoFOb9Pl7Hbj5hCY%2Bo1UId2xiyBWokIU5jHfsxu1qME6FzxgocTbNM%2F19KIGXAPDlZ9hhbnJg78%2FvOy1cMOadzjctM4slckqsQS6kcFzIGr4S9QisIA0uyUHt8yQqG68kSp%2BozwHndcaGCn%2FUlFzTIIoNvUP7PHI63xDedVnPbAgfvrxTmcNpOa7wXF1GsNtT1SQ8tg0GJSiq%2BAWA1GAcwIzF3h8tJzL1r0TF3cHyefdUECFdR9KVh8Gb6fEUeNjA5fDxdb9r0gdaoklGu0xBNY5c8nSSojLguqml0CANAX4wyz7%2FrJo65NzPCZf%2FwmIuNK5Fjdc3BO%2BwVCWdwbNw%2Bj1ka2MOS0kM4GOqUBuZzQKHM6dykjdP5Kg%2Flx4MdQ5lEemHvOeMQ5E1qMwmpwB2hOba%2FfN%2BqCnJA73Ucyh9ivIyUXg%2F2MviM2O7LfhrUFSw%2BG8Kuzht3vPUAkzzAGVUDRMlk8hoW05%2BnCf9%2FESEo2BbMTEdJv2rjS0ElZcq9GwkoEMd3kBAGwR8%2B3Cn9dHx6b3QDFqkwHqPDm3iR9VqCDMTBgJjovGOJHwxfIv0aVRFcq&X-Amz-Signature=4a695290536225c444134c5b2bffad96a86581ea59d38d896ac744108f31a4ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JYB75ZS%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCcUbsvX1a3JZhxaGpntbcZ7EXq%2BEFRRfJeIe%2BjHh289QIhAOWhw3w4SkU1cbmLa5A8oNrS6etZz38C0%2Fb0F3pTLsI6KogECLP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0AQk6LivZXSv4Vm4q3AOb7Rm1nTAMs3P1pppPEtByMbBj%2B%2BrBcjctfOw5PvOkbs3ioT3ol5bdy5%2BBMkTtSA6I24YyyCVwy2TQmypIu%2BjiQn47s%2BcpFbOV43iLkQvSUqc4tp%2F1QzsD7LHF0%2BjqzJHV1%2FxA7LR4D8GbyKFSnvdY%2ByLMf7EquBw8%2BiuZdkQUw%2FSazSjj86vnOcQcq9GyN3yEVLANgS1e%2BZwqEBp9TjM6IM%2BEh1%2BBlbC2SQznL5oW1OelXvUbH6J7%2BXmtVJ3oVtaDC4xQr3KOaxlQrw8cvCUXrq6ZEqHz76tYrjNopoBbSCrBYFkF3n9vwLItwvloOccvPBYL%2BpIJX%2B8v%2BYSW2j9F%2B70YOlCD%2BoV5swld%2Bf%2FH8oxW9T1MYAgy2ai1VTW3ubz13KZxbO4zaSc28BRDFdzFt2473KGeyuhM3kguLQQ976Hv1GkQomf%2F15WECrW4wSnix42LcY%2BVZwZmZR6knhRS2MhuFl4ifiEQEwR3kFKVpKx%2FTJ%2F%2Fjcq6Dl8i%2BVUteTgETyljaQFMa7JKWJmbpCZSXlSIcS6liN8dDg35aiYIALHQmPIhxnmNtNTrcf5AOiXH4%2BLke8219fJdqE3Gxeictv9Fg6eeHC14AI5B%2BxUWXh51e8WAmtf%2FGLxDMzCAtZDOBjqkAS2ef93DxOnYJU4eBC1hTlAFL6nfcsOTruE7P1GPpRi33Frv0qa64hhykLS8LmyxYosWjnVuXTbE4N1GM8uZeNK5DKX8qOiMPOwGEqX%2BZEnq48%2BRGHJxAm%2Fwylduq6YTMlAzERnGxhA3ZNGcWscs1QYWOIJSd3mBKh%2B7CX%2BFobhEGp%2F8hsC1yZcjEgKIvnjx%2FfLfMqyE5ZLQrkulkp3ZbIUc5rGI&X-Amz-Signature=c1dd8b8063763db1ddc8f5f206be76dbd41e4b3d341de16217e6c7246f33cb29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JYB75ZS%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCcUbsvX1a3JZhxaGpntbcZ7EXq%2BEFRRfJeIe%2BjHh289QIhAOWhw3w4SkU1cbmLa5A8oNrS6etZz38C0%2Fb0F3pTLsI6KogECLP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0AQk6LivZXSv4Vm4q3AOb7Rm1nTAMs3P1pppPEtByMbBj%2B%2BrBcjctfOw5PvOkbs3ioT3ol5bdy5%2BBMkTtSA6I24YyyCVwy2TQmypIu%2BjiQn47s%2BcpFbOV43iLkQvSUqc4tp%2F1QzsD7LHF0%2BjqzJHV1%2FxA7LR4D8GbyKFSnvdY%2ByLMf7EquBw8%2BiuZdkQUw%2FSazSjj86vnOcQcq9GyN3yEVLANgS1e%2BZwqEBp9TjM6IM%2BEh1%2BBlbC2SQznL5oW1OelXvUbH6J7%2BXmtVJ3oVtaDC4xQr3KOaxlQrw8cvCUXrq6ZEqHz76tYrjNopoBbSCrBYFkF3n9vwLItwvloOccvPBYL%2BpIJX%2B8v%2BYSW2j9F%2B70YOlCD%2BoV5swld%2Bf%2FH8oxW9T1MYAgy2ai1VTW3ubz13KZxbO4zaSc28BRDFdzFt2473KGeyuhM3kguLQQ976Hv1GkQomf%2F15WECrW4wSnix42LcY%2BVZwZmZR6knhRS2MhuFl4ifiEQEwR3kFKVpKx%2FTJ%2F%2Fjcq6Dl8i%2BVUteTgETyljaQFMa7JKWJmbpCZSXlSIcS6liN8dDg35aiYIALHQmPIhxnmNtNTrcf5AOiXH4%2BLke8219fJdqE3Gxeictv9Fg6eeHC14AI5B%2BxUWXh51e8WAmtf%2FGLxDMzCAtZDOBjqkAS2ef93DxOnYJU4eBC1hTlAFL6nfcsOTruE7P1GPpRi33Frv0qa64hhykLS8LmyxYosWjnVuXTbE4N1GM8uZeNK5DKX8qOiMPOwGEqX%2BZEnq48%2BRGHJxAm%2Fwylduq6YTMlAzERnGxhA3ZNGcWscs1QYWOIJSd3mBKh%2B7CX%2BFobhEGp%2F8hsC1yZcjEgKIvnjx%2FfLfMqyE5ZLQrkulkp3ZbIUc5rGI&X-Amz-Signature=357c0c73387c6322a0d4809e48e85b7f50790e18a90c377fc16af8ca17dfea80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSUSJO5M%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6%2BwdNgVdQ3is4YNsTPRl8xi3cKlMfdoQzLT5wpferowIhAJUL%2B3YmEAc40yVYsmLIFKH01BsTPEDHGPCbgFDUyw32KogECLP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxVYPSwVOuz74UDAycq3AP%2B%2FdW6ZqZWKA1YyuRqVSYx9i%2FVES%2FYOl6sEnYqXyS3pXW%2F63jFJu9gvGsU15tFStzSzPiUN4CYfDnTY6wYXkp5W6A62UI3ii4yEpJm1OvHNbgiWm1OOs651teYLfjv4HOo%2Fd2WZ6mU%2FHw9kzYmgRgen84VZnxVgs9CTtdg%2FC7330mLqJxtw8ySZQce%2FnzN9mEeZZu44wNEld0QoxRfbjq9vEXYVYUo4OVDf7Ezg9IMphGvmER7ZSenpo67KFpiUuj2Twt14m6aJSB8dIMO9Cfygv%2B0JMJVgAR%2By75%2Fq8H%2B55oFuXoDTRtoKtAYe5uC0vfdqW5JYjqgjWekknO4wjNrV9tEM8Z6qYyFjCu5HLM3Q5jZA1KhpzTyZWJw3SGRfvDPFZoHXOmfJxuhC%2BEpr2e%2FX65K6gg3cG0RwoZOrj6mw4WTdOKuDO6TFmrMq9PO5mokz%2FIr2l4vsx546LRmK0dUcsSBz1U6bSmOZyeBQntDQqXPi3SKOn3jh7XAs%2FaiodSIkCv9PI%2FkvP9BGFjF20d1SjKb3vmpjEFKYu8bcF1lI%2BgTrrdCxqYnL7gIBLPfG5XUhSDKQESKf%2FQCW9ea7OyfO7tcjoGcSVq8p4yAV2yn216oG3XB0f5kS%2BRnODCntpDOBjqkAaBK%2Flp%2FNTgvHwyJ30YtYcoH%2BlI1oPx170ojU%2FaRlFKWR07P0bs2OBSHttzGvCkonz5vgsEVTSF67dOm3F6Iy96uYmMugBb4FmszSMGDP79nJXyQ%2Fl3vQfFKW91tqG1qx8149HVB21tenNKW0N%2BWaG6JT8oAIj1LZyCDyRfl7sZrUP4IM%2FFrz5M88nqpQLXSquO8EzrwwfUdL%2F7s0FNHYpwN3BsD&X-Amz-Signature=cbb0d7fb8ce2337cd5d29fe45f5ede0a96984a0fde3bb7591f54d3b812816b80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SM6IQHT4%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAk3Bko%2FjNDkohOXz78O1KTx67WSH%2FmSeS2XO6EoxSX3AiEA%2FBIGl%2BSDriZ6U8VehE0whquWEVdsZ9Wr9xideMFUOJAqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN6rNLkPqOGVWQxH7yrcAyCO4cak5FVn1o36T%2Fz0bYvgsSBHIatrFXJdD2hc6XVzumMoeH3X60IUU4OKyco1Lne01x05X98%2BvY4ifmRBSQPnLS0DWDwxDfvn6uf55e7KXfghit%2B8hnBhScutO4LohINVboVX%2Bb60wKq1DhitkX7GaIjSB1wLY0uEI86gLP%2B7bMXz1iV6G%2BsjtH9VFjjc1P5sBjzOVmVPOxzxv9ZPzybx1NtXlB5F6WqZsElITepP60x3Y0mvIHhYZ6%2FCJgrpivCNil27%2F0DakPG2%2BXl4MdTYf60JkfxGMcCdYwtzmsfZu8RFQeAeHKMX3KzPmVdH2kS9cw6PR5eYMuJVvzxZ2n%2Bsv402fWDHg7ULqKEH%2FzgHSM%2FYwtae2%2FPdCCfyj9Q5L%2F0G575lm5LLh3CVTXTZ5RBdjC5DqjZTr5BcEWjCoL3uGeIWx33NeIhpQrwiUIjQ7aPViySwtKXMSBMgxP9o%2FiGcuXS7%2BFkD4Y1PlojWqsXLOVBWCJZy6Ly8PGcHqoK5geGu8Y%2BvYRTtDHZRClGJKgDF4%2FqqciABM9I%2FZie%2F5eODUmT%2FWSB7GrtOwShGBLDMFBoW64jQcuZ6%2BfW5SMDjmZSnGdlwsTJnEP5bGxxOvqchkSXimUNAYaRTBZsbMMi2kM4GOqUB4qge7pT5XBuZWHfR%2B4M25ySpKpz%2FT9nYNHBlR7yT9Lm37LuUxS2NVaIa2bADV3fFwy1UMM647%2BoPwWucn6W1rsp3WJEjhgETEjCjRvrej%2B5SbvxW8%2BteVV1iJup9W6HFs%2FSE1A7fi8kXajH7MSRRAp8RcWMas4efM%2Bx3fc%2B%2ByN2hP3eS33Kz5trdriUVYovaWYEQRUvj1%2BOT4k%2BAmHTpv0TjPunw&X-Amz-Signature=388001efa954c8a3eb9f03cd5bebe4949407b575879c48b00e08a9fd0249fc9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PGDDOVT%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCO2MzkKcML2ARMJI59chcv88WEMndYxyu22vqn4hj7tAIgFQNekPAn7M2c%2F%2B8XCsxnwprh9Kuk%2BUiMG7goCXokKvsqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEyq4eoJSSpd6wWOvyrcA1wO97klxpmohYqRkZ3QFd%2BRiBr115KkMZCAThh5UxrPWhEEKsbinwE1n4YQJBv6%2FTSJzGk4atau6fGI1itz5YeG9OJe7Lb8%2BEzTrOixWRRHsgjU7KOZwLP80tgrCzzVkGEPlq6gl5bhTKcLYpTzFqrcG2%2Br9kITJ%2FSXieHn1yfZ9c5erFun77A0OdF2Zk0TsyLYvsgZaC%2Fnvj5G069nJN0%2BceKXN9qFVHvbN2hKHTHu%2BggeHSuaDfIL5Titkf5eKnyNPfT3yNzXd%2Fs8lPfq0gvQF%2B79WBiDFyHa1cCRhoIBfMCR3M9X%2F0XnRulp0OS%2FWEvZd5pnj3ufYblQipn5K%2B71sQj%2FZtD011QDzQKMaOr9ahMWD%2Fcjd9u4o6poap%2F05e2DMO9bsAL5qqFrRlh7oAV7Qk379B%2BayBmQTXKHs%2FBNPuEUBK%2Fbc8U7wuOXR2fMu10HNGo1bbeNpbUwqGmBegpxVA8P5TpYnfC8UI2tYHhqYN7cKUUrkKBcj%2BCEwm3Y%2FvXE3oTVr2we50WM6TY12r3kQ8zd0fVIe5ahd4hl3i6iK8XD6wBTaOKyu%2BCXn9IB%2FFqvGngWfclan%2BjE%2FU2UCdxECT5sECuZuaXYH7QpEwiKtnwOBvxVxABEThl5MKW1kM4GOqUBE7jabQeKC0Avd6JdcLvSQyGKd22Bsrn4VOlF%2FXlJtt64dNXWJ1qHUXXWOkkcPlv50Iv89XE0p3lpQOP0q2kkNGKO189qW4unkjTMTRUqMSOKmpwDaMlROp2sVyF5h%2FrtViM%2BNb%2B6R9j%2F6jWqqMqQDjlObhPlf1lEOOhlLz3NNnQeSAJdKfPJRhSrlXVr6JPZYWB6L3QR7FYerWBg0WeWEKYBft7i&X-Amz-Signature=98669e49162dcb67396211969d5fe4e8f6d17fe1e80c78469511223c7a4cc935&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665A233HRB%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCtZWonpEnVeViCgo0Tv7HyQCheq5c2jB%2Fl4bSCCryFowIhANK8hoOBfCrB2bDNx49tPchcrClHswUXYS%2BCpvKkM%2FRwKogECLP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxu09e14BcVoilv%2FOoq3APw8QOZo%2BIr12Jq6HxqQQD7J44o7gnHoihWLmZshGU0WCLcg%2Bzh5F5pfvIKckd4uX5ZtERoc7jHO33aNbBDN2qBIUgDk2a26iFPVM5qXQk7kTbw4sfpCETUQxPVP3qfs0w3HzjR83usscPZZt47NJcShaTKtc00623LqCKrOGDevFvv%2BTtcFnYbx4bIjxR%2BnLLPbL5OBDKwdIx7XhOgqD0PVMbiOnLLNu4vMjrsNPNoZHQhZPGW49dwftV3otrzYzCaF%2FVSraVaPT5qg2g%2F5EygM0W21Y0VuNqECGFTRjKX8MFZQQmxQZxMY9qRYCfClLOdjifiJKnOiBbCc70S%2BwHyjs4SnWvsnOTNFe4Dz40z0zBzPqaeAVCaW7r1n%2F7Ng3aKqwaXomkaW8mQp2po8h0%2FhuZzLcIUZh1uQCcHBYqJSgIbtYx4NJ%2Fv4CT%2BagDt%2FlHBp0REtk1Hr9mTLMY%2Fkdr%2FfThJObPwhHWvdBmnKDNBhnuFk%2Fg9f8K26B27AngjhwU13Pn6w4Rv2Ju5z3bJHyWuBANJ1bmuUI5mJj9hx2JxSyUeE9tef1A6VYNAucU9jxg35xhLq9u7W49FMLY2WMk8mvyx%2BQrX%2BpVedZrCOSwid8%2F2SJyoy%2FHeyOtY2zDJtpDOBjqkAb4VBsrVbumaLuObRtYsXUYZ9G8ckrQ1f%2F1cjExQIiqJVwI76hwk9id8qCCwffz4rEauKSb7ugppbpOF5e4jiJTO%2Fps17UGHLroJagZPbT%2F3FHNpvibjgm4SeoPvxuZfyUT612utxW7v6hEK5RVL1IFEvY%2F%2FBU%2Bwn%2Bu9JHyulE98h5x5Zb%2FOqSUlYIBV0gc9nHUbcufiFGNdDapMCFAZjTfqSSqh&X-Amz-Signature=70d39b3fd4cc635e0448343a92a8b937659dfb8730e3f4bcf2daa0b14be63000&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665A233HRB%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCtZWonpEnVeViCgo0Tv7HyQCheq5c2jB%2Fl4bSCCryFowIhANK8hoOBfCrB2bDNx49tPchcrClHswUXYS%2BCpvKkM%2FRwKogECLP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxu09e14BcVoilv%2FOoq3APw8QOZo%2BIr12Jq6HxqQQD7J44o7gnHoihWLmZshGU0WCLcg%2Bzh5F5pfvIKckd4uX5ZtERoc7jHO33aNbBDN2qBIUgDk2a26iFPVM5qXQk7kTbw4sfpCETUQxPVP3qfs0w3HzjR83usscPZZt47NJcShaTKtc00623LqCKrOGDevFvv%2BTtcFnYbx4bIjxR%2BnLLPbL5OBDKwdIx7XhOgqD0PVMbiOnLLNu4vMjrsNPNoZHQhZPGW49dwftV3otrzYzCaF%2FVSraVaPT5qg2g%2F5EygM0W21Y0VuNqECGFTRjKX8MFZQQmxQZxMY9qRYCfClLOdjifiJKnOiBbCc70S%2BwHyjs4SnWvsnOTNFe4Dz40z0zBzPqaeAVCaW7r1n%2F7Ng3aKqwaXomkaW8mQp2po8h0%2FhuZzLcIUZh1uQCcHBYqJSgIbtYx4NJ%2Fv4CT%2BagDt%2FlHBp0REtk1Hr9mTLMY%2Fkdr%2FfThJObPwhHWvdBmnKDNBhnuFk%2Fg9f8K26B27AngjhwU13Pn6w4Rv2Ju5z3bJHyWuBANJ1bmuUI5mJj9hx2JxSyUeE9tef1A6VYNAucU9jxg35xhLq9u7W49FMLY2WMk8mvyx%2BQrX%2BpVedZrCOSwid8%2F2SJyoy%2FHeyOtY2zDJtpDOBjqkAb4VBsrVbumaLuObRtYsXUYZ9G8ckrQ1f%2F1cjExQIiqJVwI76hwk9id8qCCwffz4rEauKSb7ugppbpOF5e4jiJTO%2Fps17UGHLroJagZPbT%2F3FHNpvibjgm4SeoPvxuZfyUT612utxW7v6hEK5RVL1IFEvY%2F%2FBU%2Bwn%2Bu9JHyulE98h5x5Zb%2FOqSUlYIBV0gc9nHUbcufiFGNdDapMCFAZjTfqSSqh&X-Amz-Signature=eb0bd126a8f4ecd0a4fc90642ea990bbd9edca85c22b6accf1f8881fa3140e2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBGH6ENN%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDsH1OUUqLGbeNpetf2pKxW0ldwP41OTOzCsZ9%2BwIh%2BTAiEA19zGS%2Bm2vk0RF%2BtQyofx001f3tJLalgSsOiaboFTlNQqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNIjii2u43uyy7ReMCrcA%2BIEffZBtPwyUqCOh3uTCEGiPab6HV1bBwHSmJHiuUh%2FfIENyUeVr%2Fr63MTSa68LpSKL6z7T7ui7WVmCGOg%2B4pWQzwzL%2FBYwoQBJhJO37ckQoXKqOjWiX29S5O6xuqFwGpFbg7P%2FaxszEtKpzAD0DSSo5NchqkBQpyDB6dH1vW1jP3EbA0zR84%2FRiWHgCuKXLZ87iekaqusP9kby1Y8zcNI4gaBOtjz%2Bq8w4M7GhnnXNY51qMmfbV6%2FR6mUokaRLSF6By6FBkRybzrYo1n%2FHnXorOG03e1yo%2BjvHpd8eTbzEDqeXYpgGH7bTwkYZE%2BlKVmJikiKgeh1cwyL0NHOHqAyz2OzP4bgN6s%2BiK%2Bzjk76k3%2FEIL%2FVihGIMIjRI4ydFjjgQEaDLUjrmJLKbCGMjv3CFrCM6ItrYxXjxEmWNRe9kF21mk%2BmjzKNriPGImIoB1C1I9CZE13j0DU6VryNhL2cQKU9GaJV68jtJ5FXAtEe%2BgxlD%2F07TgjQlWSwv1MEu0sgXzK9vD88gKy0vGNKOv7K3TJO5PoctVeQW8M2XSYGvN4aFOKBoRK8gV1AzzukmsMM4sBrTe5g4nxE89xVKAnk1YcMHYgMp0vjGiDEaOPiX8E3%2BY07KUYEV7JqpMLq1kM4GOqUBQnZznL%2BfV6eN1B0NMch%2BUFTijp%2Byfw3tbau6wX5Kvqo6mSW83z2XdrhyaHe1WQ579x8yhopOFjzHPnS%2F2jC1gmEoMGE5KaORZWrZXnzvV5gcc6cMCgYxNOGKYbV5K%2FcxEQJjb%2B0Ji3kfb%2FUKZd32etL%2BBgrUY9etuVGdRyJDNKUvF0BGutbvCM56bQHfATqniTBz2UQ5YmwFquOcUi3qZk1Qqikx&X-Amz-Signature=5a6306a783cf25ff40c8d6ef8f1827d5cde4f189f9a0fa533afa87e70f40c98c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WX7Q534U%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBZLI%2FzF369UPm8bQhMGWcpMHb2qeqV3aTWLpH%2FAXZsKAiEA6kQO5axBMGgSfPqzyyhP1amm5RfIcbaPqLBMIIIhE8oqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB7HY1AzPiVfhi27EyrcA%2FCXUlP0Nmypbq%2FP8g0fu%2BG4%2FFbsxdCpPE%2BTmICFbN%2BEK77y9JXb79qcNsk%2BCwGyfSrIEMUtLjrnFEFBrRBKVxUtPp28%2FMAQQ660xr7AAXIC0OSrdaRLIqgJHHPJMZRmnj%2B80SCVDns20UbU5qV5jmxmwfzyz2mw0QxvWQl1X23iAgwtfmp80VW7H3WwyMv0H%2F4l5QFzDdKg%2Bb61Rna7PToFKKJnU3ns76DzBYFv%2Br7X0FZ8W8lQL7CmiWu9vy%2FZ%2FpJOt9Uoeh8wP337%2FITukiZds5bYGwS7FKmLCmuOLeREiIVZ16PwAidCBKFqHkJEXBf%2BPzhQoYTRPjntkUb4Y7C1QwQOHnPVNLBOttnF8e8htXf4M4e9yWnc7QbOK%2FVghOkqJDH3s3GlL%2Fs9k%2FHMOgZizSq1ZF4FV3CL%2BD5WAOU84PokZ38Dfgw1m8ZOkY0t62Jf2%2BxGXuc57XBKrG8e6JqnRV%2BXFEdrkpJUlH93tcIvAKE%2BeCJp%2Ba8%2BYwDZuea7tWSD6QGYCKhsAOKRf%2FDuR0hDkuwmz%2FWYEOoLBqnSxvY%2F%2BLQ06x3KsIHy86noS6YoWsnGqCP0Zy4J4kjOV4kGDPH8YIp%2FzkzkVTlJng%2FUHWH0CWLT1geH4JajomkfMKy2kM4GOqUBK7DQyKhqQ6XToMN2jivC3boAMdKT2W9HspdNySSvRNMmszqK3QhF44Tw4nRogT0GHzuXcvKknC9in8BJWflTTdVj3jCshI%2BkBF7uWpPxduzPXQC3VjSB%2FoAR3dDx%2FVjp3TQFNYb%2FmXO1VI4Jpn%2FOPDeGvR%2B0tzXtvIv6cjCcygVe4a8Ty8CJ4OKcLltvHw8nhBffKWEmgDW5%2Bae1ZhQCcPFHGTW3&X-Amz-Signature=fdb181bd2f96d4a46f25f68d8784a7afefaac6d81f0a93a72c1660917e48e2c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WX7Q534U%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBZLI%2FzF369UPm8bQhMGWcpMHb2qeqV3aTWLpH%2FAXZsKAiEA6kQO5axBMGgSfPqzyyhP1amm5RfIcbaPqLBMIIIhE8oqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB7HY1AzPiVfhi27EyrcA%2FCXUlP0Nmypbq%2FP8g0fu%2BG4%2FFbsxdCpPE%2BTmICFbN%2BEK77y9JXb79qcNsk%2BCwGyfSrIEMUtLjrnFEFBrRBKVxUtPp28%2FMAQQ660xr7AAXIC0OSrdaRLIqgJHHPJMZRmnj%2B80SCVDns20UbU5qV5jmxmwfzyz2mw0QxvWQl1X23iAgwtfmp80VW7H3WwyMv0H%2F4l5QFzDdKg%2Bb61Rna7PToFKKJnU3ns76DzBYFv%2Br7X0FZ8W8lQL7CmiWu9vy%2FZ%2FpJOt9Uoeh8wP337%2FITukiZds5bYGwS7FKmLCmuOLeREiIVZ16PwAidCBKFqHkJEXBf%2BPzhQoYTRPjntkUb4Y7C1QwQOHnPVNLBOttnF8e8htXf4M4e9yWnc7QbOK%2FVghOkqJDH3s3GlL%2Fs9k%2FHMOgZizSq1ZF4FV3CL%2BD5WAOU84PokZ38Dfgw1m8ZOkY0t62Jf2%2BxGXuc57XBKrG8e6JqnRV%2BXFEdrkpJUlH93tcIvAKE%2BeCJp%2Ba8%2BYwDZuea7tWSD6QGYCKhsAOKRf%2FDuR0hDkuwmz%2FWYEOoLBqnSxvY%2F%2BLQ06x3KsIHy86noS6YoWsnGqCP0Zy4J4kjOV4kGDPH8YIp%2FzkzkVTlJng%2FUHWH0CWLT1geH4JajomkfMKy2kM4GOqUBK7DQyKhqQ6XToMN2jivC3boAMdKT2W9HspdNySSvRNMmszqK3QhF44Tw4nRogT0GHzuXcvKknC9in8BJWflTTdVj3jCshI%2BkBF7uWpPxduzPXQC3VjSB%2FoAR3dDx%2FVjp3TQFNYb%2FmXO1VI4Jpn%2FOPDeGvR%2B0tzXtvIv6cjCcygVe4a8Ty8CJ4OKcLltvHw8nhBffKWEmgDW5%2Bae1ZhQCcPFHGTW3&X-Amz-Signature=fdb181bd2f96d4a46f25f68d8784a7afefaac6d81f0a93a72c1660917e48e2c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LCYTSIP%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T174558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFjTQeheQiLmpBuZGAcbjrRpMLOEJ5cwNGbvSriE1bGUAiBvgzs2ZT%2F%2BtiQ%2FqfB5N81usvT9HWTCpNYIU6ZSejc4vSqIBAiz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjW4timbxdyaf40H%2FKtwDq4h0br8GMVM4BjTf%2Fs2tB1CRFuSzJBqxdNDIwkhXqvfh7ToH0tORGMHTV60MP1K3eQVOAhF1x3t3fEUrC%2BcWXg0M1KIeW64P%2BJ4IdTVy9dlKkeIpIf%2BeHY9qGcNyogIixVyydySCnoB3Ar2emBYwYptcn5x5NOhNt7EnVZIYIbab4HqGz5xo8wTHWe%2FaWl5R9M2D2VhTMNI5QmgvaR6f3r74Vjal4hSk8eE5CvNWkQSrXUZ4F1PypeAJctq5lkjOPELmW1g%2BPzGG%2BUoQnWyhIysj3TQkHG%2B4w8kSMwhj6HY1e07luq1kvVrDthWYK%2Bf%2F7RfDFEKw50zEdlxm3aBwI7zBcnWRMmEQD9eiycQZC9rVDgLi8PosZJm07nCpAfz1sAIpySRQYuc5xgX0VBtFXw8BNr3n4P5nkhQX7k2kdgjMF%2FSEtuiXgHCmEbUyVFSIkrpikhzMRQFba25E6F%2BVsxSYPE44SFLHMMWkbpN%2BFmBlStNHt%2BDpk6EzjEOzQ1F4rJ0sv1S7RJrAEamvwyOGcy0V9ekak%2FJO%2FSdyP4gLH4Odd4jFAtMXmh4bMnyS0AqCKfQhQB0EoIo8n2YdXcDI8xbCWwpmdqJkskDPl3azYvbWcFWBWZvN5y95EvswnLWQzgY6pgHAnOn6O9Yepy4ZQk3oDsG%2F6CzgbLMb0xlFSU0XcPBdNJUGgV2EzYtXo5RfeI1p%2FRecP2CRa4%2BS%2FUe5VJNZliGak2671wwaCB9adGuWcH4hq8Okt%2B%2BCDmvEGEEIjHRLasJfqBHXVq2NqC8GZf011sD7vr8QNz7hBw9Whve3L75d3oXNVSRtz1ZwjbtfKf2R7emrYG92jjX8Nq8m2SXz%2FtI3zAGuUbp8&X-Amz-Signature=8891098c0926c561cb8b5b33cf0da8add60faa4c4ee231eed475d9cb05b35426&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

