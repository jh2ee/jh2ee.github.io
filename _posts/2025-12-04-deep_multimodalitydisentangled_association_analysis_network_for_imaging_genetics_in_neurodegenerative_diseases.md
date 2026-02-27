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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666O4YC64A%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJGMEQCIGoaqScLOeWvbrMKAwwKiSxA8xdS5DKR%2BaWCO4wdJhzCAiArs8cIxzyiKp4rcwSXCFoakwIk9JJeAkL0XZy4xHUOCCr%2FAwg4EAAaDDYzNzQyMzE4MzgwNSIMwsF9gbEQIzGUNIvIKtwDuT0n%2FeGLYUEEulE7Dl%2BlCsovNPCK7tLnw3G5cayPK6u6qR2a9IY5m5JDI0eKdWOoODIahe%2B1ttkwFHJRETW8tl08FgpN4HfvbHz78acxd4HtbKo6u4aADf0j2dsIOMUH4bGz5qUHIUh7niyjj7aoaYIay9vZNo2K%2BlLI63h3ini5uOOOpC%2BdbBcLU3Fgi8asXxX2UIw%2FM%2B6LSqjBV6DPD2Rnin8nLNYTYp%2BBJDYvK%2BChJG8M%2B2l%2BhvsCLClTWhDmv1dgD1Zh92eHuyV9jXvGg5MW%2BGph6yVNtSfL7VzwMvPNB%2FAxDFE%2F%2BHnSQCw84xpISE%2BbK%2B9bDGc8LB8aiIqB%2FiZdPZhwqNiZURUTn6D42Q2RAjGnUm51XR2vIb3%2Btnubls4Dlh%2FWnr8gyy3mFAS85UDEKzgHKizhZJpOHqbZd6nnIgFnYHCklyAKpShcKrdA5zizjF0GQQRHYsjBeKMvDq%2FqhCQC9LNAv%2BW00ykYQhjlADnmQpSp2LhrwCvxWGEPda6PezQeQ3DZJFrzyraFncjVBWjfl%2B1zwbuiKRk0cI1LFhwV4LSFB%2FmftvEMEnaceP6gigAZ1t4sw9XZq29npDg4ytpny%2BSH8hjLhNnZukbKCJJ4WkyCuvNEy1EwuoGFzQY6pgGzZTYE73vnd2HAkw%2BBiw%2BKaDyFKduqJ87wynzXVeZYg%2BPWP9mC%2BisAZ0j1HkCwmGVPMiKulLx7Utk7jW2dCKwfqkMRYCWpbAvzyg9E8ucswyWEbI%2FEvWIGuzHK%2BI9yWa3Rh3JpVNOevVMigOBywi8F2QwXr8qVbT6gCmUWpuOpCB77CGE6gekvLkO%2Fpp%2FUPXmtEtsBX2COxshD9Cey6YKkFrZtFdJ2&X-Amz-Signature=60afe859b4a11c982e02bc35690854553fd36059edd3aaade2c890496151a2e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666O4YC64A%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJGMEQCIGoaqScLOeWvbrMKAwwKiSxA8xdS5DKR%2BaWCO4wdJhzCAiArs8cIxzyiKp4rcwSXCFoakwIk9JJeAkL0XZy4xHUOCCr%2FAwg4EAAaDDYzNzQyMzE4MzgwNSIMwsF9gbEQIzGUNIvIKtwDuT0n%2FeGLYUEEulE7Dl%2BlCsovNPCK7tLnw3G5cayPK6u6qR2a9IY5m5JDI0eKdWOoODIahe%2B1ttkwFHJRETW8tl08FgpN4HfvbHz78acxd4HtbKo6u4aADf0j2dsIOMUH4bGz5qUHIUh7niyjj7aoaYIay9vZNo2K%2BlLI63h3ini5uOOOpC%2BdbBcLU3Fgi8asXxX2UIw%2FM%2B6LSqjBV6DPD2Rnin8nLNYTYp%2BBJDYvK%2BChJG8M%2B2l%2BhvsCLClTWhDmv1dgD1Zh92eHuyV9jXvGg5MW%2BGph6yVNtSfL7VzwMvPNB%2FAxDFE%2F%2BHnSQCw84xpISE%2BbK%2B9bDGc8LB8aiIqB%2FiZdPZhwqNiZURUTn6D42Q2RAjGnUm51XR2vIb3%2Btnubls4Dlh%2FWnr8gyy3mFAS85UDEKzgHKizhZJpOHqbZd6nnIgFnYHCklyAKpShcKrdA5zizjF0GQQRHYsjBeKMvDq%2FqhCQC9LNAv%2BW00ykYQhjlADnmQpSp2LhrwCvxWGEPda6PezQeQ3DZJFrzyraFncjVBWjfl%2B1zwbuiKRk0cI1LFhwV4LSFB%2FmftvEMEnaceP6gigAZ1t4sw9XZq29npDg4ytpny%2BSH8hjLhNnZukbKCJJ4WkyCuvNEy1EwuoGFzQY6pgGzZTYE73vnd2HAkw%2BBiw%2BKaDyFKduqJ87wynzXVeZYg%2BPWP9mC%2BisAZ0j1HkCwmGVPMiKulLx7Utk7jW2dCKwfqkMRYCWpbAvzyg9E8ucswyWEbI%2FEvWIGuzHK%2BI9yWa3Rh3JpVNOevVMigOBywi8F2QwXr8qVbT6gCmUWpuOpCB77CGE6gekvLkO%2Fpp%2FUPXmtEtsBX2COxshD9Cey6YKkFrZtFdJ2&X-Amz-Signature=60afe859b4a11c982e02bc35690854553fd36059edd3aaade2c890496151a2e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6DC3GIS%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIBULWmBtHGLfe0pmMVI5vRan6S52wF%2FP%2FOzsj3plgwoLAiEA3PwYABJOtq0rI37WaAWW%2B2nrXxpstKalZ92T9SBpB%2BAq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDK34UgrySZLWAwGZoyrcA1YwRrwFFsl1zNFyqSFBldXiUoH8HDIwQniaMvdDJfL7cC6Yr2TRAErT4NA%2FNzT7RWAK8U5u0V00%2FxG9uT7dr8fAha1lK9BRkg%2BTOXAk%2FA0hR2h09PjVgx1ET9ezi9unSFvFpi8ufpeov22hpjbmPjhKpkwMQCB%2FSHiYm%2F6bvvuKlTZzB48V14X5ujTRDJAT9CYvVohdeDDAcaQ4I2ZynDpfhJTIPATCILOYc4JNEI9%2FV%2Fh8ZzIQGcACAXwcS%2FxAVY1JRQO4TdarkchCIpLXOBrC51xNS%2FDBiSUkcX8BXa%2BN4WhlFqthGZC1KVsyE2pICq6K%2BpVzo5DWsb9HSXhTnUXylWD076rk7foHDWvPCQLmYyhDsQ3xyLm7pI7OLPKr7iMsFDFaZFi9QNqN2HwEXxE8NwblW3kcTBb1XMro45h0nnr0ecK03Jh4IG%2BTFmtgXkKhsRyWISxLC1AD%2BPnAjM3HrHG6jldO1VA9SdfVMnqMKDeC0C%2FKFTwJEia9cmt36bO4NZ0Mp9ByGpVeumqS4E9JSvqG%2FLKYStEW3EV0vcgsoQjw96Tnsx%2FcPLkMp%2FRKkLsS287qIneK%2FszeMQTEO0OQRnxYSVovSv4ehYsI3dyMgdYgBA%2FRVFe0uu6RMIWChc0GOqUBm%2BkCGrr85jLfcOBbjdrbuiuyu08664JMbXT7KalufZlYEq0Oe5Qjew8PwHAhbpmubgiUB0%2FDCstL6VidcWHDHhIsz3aPutwaQvEtDrYPcIsl8blOdQqL8%2FCdqXUQJQ7zPMaDkBZu7CfXldmo%2BXD67gjnkvS6DPU9lxr8g5bQV0jasD8t1%2FEoNrCnHgoIcUudJmKWBN4gXEHjBuAR3q9u4VYscKlr&X-Amz-Signature=31e5d2fd7027b4fcbc42cb10b907d4a31be16937fa3a157ae9f351be35ff54af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T24GV4TD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDJU5HFF%2FR3PKOTLik0t8fMbcAD5X0vrYphlqFVU5sWSgIhAIpBmOpHA6g5sh61ZXCT7QP%2FQOLVYkLM%2BEeLbWOhLQqlKv8DCDgQABoMNjM3NDIzMTgzODA1Igw%2BtIurosBTizPJQXYq3AOX%2FLzRVE2YQGOVYFidbWnKSdiOgcOzn0547O1OI13lFSuyMWg5F00Mg8l3kuFu3dz%2FiUBFtuA0Ct9XuM6M0WGw%2B53ah3aAjZmEw9sYj%2B3OZGlMWmCfl9GIE1erI4GhZMW2FSOsgbSGs8CrvV6lCGZJjd94IV9w%2F06dJWdrYsUa7sHu3ctDLFw%2BuuWmIp2Thr8FGxgMAg8NWjQbfJHUPyBHOnplfSHUqZHL4PgzR0GfiUcKkF%2BKAZ689KMSEhjau2hN8xE6CpDdSmRDEpcJgEGEuKlK6FIGvi89AlB0b%2FncPIsceftPry%2F%2FE6sMMiQW6kjsd15D1%2BDLSfqHE4bOYNqN%2F3wsowiV8WwHA4y8Y2GdmAtbUIKU%2FjJVJ5XZ1IsMcZ27U1N2QlbifWy%2BsydHJSuXeQCKvCu3U1%2BhssvEIUNT8oxMNo2DvqbJnxaOrIbprZRbyyRXMjEd6ejxDPWqmRdx65IW1OKQNVA12SZ1IGrlyTl4aawXRvoPCIFsYwWveYKeG1WZCmZz8p%2FM%2BwY%2BMeq3lFcib7Ar8ntCh1lrHaLyaBk1xcThTTWGUHjH7U47Fy3Wcq6SyzM9emRlaf4ZXBU5xRwUiUwRoV0cjQ7atNqq3hxn7D0xrDK4oCydlzCngYXNBjqkAW2aU7GSP0LEJVCcByE7RJVvEWZ%2FJ9obJRGkt5iZjobdsGQ%2Bx6d5qptx8P%2BFUAjFCPfyuEb44Rw99fIvWVeK%2FMoL4gwYh05zgHfaVsOVjGuiZqYaNH9JLXZ0pdU5S79HNH8p7ARDP0CLbLuGgKOLUsx6YoTImoRJ90wv4X5c5tLX2Ma88t1R6n%2Bj3OmYf8Z4kxVHpMzAp%2B6YIp0Ek5diCAM9PUeC&X-Amz-Signature=527b426f04660db1ad5a3a509d1f51b40bbe7e7eb0193e58ec576394b28d53e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T24GV4TD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDJU5HFF%2FR3PKOTLik0t8fMbcAD5X0vrYphlqFVU5sWSgIhAIpBmOpHA6g5sh61ZXCT7QP%2FQOLVYkLM%2BEeLbWOhLQqlKv8DCDgQABoMNjM3NDIzMTgzODA1Igw%2BtIurosBTizPJQXYq3AOX%2FLzRVE2YQGOVYFidbWnKSdiOgcOzn0547O1OI13lFSuyMWg5F00Mg8l3kuFu3dz%2FiUBFtuA0Ct9XuM6M0WGw%2B53ah3aAjZmEw9sYj%2B3OZGlMWmCfl9GIE1erI4GhZMW2FSOsgbSGs8CrvV6lCGZJjd94IV9w%2F06dJWdrYsUa7sHu3ctDLFw%2BuuWmIp2Thr8FGxgMAg8NWjQbfJHUPyBHOnplfSHUqZHL4PgzR0GfiUcKkF%2BKAZ689KMSEhjau2hN8xE6CpDdSmRDEpcJgEGEuKlK6FIGvi89AlB0b%2FncPIsceftPry%2F%2FE6sMMiQW6kjsd15D1%2BDLSfqHE4bOYNqN%2F3wsowiV8WwHA4y8Y2GdmAtbUIKU%2FjJVJ5XZ1IsMcZ27U1N2QlbifWy%2BsydHJSuXeQCKvCu3U1%2BhssvEIUNT8oxMNo2DvqbJnxaOrIbprZRbyyRXMjEd6ejxDPWqmRdx65IW1OKQNVA12SZ1IGrlyTl4aawXRvoPCIFsYwWveYKeG1WZCmZz8p%2FM%2BwY%2BMeq3lFcib7Ar8ntCh1lrHaLyaBk1xcThTTWGUHjH7U47Fy3Wcq6SyzM9emRlaf4ZXBU5xRwUiUwRoV0cjQ7atNqq3hxn7D0xrDK4oCydlzCngYXNBjqkAW2aU7GSP0LEJVCcByE7RJVvEWZ%2FJ9obJRGkt5iZjobdsGQ%2Bx6d5qptx8P%2BFUAjFCPfyuEb44Rw99fIvWVeK%2FMoL4gwYh05zgHfaVsOVjGuiZqYaNH9JLXZ0pdU5S79HNH8p7ARDP0CLbLuGgKOLUsx6YoTImoRJ90wv4X5c5tLX2Ma88t1R6n%2Bj3OmYf8Z4kxVHpMzAp%2B6YIp0Ek5diCAM9PUeC&X-Amz-Signature=b390f7f6ff74c3d3ee13b7f2e9b072484a09a5f182b5f13a057a28749380f3f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ICXSTHE%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDsMbFbTd2o44wnMntRmq2NqMAdare%2FuAJqIU4qXd6VNQIhAOV5s3hwZAApOmUjYT7hKvpfErJiBUo%2BQrA1XZBwm9E5Kv8DCDgQABoMNjM3NDIzMTgzODA1Igwrmg8qCay5vIwwW3Iq3AMvU3G%2FZo%2BhlFujsqICRxT0yaTMawjf9NrwBtXUpAIJ8fX8IoP0%2FWh1ECWEd8cTcS%2FgzHuh4UACVnvzLxi8RHd4yKKQ0kW%2Bt6rpgNq4PtQclW8ETvJel9ugwGH%2BPivhlZE3UdJ8d08Kt1ASKfCvuG6DLmWaYPVENwcWDaKlfGyoFyTzcVkKWI%2FMr3v%2F9x8PhDQjfdTtsxmZruHek86FoXkgFSHQt3ArRIZHKskc9gPj4IL5T48zz1r6XIRRpKqzTBY4YjxwHhyEUtAxN3BuziioI%2F2ZLCIBU7ZZxTuPl0A2GBhps6jIMqEkAWgihJS6gXsrh6j6ccbaBEvJrnZRBUET9Htj168ODuVqKjLy068zJVik%2Fj12tA52H%2BoQtOCg1n11UR0Z2hw3%2FrvWO3%2FGLcj%2BgtAw4WbjTzHWmEHUDPEYaytqkw%2FDPwkWotAcwVglTA5rbS0uhhLnkvbJ8BfqwNtogqGHUckhhc1uk9rUbXjNxsXLbSc5kU6UOZeQ9sDvY%2BrK7GaVM2qAewbMxLPAFyT%2FLb7gJyHaXBV7WQEp73Rs7YXxLG1d3THlskOTuiWv9b5biU7NXZH0T4kNjCqtJaH9LWEfUoo9vFnlUE4mzaE%2FKoTYLkra8wNsAHORKTDzgYXNBjqkAcl1M4BzuW0DjMQfA9HGMbkyk0ZueAk2j4qRN3zdhaM6LAaupctNCX1Lnd5lt7vv4Upt5NXgeKmErWuJSKg%2FBYS71P7YRid35jspO9o13Imn75eYH%2FmEge5CpT2byEan%2FmY83b3TyWKAXVU6%2FBJ3RP2GP6YYwdXmvTN29vddanJc7y6Ha3l8pmg%2FIYYoCgtcn41NzO3JYX2iphOc3%2Be6pYQQXXO6&X-Amz-Signature=68187c870b42b48974627afbd0d0bbf7049c3fbd6e7078d825fba3d7042b4541&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RD7HCWJ6%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDYlEY0SqauwepUaVeAd%2BcjN4UwwLVVPWZe0vC%2F4vUL%2FgIhAP58CDnPdSHfVIol5s3r0fOy%2FbuJcr1LG%2Bg1zsKyZ542Kv8DCDgQABoMNjM3NDIzMTgzODA1IgyV8h5pQkahMuVTma0q3AP4BHB1zxzMtranYx8FLEDtaI8zIDLMLI37sS9Qc5XR5kZBbRSR90aHlXo%2FSe7oL24VznaZP2puZgeBujsHVTMd5uzWqZ5T14qeCq2YdAMOYkAHIXDto04lKRIZs9TNWoZxIFLGZl3O%2FoCgvT7zwxUdPtOMSANTaNz%2Bxr4ZkqWv0EhuNzmkYAEL2jM1LXGYvBKRvo1RmzlHTvrJJ0cQGedAt52d6d%2FOvL0CTx6RXi1XwOwXGB4HiVn%2FAW5E7jFo41V0UFfST3pht8UMfuslXWm8o7DhAEzqJaRlStqrnEZBT%2B4lI3dFCbDjTD7LpjVxl5SPQU9JYJczH6i%2BWWxkon5UvbFZxc4B31Ew0gyxzwYwkfglDBh3uiVlviOJLF%2BLQ0Rvmehn5vma%2FO3OWeNk9Hz64wtWCBNADOMhemgrzXpLTS9eLr4DYkFIU7s84%2F9Vt4aTqjx5Ow54rTo3yyE8cC9Vbduu32%2FLd2TY9%2Fqem0%2Bj3tx5T41lSyP4erdeeF7uVMM3y7MTuuc%2Br8glDsZnjns8mShaezipREwy3voPc9sfTGgo1UhSS9gO1EPUA6T%2B3cJXEHP6HsgwkgPBVNf2yn4OS8XPwkww46sP6cnbcykKDsSOyLXblI42JjYO%2BzCEgYXNBjqkAXX%2FoK3fIAbTzgYD7JgnVOrkxWOOigsKeHwsPlwpZE9NZfuebJ5MT1ah6fc4NUpBuSGvGGkVo8SgyqMsXetmuM8AZG1aqq0WMTtZRNZX8FfVPQcypQwYsd22a2oVjjVTLUAUmK%2B8ZDPurqS%2F%2B7WrZqEN1ZzJkiRjMTh6L%2BucvgSkZasCoJdzCgh4wnWQuEZgZTSI6%2FKtfjwxeWSAxtUfzyIfxRBU&X-Amz-Signature=ffdbf868d56f9ee62473ef1474d86d141749695734fc72d90144df9f5310e651&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SS4ASDTN%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQDYEmKI13U6TpU9TPcPSFxrxHcGxmITkS2WUVIevOv%2FxAIgCLtE6lD8af6khegIjK9A5G8%2BSckvN93SrHFV9reqE4gq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDCFRhaRnHO0MaVgnTCrcAy0uflO3gDRidQnHJnP3Z6BfBxJFQMOSH3riRCP9G0Oy6copJglHRGrZ9TSUztcEI6lg7w4vusZuubBcdo3kP1Di8wqu2zR9MfOKawW0uUdJSmpSOixvE8VheMqWlM%2FIKW2nkfwP%2BAvUVQCZ2Rm75wmjMevP8na2r0r2VDglkOk0j%2FTle55IqGu1B1lJa%2B5%2FouDFgB4r6yR%2B%2FjucEH8l8lT7PgkV77s7JBdegE17%2Bmo5UcGUupPKnRWwMDrzVEpuLf3OH8fTorBmzQ8Z202Wo7kVPfnlc%2Fc7QVJMcSbPyDtvFbmCA8sB%2Bsa%2FTydt38tlOZNih2T5fTcI%2FCJ13tbYrU1TO5CdgJu3pMe8krfpaP2ddf0rq3L0Oo5%2Bh5Sl2NU1L%2FZSEKVJVOR4LzEN6K9FmOF0dWQUQg%2FojKjlIt0h1oWefWGtKxt%2BaMdKw%2Fu9lvto%2FDttEpVBbhFDzORBqT%2B%2BnBmxo8BA%2Flg1MB8tl5pXM7WO6xfollTdmQiXoV4ahKYkq5D5JyD3G6I5Tpntr4yKD5A3eQhKWmXMwAA6mFNtNNZysh3xWJWsp%2BBzDUXa3aVQHxfgYI2ydTcOLCEX8ojrPiEH6KCG5FcICfW1DflMxIhesXL%2BqG0E1Eh8ME%2B9MJWChc0GOqUBqdB4TdMOSf%2B3Q5UIg%2BAVC4fiDBs4jif%2BbTnBeq%2FvtVdNK98UMsP9eyi4WI9ofjaR759bHSUbtbR71HmOcqTDwpK7mJO8gjPmhGyNZDeU8aOkoMGfSTwSvc2eqt6ixqLdoP4yVXlFqfNmu3Z9zZjikPXLjmdxk4nSup9aTXhK4pVQ6gCcWfU1kCPJ3XewpC7lQED9uWn9VftkBIAs%2BlapZLWz8BBI&X-Amz-Signature=0a0c4dc75fb97c7dc12b0cc10593c6f265f56c3e2d4021e2a746a7d59e332043&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAMAT4QD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJGMEQCIAJaTGtCM7%2Bk2%2BWQki4AHkfLg8It1Esa4S16wtIKOTlLAiBb%2FUTWgbYa5%2FqrT8E7wWG%2F6fu0sxuMz1pxY9ixM8MZbir%2FAwg4EAAaDDYzNzQyMzE4MzgwNSIMV9MF80Gj4pQrc17IKtwDdO8XUgj%2BeU%2BuC7rz%2FgIQDDqupxj%2FEgP0AwcAL3L3BkRhni7%2BUuE7OF8mcRrR%2FaOJnSsu8JZ32jXdEWNJxhr3TfLQ3YGrtD1PWAv7cTKeT1OaCvlzbIUZutA0XPCEpiF9BczXBZT47RkUlzHk9fQahJhyAbVSpN7jwQK%2B%2FiSrSyN%2F1xhT1Is7aYZlWQQckGaJ9JPpbDv%2B1JeUaaLZexgX0j570UtTLDrllsOAQkdS%2Fnu80T7ZA2qRsdkx4xKLNtwGFG1HmjdN1ICJRhpUnpzTKUN4UzAQCgf3lWNctAgzqIv0AUJPJfcroVhpto1fF8gvzdp5ojj%2Fgg2Y9hqZ7pme2Ux3OwXviHxP%2BPsDx2GocEQhVE3q1dh8Xy445iNmFsnW3VBfSHsUv5vCiA5ndBhJEf6XfW0l4qv7sXJNGLZI0cLMKhSwI4ZlVvx%2BMQSZGhWbZHtO1oyxWgdFobLvEdAjSZJkQKok58TDjZGBkje8KxY2GXtRtI6mNCfKGx3RDUBIbyhSTRQHvcAoge1kbnMHFYIKOBUXVOXvaRs5SBWaSEBzZCR9GmTBuzNG5ibI0HYbPNnaBOwuWKL%2BxADI2qOP1zrAx2VyD6WfjzadOVJ6WCDV9Hso7EYJiytqyJMwl4KFzQY6pgH7o%2FG3rhkcHazow7at7aEy567RoouUBhpjcSPVey7j%2Fyl0FSTeCDfFM4%2BFuCKQ8E%2BbY%2Fwom5TMPpMfLE7JeZ3bvQmK94clMflZZ2HRImhcgjWNzEH%2B3%2FR9ZQO3FcwoemYhltorD4331YX2iWJX7kLtzXpW%2BsGW2%2Ff7MIL5Lq%2B67rpS3yfBA2nUecfmOvc8egsbuloHgq9iB%2FZ2JP6PciAKyQD7O4Rq&X-Amz-Signature=fc844d54b83a0f4c2005d64704b3d397185d7dedbdafd84d599087bc26267012&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAMAT4QD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJGMEQCIAJaTGtCM7%2Bk2%2BWQki4AHkfLg8It1Esa4S16wtIKOTlLAiBb%2FUTWgbYa5%2FqrT8E7wWG%2F6fu0sxuMz1pxY9ixM8MZbir%2FAwg4EAAaDDYzNzQyMzE4MzgwNSIMV9MF80Gj4pQrc17IKtwDdO8XUgj%2BeU%2BuC7rz%2FgIQDDqupxj%2FEgP0AwcAL3L3BkRhni7%2BUuE7OF8mcRrR%2FaOJnSsu8JZ32jXdEWNJxhr3TfLQ3YGrtD1PWAv7cTKeT1OaCvlzbIUZutA0XPCEpiF9BczXBZT47RkUlzHk9fQahJhyAbVSpN7jwQK%2B%2FiSrSyN%2F1xhT1Is7aYZlWQQckGaJ9JPpbDv%2B1JeUaaLZexgX0j570UtTLDrllsOAQkdS%2Fnu80T7ZA2qRsdkx4xKLNtwGFG1HmjdN1ICJRhpUnpzTKUN4UzAQCgf3lWNctAgzqIv0AUJPJfcroVhpto1fF8gvzdp5ojj%2Fgg2Y9hqZ7pme2Ux3OwXviHxP%2BPsDx2GocEQhVE3q1dh8Xy445iNmFsnW3VBfSHsUv5vCiA5ndBhJEf6XfW0l4qv7sXJNGLZI0cLMKhSwI4ZlVvx%2BMQSZGhWbZHtO1oyxWgdFobLvEdAjSZJkQKok58TDjZGBkje8KxY2GXtRtI6mNCfKGx3RDUBIbyhSTRQHvcAoge1kbnMHFYIKOBUXVOXvaRs5SBWaSEBzZCR9GmTBuzNG5ibI0HYbPNnaBOwuWKL%2BxADI2qOP1zrAx2VyD6WfjzadOVJ6WCDV9Hso7EYJiytqyJMwl4KFzQY6pgH7o%2FG3rhkcHazow7at7aEy567RoouUBhpjcSPVey7j%2Fyl0FSTeCDfFM4%2BFuCKQ8E%2BbY%2Fwom5TMPpMfLE7JeZ3bvQmK94clMflZZ2HRImhcgjWNzEH%2B3%2FR9ZQO3FcwoemYhltorD4331YX2iWJX7kLtzXpW%2BsGW2%2Ff7MIL5Lq%2B67rpS3yfBA2nUecfmOvc8egsbuloHgq9iB%2FZ2JP6PciAKyQD7O4Rq&X-Amz-Signature=0519b43f405d225536287aafdc1aac2e857294c23940ea15c33efe9b897a2e19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3252W6O%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073620Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIENxQVyvDvHlc%2BG6dP8%2FoiHN6q80bUqmxkHZNbtNO0acAiEA6srPPBVoMqt%2BfPLsSvBq8csdpdJTrOG8LB3hifDTT5Uq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDCQTys7mxIY1LnVC9ircA%2FNR%2BHCNoLUzu6QLFSfonE2msuGdIrRc7cd0SVq47p4TQbu%2BHMBQVrbajTbGLbGT0%2BjcZu3y7gSg7tLHqPbVgjJvi6NDjapqnyiFGTwcaCplHRxY4%2BdLLh3UJ6I2KHZjn2KnDRiOUoN1qQxvMcPFxqCuJNYZyGjiM92Fj0CTLFlyzv9Y4QEKT3wPrsbgzh8JLkjg4TJWV4tgfl0V%2FvTD8KLrWqCOC%2BPQpNCdAqwcxojrvS7gSfaDtRDYqQt3ffBsP7hoV5%2FHbEeVJxOu%2FmzR2sL10MkZgOu5sxFioRv3SQlqVCzkPPzBdcDeR3sbws6ZD4aNuwXorTMPR7gHvqdNZXIF%2BDEjCLCjTgE8v%2B8EiZpip53GvoGB2Otig7OA9t04CfDrt0UqDJUlfwRCzECswD8oPN%2Bgczk7IfPFIhEwQ6uCVb5yFwB9ppSk0X7Fb4DFfnFtlNWYKr%2FPvsfEPhu8mELwm7ad04wsSw%2FaOmQHwomKl8iPEr08GPKgNbfzl%2BMb2EAH5JnmpW6BqmqCf4%2Ffvq2M%2BVmRAV1j20zXQ%2FC8%2BcjvInYcQKOyyshVrrENsJBHhduy2CSFA4%2FwRrwJA%2Bd73iH%2FlHkU3YlxdeLU9FAF58UwEp8VDoVha4Bs6HxHMIaChc0GOqUB8J8iFpYXA%2FX6uYNrXX8PPbzLTyse2YJjXvCSf%2BRs7onslIffBckv%2BagRvPMTOmlSMqqQfFHVcLuLVm9M7yAMecEJrJ3mQo9bUNwbDT5gbK9Cnd8OI3B1hhCTWpJfzU2ypZZAJ8TA9flMKwDawMadhfluQpaYyNfvRqqV6nnPg%2BW6zEE3zI%2F3qW0fCGp6QzUb8SMatoQhkgMh1ETjpuLCGo9oUiiA&X-Amz-Signature=c836dfb0b499dfff056df687a0a390d8e82ec5ad5f50799b8c9b4f41bc7f98a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DZHQKZF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQCLGVbARM4xgYTFkklGMsmXJm3rYrntK2VnTDbrIKPQdQIgTUbJb4PCyZxMsKUMEmnZvmERPy2Z82uGBq7ryYZyvSkq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDC9dwvXsBxYnTm05TyrcA3oxNo%2BaSa6b5QN%2BCmsnENAlw53rborv5Gd%2BlOXmWevf%2F6cUc2WwOLmujUkuibQYQvBxMAOUhJCU2jXaooOJ4YtiFNMr%2FGDD2M3l%2FMzXOVrTpb%2B4DQic73zN0nWG1Y4M0e6iu4GXfm7Ql4JT6LhId8lGbNeQWPVRzFp9ltDccYR%2FDWbWy0beqmPXps9tDgq1O%2FZ3P1ghEg0XRl2ZM4EMcw%2FPvntzvh3f1yWSFmnTv2Lna0KgZ5XCSSLBL6BM4lT%2FpaNx9z6965jFHm56EAmH%2FnrMUd5fSDezSXHLpVLJtsty0ArnVh8o8fauAi0hQacpIB2Cn8mynGDyPNzorvfqdpMejJQ86BkrSzfNiYuQsVtfTf6GbVxQQ9oXsjRXoQdj1YB9idTRunyA9lDX8eLi4a%2Bi6m10fIzrohBm8b2vPNAa%2FkoeQny06zQygdt00gpP5OaseX4nRarGsQjVocYOTkhmKJgxH6usYqxCmlFV%2FVHXXHj9I5Bive0nDyCrqz3lFHBMhxanKhgF9Kx6WRUcpmNSkOSqZoaRNgWXDr7xpLzBor4d6tTeLOvXC2tX6DnfMh0QKtFrP1tW2GzdlviD1ks4xRi%2B8VaXeSOXqCsmS7sVY5ZtVb9q5KtPzEJ4MPKAhc0GOqUBmNJvaEWo3XxqKa2Nb6rAo1sJPoHd4bZbCgUQs97UHSWgErNSJ0V637AV9zfl%2FPbIq39Ukt4sBRwn3Vvqtu%2FCGyUhILjkHhvIGzrknFH%2F7%2FDLFKiRYpXEKRym2Od7XU8%2BlnXZd7X2ofI%2Be%2FPeL6U0wGln4n5onEEnwpxRe3aEgHE3fNeWPP6DHChzQYtp5h4pVO0Zy8hi2VLUfpRcY0z9cwlgouUq&X-Amz-Signature=252fc8de1aea693b72900894403dabba665bfa3b69b1083d131aa3fab07d7ff8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DZHQKZF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQCLGVbARM4xgYTFkklGMsmXJm3rYrntK2VnTDbrIKPQdQIgTUbJb4PCyZxMsKUMEmnZvmERPy2Z82uGBq7ryYZyvSkq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDC9dwvXsBxYnTm05TyrcA3oxNo%2BaSa6b5QN%2BCmsnENAlw53rborv5Gd%2BlOXmWevf%2F6cUc2WwOLmujUkuibQYQvBxMAOUhJCU2jXaooOJ4YtiFNMr%2FGDD2M3l%2FMzXOVrTpb%2B4DQic73zN0nWG1Y4M0e6iu4GXfm7Ql4JT6LhId8lGbNeQWPVRzFp9ltDccYR%2FDWbWy0beqmPXps9tDgq1O%2FZ3P1ghEg0XRl2ZM4EMcw%2FPvntzvh3f1yWSFmnTv2Lna0KgZ5XCSSLBL6BM4lT%2FpaNx9z6965jFHm56EAmH%2FnrMUd5fSDezSXHLpVLJtsty0ArnVh8o8fauAi0hQacpIB2Cn8mynGDyPNzorvfqdpMejJQ86BkrSzfNiYuQsVtfTf6GbVxQQ9oXsjRXoQdj1YB9idTRunyA9lDX8eLi4a%2Bi6m10fIzrohBm8b2vPNAa%2FkoeQny06zQygdt00gpP5OaseX4nRarGsQjVocYOTkhmKJgxH6usYqxCmlFV%2FVHXXHj9I5Bive0nDyCrqz3lFHBMhxanKhgF9Kx6WRUcpmNSkOSqZoaRNgWXDr7xpLzBor4d6tTeLOvXC2tX6DnfMh0QKtFrP1tW2GzdlviD1ks4xRi%2B8VaXeSOXqCsmS7sVY5ZtVb9q5KtPzEJ4MPKAhc0GOqUBmNJvaEWo3XxqKa2Nb6rAo1sJPoHd4bZbCgUQs97UHSWgErNSJ0V637AV9zfl%2FPbIq39Ukt4sBRwn3Vvqtu%2FCGyUhILjkHhvIGzrknFH%2F7%2FDLFKiRYpXEKRym2Od7XU8%2BlnXZd7X2ofI%2Be%2FPeL6U0wGln4n5onEEnwpxRe3aEgHE3fNeWPP6DHChzQYtp5h4pVO0Zy8hi2VLUfpRcY0z9cwlgouUq&X-Amz-Signature=252fc8de1aea693b72900894403dabba665bfa3b69b1083d131aa3fab07d7ff8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623JYI66Q%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T073637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQCPwvj2aL7QTV%2Bq9CvqFyE4eHh%2F5jSRYVnNskVrCNos4gIgHysUfFVuHbXN2%2FpUf8%2F5ArM8zmyJq9LEFHTSR4nNlNYq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDEXo2zyZTHzXBT5EOCrcAwDYSt4h4Pc2ROysai1cvkpnAzcAyztciMka1IcbsErrbswX4D4oTp97eXMEQIpW306eeUe1h0kBicKUOEQ8ViH3YxXihbxUDeRtZ9hzGnOgOzJxZFcutWZj0MfvaizEtjJs%2F0MIaaWdpFeMhCUBeOuxAbBHseYgqV3yX%2Bul0G9pKR3SS%2FQyvNTVSnA8qxToW%2BFvuOLVDiW2KQFKHp20Al38N7%2BlwFgAlFZaotmjd5G6FR72c%2Fnq43uGxHsEolKg4KFywgjhd9LHc9Zol4Po4v4fc7K0E%2FQ7ef0RSbs5Ly3jXQ1lCrttQdY4zmEp%2BDfPJdSsO22Y84TLjNWfft0s6ukdeDEcH2%2FM9TtUWX5aaFWiY%2BQwMYHS%2BIYTKJBt3zfwSEuqL6QhsD8%2FkN0l1Zk0Zr7wj8OEpxZ9%2FzKaYOz8wMmhXbypN8Mpbc9V0QjRngxD50sYdGd5sjZXKJ7fZ%2B1DkFzo%2BqZURjc5VyW16DBKt%2FLrKU2I%2FMZ4MH01VWCuHVzB5rOSmdAeNi1GONHhfb2TCSrQ2ua4c0ntmYdvVZ3du8TPCtdDyfrmYY6262YU9UgLtz24AdIEb32ldEPOD589Ll5PpDAMiZaabXHXqnPZivQgn3yrNUUimFu78qrPMOWBhc0GOqUByN3Cgv53mi%2BN0jllu%2BFf%2B49fbZXtkraSMV1Vi9eWqzPA1vz411fOmN0yG84twb%2Fu0mGbmiRMyHr2tKlf545EkyxvpAJrYHLbNT7OvcNvh9V%2FwWlIiQXpb5HZ03MDcxI9PIlPRrTtvWVaN%2FOEboxpEmrbm9KLzBDRcPfxlnR3dpsU%2FLMRbl6B8sYdBulv4nCf%2FFKCIDjg2xr44PCYsSPUiDzDmsCN&X-Amz-Signature=f28905e8718f12dc77fd015bf46231c70e6d87092c2ea182410da625ec1a52a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

