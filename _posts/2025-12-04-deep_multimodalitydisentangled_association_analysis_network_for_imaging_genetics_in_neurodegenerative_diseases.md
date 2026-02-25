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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFLIDO5G%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIHlOmQ6dtXgJHuEidrcRLXlFZ%2BH3A8%2Bx4mJyYm5guPmNAiBt0RKyY6d5wEvDRgSwiHYmgDaJXIvXNQaKG9JqO%2BLMUir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMUaJnSG%2BQvRGJZg%2BaKtwDjX5xfUR2OpRSmSTzsUlcwcthVJ3HjiKvXPdr4sGA8X1136Yr0908QGiHoihTRzusvN%2Fubzf8WFM2auNEOjXrBpW3tdqCfjN086qfaNijEpw%2FP9tLzv05CPETkBhGhfsrFwf3%2BB3YOg%2Fyq4ukbl%2Fn555NsAYgmBSMRQsiOMqoqXHrTrXeDYLjLH7YsDR%2F%2BqT%2FpUmL%2BAXFL17oy6kcsRO2gBqzRPf%2FeXITLzidOT%2Bn1Raxg%2BMnoL%2Bl2lphvN6O8X8eSVC4asppO1DT62I7duFam2x6JtyYpCoUadzUDa1WdBhRz2YgGEqfjSPmf5AaJOBCOsWoMBFSCDx3atVbYi6F%2BzZ3NrM1cu%2BKCojdU4QwhVojB2%2BFtkIe5WeqXbcPMFs30nARQSZaajw70i8QBejW2eSf2eYXmeaQ9KpvLCFxMghyb0iB3MTvm36w%2FTpeAQavS%2FhXuhFEGCNhfw%2BMo0DC025%2BbyKvCeYklh5uOkj%2BDJOGKQXshZBSfj7xSePROMvNbWvuHMjzRmYf%2BkX3k2xLwSUVSu3EYkbldyKWtNepenkKnSpR0jz35vM8XnrQbOa%2By0xLYBhtxjIReEVUhLUdgyYxisLOtPryUXeelYfcsUkHs9cCuR00XF1IueIwrbT9zAY6pgEsFwFuZXYeSNZSitL6EIYlES%2BDwl%2FJBrIbEaXkE7frkfuvVrmyxrfSBkbF13w0lAkPFmbxVz805OyxHBUNJ%2FjT6G%2FKe%2BW4bpTmcaOxsT%2BIRXW92KKkBnIDnGVb94Alxsq4vbFVOYqaCNbKuvGFh86HpxzqGVjBYHWOCrFMX3WKCN8fnm1NcVGM44HqDCHxSj1yS%2F5hW%2FjSFwRNdDg6cCcFzeb%2FoM6b&X-Amz-Signature=42d9e4c0fb743fcbadf17f0c924bcf91385180661a39f4a7af278d2a7fe199a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFLIDO5G%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIHlOmQ6dtXgJHuEidrcRLXlFZ%2BH3A8%2Bx4mJyYm5guPmNAiBt0RKyY6d5wEvDRgSwiHYmgDaJXIvXNQaKG9JqO%2BLMUir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMUaJnSG%2BQvRGJZg%2BaKtwDjX5xfUR2OpRSmSTzsUlcwcthVJ3HjiKvXPdr4sGA8X1136Yr0908QGiHoihTRzusvN%2Fubzf8WFM2auNEOjXrBpW3tdqCfjN086qfaNijEpw%2FP9tLzv05CPETkBhGhfsrFwf3%2BB3YOg%2Fyq4ukbl%2Fn555NsAYgmBSMRQsiOMqoqXHrTrXeDYLjLH7YsDR%2F%2BqT%2FpUmL%2BAXFL17oy6kcsRO2gBqzRPf%2FeXITLzidOT%2Bn1Raxg%2BMnoL%2Bl2lphvN6O8X8eSVC4asppO1DT62I7duFam2x6JtyYpCoUadzUDa1WdBhRz2YgGEqfjSPmf5AaJOBCOsWoMBFSCDx3atVbYi6F%2BzZ3NrM1cu%2BKCojdU4QwhVojB2%2BFtkIe5WeqXbcPMFs30nARQSZaajw70i8QBejW2eSf2eYXmeaQ9KpvLCFxMghyb0iB3MTvm36w%2FTpeAQavS%2FhXuhFEGCNhfw%2BMo0DC025%2BbyKvCeYklh5uOkj%2BDJOGKQXshZBSfj7xSePROMvNbWvuHMjzRmYf%2BkX3k2xLwSUVSu3EYkbldyKWtNepenkKnSpR0jz35vM8XnrQbOa%2By0xLYBhtxjIReEVUhLUdgyYxisLOtPryUXeelYfcsUkHs9cCuR00XF1IueIwrbT9zAY6pgEsFwFuZXYeSNZSitL6EIYlES%2BDwl%2FJBrIbEaXkE7frkfuvVrmyxrfSBkbF13w0lAkPFmbxVz805OyxHBUNJ%2FjT6G%2FKe%2BW4bpTmcaOxsT%2BIRXW92KKkBnIDnGVb94Alxsq4vbFVOYqaCNbKuvGFh86HpxzqGVjBYHWOCrFMX3WKCN8fnm1NcVGM44HqDCHxSj1yS%2F5hW%2FjSFwRNdDg6cCcFzeb%2FoM6b&X-Amz-Signature=42d9e4c0fb743fcbadf17f0c924bcf91385180661a39f4a7af278d2a7fe199a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVYSH6XN%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIEksgF%2FRrZ6z2rdVuoLhd1DVL5TXyFln0UTNYCV9pqbGAiB9XBEBhhugDu787P4fnr3BUZT9dxmoKUBgf0zrcf5Y4Sr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMMemWCXZ8Z9VL39w%2BKtwDau2kBH3SMiTlReQSwWrCx1yc2DWrlib2nqukxw7Zk1dpAMB3lJ0fRIfgIxji5Odn61L6JmQa%2BDifqfFAfJ3OHtKeg9Z7MydcPZF25QfzKMZSpdsKHFVoLRq3eBxD%2Blc8PElRaMpbCnF3TygQUA6Y0uIPI3chGEy0TaEHT%2FxXFg6s6h7tOIo%2FMNyi%2BAH8%2FbdBiq%2BcEmJTEyY3ycSJM40%2FTjmxODtUefff%2BmudaFsmjeJJAg79mJpues8NIhet%2F6jlChYDT7F5gaWd5oSPoacKNn0yAtIRkC2gjyddOgJ3prAEE0%2B4JB4%2F88TsDwW1gaowhx9GkQUS0VQ7Jdw9fxH69u0COkoD3WGsntoLCRMvUiIEUTizSQhxSva3EOIgzKrpOIEw5vLme%2BNaAUk3poGPLiC5iGZXeyKaJRtvefXwUdi4ZVQvAgTGkKF%2FJk0jwK5Iyr0knZbVALb1JzHCzzuLuYpAhz8WLaQMhVCkvWuoBpgwunYctTvipytqvGmSCb3%2FHe7Go1pJvzxIW8RZvFimDaxW1MR8zXzoD6TEfMusFCMc064aILiZPUz%2Bea%2Fg7QL6c2BYe3VYi%2BWv4I9T3zS2KBz6DWcBSLq26eB8Wcz5SrOQ65jPnl9FiNuCv2owwLT9zAY6pgE9SKLniuDHz643gBRt9fMapnUkVj81cx31oOFYLZC38%2B6jmtP873OjwglmzMB4pEmKqdnr%2BIjTJmXv2F4W%2FJ0PxPctQMWZ6fIJKCWR1CHtIcXYQgizyTxMUWD3TgeRGjSvmw5X%2FYWY5dEbRD6rXo10bq4VMwaki5N4IpOEItIsvdczfsPF4J2XVeyLEYP74f7CYeEknysVpMOmQd8PnePzkDXo6Czc&X-Amz-Signature=dc27d8e40ee9ef4a31edadf5c1eb3b20808c0b3bbb6ecf6537b031da201739dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4QFKTTS%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIGby2QmHwRCAaiYydpEnJgctLrJTsGu2svneJOenCu1xAiEA%2FjPAP07vaRidyOFLN%2Bcqhtc1coFjGhr1dSa6s8E7aqwq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDBW7y8uYEjZhC6LJeSrcA9mqgsUwiY1zPDKU0fkKofwzZAF1YbtXqP952O5Vb2t6lRvbqcOGtukI%2FK9o7SCs9qG8V3ZOtoAuIWScN0foo6hR8nNcN9p%2F8VAyPmGDwiH1PyiX5DCTrZ9HMBcGPRFdATj8JpuYJg5z6ZvFOxdGXy2hDx%2FQtViXxT5wNaqlQosm0sUHSbu4bjmCLMN4C5ySNSbL5uwfMIaYm%2B2QdrBAZjBN%2Fn3dZ%2BgFTXr8ipMsO%2BkV2gGY1U98KjQyXCpIVMKv8DXYvCZEj2yOA13t1ly1ME%2BDnxN1f%2FTYWyaXNoYw2lV3OrC1Rdu3%2FDfnv7QIZsApDYOmzm6aNGSlJDLlknSXX%2FOSrAnkGw85XxaYMJ67QHnE%2F6GZ2zE7vcAirxq88DR31X8W3IY2gZzOH7WpjIzZqJQRXFIALrIEz1DRgnuCNxxdtk%2FuNR5DGGySfiZ5iWdYBzht4G4KfWXqfNLEtLCNOw18r2lBQP3ZQ9HG%2B6T%2FJigHseXiUOflwzuJ7tEE29aPRIe3Wxad8vP29AqL1ofYSW2nEPxJNj5WBn7mPDjbhSPl3xoLTafpkEnZCYXyn2TznS9L6%2B4ed0wanORTVI4sxcGNyOlOoPubQ8jDodEWuU73rSG7DjQKFq2iAi%2BlMNq0%2FcwGOqUBa%2Bc6iMzft6v7SIdoAE9Hm8e90huH5EWE4aibPIHc5CCNZjw%2BOuOPa9j7M5xnVuV4lbxeD7Bu1XiEgbhjE3ogVvmPVNdkS%2F%2FDc%2FHQurmuIZsJuts79jNUWcIxTFmgSFnjd9q07HjS7x9ArAXCS9IrGDw63DnF4UbyMZ8Jk61zcbtDASy9NThZ9pRw7Nm8IBEkANpCBfW8V6NEUzeNQLf5yvwq25sV&X-Amz-Signature=208428808d555d9737f532d5340b4d7e9aeb12d1cc0605d8355133825606c731&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4QFKTTS%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIGby2QmHwRCAaiYydpEnJgctLrJTsGu2svneJOenCu1xAiEA%2FjPAP07vaRidyOFLN%2Bcqhtc1coFjGhr1dSa6s8E7aqwq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDBW7y8uYEjZhC6LJeSrcA9mqgsUwiY1zPDKU0fkKofwzZAF1YbtXqP952O5Vb2t6lRvbqcOGtukI%2FK9o7SCs9qG8V3ZOtoAuIWScN0foo6hR8nNcN9p%2F8VAyPmGDwiH1PyiX5DCTrZ9HMBcGPRFdATj8JpuYJg5z6ZvFOxdGXy2hDx%2FQtViXxT5wNaqlQosm0sUHSbu4bjmCLMN4C5ySNSbL5uwfMIaYm%2B2QdrBAZjBN%2Fn3dZ%2BgFTXr8ipMsO%2BkV2gGY1U98KjQyXCpIVMKv8DXYvCZEj2yOA13t1ly1ME%2BDnxN1f%2FTYWyaXNoYw2lV3OrC1Rdu3%2FDfnv7QIZsApDYOmzm6aNGSlJDLlknSXX%2FOSrAnkGw85XxaYMJ67QHnE%2F6GZ2zE7vcAirxq88DR31X8W3IY2gZzOH7WpjIzZqJQRXFIALrIEz1DRgnuCNxxdtk%2FuNR5DGGySfiZ5iWdYBzht4G4KfWXqfNLEtLCNOw18r2lBQP3ZQ9HG%2B6T%2FJigHseXiUOflwzuJ7tEE29aPRIe3Wxad8vP29AqL1ofYSW2nEPxJNj5WBn7mPDjbhSPl3xoLTafpkEnZCYXyn2TznS9L6%2B4ed0wanORTVI4sxcGNyOlOoPubQ8jDodEWuU73rSG7DjQKFq2iAi%2BlMNq0%2FcwGOqUBa%2Bc6iMzft6v7SIdoAE9Hm8e90huH5EWE4aibPIHc5CCNZjw%2BOuOPa9j7M5xnVuV4lbxeD7Bu1XiEgbhjE3ogVvmPVNdkS%2F%2FDc%2FHQurmuIZsJuts79jNUWcIxTFmgSFnjd9q07HjS7x9ArAXCS9IrGDw63DnF4UbyMZ8Jk61zcbtDASy9NThZ9pRw7Nm8IBEkANpCBfW8V6NEUzeNQLf5yvwq25sV&X-Amz-Signature=93b88d407ce8e451825ecb1769af6be8b8e0cabada90d0adc171403cd7424387&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQLCLNL7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIA2oc70S2X7RiK9sBFF7z%2FG9zAIo01WTkRXhvO6YQvSNAiA3ZnRrQOKgRwK1XkoTu3d5vFNbdHTxfo3munTXM%2FxgVyr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIM1gCVQIBt52Hb2r%2BXKtwDQt%2F%2Fxyvs%2FcxsmHkamFpTGnljsMGDu3v73lKomjlv1ZQGdwnq79boQi1pzFBiLhgARih2PZpf%2BmhS1CaUExkYV%2F0tqeTa30%2B9BRe1QmjbcMfD%2FoiIi1Fioh71nc7GO1rUdLuI9NcWQ2YeV9A6ylHHg1u8VFK5bbYuv9p0CQ3ZADQQMy5Kons5ZuE3QdlTpRNO2nWOdVeVmGRx%2Bva1gYpZ6wTprapdT6VEoHrunV4no9upg%2FR2hkmQJSw7SzkLbHjJBOKXNI%2BDMfNnHlBOQcsWLpDviWnzy69SZmb9icLxOw5ITwgwbZo3J7%2FS5HVbaoTs7qgG6vItyFDriFmMEopA9Y0u1zn660EyXT3X5RRU3U6mTsC66RcVLZlSYNLXqO6KsjB9vwhbG3hT0kPd2To1%2B2Ijf4p1JULADZOGgYydhgYg0Btpx3YZrNfboiPXm0HZ8Jd%2Fdi3FL8fZEmjTzjVffm2EoCIypVHwaQdJT8wCNmXp8lNWnu%2FnL84XaTIdE0FD6tOv%2B8GXM%2FMBON6Pb9Lf%2BlheVfO%2Bvf%2BApEGb4aFhcN22tOynTHL5wu83RD%2BZsyH5jDbVXg5FNHK4KOTlBL3n60d%2BkpEt28HT8PI1bCqxLz0kR5BnfvsIGVMG6A0wyLX9zAY6pgFlDyhP0ERHufleH50aO2BH6Zw5vGaK8NOE1gan2vwwCG8%2BHxwyAjNA7NJ%2BaAJoqojemQ0fnaQjX7DAsGQE1saYsOyL5Q7HVPDLVyaGxuPCLUkFcQp4UA%2BTFBGjhdP9ivVKsTyKrE%2FgzGkJM%2FnpOrWux0j8nknA%2BSQo7R9LwxAdzFZngVLwi2YfoapRaJUm9ewLz4UijOxC9XD3xuqBI%2BO6BQlYtvWf&X-Amz-Signature=d8b745f7dd5190778dffed59dbeaedf771081433b4006afb846b661bf1cff959&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWNWRELL%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQD0yr9lO%2FMx2sOeeHvVHUaBegZoxL5I%2B5%2FJubk9yoTLCgIhAKPNkZ6izUwMyU7l17izQLD2H60YdBVDKHXeoSKkGqZ0Kv8DCBUQABoMNjM3NDIzMTgzODA1Igz3lo2Z83Cgrsdvpdsq3AMOZlQJeWUJqAPBgJJzB3ExW4pbU6fhpuqd3%2B4knRTDftpxnJmRGUxdLqO2ABFdA6Em8MKmjETKp3WIlZWwM046KvBJoCZzyAtF%2BCVFxxVNq3Ii%2Fb4jObXCpo43oBKJ8gjnWqW9qwjqXJ6oW1xisyIM9NfNHAQ5%2Frzve6yacu4PbfvjWSAbZ842Jj12P4NtEPGyu6mczjs3xOiZH%2BF0QIxuYoTg7hGJQCwEsDmedip7vdCiHTzfj%2Bfvbq1jLLA25CZo7zXFOkHkMqlifUYoVZvs7lV5NGJaI8QLmn63ryyCkgFeYveejM8Cr61sacb6lcF4VFcz0z0c4rd%2FKMZ59JcPndxlfVIUrI6cg6aE03dHf%2BQurev2b8JWJ2RqCCOnXaTNVwFL88FPkYv8C5dxPFyV6oyIkbhIWCRyJNGBMHwualvXGf4xziML8y8gbh3LdHRDndWFWxK1lmOk0bAXXC7Vm10dRKcfUu21YsEVqKH3I03AtKRWpZrGiHgZ3eWwXvN3oXD7zrpqh%2B%2FkANJmjB67s%2FEG6liq6rqrqHBolNSc0li%2FB6PDl0B5rjC%2BZJqHJbFhwruoWmuN9RQ6DWoWcm%2FGRRlH0umpgFUI8v8iWhH0TOvhgun2UhDhSoHmGzD5s%2F3MBjqkASvvsWaRtYXBtBKvFogsBt9B0fzHh32e08aRfE3we%2FKBbjAEZQLJrxnHH5i5A3RRh0eTtI36gjqkMcCuyJiA7Ub7o%2FkL2XELy0ycidQuh0MEivtKEnJj8fn524YVk4tXQM%2B8wkRZHnTgsKM2f9o5bzB5tmXTLHXAHNEPDBlrgriv%2BYF9mPvKmXUaIFzoIo%2F3vwUsU5VQTzGef0M3dM7Cf01Zgp7J&X-Amz-Signature=e1750e2719be58f4a5eb532807eaf9a21b951fdfcc850c0d535fc999ca94400f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UC44OPNB%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDFnzPxzUEz%2FwWzRERkltPR0do5OfpJ2fyZgaWz8InYcQIhANzXBZXl7pJ2zg4x87bt2a54tUSc8%2Bdt46B3OzYIg1s4Kv8DCBUQABoMNjM3NDIzMTgzODA1IgywfG82eRZOuWW%2B98kq3APVTu0DBc4mpFWs%2F%2FbPDw3CLmVMgrbET6316OLxeft5GwV8xMZEDT2gdWUucwFd5C%2FQRupUr%2BfZmgiLKa4aBrmQBOj%2BxHEv2BrZThu7qKEwL95B%2BRsq5nm%2BViNtUw1gUemV7xj8bLAVhCjuaVLnAUHDhwIE85hGpngIF2U%2FLmp3EMsVFN3Vy33zypVVU1ZF4WKJg5XBhcvVmNYRARJUgRhMOP7sEjleDUIN6CkaMBzZkpHVvHcV%2FQmKnUPyBIqLIX4Jz8jTPqpxG3p1tnkHmfYuY2OUPlSccw7wqgQCSP3JIf1ujvwSAahzXFGLWfDCVwaEgWct4TneoYOhoB0EColoNfz5yVgpLnCl4TrDDeG5HiGsiO1wqcNBGcMlOElswdXYpKXYmyc1WrUcY%2FWJqaXFx8bqGlANpeCECoiuCK1z5AhLYDmp%2F%2BeyVvdjr5Vso9ZUQYx2it86H8F8bImNfIpOIwnBlcWEIcacVnDDqj%2FHKDQai6QR0k3EZaW%2B%2BWYlJofv9rD%2BvIzAL0TYLlFbqp8%2BrGgoTnL2YlVHN%2F8z52O9GnMmJ0jaApcoUwyhza%2BtRp0KZZEqIge1e%2BUHjJN8MVuzmvVIm%2FubRbrNODzAx1P6g6hfQu2Nu5om2kXUMzD1tP3MBjqkAYzR9CRXbCx%2BCJhKnbI0HnPuj6i5AvOl13KI%2ByMW7NaT2JE%2FUtu1qTmvWDUsZOa7QsG7lqEEhtJOvd3%2BV0xFjLWxQDgBfHlEDMwGyLTjxKPr%2FfOqgF%2B5F0NJ0b2uPaRrSrI1HBse6OAv1A90r%2FoMAfcFbziTqF%2BS6KmchoCtdMjoxRSZ4LEUW7xckdc1kt1YfB%2F3zhmpdvq1mQEh4PhzXXMu4ORe&X-Amz-Signature=fe38bb6a2740eee77b974a516c460f4af5d9ef38c81dc9739c3f33771ffc0b2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPGQJFNE%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQD%2FxYBcesVoqrEbkmTpTj2MftfNzgoReoyPhtWsxx%2Fw4QIgZMZ9XBxOq%2BBe8ur6HdORSNHDIJVG2QvKuBP6SxRPW8Yq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDJCxb2PaCiw8kj66vircA3%2Bw26xr01L%2FvOMi0oyZ7yVB0TjJN1ADxaQ2j4EzyxTFBWO9MGZVWe%2FR1gC3XBGcmFbA9xSibEdLBt5ztYe9eJ3KxRHqfoJEtBUuI8r9xyNn4%2B%2BuJfH7kx1XqyHqOcexuXYgvy5lWduBMlKHIEMo2m%2FE4AA1KqzD79i%2B%2BiZ8z%2B0iOvpDtub%2FVsGwaF7LZWc9cRdi2IQbiuJCr2OW5Lh4064538LocSR9Tutq6uhQzWMcdBhfcaUC77Ba9nvWVUUjLVHBThxu%2B%2BcpH72gS%2B6aloMku0wIx0LYXZc%2FZN1dTQIQcpc3ap%2FFCrgtmVEYxUj8C9Kd0sUIn%2FVUvbRKaNKQ50%2BIIHCgeQEIvmEuSqGIVYZw15nhEk4KyCbkQq%2FQBwkL4r6vHNj%2FB5f0QWVbd4DfRo%2BUphWqP3e%2B2PF6nmLG3vWo1iRv0OzHQpTrbsd6DLOmbCeBEFgjjgIvWit32SnbR5kf3VGJv62YUukbCu3y3v8rlcgPL%2BhtQ7uxkttXDc52oDHQGghQIG3AdkIqorqd3tV0aiKoh7uV6GcozBi4NmUOi2b0wMsz8WTes0WdqqjV9MHYsEBq8BJ95XQ2g3LlYsVnUYz8lKX8lfkCCqEbrEDjkejRjJ2fE%2FmPvvPHMPq0%2FcwGOqUBRoMiJxl1B5qySw733Iz4jU9e0bHGJeWTGTbmgkpsrUoEiCdn9cg4UPACZfa%2By1z7jsa3rdQPXbBCABz%2B93tf%2Fp6xF1%2BFBS3f6qSO7j3xdAlzcRkq7ZyAqtNSPLM59y1r6vCW4yUYH1iHDnRFeNKPUoQWrvONrQkT9oIg65EefW%2Bkaa8Qb7heAlY8Pg2i07utcNrHwjqRSnVlDl8Vmo1VyvG4CZ6i&X-Amz-Signature=8e8bcf795fdc09d2dd560e635426471da0878dd0feadfb07444abd1bc6e9eb08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPGQJFNE%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQD%2FxYBcesVoqrEbkmTpTj2MftfNzgoReoyPhtWsxx%2Fw4QIgZMZ9XBxOq%2BBe8ur6HdORSNHDIJVG2QvKuBP6SxRPW8Yq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDJCxb2PaCiw8kj66vircA3%2Bw26xr01L%2FvOMi0oyZ7yVB0TjJN1ADxaQ2j4EzyxTFBWO9MGZVWe%2FR1gC3XBGcmFbA9xSibEdLBt5ztYe9eJ3KxRHqfoJEtBUuI8r9xyNn4%2B%2BuJfH7kx1XqyHqOcexuXYgvy5lWduBMlKHIEMo2m%2FE4AA1KqzD79i%2B%2BiZ8z%2B0iOvpDtub%2FVsGwaF7LZWc9cRdi2IQbiuJCr2OW5Lh4064538LocSR9Tutq6uhQzWMcdBhfcaUC77Ba9nvWVUUjLVHBThxu%2B%2BcpH72gS%2B6aloMku0wIx0LYXZc%2FZN1dTQIQcpc3ap%2FFCrgtmVEYxUj8C9Kd0sUIn%2FVUvbRKaNKQ50%2BIIHCgeQEIvmEuSqGIVYZw15nhEk4KyCbkQq%2FQBwkL4r6vHNj%2FB5f0QWVbd4DfRo%2BUphWqP3e%2B2PF6nmLG3vWo1iRv0OzHQpTrbsd6DLOmbCeBEFgjjgIvWit32SnbR5kf3VGJv62YUukbCu3y3v8rlcgPL%2BhtQ7uxkttXDc52oDHQGghQIG3AdkIqorqd3tV0aiKoh7uV6GcozBi4NmUOi2b0wMsz8WTes0WdqqjV9MHYsEBq8BJ95XQ2g3LlYsVnUYz8lKX8lfkCCqEbrEDjkejRjJ2fE%2FmPvvPHMPq0%2FcwGOqUBRoMiJxl1B5qySw733Iz4jU9e0bHGJeWTGTbmgkpsrUoEiCdn9cg4UPACZfa%2By1z7jsa3rdQPXbBCABz%2B93tf%2Fp6xF1%2BFBS3f6qSO7j3xdAlzcRkq7ZyAqtNSPLM59y1r6vCW4yUYH1iHDnRFeNKPUoQWrvONrQkT9oIg65EefW%2Bkaa8Qb7heAlY8Pg2i07utcNrHwjqRSnVlDl8Vmo1VyvG4CZ6i&X-Amz-Signature=2672bff3b511d35e904441fd51005f24e445dc3c575bdd46d2e76746e57cc51c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WHBG6JF%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCd8rB0ZhMQ6oplm21ndNNBIcAcG%2BUfe4uONi6IOayMYwIhAM8sVIynZylop0Zgcd5UdARVAdG%2FPBVeUxfUNIBsxQy4Kv8DCBYQABoMNjM3NDIzMTgzODA1IgzSyFHmGQMX1noDkOIq3AOYyXcNoITVujPznxhEqmGJasOvJYfj%2FhTmjy3qxQBpvhEGHLxJSeWmXZhRMEVRZU6rQPizD3Vf0FUchID7qYCXr%2BK7PM%2BDZ7dpF%2FBuHJ6sPjWcOCi5Cu1kpIDHVZPZZbBqD77H8vHWPgDGop55yfQrL61FVcPOmls8gG%2Bi0JNeUdc9Sgr3k90QnYUY%2BZ4d023vXKKGRwNxcUP%2BGk0ra8bGE0A%2FPpG7xjyBkSqXXDw20xUM9oSNJLCYOeCJn7LqMo2CVBey2%2F1b5wECBAsaue0HrLgXzE2VsTxgZvWIPzhRZ1J9sf1Nk3qog8z3wIkUVv%2FWp8kJ9E3WWDnjX1tb7qqSS0eKAfEf6gQCSpZNTPA1WrF4uvvt%2BQQlRlhnSx5VVfWuMuPZYjhHk%2BrUNYtE%2FudMxAltXulXaKyPiHez0GGslbxFCeIwcQyNagulj4w9rTWcQn1lqXORYPiZxHsegbIYLncvAQpkjJBlJiMW3LgdFDUWCiiOH2LHq%2FMrlILMYFkOSmNkCndCM%2B3w2YBBj60MWYLuyGClhNmj4Ved3wEXxkA8%2F3%2FzdAFmZq%2FUlyWIwGLz6pYLPxBUtx8hJkpAcQAIznKVk0hRUC7jdqr3R2cVukJnD9k0bSAByxdNKjD7tP3MBjqkAeHmekl8GgCtr4gmxipLWZ5PjJkT1utDbvlFscJta4%2FlqnN4SsgGPShUgjSOR5puXvbQseiEVVnu8O6EZnVk1k4bySavEVP8psfSA3q2De3%2FyEuDJWcWrIAslStl8l33oIYovg0Uj%2FsLxBIDBqMQ%2FeccB61NiBbu50UOhIxFF%2FdiWBBOldm88ARnGgx1czZGMPex62gWXL%2BnS%2FjXXbySICgK22hh&X-Amz-Signature=a53287b4644c7fe318a6bd69d427febf64d499b2bb1ffdba811c515bc7c9939e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPY7NL7Z%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIAokzV72%2FmM2Km3Vl%2B2T1W1fRCbtjGTTtSN8HflZHGZxAiAO13%2BkQOKwVmF4qZhJttWPPWp3SKO7V5U5VH91WaUonCr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMF%2FkYKdN6A%2BxmQhJlKtwDiHo6LbuAoJ2%2FhpX1IvEX2d2qOnhwryiqTXkKQHhv7R%2BYxs6w1dzjP3rAzVjJefKgDNfEBaGdjUUEN7US299GH7pwvLPAFsm0zWeHyzaNc%2FyvsxrbPXpMw8Nwt7P0lgbncIWACfs57A7kDddkKRjg6o2VTwwTaxFspAgyndGDi%2BND9VP9GCPB7Oua69CDUqJL4EWHUSi393mN8lXbC%2FishDb5i80wDjsHjzl4RfIeMq3L%2Fm4XINFl8oSlpxIhID4IHiccCd2BAutH9B9SEKtaAjLPwXdt7onhYh%2BEWr%2B8wGXAjqGQS3OjpHPA%2Bj6e7Gz0o%2F41hMBVPw9o794avP0tnJ6ur6OqnvtzXpB6WDrR7rYh9qjj7IWavbChtRla2c93iIh9RGW4NUEca36CzFKKUWOU8Lt1qVEsY7H2EwWhQXvL6YfJZ86zutiKbyzVnTf50hjgnjpcCy%2BZVjWMdgS3WKwmVO%2Fdkc8iWd6im9q37lAUk%2FZxM2%2B7Ux%2BFs5GY4apGDKtw89w5OhHEQatNorVkvUQ5BayBDehjRsWf3%2FEXZoN5RFKFc5AzdSeydOc4FGBD6zQGrDEZW8xP35Pi4M7SXDzyuy6OAZPjxqIMBAnysp4KxwUBUT1ZSGNW1a8wgrX9zAY6pgHNuyf0YQLGpVsbC%2FvmFvnj08mqzcyVRLhtAB4jKMcleWf1a0Ubw8e1IPyA1HfXjKCeHdgCzWn9WkpyLSR4IK2nPSCEUVWQP0jhCgXgES6T7cLolu71RvBnNnCmE0lBe2Mv%2BYUYT9mEOQNIhTXHVMtWeynxMEDeI46FLPSwt4VYQw8B%2BBHXX1RHMLivPotL2g8Q%2Bj8Qvbvs2NDC707vRTyOvb5Ob4uu&X-Amz-Signature=4a03ada710ff6cb5a94ad55790b4f2a1e28cdc90cb3a791178262d8eb215f3f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPY7NL7Z%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIAokzV72%2FmM2Km3Vl%2B2T1W1fRCbtjGTTtSN8HflZHGZxAiAO13%2BkQOKwVmF4qZhJttWPPWp3SKO7V5U5VH91WaUonCr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMF%2FkYKdN6A%2BxmQhJlKtwDiHo6LbuAoJ2%2FhpX1IvEX2d2qOnhwryiqTXkKQHhv7R%2BYxs6w1dzjP3rAzVjJefKgDNfEBaGdjUUEN7US299GH7pwvLPAFsm0zWeHyzaNc%2FyvsxrbPXpMw8Nwt7P0lgbncIWACfs57A7kDddkKRjg6o2VTwwTaxFspAgyndGDi%2BND9VP9GCPB7Oua69CDUqJL4EWHUSi393mN8lXbC%2FishDb5i80wDjsHjzl4RfIeMq3L%2Fm4XINFl8oSlpxIhID4IHiccCd2BAutH9B9SEKtaAjLPwXdt7onhYh%2BEWr%2B8wGXAjqGQS3OjpHPA%2Bj6e7Gz0o%2F41hMBVPw9o794avP0tnJ6ur6OqnvtzXpB6WDrR7rYh9qjj7IWavbChtRla2c93iIh9RGW4NUEca36CzFKKUWOU8Lt1qVEsY7H2EwWhQXvL6YfJZ86zutiKbyzVnTf50hjgnjpcCy%2BZVjWMdgS3WKwmVO%2Fdkc8iWd6im9q37lAUk%2FZxM2%2B7Ux%2BFs5GY4apGDKtw89w5OhHEQatNorVkvUQ5BayBDehjRsWf3%2FEXZoN5RFKFc5AzdSeydOc4FGBD6zQGrDEZW8xP35Pi4M7SXDzyuy6OAZPjxqIMBAnysp4KxwUBUT1ZSGNW1a8wgrX9zAY6pgHNuyf0YQLGpVsbC%2FvmFvnj08mqzcyVRLhtAB4jKMcleWf1a0Ubw8e1IPyA1HfXjKCeHdgCzWn9WkpyLSR4IK2nPSCEUVWQP0jhCgXgES6T7cLolu71RvBnNnCmE0lBe2Mv%2BYUYT9mEOQNIhTXHVMtWeynxMEDeI46FLPSwt4VYQw8B%2BBHXX1RHMLivPotL2g8Q%2Bj8Qvbvs2NDC707vRTyOvb5Ob4uu&X-Amz-Signature=4a03ada710ff6cb5a94ad55790b4f2a1e28cdc90cb3a791178262d8eb215f3f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466377FO4YH%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T212400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQCJ3bMb7HlDiYn6mVZuE5u7BtnIVlwp2GBWA%2BfL70jpmwIgLVf%2FuRkwysBVUY7uJAvJTV1MgcyuEahh274%2BYdW%2BVVoq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDJrFS%2BkeBwDNKz7Z%2BCrcAxDLaOvEwQANoN9dW8tyX0MXnrnbtt%2BUtpgSGxmEKwR7lPbgBW6ibQcIT%2FhcGJxGnWUAgy8QrGrDlKDNG%2BLFUA5fKDS4Q9djrtTYeh1LnknpZzbyUL5itLqOJWwnTak3yjwOoQn2kB20eHq%2BhSr7QxKediuCLtABSunNJuoi3gH9y1TjD3hKY%2BwV33%2FAOzZNhbOTfyyJbsGVqZcq2T7%2BKaoF4xkBxKTWQvBgGOk0dae9NDFAN1osNh4BiQJE6Unf66lvyqXoCMBoxeZXVMB69Rqn4VZxaPwJZZYvcBNJ2d%2FafnNcXjAAPiK2gbtofdTjIG3hYMv69jOwPr7voyBmP%2FmDlpqLCQdPWbmlLhjiSlQvwE8pSXJvBA9HtPD84rBTOy6FGqZujdSUivZemUDMm4tJffJgKx40EVZZNaDosbuBqEnRy0LRvOqD18NXzR3ZqplV8pCOUtFDiqNo4AH3G%2FoWxWjKMyqkuFtKFICo5Nig75osTjNC2nIJoGpdsjJ5OPRG6HuoS0sP5OE%2F%2Bo2yLEyl8r3BF25NalExirqXc%2BgLZCuHx8J9appqn0qbIyt301okaQkUOvx8igv6uWR1g%2BHRx6hKGbhIQEbb2YoWPVwsykEG1fcs7R%2FsnPw5MNa1%2FcwGOqUBP2UZu88apTQj8QyvEo%2FyLZ1QaYXuMpU%2BURqCO54fSuM08RIlNXj%2FO4j8%2FyaLih4CAtiQ4AeaY5Dv%2Fa3PrqkauJ%2Bx3JIODeBT81bcL%2BdMkwJLB%2FNjBNJ68u5WG%2BbeGJBJyi9KHp1fRoE7HbtJwgKqHZaqWXo%2BgTKYvZsE6438Y%2BsbiJCnC0DunIHpEopDQF3qIwLYzbvrMD4hRO2IVr2%2BXDoaZLNB&X-Amz-Signature=afc2000adf58975efe12c6033aef154c585c585e2268d0cee58be64bbe49df88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

