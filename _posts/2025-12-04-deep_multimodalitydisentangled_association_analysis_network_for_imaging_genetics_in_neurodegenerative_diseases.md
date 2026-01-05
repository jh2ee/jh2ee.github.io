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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NX5RECC%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIC35Pj29RkkfzNWfgqT5TiBs9dYq6phUhpqYfLsVNZavAiEA0Y%2F%2FzE6R7tSRsntQfW1pW6YoMFmjge70o7qf5ULD1YIq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDKe6ezJZwGzgHOTn4SrcA7vwzyzDMrPaNM6GVDVPuDzM4hQ9WNQy4rGxcm%2BZFwx5UUAe5kzPhF5wCQfbDcb35mvOLPqWG6ZKBsOYFzXljDC8kLDZy%2BAq6iRMtF495GHG90EqJCo84Q67orR3g6wOHdCTehUpj9anhq1Aan8%2FXciGa4U0KALFn%2BZCDNf8LF00UpI2dEjB%2BXydSNdmMvHoabwftWCgHdiekZcfnlBDa0Iqn3WdBkmxfLO2ha%2FDvcgiNVmCO%2FNsDlu7AFizfU4pEsiZcEPV4yvHDaaZbJxA3TwDKflpCKqrTQfQXJ%2BCpMFAg5%2Bi6fUv1QpWxgax0APoCwygkJDKv6R7rhZwVqXgxy%2Fo6RaBRKXAWJxr8o2PCMhzXuLGu4pPis3hqYfDpK5pxcGMsGNSZzloYrMRqDJL14spSuRV825Xp9VmAL2wsL6p6wJUOQWC%2BLcWgQu%2FqmurFDkWHc9K1tvXl58dRlm%2BaUPcVO6Ma2pvCTi4lXiqM%2F2ej0rL4NKwcgU%2F0XCXDPh4s6yt%2F17VZxHKz8kEfB6RTa3hq2C9tOr%2B2La5RJD4DyIzCpr1XZthX%2FFPwjlusaPzhv4eLCbfOmEvonRuMym4ZEd%2BBX1vbA7mJM%2Fu08xGObWpmFtIG8omgb2YnFnEMKjN7coGOqUBIYtIMVTr93AJGZF4aOvVc9rnHywxUIMhUwQxDeqc10YPR%2BzyMpcZszxB7yWUaxxuTm7vY9HBz8EGyXaHwhMWB3VZzH3UKKhm9iccA%2FTcrCHP1P8BHYEmE4QtYWG9tPoYBYbA7ommcnpiwWHOHPtdjHsijmdkjTbgJ28BASwPG4a0dCnwMKJmeMuTeM0eLY%2FUQqRPZPhtv%2BsLiSj0Usz6pAzjOaDa&X-Amz-Signature=f3957a736edb08d42907508c6405226945fbf882ed8ee4a1a9164b48a5cb5a46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NX5RECC%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIC35Pj29RkkfzNWfgqT5TiBs9dYq6phUhpqYfLsVNZavAiEA0Y%2F%2FzE6R7tSRsntQfW1pW6YoMFmjge70o7qf5ULD1YIq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDKe6ezJZwGzgHOTn4SrcA7vwzyzDMrPaNM6GVDVPuDzM4hQ9WNQy4rGxcm%2BZFwx5UUAe5kzPhF5wCQfbDcb35mvOLPqWG6ZKBsOYFzXljDC8kLDZy%2BAq6iRMtF495GHG90EqJCo84Q67orR3g6wOHdCTehUpj9anhq1Aan8%2FXciGa4U0KALFn%2BZCDNf8LF00UpI2dEjB%2BXydSNdmMvHoabwftWCgHdiekZcfnlBDa0Iqn3WdBkmxfLO2ha%2FDvcgiNVmCO%2FNsDlu7AFizfU4pEsiZcEPV4yvHDaaZbJxA3TwDKflpCKqrTQfQXJ%2BCpMFAg5%2Bi6fUv1QpWxgax0APoCwygkJDKv6R7rhZwVqXgxy%2Fo6RaBRKXAWJxr8o2PCMhzXuLGu4pPis3hqYfDpK5pxcGMsGNSZzloYrMRqDJL14spSuRV825Xp9VmAL2wsL6p6wJUOQWC%2BLcWgQu%2FqmurFDkWHc9K1tvXl58dRlm%2BaUPcVO6Ma2pvCTi4lXiqM%2F2ej0rL4NKwcgU%2F0XCXDPh4s6yt%2F17VZxHKz8kEfB6RTa3hq2C9tOr%2B2La5RJD4DyIzCpr1XZthX%2FFPwjlusaPzhv4eLCbfOmEvonRuMym4ZEd%2BBX1vbA7mJM%2Fu08xGObWpmFtIG8omgb2YnFnEMKjN7coGOqUBIYtIMVTr93AJGZF4aOvVc9rnHywxUIMhUwQxDeqc10YPR%2BzyMpcZszxB7yWUaxxuTm7vY9HBz8EGyXaHwhMWB3VZzH3UKKhm9iccA%2FTcrCHP1P8BHYEmE4QtYWG9tPoYBYbA7ommcnpiwWHOHPtdjHsijmdkjTbgJ28BASwPG4a0dCnwMKJmeMuTeM0eLY%2FUQqRPZPhtv%2BsLiSj0Usz6pAzjOaDa&X-Amz-Signature=f3957a736edb08d42907508c6405226945fbf882ed8ee4a1a9164b48a5cb5a46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEV67CG7%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQC0p1jVr5%2F1H2882ij2tv0SK%2BLa8zXjz7JG3G7TV5qSbQIhAOseyg9DrDHJWNwFESBBL2nWA2mAas8fw8GsYYbTiAeuKv8DCEAQABoMNjM3NDIzMTgzODA1Igz930v0G9ipoz32gNAq3ANkILMRdKLu2p12X0HPHC3v8p%2FF0Be5p6SH9Zu8j09%2B1sI5raRdEWTImARABe%2BWG7%2BWo0k69Hb9Po2lnG%2BlOpR0V4DFD2%2F8yNLMz2bBujmVgR7rSYls2ZQQdaA5eanDMEU20IgfvcN1OnGtOlHNziA7w0Fn2oUdyPfhvwiyTmNjrOs4jXa5ffeRMzPUPGOhEpDRztWVYtZ3SV410aXfufKLCzgxBmEtrIb2InxYIGAuAILeYyMagX5uTp9Bt6vmh1x527Hkh91ECW3%2FSjcMV22wf%2BwA2L6j5%2B0FMUcRggKvzDLnTlnfBMkEkC%2BHQQRPqNTPD12xSFB1Zg%2Fc7kgCYhY1Jrj2QdZFeoMaUrJ4q6ci52Jm2zvDJQDwmRi%2BXT8UhZEHweO7y471ll844Ux4ULj1fDnyYfDanJhNFLRF24ToRp9aoXwAQLGA9f03vugKZ4rcII9EuTgmO5dE0D2nPG3YonTItndqaWrW91DLZOHwTL%2Bc6flZRtpgj4f01Y7JygsV%2FiDmx79uCxJwCjfkhws1c2JsNQ7pj7qkpm5s6MB66VCbv9bSQET6GHv2enHi8dwEMeaXeLwl8BhosNmkXHbecWCiaE9F1QyOFhoDh%2F7bLdRsYbs1pEOC3Ipl6zDcye3KBjqkATl55%2BZPX%2B3%2BgErB3iZVQQIzc%2B85djBP%2FdfM0TFV2mjjPOjHsKVvqnODzntt%2BjyaaDXiaDJMX2qb27iN8Hgf6N7F2I6Fk09K3kjhF0hmgFBuiSBTy%2FmM613Ti4Iro14ZuoSGJjE%2FonaIkg2Nb1DyPfK2PR6vkCC8yim4KrNxF7j53tG1Fezlo4xpvLOiGXhTpra12qSy7GB%2BYhn0hxmkvNm4X1qL&X-Amz-Signature=2b1155b2e4a1fb4d7701fd483c5a9c904e48a0f4829c1ca6a37df06fe6dfd2cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MO6GUNJ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQD1T6DIFLmvRDscOSyUwa1Y6YzOZz8oGxnnGgK1WbKrnQIgJaGX9VYaerAO7MHaQNhmRGS0r3EZdwYMkLJbWgzHh3Aq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDHqMFyLZ0EAPFXsNVircA1IHz1GTkVbZHIrK1LnrF9cJBxVbj0kD8Cf%2Fcm7tDn4Afjx%2FDhHffip3WG4bMIEyVNp5xkUhOa1mM0wwamB7LtXA8IzssnhABNB52KdiFJrKiGMBstFohbhZQgJIPkRiac7j47uPlmrl9M64wmBQYsAo4IdSlpLCgJvZA2B0r6ebhFYeLHuMOXtVOt92Eq5ELn1DwRI4m3sTs8zOv0fJZKLwN2mdVnbYmfHPVJt21%2Fo9y5D1p56iwKHm5TRDNP5iMBjtatJkylitXjWzjAcWxnx0zjRU%2BqL24GVL1vAk6Y6HgBPqCBc3CjdoSyuwe0QLFBqCfB2dIzUc2o91p4yX%2FHIHtJ7SyuyKT4u0ajForIuZQLAbj9mo%2F9wmkrueGEVP0aNd%2FNriYXnSqJ4MrmGzsIA54FUqnGRNFIpD4PYDlB6lWr9Y6BJeNiGmuhakJhwQ0hzSexSFm8mIHWnXv1x7HJL8IBlm0Pg3LyZQuc1rR%2BjR3RDUTvYX6UqX%2F29RSDYjpF4GUKjGcg8fdrBjrSVvIjxu49KfUczWoVwJYKBUGuOPrnn%2F4CRG0jCnoTTeSqtiOY%2BsXByCJeNZAihbNNfT4vUc33zyqd8xOG2UKqa9dr8uB7MuSGgTRlC1IfvPMPzf7coGOqUB9Eiw6WTRVWHB4ZPMTC0p4KZAk0H%2BuLdg2N5ReOllPJvhzJQp7zjXIzPDphhe1mT7II66Wld8NxJoFJWUpBwb%2Fs4KCcWpSc2CadZk5tIdKjicnpzqrK05gg4DXfAMLCo2P7YeDkQ6vh87x%2FA4O6Eq2diGv6Tnd1mfE4Xd79qR9jsshUsAlroLq%2B1d4HYsK1qaudIKw2oDtnIPIzQoFimVULH7FLoS&X-Amz-Signature=bbcfd5b1927bdc164241994bf808a48b0d9fd8b9e701a5353ee4c965752fc1ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MO6GUNJ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQD1T6DIFLmvRDscOSyUwa1Y6YzOZz8oGxnnGgK1WbKrnQIgJaGX9VYaerAO7MHaQNhmRGS0r3EZdwYMkLJbWgzHh3Aq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDHqMFyLZ0EAPFXsNVircA1IHz1GTkVbZHIrK1LnrF9cJBxVbj0kD8Cf%2Fcm7tDn4Afjx%2FDhHffip3WG4bMIEyVNp5xkUhOa1mM0wwamB7LtXA8IzssnhABNB52KdiFJrKiGMBstFohbhZQgJIPkRiac7j47uPlmrl9M64wmBQYsAo4IdSlpLCgJvZA2B0r6ebhFYeLHuMOXtVOt92Eq5ELn1DwRI4m3sTs8zOv0fJZKLwN2mdVnbYmfHPVJt21%2Fo9y5D1p56iwKHm5TRDNP5iMBjtatJkylitXjWzjAcWxnx0zjRU%2BqL24GVL1vAk6Y6HgBPqCBc3CjdoSyuwe0QLFBqCfB2dIzUc2o91p4yX%2FHIHtJ7SyuyKT4u0ajForIuZQLAbj9mo%2F9wmkrueGEVP0aNd%2FNriYXnSqJ4MrmGzsIA54FUqnGRNFIpD4PYDlB6lWr9Y6BJeNiGmuhakJhwQ0hzSexSFm8mIHWnXv1x7HJL8IBlm0Pg3LyZQuc1rR%2BjR3RDUTvYX6UqX%2F29RSDYjpF4GUKjGcg8fdrBjrSVvIjxu49KfUczWoVwJYKBUGuOPrnn%2F4CRG0jCnoTTeSqtiOY%2BsXByCJeNZAihbNNfT4vUc33zyqd8xOG2UKqa9dr8uB7MuSGgTRlC1IfvPMPzf7coGOqUB9Eiw6WTRVWHB4ZPMTC0p4KZAk0H%2BuLdg2N5ReOllPJvhzJQp7zjXIzPDphhe1mT7II66Wld8NxJoFJWUpBwb%2Fs4KCcWpSc2CadZk5tIdKjicnpzqrK05gg4DXfAMLCo2P7YeDkQ6vh87x%2FA4O6Eq2diGv6Tnd1mfE4Xd79qR9jsshUsAlroLq%2B1d4HYsK1qaudIKw2oDtnIPIzQoFimVULH7FLoS&X-Amz-Signature=e1ba65b65d2660a86f3661d05d12f8ffdd9f35961a80ee639020c6340fe33029&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B6MJGZY%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIGQ5qNcFBBSjNay9t1xVMFC3OYt%2BQfUjfiCXCs0CuZYoAiEAg56kBIR6wE3Q83p2f%2FvgvTii2Vp%2FM%2FljjBA3O9pCijcq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDMcD6ymwjhlJjnd6hircAxxKoJVGKN40qw%2F07G3beYAJNAGJiCIgeCbElDHXiOfNpEGoMx31bE6I0hDzjOEG72Rtg5VHC%2BcbZEnXJqPnv78qmSBAu2ipfkejEAwzLsdgLcyFeKMQfnNZ1aoaWlQCp9%2Fc8YIXVmHHuILWA%2B2iW1yyTIxsJNqtp9tUjiqpP1GMuO4%2F5Q6i53qMoynaHw%2F%2Fd6Sgdr2JouufhCHzyMS%2BlsiCWFxLx1Fq3G63eTv5jbNFzMsdnK6Y2dvexeO2adJg2xpXE4%2BZLGa%2Fg8U8x3MGFOz%2BMk0eNhiih1ARm8lqbaEvazkN3nJSMQoaFwBbOucSvNL%2BzJaY8MBnU36dlpS7HlDXV6qMpM1GFhJVczL5FuHwOQhfHFCkJ%2Fb4ZGXNu7Uv6H9CfwXuVJgQkQgAzzauRvXdcm93BZunTQ1Gln1CpcKEnZ%2Bnck37wcCBjCSGnRzOGzo%2BPibSZMt1Bq%2FuoAEut3Otu3qx4uCUNQbiPHt5yC0q%2BNyX5YdebZBBIQsffGRinMyxR8Y3c3pZDw1a4TBx%2F0r5euD0V1qt4VK8k5QOK9iTLf042PwoxGvKtmigHuorh3z44N1RZs5DDlANDnWxDzCDOiN3ya%2FX6FEUgn1PiJGFvrpOvet8vzZMOfqBMOHm7coGOqUBOjxkFKe6izBOhSGvtfP0dPi1p30uVL49JC%2FxleVx4J0Ulrc93kGHCC0eLGRVm0sC57OvMTAyHF8LjDITAKECWUtEG84WyWuMUULtIRbs9ugWrOTNcxPuAMKERDAvZb2UEalwvpjEkMnpsWEd6Uj8uOt%2FHcruXKBe%2ByUjMcJA17R0OT8jYAAW3ZdUKvIK5ktB06V0vZ23JKY0L5lF6CF77%2FSmnN4F&X-Amz-Signature=f4da2b4f41b0c349b4ae0cdc7806d164f2e89a562aa8bbacf6b479faab44b31a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQ6TNEE3%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQCpS0Ufn1a95J3jpujxtOZWijUwGJItHIg1hutEGrikiwIhAO2yYFneNDPwoPoL8okXWktU9x4XqtN5JL8d3aivLXMuKv8DCEEQABoMNjM3NDIzMTgzODA1IgwzFJGVC%2Fkdqt%2BQhOgq3AOjH5M7oL5EYnYMNfCbQs77QehWb5uYnoYHXD%2BMyCShjFB4rF%2FiA4RZDuNYENp6q8mICAJpE%2FCc0IOMJ9HvhFNN%2BZGotkrvhq04TFkCu8ErFy2b3%2Biv%2FrnmHJXJ4h713kQMCuKcMaYbWg8%2FoMVqjmBwRCRTBloVHVrXH4DLbTCJXE8vd75xDkJ5gbWdwdpthwEnwT0PVPMq%2FROWX1THVc4NOFPbl85fsnuFmjLW%2FA8svZzawk2ZkuDLO6wXBxYqz1N5vcAivZnF9xjQCiY4B86RvW5pSIG%2FT7SfMe5ovgKtu3WbYMJjqVheIlsj9Zq4%2Ff4eyM1Tjjp2qKB54ED%2BGZPhT0UYf9P%2FQCnrbFURPjKRnGLqBnySlixMe0CbW8qjBuL1A8BRsoCwHl1gaGyx3yf4YxqRrTCTpTmFy36BOMKY5omZOK8dco4ix8fHvDbgOoJ0ntKhLMTzfb%2FGSgekLAKdpahUMeL8DQRSsYs%2FVU2%2FCXkiXC7eiiUm9Tbyo7mFXILO9v4d8t56twuHGt3yC1dTpJkuaU%2BIUcGpY%2FP78PIuGr4ttusX1RQfjP9LCemJIncTtdOHleZfQANj5IZ4QLOxyID%2BLwNWpuXAlJMOTjvQIlhbuTrvNgpbwgMHsDDB2e3KBjqkARuqyERrgON9EjcgEpgGfYQWlKWsrChD%2BXolxQQdqpzPXJsgAj0YD8ebR%2BKyVoxRx6Iqtl8bcNGFlOJ6xg9%2BH46F4yLsqpE2uIsqwTOLzFGfe3qcs0u3Ya1oK7COTlF2yVhhOqboxNqlgC2EitFSr3QE6valysCv6EmiCwlFRn9ZMr9qFmaGrlyPBwmInGHLce%2FnVWd3u%2BQMu%2B7%2B5lhXBwj08E60&X-Amz-Signature=b93ff2f43b1d3ce74f0a2ffe7192cc0ea0ee26c9274b0c42f368d068586188ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZJN74TS%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIEq5HnVXuC917A9OQKZa4fGSTzwNV0a4Foq7M79PKRQpAiEA9Rz46EN2ye2%2BqO9EbjXxkk4vnAHqXMBV3qOKlCstEmYq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDHaGy96GwuvF8Zw6IircA1cm0YMfhpDNsQGW%2BTsXVejjXuKNKlGkT%2FKqYZQwROJmYtpQmtOZQpe3kaHjfoDMvg6fkifHRNDEbUWYacenS%2BvX6WL42eC8TVRFu9cuF5ilWuLu2HZt10g3sHR8GoueuBlT55USTvn2KH35KiOn3J9QJqDJ4ey1I2ohaNm7qBsH60R8YpHF1mAFhi9Ed4NqGAWAsK0qW396hFA5UQqm3pNl2ob%2Bbtc4U%2BLsTBNge%2F0pZQcA0JasmqFuqgIQ2JAomqW3BjMVMh17nV92ZShzxCfKW2Ue%2F%2FwCPjiBE0DxUly3FYIN%2BpATM7D8v%2F1I0rZ7CgG3h9IP69SJ2EAGjRoTu%2Be3cBgYF7JXomc09sUIhgWCSB98oxTGiFd8eesGtdj69V8Edp8rXyjavxXvCFZzBESk1kBInLk%2F29nfAkvFXehJw0E%2BuDqerTDIf6Iz3kTWOTpa%2FN5oojiOVqdUSwXD%2BKthy5IjKRuag79bf8C3Z%2FkOXimL3stBJE6pLXPweWAu4PhKUlPTWZHmJMFZWRRNvENuR4S6svBO9HhhaR95Arghrgvsu7DOenYSpi6VFJ3kCUjhO3QW2qkBmmsFQujogEUUgF8RxNtFdIjec0uwRXYEKa0ISq5rrTIxunnBMOvb7coGOqUBa0GTVyQa%2BVRgtT56P8f3TvJUqLrD7lDgIKRnNWpTLDMh4EdCEMWk9Xw6JUr21Pxs9LYI45oJO5jY%2B89kYIxgD6eFBgGvSyKsEhqwDx9jDFxws96SgxufFGnJlhiAFSJUARwX1Yzh5zzNt%2BFJWsvgBrBaStOuRmoY0v5l92x2rSs8BHfRlfz0G5F6gK8Ezp%2FHNxPSPZbFzdtyp4Ce%2BjqSSOXwQBLV&X-Amz-Signature=915fb0852d5e2d512ff0157bcb3204d8089776a95859977dd63fdeacea278c89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMUWFQGD%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIH546t1bxCeR%2FiPpAHLSbuEEhEuzMCAya%2BQPsch%2BSgpwAiBfBsPRYm2A3ydNmCIPVX7MmJs7JtXurvgUnI039UGuwSr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMERsZvO1z6pb4xbCpKtwDMNG1HGQ9HKstthvkw3MSlacL6EWJp6eSa0QDzhrBEuIpRSa2WJr%2FzvSEfSfLEWs5k1zFIrXpq66SZo1ZfrzDzZb%2B7WtHIeHEaDwdiR5mHW7ftleU6xLsww7FZ%2F5NQPA5JsdvAomeDyhsbZqSNRI54W2VgjasDlr9lOeqZYxkDsaItgNRV2Xtcngx5ZwA054oZbJt3BscjCR95kdKspa6G%2FQzLyKTeHr9xNGk0WiujjWp9SJyRGbk%2FyTnrj4%2FUg%2FHsIDWMWaDnQV475LM%2FdQHk9alclrV%2BJmglq6IN3t1Kz9PBbwdCkxxk5VS6O%2BffWCsOWVg7utyBlCKMI%2FhiVbaokK%2FPSl27Ts9bubBSzvYBVcvwIn%2Br6qYNfKLLZqmKj9Xl3kgx3bqwZPrVQ1oUkY9x0RT6bm27E%2FgDFsqFTsZjLmr8JqTlHeN%2Bk5iRPm4ZpY0GxAERoiEBViMUI7iqmYl%2FQa56xYJAB7dQdjAIQ7MgH1sPwyEt60twOZcOO2XIeQlRlV%2Fz0JVdWyG1AWcllMxKz6eLBgSC%2FD8S8pEzP8JtGkra7ISkwgeSekGReq8%2FyWGfPSVEJpRu85eFn0cgCaHS6OKOy%2BsRoZzURaVtiBzDgzHujl%2BwCL0hZthe2swrcPtygY6pgElJHdCfKA6u96PthHfchBfLpep0NdItMoy3WkzMNXLD6ngI8ZS3EPDK51v%2FuImN%2B5ov8e853nKs0GpdOQfzw6xvY9bclg7AYXFBqsTASQ%2FYp1%2FeZ3tKk5Od3EE06BjkN5%2BEMcKfhbNl5w9yJAfNnri2z%2FAcWD6mGh5amr3B%2Bq9GsrAfZEyrg3YzmFdBnqWQfyKgH3pjsSyQj8D1kslNW3yeJds75FP&X-Amz-Signature=839537661acd9440a1dfd7cef153c5749334b2cec6b51ac074f9c83586a1964f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMUWFQGD%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIH546t1bxCeR%2FiPpAHLSbuEEhEuzMCAya%2BQPsch%2BSgpwAiBfBsPRYm2A3ydNmCIPVX7MmJs7JtXurvgUnI039UGuwSr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMERsZvO1z6pb4xbCpKtwDMNG1HGQ9HKstthvkw3MSlacL6EWJp6eSa0QDzhrBEuIpRSa2WJr%2FzvSEfSfLEWs5k1zFIrXpq66SZo1ZfrzDzZb%2B7WtHIeHEaDwdiR5mHW7ftleU6xLsww7FZ%2F5NQPA5JsdvAomeDyhsbZqSNRI54W2VgjasDlr9lOeqZYxkDsaItgNRV2Xtcngx5ZwA054oZbJt3BscjCR95kdKspa6G%2FQzLyKTeHr9xNGk0WiujjWp9SJyRGbk%2FyTnrj4%2FUg%2FHsIDWMWaDnQV475LM%2FdQHk9alclrV%2BJmglq6IN3t1Kz9PBbwdCkxxk5VS6O%2BffWCsOWVg7utyBlCKMI%2FhiVbaokK%2FPSl27Ts9bubBSzvYBVcvwIn%2Br6qYNfKLLZqmKj9Xl3kgx3bqwZPrVQ1oUkY9x0RT6bm27E%2FgDFsqFTsZjLmr8JqTlHeN%2Bk5iRPm4ZpY0GxAERoiEBViMUI7iqmYl%2FQa56xYJAB7dQdjAIQ7MgH1sPwyEt60twOZcOO2XIeQlRlV%2Fz0JVdWyG1AWcllMxKz6eLBgSC%2FD8S8pEzP8JtGkra7ISkwgeSekGReq8%2FyWGfPSVEJpRu85eFn0cgCaHS6OKOy%2BsRoZzURaVtiBzDgzHujl%2BwCL0hZthe2swrcPtygY6pgElJHdCfKA6u96PthHfchBfLpep0NdItMoy3WkzMNXLD6ngI8ZS3EPDK51v%2FuImN%2B5ov8e853nKs0GpdOQfzw6xvY9bclg7AYXFBqsTASQ%2FYp1%2FeZ3tKk5Od3EE06BjkN5%2BEMcKfhbNl5w9yJAfNnri2z%2FAcWD6mGh5amr3B%2Bq9GsrAfZEyrg3YzmFdBnqWQfyKgH3pjsSyQj8D1kslNW3yeJds75FP&X-Amz-Signature=ddaef23bb701ff5945d904940017236fce8ff7c4a6dfe4f7575fcde5fdd3f32e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXZXQUTM%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQCQd0wT%2F%2BkR2iHs2kHoQNnjxGTI654oAUeyKiC5qqA9%2FQIhAOXxGv4qPjKu0pu6ECSU2FN4dc58q06J4IIaDdSmLP4XKv8DCEQQABoMNjM3NDIzMTgzODA1IgzKMeq7F06tDz1PHCYq3APi73DjsFbsFlDFdrqkitdtU33cy6UVXH3bXG836H2a821%2B9ZA7RZr1HDCuFsHnIhkqDXWzoEWnp9K0vzxle0Bmy%2BUkmTnNxE3s0xyH%2FKoEyvp4SxrxWtzBPWpFwrIrT%2F38MThAfAHMDzHTQDnJ3DJOB03bb%2Fsj9gbCGrUI2KU3KqXgpXrwgOe79f2jNnDsepyAdf02jsiHRnjd8Eoak8cttcXgsFOZJIkrxe%2BZKlK19gl4nit6u%2BEeGJ75wpWVS3jRAssKXFWs2fANTSCs2mlBrI7AHISttn%2BaB%2BsbjbYjG7kbcl0B8ZAEBWOvD4hHGYiB0FSNLCWBdkQ%2FVXJ%2B%2Bxv3uKcKfIpsc%2FcjYO9CcOxK7VomIe6PZ35KCrKgfu8mtGC4xfqIz9893PCftGKH8GKlamm23jTjI4LAI1HgAQUIs%2B2Tuwcpqy6MdDgj9IbjSFUCRDoXLIeeGBRQfLBSp4Cci3fkF7nzeZKxc1W43VH6MMWkelsYOVP3gix68%2FPi%2BulI4k6JpVxoVjwbH4v5yJxJEkyatl%2Fw2n4uShsGPMPkaYh6I9jpRaGSaVGxT8SLFePk9t%2FVPHw8LLIA48swUEAtCGDBCHkTrng2k6TgP2dDqEgViw0bevmKfT1pOzCWtu7KBjqkARY3fjtPMydsNkE%2BHUGm5JqCcHHXhLMuVqI4n%2BGN8XVIGzMycQTU6c5t7DaVrknFL4lz8%2Bv9LJNCxuCVT%2Fr3YsmNeIG%2FQcYsRQ7VhWlWEgqmMDIz%2BWCiXOlYEWxFwlwy2pIu5ZdHJTXQHBsBBLC4yiEbmkhYfjqsiNGgzVd4QViDuaXfpSKt7jALjlDy4btwNr%2BvunA%2BbP2j%2B%2B9Q3Dwd6J4gDmT6&X-Amz-Signature=eaee4dbaa0b6a451bca4fe6283b4ca5c9fef806606daa036a235503d544246ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZRE66N7%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIHWZ%2Bzth2EuOzdrubYHGiFVjWH5M%2F1rhGucto9MdTDRoAiEAgnf17O9nCoaS4RId7K0D2sw2UowF%2FB2Xhbz2L%2FpshVcq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDCDHR3rTkPk8vWwyhSrcA2%2BlwH2jM%2F9s4WgnMrWQvTx1iB3T4q1VLkJ3PfrG%2BvZi%2FfdtViiuZNL18Te%2FGqgO3Ewjh6OG6NgRrLcwlEzGbEJTZznmqMtOzEh3H5WzdENkawaOWLZAdlcaFUIJN8tTBST%2FBYryk21SekqAgekPEbazLA9ep%2F%2Bx0nD%2BmJKHveZq%2BWM3ewGwUP6c3KCFxdmNG5iKeLfjtdqJwV%2BZ%2FbH5BoEjevVV%2FuGl4r%2BnXoGp4rCBG6VAfxBWAS4gALGh5%2BQ4e2wGiT5CVHqM0Dm8%2BJ0SlN0pbZfdITD7i4VRhIekVhX5DlByeGAU5jaA3wif3XxHtOJKpKhv3651010tX7WKv%2BstUiVCNA1bhkHx7tLHyX0C7Vxp4DTZe%2Fuk0o%2BZ2H33Ss4vHVs60IzZuXVGjrJn9CTrq%2FlEiEvZRxIbjVueEZad2C5rTDIMYQZ2wqdh5kKgcy%2B5yf%2BGtuDLNRNfLlOStIzrVKeAZgpeFZIyaEOn8%2FXq%2FMFg70pEPv6XFn%2BDLEAPJz1JzoQUz%2B8AkXX2RrdGZqFrdDNTZ6DAUo8hxFVO52my9E2vWqh6GJg6HXWlhmbC3yNgI%2FWGMPxqBmvx1bJZanU0Q1Sa9%2FbiYpoijPJFPmUEv0y%2FhQl37V5Plk1nMKjX7coGOqUBpdfYAfDF2DosG%2FAv%2B1T2cCk6Z0S%2F28Br7fC1pRmlnZyoUdUF8IO6cau%2BhpDpQesY2Dbke2N%2BvitKhQIpSjh0YDsUKYCvH1CvcZOANnv9eJT6Lcv7z8%2Btb2jKtJADMJB8SnlOSc55wSAwcXcy29KdrnMyQtNSuw70EDiT%2BVQvSkE1d4H7VclsLoDB1Ph2ASHRZ6HlTw8ebkjC5dYnYKRM7VK3wXKP&X-Amz-Signature=8767c01d7f0fc037d81a83c2d66544869f42ffda19755fe0bbd430c96da3bc0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZRE66N7%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIHWZ%2Bzth2EuOzdrubYHGiFVjWH5M%2F1rhGucto9MdTDRoAiEAgnf17O9nCoaS4RId7K0D2sw2UowF%2FB2Xhbz2L%2FpshVcq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDCDHR3rTkPk8vWwyhSrcA2%2BlwH2jM%2F9s4WgnMrWQvTx1iB3T4q1VLkJ3PfrG%2BvZi%2FfdtViiuZNL18Te%2FGqgO3Ewjh6OG6NgRrLcwlEzGbEJTZznmqMtOzEh3H5WzdENkawaOWLZAdlcaFUIJN8tTBST%2FBYryk21SekqAgekPEbazLA9ep%2F%2Bx0nD%2BmJKHveZq%2BWM3ewGwUP6c3KCFxdmNG5iKeLfjtdqJwV%2BZ%2FbH5BoEjevVV%2FuGl4r%2BnXoGp4rCBG6VAfxBWAS4gALGh5%2BQ4e2wGiT5CVHqM0Dm8%2BJ0SlN0pbZfdITD7i4VRhIekVhX5DlByeGAU5jaA3wif3XxHtOJKpKhv3651010tX7WKv%2BstUiVCNA1bhkHx7tLHyX0C7Vxp4DTZe%2Fuk0o%2BZ2H33Ss4vHVs60IzZuXVGjrJn9CTrq%2FlEiEvZRxIbjVueEZad2C5rTDIMYQZ2wqdh5kKgcy%2B5yf%2BGtuDLNRNfLlOStIzrVKeAZgpeFZIyaEOn8%2FXq%2FMFg70pEPv6XFn%2BDLEAPJz1JzoQUz%2B8AkXX2RrdGZqFrdDNTZ6DAUo8hxFVO52my9E2vWqh6GJg6HXWlhmbC3yNgI%2FWGMPxqBmvx1bJZanU0Q1Sa9%2FbiYpoijPJFPmUEv0y%2FhQl37V5Plk1nMKjX7coGOqUBpdfYAfDF2DosG%2FAv%2B1T2cCk6Z0S%2F28Br7fC1pRmlnZyoUdUF8IO6cau%2BhpDpQesY2Dbke2N%2BvitKhQIpSjh0YDsUKYCvH1CvcZOANnv9eJT6Lcv7z8%2Btb2jKtJADMJB8SnlOSc55wSAwcXcy29KdrnMyQtNSuw70EDiT%2BVQvSkE1d4H7VclsLoDB1Ph2ASHRZ6HlTw8ebkjC5dYnYKRM7VK3wXKP&X-Amz-Signature=8767c01d7f0fc037d81a83c2d66544869f42ffda19755fe0bbd430c96da3bc0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSBOHUBC%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T121828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCID6PeHH0ksxQ5Osn3hVSyiyFICzorZlrg1qJ78kbdfWYAiAEiw%2FV03fYeJM4l6gA8BK%2Bli%2BtXjd0fDzY37Cnte%2BouSr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMzrNg0Tx%2B3ApF4EncKtwDfYs7Iyp9cWea0wb6MrntAXgEZPMuIqc8DmokU5eRpWxHGYKQaGn7FtDb8BW659mjHFS%2B%2FLpZKarQjk0Ra46Nl7A5scaKpRcVbGsiXWCELCZP3t8PhBuM74JsG520DqfVrlb3IDumWkIdnLeCj%2Fgl36XOwMm%2BJTHOSIeG6X4b6whBJTAaNggvbCgv95Q54sz4mgxaVT%2BlK8gdG%2Fk9I3e9STsPZHen7%2FwVcvMxu8xUAE82HKugq9F7lMQ4TWEUwn08DBoXbU4UX%2FQ%2Fu%2BhFr1k218wenN%2FSJfkuvulYm3INQc%2BGoL1W%2F6Qcc5G8N4nwsqWPxC%2B2fGl%2BAqg2PR6itrWJnfRK60gGV42UtRAQ%2BR25BCBoog%2BRmgJA8G2QjipUcrRBzq8LDDx5Wum7Y%2BMcxqAU5RZeU3wxRNigHSx46bjGHuY8lAiq67WuI8EhZI8Hxh8UDL%2BCV13SPm3hT1hMsK%2BZAo%2Fhlv7VwkpGdzkGBgqYNoZFN7DY3tu0KEXwM07r5zKBvJIWDlQTj18hGG8xUJGTgHI7vpDxlLRTCUen80mP2MKt2jO36cobgeia05emZFnEYwdn5H9I%2FUCKug5fOdG7K%2BOVHvIa3W9YHOTdQh4Lm4nhlV98EL63gMKFdCAw2ObtygY6pgFzRqav6QvtzyjQoxTuhzGZTqg1uwx9BZkCqWGbVcFZSY4WnrsC1SJffGmn1bwRCV%2FR3B8dG%2F5NdvZspEMBkJ9XMM2aBlFJkMW%2F9eUguqQeQ9prJccKQQM4QhqJAVek3ciMjjQapfIWA%2B5fQhd4ydiyplhrV86ibyEuq3VHNR3ps%2FLGfbJ7gS6JnZlbJMky0aNEpeic7hoMKIqe8mHffmGkE0Y4%2BSIA&X-Amz-Signature=1c9b6251b2558464bca780cdcd5f1e3a5e33765cbbb49f57d2a7026b32d8e106&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

