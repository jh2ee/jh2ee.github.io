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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVYN33RA%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQDtpqEBeDkUoQhTkhTxAC4hgFVmOi1XbOd4qNnUIGIdRgIhAKmV%2BCh5oc3AVdYP9k8s1KCmifN41Qd0joyVNE6steKDKv8DCCgQABoMNjM3NDIzMTgzODA1IgzECFk%2B8hIzJG4zDzQq3AMRSbyV%2BBEdqHQThnUrQBgow%2FHfXqt4CFM2iJZ8cAZXN%2B9P7bHj9PIn3jZtVyRiZsDpnid%2FayJwfcBvfG5aBYdmE%2BwP2PUM5hnm%2BtAn7ruVHYdb%2B3YJ0QAYee9BOXbsH0CAi89CrocxXsXoh1Pel1tIEa9RAIUPsI19EpKsFx1r4bAkC8pz5HD4HuCWdXLzCtMLtF3c5Xck%2BnoBG%2B%2FB8IrOFMboPKptEpqaW8jLJfFNwoCFlUpbzvJlfsB1DPzIi0cWSqHmLcSwpIYN61K1F%2BJ5KcfViUbqiKBu6TxmTRpfHpmU4KVGeadrFKTMG7mlAzsPZK%2FZEI6Q1lY15Va1ffXalOwz82lRIM%2Fn5yYf6Xsv57QKd8msjqUh8pyDXJDdJT6uWFRWqGbgrzghjZizmY2ohaDkayIaucmiqOIK9oqZkFCK4Z0xC95XftI4WrHWRsRRg6sAoreGLLInnxsbk5vmSQL3%2F3PhY6Metinu2IPAUIMn7cI%2BfPF5UcbE6Bdq1DgBn7Oyi8MMsT8aqnnPHszA2YkVQzNGzRear3mLxZ95fL9QOzuduXJr1vjY0PReBDZoIAWQe%2BmBLs%2BxFRm47z9G4kpxC5LPb6ubKpscCq7dUbv4QYNuge642ooshzDhiZHMBjqkAbBG4t8xS7qgku5Z9Y62ppGRyWAWTFuFTHzC6IJnEYCGF6h8ex6%2BK1dz5ScOdHtb2rwbrFW2nIe3yV0RBxpVTZrpwYg2ODKYkOQgbLCaWr%2Bk5vIH5ExliqRGhfNwtIkr4PqpQ0LGRzSD703EXJgKjQA%2BeRxb%2Bt0QoagFxtC23j0wtQv2uljuLytc832ys%2Byhhczu%2F74t3qc%2FPIRUtvqjhg3zmATD&X-Amz-Signature=ae9efd40a154f5656763059adcb0dead3140d4e2f4b7303ebe0120a461418b87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVYN33RA%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQDtpqEBeDkUoQhTkhTxAC4hgFVmOi1XbOd4qNnUIGIdRgIhAKmV%2BCh5oc3AVdYP9k8s1KCmifN41Qd0joyVNE6steKDKv8DCCgQABoMNjM3NDIzMTgzODA1IgzECFk%2B8hIzJG4zDzQq3AMRSbyV%2BBEdqHQThnUrQBgow%2FHfXqt4CFM2iJZ8cAZXN%2B9P7bHj9PIn3jZtVyRiZsDpnid%2FayJwfcBvfG5aBYdmE%2BwP2PUM5hnm%2BtAn7ruVHYdb%2B3YJ0QAYee9BOXbsH0CAi89CrocxXsXoh1Pel1tIEa9RAIUPsI19EpKsFx1r4bAkC8pz5HD4HuCWdXLzCtMLtF3c5Xck%2BnoBG%2B%2FB8IrOFMboPKptEpqaW8jLJfFNwoCFlUpbzvJlfsB1DPzIi0cWSqHmLcSwpIYN61K1F%2BJ5KcfViUbqiKBu6TxmTRpfHpmU4KVGeadrFKTMG7mlAzsPZK%2FZEI6Q1lY15Va1ffXalOwz82lRIM%2Fn5yYf6Xsv57QKd8msjqUh8pyDXJDdJT6uWFRWqGbgrzghjZizmY2ohaDkayIaucmiqOIK9oqZkFCK4Z0xC95XftI4WrHWRsRRg6sAoreGLLInnxsbk5vmSQL3%2F3PhY6Metinu2IPAUIMn7cI%2BfPF5UcbE6Bdq1DgBn7Oyi8MMsT8aqnnPHszA2YkVQzNGzRear3mLxZ95fL9QOzuduXJr1vjY0PReBDZoIAWQe%2BmBLs%2BxFRm47z9G4kpxC5LPb6ubKpscCq7dUbv4QYNuge642ooshzDhiZHMBjqkAbBG4t8xS7qgku5Z9Y62ppGRyWAWTFuFTHzC6IJnEYCGF6h8ex6%2BK1dz5ScOdHtb2rwbrFW2nIe3yV0RBxpVTZrpwYg2ODKYkOQgbLCaWr%2Bk5vIH5ExliqRGhfNwtIkr4PqpQ0LGRzSD703EXJgKjQA%2BeRxb%2Bt0QoagFxtC23j0wtQv2uljuLytc832ys%2Byhhczu%2F74t3qc%2FPIRUtvqjhg3zmATD&X-Amz-Signature=ae9efd40a154f5656763059adcb0dead3140d4e2f4b7303ebe0120a461418b87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMUKYQD2%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIDbOMGYaYkBogZ2q2i9t2InDmTQV1IjG%2BksettgTOyHOAiAE6qIkS2%2Bac6UGoe3LoijVSpkhktwWrzNRQhHFovy5Nyr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMoVVw%2BoFk4SP7%2FqaBKtwD6Rf4g3FAsP6tARFlFcn17LhIV%2B6Z7CR0UWPvLaIS%2FQlIOGe588lfwoVGnIM%2Bt8hH3bP1%2F%2FxuRPWniWvFJzIlYAcm2fmmURe8GwsUB9oTwZ3Yqg2Kre4qNOltGU4DUf9Nc30dND9mp2jQwBnGnGdUi8EJiupCQLVi7Mza0hkaRhCo7R7vfBghWybdODY5YOxaENFHKwf4OUJ6HlWTCuD3SEUC7Tukqf1C2CJWsl7BBgk7JFFwAfzSWC9120S3xjz7ZIublHPHObLEHZrF1%2F2BNxQ4sGhTI6css0%2FLZtG1z2SvVz6I6swEYpUJrkVVoDW80MJ95Kgw6k8Z8exqLNDnsYoHOeie%2B7GoZvc1NaVhtPJd0B%2FSK00nphCPyqXU43oUpBgWvjQGBil2xQusrsoHMV0tr44%2F%2F9NCO%2FffcKPqVDAMMSH%2FVezznXpy5JPtTQ9fsG%2FK3pGQ7AU9qO8qo8Z2XAoAo1Jv517wKUJ5R0Gl8KWVj60mnyPTY6Rhumv1c3xP0MWalIDFKg4Qe%2B4ZjpqQDuMIoj28URHukCKz0lhoZY8yqE4t4kH5qWEjN5zE4TCSrymneJErQlJuY3CP48qSLFADUzW6uUKf%2BqZWhpraNnoPEPUptHV8crhZVL0w4ImRzAY6pgHEJedMpVx1mRgGtZRhrCBvt6H4UnZt12gK7myetxDF5qIqTFBSzN00rJFo%2BxQe5E%2BGt3RUVHRXJY4e8UOydoS%2BKa1nW%2B3BaW9eBAk9JAMLQWzVeQiV7dYd7diRTjOPY8yo5ZBrBEBQzbP1CcS61kjGEWr9KQ3D4oA7AM5fZjl0DNU%2FEJHwbB3nFdQddbSCvZNvs854%2Bl3iaCGPf9j4zX%2F7%2BiqkTIhi&X-Amz-Signature=5bdb160a34ad0609468ca5152784731ad23b4b695aaa03a218eda15eb1cf119f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DZGFP2K%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCq2asWEKpK65Gf%2BlNLvkOqxc1FycK%2FAiB1aDeYYpnJBAIgIjvlI4ssVOga2laTFf%2BFSpeYs4PIv1Oi26c2bvbGbcIq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDCuk8fcxz%2FPmmt0eCircA4BgPM55UiRujQRs%2BmbANU3w%2BBuCCBB8sGGO6Z2PdawGb4EXro9IRPx%2ByrxFPBCb72WnVsyEROBFErnuui1EL3RMwui04aBNQX6yVPrkoUc%2BWI9neEDRCdoZ%2B60nOSPyJxS8tH51bIQIwEugRct80X5DeWhhYYimcNtviPUtU2INnsvtooIvOzWI%2B7hfB%2BSAAZ5qe4It5w2ddtKUbXTFEluxowhUN%2FGKo%2F%2FtWn%2BqCI7G2CwJeuAliVuQEKPbyxgAV5fRvYxa%2FsucUwBVXV04IEbINwZsuI%2BaaFPpNGclhU6x1NaL8Uk8fgacYP9N7tP%2FB4q6LHD6Xcoopc4jph9He3Gnp1vZubI%2B%2FkRxWwkVQocgar46cCDk5Rc4GCL0K1KOy4J3ZS%2BwGKrDIr1m7GislXLXy65xR2m6SdMk4v5F9GWosfyHRTluCQYvmU8bi5QrFiMO5Rvs1WC92IL0fxNGV6sEvxQdWyGiTibI9yIVHNsMXdmztor%2Bu%2BZvm3QlZ9Hwhg9pm9ni3t6lMIjhtdFvCucAFLLBF3uIq93bbRzpkHuKOXE1ergrp91bkU5nAQapATzWSDZBAkTYnvz2eIH2fqwPesOSnPwG4PmgLgHpTLjVf4HD7UgnIVQ7JhphMISKkcwGOqUBXJ43Uc0DigXwD1IeDGuZWHGOdsWIHwo0XurnUOqofqLt3E0PKWlsqfC8G7RMbhBlI8NJMq%2Fb2irwmFa4%2BrrPdss9%2B0%2FjzxfUmWUOLvNAzQZ9tjC3K%2F%2B3Bf2%2BYBiiSI0HrSys35%2Bzfko%2FGSvCfEiXjykvZV9eNBsfSyRGKzwLFwq7zgoOsQ4C5E9Kbh9tzKwltFzZViduBuYfGr0lXYMsLjCzb828&X-Amz-Signature=cfa12ea6cba23ea957a6a78db3a3e669acea53efe01a3899a3df125c09176c7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DZGFP2K%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCq2asWEKpK65Gf%2BlNLvkOqxc1FycK%2FAiB1aDeYYpnJBAIgIjvlI4ssVOga2laTFf%2BFSpeYs4PIv1Oi26c2bvbGbcIq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDCuk8fcxz%2FPmmt0eCircA4BgPM55UiRujQRs%2BmbANU3w%2BBuCCBB8sGGO6Z2PdawGb4EXro9IRPx%2ByrxFPBCb72WnVsyEROBFErnuui1EL3RMwui04aBNQX6yVPrkoUc%2BWI9neEDRCdoZ%2B60nOSPyJxS8tH51bIQIwEugRct80X5DeWhhYYimcNtviPUtU2INnsvtooIvOzWI%2B7hfB%2BSAAZ5qe4It5w2ddtKUbXTFEluxowhUN%2FGKo%2F%2FtWn%2BqCI7G2CwJeuAliVuQEKPbyxgAV5fRvYxa%2FsucUwBVXV04IEbINwZsuI%2BaaFPpNGclhU6x1NaL8Uk8fgacYP9N7tP%2FB4q6LHD6Xcoopc4jph9He3Gnp1vZubI%2B%2FkRxWwkVQocgar46cCDk5Rc4GCL0K1KOy4J3ZS%2BwGKrDIr1m7GislXLXy65xR2m6SdMk4v5F9GWosfyHRTluCQYvmU8bi5QrFiMO5Rvs1WC92IL0fxNGV6sEvxQdWyGiTibI9yIVHNsMXdmztor%2Bu%2BZvm3QlZ9Hwhg9pm9ni3t6lMIjhtdFvCucAFLLBF3uIq93bbRzpkHuKOXE1ergrp91bkU5nAQapATzWSDZBAkTYnvz2eIH2fqwPesOSnPwG4PmgLgHpTLjVf4HD7UgnIVQ7JhphMISKkcwGOqUBXJ43Uc0DigXwD1IeDGuZWHGOdsWIHwo0XurnUOqofqLt3E0PKWlsqfC8G7RMbhBlI8NJMq%2Fb2irwmFa4%2BrrPdss9%2B0%2FjzxfUmWUOLvNAzQZ9tjC3K%2F%2B3Bf2%2BYBiiSI0HrSys35%2Bzfko%2FGSvCfEiXjykvZV9eNBsfSyRGKzwLFwq7zgoOsQ4C5E9Kbh9tzKwltFzZViduBuYfGr0lXYMsLjCzb828&X-Amz-Signature=e26d31b5cdb07e17f17081da9092578e2fa95c8f686bd40fbfe090b1fa981c7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQPGL3EB%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIHBQktHXffetynL6LVOluUUCayELgYWThxIzZRqRcIvbAiEA10sScETqqtxEGmsNigpKozBJN8%2B095bmnubWVaZNhvEq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDI%2By7X%2FSvZCUCrCYTyrcA6D%2B3i1PgBg5UESWHQfuQINpuAsxXh4nyzHuIL8mDaQ9wzYci%2Fmw2EyVnFCgR5OrgLW%2FYDY1501HK7ZU07Tap0wcGS0kBe0iTfG44mNSb51ED7h5fy9UDYdXQGgRSamI1iyLe7SvF7NtMN1GpksIzkwDuM96i27Ul47qikIRnQSBrTH5PiQYH9KaQlsgQ34QU49jfBRZ1rh1sAzfRAFt3cJiZ%2Bb1DYt1RjIIqNyGBQkXLN9Fw%2FtlM4ew9iFJ6WxDTe8lKVj2RmRVKVMXHAxxJfC22wcWxu8jZ5H6ITXbUk8HW3vwsnIgNIILRwUWSFOEN4NZa126b71YQTKKuhyjPZu6AnfdOLA2LZhC1DqxTnuBKaB4M81tu9%2B2xI4JopZ9A5KpUo8ddJJ%2Fz3UXoGI1TaZhNW9r0ORTY5tqlhgDQCnUgMMA5VcT5VE8gQfWQCSAKzFORBp61illEauLJePRGs04PIUwJ5fd1adlzoeySkNjDnu5mKNxJmgkH4Y8BpIJfCQrwsqfhMiREXiXGpzvFyWxC1pAfI0P%2BiuBHu3ogaOcwdTDswtWeCHBUCF2l%2FawCy62ikdA4JhNklL%2FB%2F7GhxTGUaD%2FGmFmAUcBar471ua2zTZ2LDXWZl8suOwJMI2IkcwGOqUBumAovd5TwKEUv5ueDHXayBHpb%2F56NLzBQBM%2Fp6a1kh8A8wVxzRfZpjKsL483l0LYiVKPNH1U8%2BAk54FmPPWaI0L5qI052arhLXQwTmWrJXUINWsnUA1UK7Js3HNGeVAvzqJurTQ%2B7M55P4DGFE3xTfw1%2BlT%2BMj4qr95gEFwDVHUc3uTERvpPXwgiCSS8Ly0Xea1CECe%2FunSU0DC0U%2BUVM2hqW8Sl&X-Amz-Signature=27c54e061e2d66179d058cd618e6d5ecaa0cc8b41a15b3c6df0ea70ea163e54f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466443W4KRZ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIA9ixjEj7yWNq42G071aTUQAiJqWLu4bertIACrGDf0qAiBDLlCIHH4oH08%2BuPft4waorDBlfw2N39NCicNUZL1CtCr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMWRN%2Fh%2FcbkFCqLIhuKtwD5fNeh3gOYrdyrhrmHiXeNCRyxyAsuvJIVffC3aoTB8bMAl%2FDyXrShRPUtivMFx8XDeiY%2B2tOkagaI05H9dwdm14odLfC%2BvUbjsC1H6PKdmDsXtm146tNIkkaOsRxf7nPtRqcKNYybt5oAFHJ79zqWQuuTnh0JnxIHEePaMzOM5o%2BEJypAoEmvqR6cdv74BMvVRFkWVMcRbD2IqZUVrYNV7IL8sd1X92SjwbTOJgBNaSp7TUUZe%2Fs4YNiLyettHzD3wq0CluDozYxU%2B1eXO4YDxdb0RRP12vkbzXfW6cIOdr8%2FLMdoyJ0J5gL2eEU8TqThfA5%2FTAYEZrYLNAA2AjKdejjJTPwbNJ7j%2FV%2F%2BrfAYySVPsIvOdAdDDL1%2Fv2NxDWDD1OkOCpzKR7%2FTcvOutuq7lUfGQMjZwsISoo8c%2FmKVb0tQRD36rcdvnlpXsp22VRs2GS%2BYXwDlqEJendI5p6WoGp5k2TDT%2BfSlIVzl%2FNKv7K6qw7Ws%2Bk3EjQNLyHuJY6RiR95tGSmB6MjXLtAD2TsbqK9VeDDzJktQXmC5hZ06IJa1ko7%2BcET8qNzNlTGklK2lpI1%2FU6L5amY9QkZc7ybp%2F3uh471y5%2BvC7S7gO7qOZN9GLBJPfeVgrec%2B44wv4mRzAY6pgGwiBBXMbfzmN4ZAMzrrWMSE4Gt53WIisX%2B2hzFXJlrQ0VG5XxOwxk%2BLdHmqIcWedSdstXEPx2oa5VqCd6p88jjEAEf6ijcNVkJovBQRaz6HPnBSm9SqetqUSDD6VoPuT02%2Fdghj0m4hDz6ZrGaN7hlEpn9qJx6U0msh69q5Nr7hcr%2BrJblUkxts62ww9Bwoxa9%2BVwLG7anWkI6CVLiVKLJ%2FoA173pR&X-Amz-Signature=8f60058d37bc6ce88bce62b4236539d09d7b4d59447de56375bf5a11152e5fe4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466443W4KRZ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIA9ixjEj7yWNq42G071aTUQAiJqWLu4bertIACrGDf0qAiBDLlCIHH4oH08%2BuPft4waorDBlfw2N39NCicNUZL1CtCr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMWRN%2Fh%2FcbkFCqLIhuKtwD5fNeh3gOYrdyrhrmHiXeNCRyxyAsuvJIVffC3aoTB8bMAl%2FDyXrShRPUtivMFx8XDeiY%2B2tOkagaI05H9dwdm14odLfC%2BvUbjsC1H6PKdmDsXtm146tNIkkaOsRxf7nPtRqcKNYybt5oAFHJ79zqWQuuTnh0JnxIHEePaMzOM5o%2BEJypAoEmvqR6cdv74BMvVRFkWVMcRbD2IqZUVrYNV7IL8sd1X92SjwbTOJgBNaSp7TUUZe%2Fs4YNiLyettHzD3wq0CluDozYxU%2B1eXO4YDxdb0RRP12vkbzXfW6cIOdr8%2FLMdoyJ0J5gL2eEU8TqThfA5%2FTAYEZrYLNAA2AjKdejjJTPwbNJ7j%2FV%2F%2BrfAYySVPsIvOdAdDDL1%2Fv2NxDWDD1OkOCpzKR7%2FTcvOutuq7lUfGQMjZwsISoo8c%2FmKVb0tQRD36rcdvnlpXsp22VRs2GS%2BYXwDlqEJendI5p6WoGp5k2TDT%2BfSlIVzl%2FNKv7K6qw7Ws%2Bk3EjQNLyHuJY6RiR95tGSmB6MjXLtAD2TsbqK9VeDDzJktQXmC5hZ06IJa1ko7%2BcET8qNzNlTGklK2lpI1%2FU6L5amY9QkZc7ybp%2F3uh471y5%2BvC7S7gO7qOZN9GLBJPfeVgrec%2B44wv4mRzAY6pgGwiBBXMbfzmN4ZAMzrrWMSE4Gt53WIisX%2B2hzFXJlrQ0VG5XxOwxk%2BLdHmqIcWedSdstXEPx2oa5VqCd6p88jjEAEf6ijcNVkJovBQRaz6HPnBSm9SqetqUSDD6VoPuT02%2Fdghj0m4hDz6ZrGaN7hlEpn9qJx6U0msh69q5Nr7hcr%2BrJblUkxts62ww9Bwoxa9%2BVwLG7anWkI6CVLiVKLJ%2FoA173pR&X-Amz-Signature=9c5a7268641b238729f01b8f332ebbf5686d56462597a443ee8679d6c21de3d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMNZEWTI%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIBc6sFr80TGC%2BnqajkF7UtQNICydUmEFkUxN%2B54Fg4WJAiAKv5bkCS2sJ05ln9tJFCkOS89hWtbrZcaPDweXYyT0air%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIM3uXcijdQbIx6rx5%2FKtwDZO%2FLpLdTqDclRdikImMAXC4QPPWZCgTpd0C%2Bvaqmv0tQrp8mI7iRKtkvmlZRTffFJeVZXvLGjy%2F90m7HxQO%2BmKjPpzPwEV6Y6aRdOiNtez%2B2hf1pkAKJtB4gWqrshZWM0jSRnES3%2FlDiS6HT09eypKEfZFXJTm2sdF5B8EBMInFvD40mPASSaOZfg8iqK6VStLIGP49P74KWpQnVRFM0rY4phNrcRv1YCDeYNSVt80RRYolUVllS5vKkgte2FwZamUzIuzQ3%2BUIvTBslYBIhx%2BFMladjVRVgfGkBmCrqlHk0vuE2jOtcWz3l8xD6vlTo55bk19SMHHdaXxr2oEtSq0Gh8W54hpxoemVvMlifWNBNyUQFq%2F5FgxOKaRKehdJ8N1xoxTweWqn9STfiAnAR66J3or2S9HQLj5thrpVnDiKBugQz1%2Bl3Q6%2FFIKrkWI1SXl2TnJVqLoOS3KxMYS%2BKg1RweTuNZsxIDRIHS5dwvXHgjxwLSje7XU8wanaRnFJA4SkFIKuNCHZPr8VJxrNPlUK0TrhRZN%2BYPG8Xq2qgmOzEk1t5irpUzgHYswMNGdRivDb2ZseZpkRyIpf5JKq3groKoB%2F3x5dXbKHWT3lsEfVjW4k3rp5dTa7FY3Ywj4iRzAY6pgHkCX3nZrGsYbWIArbQ5TLm3dtbYpsqzeXqwDlOYVgg5YGTWNI71tt8nHsiQssCyw06ez44ZAlGHqp2L79eqcsOJxJM1AmXNtcx51EPO%2BqnsX1vUUpBBAnDoNrERl6yNDUL5wl4nGjg7OLjvsDz9k%2BcPqCCufLS4rihOSTqVzydF2cIM4xQtw69tHS9%2BL0T3ux8p%2FgpTStErUZ9D8Ghqx8cRg%2FWMaug&X-Amz-Signature=85ac073a375c65930f83edcf3da9231c7d44069fc1155e71223593feddbed35f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMNZEWTI%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIBc6sFr80TGC%2BnqajkF7UtQNICydUmEFkUxN%2B54Fg4WJAiAKv5bkCS2sJ05ln9tJFCkOS89hWtbrZcaPDweXYyT0air%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIM3uXcijdQbIx6rx5%2FKtwDZO%2FLpLdTqDclRdikImMAXC4QPPWZCgTpd0C%2Bvaqmv0tQrp8mI7iRKtkvmlZRTffFJeVZXvLGjy%2F90m7HxQO%2BmKjPpzPwEV6Y6aRdOiNtez%2B2hf1pkAKJtB4gWqrshZWM0jSRnES3%2FlDiS6HT09eypKEfZFXJTm2sdF5B8EBMInFvD40mPASSaOZfg8iqK6VStLIGP49P74KWpQnVRFM0rY4phNrcRv1YCDeYNSVt80RRYolUVllS5vKkgte2FwZamUzIuzQ3%2BUIvTBslYBIhx%2BFMladjVRVgfGkBmCrqlHk0vuE2jOtcWz3l8xD6vlTo55bk19SMHHdaXxr2oEtSq0Gh8W54hpxoemVvMlifWNBNyUQFq%2F5FgxOKaRKehdJ8N1xoxTweWqn9STfiAnAR66J3or2S9HQLj5thrpVnDiKBugQz1%2Bl3Q6%2FFIKrkWI1SXl2TnJVqLoOS3KxMYS%2BKg1RweTuNZsxIDRIHS5dwvXHgjxwLSje7XU8wanaRnFJA4SkFIKuNCHZPr8VJxrNPlUK0TrhRZN%2BYPG8Xq2qgmOzEk1t5irpUzgHYswMNGdRivDb2ZseZpkRyIpf5JKq3groKoB%2F3x5dXbKHWT3lsEfVjW4k3rp5dTa7FY3Ywj4iRzAY6pgHkCX3nZrGsYbWIArbQ5TLm3dtbYpsqzeXqwDlOYVgg5YGTWNI71tt8nHsiQssCyw06ez44ZAlGHqp2L79eqcsOJxJM1AmXNtcx51EPO%2BqnsX1vUUpBBAnDoNrERl6yNDUL5wl4nGjg7OLjvsDz9k%2BcPqCCufLS4rihOSTqVzydF2cIM4xQtw69tHS9%2BL0T3ux8p%2FgpTStErUZ9D8Ghqx8cRg%2FWMaug&X-Amz-Signature=ee0dd30e4993d364ed5641a5ea58df3e5c08ac1919104ab679c7ea722531bee1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q33DAJPY%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQCsZlqKXAaAjoHScFrQkSH2kOW9buQ%2FESXuOSeHl9M%2BMAIgb5IB7PKVn1sdRV4MFTPUJei129V8pP1jF8Wq6PhZclMq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDJfjSa34JodBbrFTLircA4gyn6N9B%2B8l7ttK6fMUulqFzxvIN3JmZpUe%2FujjEzjV65Gi7BHTjgMeGigwK1BgMY2WytaOLBjgmQdacuR477gEZlP3YmdyEOfBT%2FWEt17rV%2B3u0ssWFNpusJB4ZjvUEwj2bktonmlZdk17rokMTDHDMfb6P4jaju%2F19%2FC0QFgDM%2Ft7sl2SOPtgEGNRbMxr%2BfGkjF2jqD8NfDYkc0EijDDYcF2tn2RCFNJmiLpM%2FPaxy7skvFrLctOVVDnNkMrsR0MhkLhpq5l7mMnZ3kwlT6VAH%2By6wcpwL2oD9R0pUs3ldKDle5ZJh3p9p3vrXGYs8%2BXa6ezmQoU3nihXKNKASZLhfsbN9rAS8Gz0mkIiY4Apj0Rcy2GH%2F3MqiQlQy9%2BqFxcgUlfgGc8CL%2F%2BfZwS9%2F0LF3m5OKN9z3r1u6dCHtafchdG12rYdyjdNCzXors7KpxR7242Drwtw5RRdiGidva1t%2B%2F4tjou6EoYxgtXGJ3osfz81EixwKsI%2BCDl4VzX%2BUy14G9tkwQpGbeQ1uJf6Nbhy7eYSUvsJUflIiGtGW8y8TY%2BIoHe7zn2k3U3mdsUERHybD5jfwaYXaHJPROA%2B9hwYMMIE5CBLKYniAzOqAanfKzp7q5KfyjM7FJ%2BMMKWJkcwGOqUBIbB38qV7KepqDRv9oJcIVW5x5j52fIcmCqWJgNRnQk7xd0lyKKjTSZH%2BxbAvalKC9Ht%2FQesknAQFstwqHChZ2cQyUZ44Z7jxThft4FOfZxu%2BjAnKsTWpPIfU00VIZOUO%2FbqK%2BNHfZ8z%2BF3sqIFYL6nkVCwIg6u1n7tAuNGtN2LMZM%2FwVHcWoMmIwUQBcg3VNgLfhN34KnUYBZsx3dlq48ObPL%2FEG&X-Amz-Signature=5efcea3a0bb8f9cd6508a288b2dd89ac3638980ecc7bea7504ebf7736bd4c6a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V67YOISX%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQD5yw0jWYjEuq%2FBvXi13GXEeeDKefRM5l3K6%2Fa%2BogZ%2FPgIhAKXH8j0FH7dadDOYZGdHdoFfoZPHUA9%2F5ojb2jqoZmlrKv8DCCgQABoMNjM3NDIzMTgzODA1IgzxfQpJDXtMHLUndioq3APQVJ%2F19tPFSNYs8S%2Bmjnmr958xBsOx0%2F742qKOQfR16OEAr0wk1fpx8HVkVLby1UdndZlRIY7R%2B01NURK1QFuuHAMWCtFNLjMEuWKTD5unO8IYlwkRR0c%2FZWGGR%2BIxyPaczI9eAhwuh6M1TgIRgcVVuBjI%2BYvT3Y6B01C3G2mJ3545k5HoT8qMi0L6BX1q%2BClNvnC2ODAMsEWHQrgz5%2BZ985PGrx8HHxmlAPaVLUw8yrm67%2F4PaMCLwKsBOhuijA1a0EIb9tlw%2FwrWit4Q4Ze6dYX3YBOs8nUPIE5JdGMx%2FIp4ZdCYeistigaX7lDB%2FDcasym7jj9oe0tluK%2Bb2obx21cH85TO%2FVXc9c3gtKi3E6HgcZZ0PSAA5i7XX5KjmeHZuLT8SX3tVSmnEjOQqr1BqDjrNlLJxLSyTlbJlS1Z08d2iydSp1aF03vjsKZCZs8Gfkei%2FqhH5ahxFnCobW8FiXdYRpKup%2FXqR41Sb71Fg4P9pDtANS0nL6cxTvsP3YYGax5Jhyw7rprPuT4gWk2BXFEl6W%2F7%2BS9JNlokhfEuO7jtYj3PR%2BCDKXOlS2YtUkAOEAb%2FcPzQCH83vSoxLAXKMF5IZuhiCCD%2FhTks4FX64UTQd%2FkZidCyp3j8EzDgiZHMBjqkAa9XefrwFsVu2vnOA4DUi9DN8MDINzVtwE8m8ibzTKI8OBAL%2FpDVEdwE6PLFg3QdX0WOZMFDRqO7nDe33p2UymgX7X9Da4HZIaKQYpxIarFUX3i6pSZE36Sy0vkhfJVqevIgPvF2eM81RCUqUdx%2FgdOic%2FFhRDy3Xj1TNHXfVm9vBqc3hvj2ar%2FqYGd3N2ZSCiGiFLaQeMipNPC%2F71%2Fv3Pt%2Fk6qd&X-Amz-Signature=36d50d40a3b77a8b3a36a4ceecf825375b87eea2180bb561449f6fc3ffeee69a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V67YOISX%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQD5yw0jWYjEuq%2FBvXi13GXEeeDKefRM5l3K6%2Fa%2BogZ%2FPgIhAKXH8j0FH7dadDOYZGdHdoFfoZPHUA9%2F5ojb2jqoZmlrKv8DCCgQABoMNjM3NDIzMTgzODA1IgzxfQpJDXtMHLUndioq3APQVJ%2F19tPFSNYs8S%2Bmjnmr958xBsOx0%2F742qKOQfR16OEAr0wk1fpx8HVkVLby1UdndZlRIY7R%2B01NURK1QFuuHAMWCtFNLjMEuWKTD5unO8IYlwkRR0c%2FZWGGR%2BIxyPaczI9eAhwuh6M1TgIRgcVVuBjI%2BYvT3Y6B01C3G2mJ3545k5HoT8qMi0L6BX1q%2BClNvnC2ODAMsEWHQrgz5%2BZ985PGrx8HHxmlAPaVLUw8yrm67%2F4PaMCLwKsBOhuijA1a0EIb9tlw%2FwrWit4Q4Ze6dYX3YBOs8nUPIE5JdGMx%2FIp4ZdCYeistigaX7lDB%2FDcasym7jj9oe0tluK%2Bb2obx21cH85TO%2FVXc9c3gtKi3E6HgcZZ0PSAA5i7XX5KjmeHZuLT8SX3tVSmnEjOQqr1BqDjrNlLJxLSyTlbJlS1Z08d2iydSp1aF03vjsKZCZs8Gfkei%2FqhH5ahxFnCobW8FiXdYRpKup%2FXqR41Sb71Fg4P9pDtANS0nL6cxTvsP3YYGax5Jhyw7rprPuT4gWk2BXFEl6W%2F7%2BS9JNlokhfEuO7jtYj3PR%2BCDKXOlS2YtUkAOEAb%2FcPzQCH83vSoxLAXKMF5IZuhiCCD%2FhTks4FX64UTQd%2FkZidCyp3j8EzDgiZHMBjqkAa9XefrwFsVu2vnOA4DUi9DN8MDINzVtwE8m8ibzTKI8OBAL%2FpDVEdwE6PLFg3QdX0WOZMFDRqO7nDe33p2UymgX7X9Da4HZIaKQYpxIarFUX3i6pSZE36Sy0vkhfJVqevIgPvF2eM81RCUqUdx%2FgdOic%2FFhRDy3Xj1TNHXfVm9vBqc3hvj2ar%2FqYGd3N2ZSCiGiFLaQeMipNPC%2F71%2Fv3Pt%2Fk6qd&X-Amz-Signature=36d50d40a3b77a8b3a36a4ceecf825375b87eea2180bb561449f6fc3ffeee69a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFL2TGSS%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T093147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQDgDmeKPUmVZlWk1fpjQIRugIk6FbJk2MOWCM5kcxqldgIhAKHG08BgQOeyoDCEIUj41T2jJ7KX7o4QuzJISTSngzgAKv8DCCgQABoMNjM3NDIzMTgzODA1IgyY0603NUYJN1M%2FTqoq3APs5zF%2BmWHmEWvlokjZ4WvUAiwG%2FWCkFVyUIKC91HhdXmQgh3X7vVP7LcXSf%2FFxhS%2FYr8u%2B4B2DVjhNdT9WUQjPJByL81koFjGyGr5p%2FB3kF%2FjUpUbSSWxSCAxclVWQBkQVb50Ige%2B07ATpxqAGIQFU2VHlbYrqtv%2FHFKpdzSdwEP%2BUAV2pHfAPP9y0VVsh1WQwuRegI0yDLeY6D5pjiuCXCKQ0JIcx3vdwhPbNMNNbwLQY53wd02Pyrrterowmc6MpJmDbSHpOLXryYVp8wQJJotxcwyo%2Bdmbh5VvUZj%2BeGYmWTPqnSzMt%2F3OwjfGrrdFuHyybIQl5N3T1tOh%2FNgptx9bUgEO%2B7Fz3wmdGdDl4onghNe2mxC60aNvNNTp%2BHFzyYBX0FIUH2wPBRs%2BmtxJ4zu1D6rc2yQVqSyZNAMkAxgFd85B1rJsGb%2BFtJ7Qlv6A9GiM0CHVqFHs4RuD8HcC6MVf2sqhRMt6RSYLdXCkHTjS0ODi3qn6xw56oHwWbju6PMlLub8jNyFdFxLLeeKtWh%2BoGb4hHoVD1ZWP8%2F6UOLWIQQu7u5wjG7w6CvOLVWsrLc6XBAy%2BiOmqXmkWU1LfLBiYD8owMWigLvVL58N7riHLuP7zB1DmLQrlpRDC1iZHMBjqkARHjzTK3cZOiUfbJ%2BYLt%2B0MpzP2Tjc623nz2FLSV%2FUhUEJTgslmr7pd5bUnZ9N4P2VzFqMbYciWsOOl51dikyDJ0AqWw6kMq7Tp3Ah6eZIersVMtuZ4RatQeyd3VYX2svSZafl5cGmS3FVVj0G%2Fy39MFSGNoHYtUtTMz%2F11%2BmkxmrL9nftamaxd85mTKtfBok720GkMIIa%2Bpi48ZdTloFdgk3WiA&X-Amz-Signature=16f0ecf155a3dcb932adce9d842c682de80f0080352f2196921236a061a80bd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

