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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KCLW3DB%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T072955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDT7Z%2B16VXEU05Yjrpp4rkmd6cSxygve7JHASWJVVupbQIgN2XCrSBYXgirY64Ws2WEb5%2Fg%2BaJMDHqIo11w6wmO4qkq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDBU%2Fa5E26fNkppJbsyrcAwB7EVSmXKb%2BW9sj35mPd51Q1oT23DMuVbuium1xpnh%2FTy4u%2Fxt1cpacttRYl77eEsN5tolIJlYulvdI674grYXKIgaonT%2BgWCDD9wsKV%2F0OUX5JWq%2BEgzdy3h2Nq1IffkREsqTp5z1MiLl2OoH2LKllgq90LvXujbkVvC04u96P3o3fGA0c1zh23mZN748eaVpuTNGz%2FIPoEVQgwFA2HcGAE7gPe6IPZIfqz3VnZJ7383jmEqbEYIhN4kRBpblJENgRzIBFQPHiav7Dzz602fZpIMzY3XD4OEnbzLsesmVo4np%2BnRvUZqr4q3g3pxOxb1uMUO5Z4wkT7Aj%2F3n06PZ4sD4PhHfQDeSXEw6Hkiwa4kfIDKv4lcFU60xm8S0T7AUBDMZcvh9wJZXM1%2FI%2BhWcKMzErOvGkLFfZes%2BC5mEUBljHjBUettDSocNhSQ9oUUSpsfdWan%2Fz2TMvphOqT%2Bye1kVgrnW6lwvAPlaLZbrCv9oeDgiycuQj7LbPx%2Bk66zzlBdylblaXNjpbYMA1tgeNz6d0Ikrds7AyNbromDsmapHKvIcQaPBK64viKtSX11PPnsOKFkec8mEAOqd5HBbQr97fvPWS3vfI%2FOOyL3SNRxLni57Y710Te2QqIMPXIxcwGOqUB%2BwFr8hbW%2Ffhc7b7bzUEAxx0teUTG23JuKElG8W%2BqwFXM2lohen9MuG%2BGwSDlqc4c4d1wdjfAtzEKUtr3HCYkX4IVDShcGnddv0j4eJv20K471qywyYLJmkpz%2BFvqxF%2Bzd6oOv6dfzLkREKyCiWX5CrfU0h9n%2F6IprVV0VoCyRAgTMudJeh3BGJC8MIunogKOh2zUZEgmdTPPF3iTPApkLce6M%2FeA&X-Amz-Signature=46b77efefab3e7ebcf2aada9939da8c42466e0fff33fa46d46a970b6b2d9c2e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KCLW3DB%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T072955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDT7Z%2B16VXEU05Yjrpp4rkmd6cSxygve7JHASWJVVupbQIgN2XCrSBYXgirY64Ws2WEb5%2Fg%2BaJMDHqIo11w6wmO4qkq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDBU%2Fa5E26fNkppJbsyrcAwB7EVSmXKb%2BW9sj35mPd51Q1oT23DMuVbuium1xpnh%2FTy4u%2Fxt1cpacttRYl77eEsN5tolIJlYulvdI674grYXKIgaonT%2BgWCDD9wsKV%2F0OUX5JWq%2BEgzdy3h2Nq1IffkREsqTp5z1MiLl2OoH2LKllgq90LvXujbkVvC04u96P3o3fGA0c1zh23mZN748eaVpuTNGz%2FIPoEVQgwFA2HcGAE7gPe6IPZIfqz3VnZJ7383jmEqbEYIhN4kRBpblJENgRzIBFQPHiav7Dzz602fZpIMzY3XD4OEnbzLsesmVo4np%2BnRvUZqr4q3g3pxOxb1uMUO5Z4wkT7Aj%2F3n06PZ4sD4PhHfQDeSXEw6Hkiwa4kfIDKv4lcFU60xm8S0T7AUBDMZcvh9wJZXM1%2FI%2BhWcKMzErOvGkLFfZes%2BC5mEUBljHjBUettDSocNhSQ9oUUSpsfdWan%2Fz2TMvphOqT%2Bye1kVgrnW6lwvAPlaLZbrCv9oeDgiycuQj7LbPx%2Bk66zzlBdylblaXNjpbYMA1tgeNz6d0Ikrds7AyNbromDsmapHKvIcQaPBK64viKtSX11PPnsOKFkec8mEAOqd5HBbQr97fvPWS3vfI%2FOOyL3SNRxLni57Y710Te2QqIMPXIxcwGOqUB%2BwFr8hbW%2Ffhc7b7bzUEAxx0teUTG23JuKElG8W%2BqwFXM2lohen9MuG%2BGwSDlqc4c4d1wdjfAtzEKUtr3HCYkX4IVDShcGnddv0j4eJv20K471qywyYLJmkpz%2BFvqxF%2Bzd6oOv6dfzLkREKyCiWX5CrfU0h9n%2F6IprVV0VoCyRAgTMudJeh3BGJC8MIunogKOh2zUZEgmdTPPF3iTPApkLce6M%2FeA&X-Amz-Signature=46b77efefab3e7ebcf2aada9939da8c42466e0fff33fa46d46a970b6b2d9c2e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBKAUV2U%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T072955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQCIDsJjTjNygsaXz9K18PDq90eXBYqkINuN7%2Btn6dst%2FwIgR32E7BRQyJWBHZUhed8RssKXrYXCPOKO86EYD7W3KxAq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDNssbFc6KJf5yhcZVyrcA9BAxo3acKfm2arfYCSgP2F1F%2BflWQzkFvvrUM2F4nx1P0Ek9B5Z%2BhCNoXrBaZ8A%2BMYeMEg0wbNnDOZiYDWPnG%2FsEq4LSr7aIGKdP%2B%2FPyk2AvLOSl4iaUYJXCtj%2BrMZsOaUP3kRB3kssCyf081WC4Zfk%2BMEJy9o5VcQLzYiUDzM83U45ee4Kd%2BwlHYLiRomqMBLBEm1La1YWeHnnHCRCUDLxQO6r0CAOCDCzKhMqdQa4xfnn0Jw%2BFlqHzioOvVAM9RY9QLTzVyY%2FEYWRlmUiLCNXDUfT36xn2dp1fzR2kXHCHqkdWZ2TY5KhdI7DgjTBWAKjXYI%2FXvF%2ByUNT64UfDwFDxf%2FmzGdEGTnPtX4KUjioSkzNE%2Fzgtkq8RL%2FDOcJbag019bwfNx1WzHWxrwXwtNxGTY%2BK3pOphIV2llfnFkwCuY5drpxRA5VFvoGvQFB2G2krDjA79%2BDJk%2FQR5QdhKa1b%2FVrXxEitVC063HBCp9v0JT05AucH5nsRUra%2BWe8nMh1LCGYVV2c4olNHyRZB8sEPnMcbGlzayd2HX9NM6kJVFGVYjhu0q3BRX%2BWXJOqNOUar5pFoINhFVg%2BnVlOMITtztWppzycYd8sri3qU38mUZlXMfHqaZcKvX4FmMK7IxcwGOqUBotJopIPYF5rnV25uk%2FdlXJMIlZRBOP7oh4ds%2Bx53FG5QBQHhG4Y3jywUk4LTknWTSUl7JMBLk37drAIJ61H7f4nacncEmLfTcPAV1pvbOL3zW64TSwJ7DVGAAmIpzfSB%2B9pmmyt2s5RsCIjN9%2BgHuEXFpMjUllVwtlCRWbIDXnipJcsGKvX7EONdMYvtW7e%2BzLpQaNiy0auemBz6YuataUqzTF6x&X-Amz-Signature=8297d8e7235889b7330ebcc2612249c411e57ca78f728da3fd14be026a920d3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YUX4AYV%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T072956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIFNjvty7rLsKRhlYFls9vNmlhGzWM04HIKfFNETSXMJxAiEAg2sid781xlxn%2FYiOvmI3JNN%2FZam5exnnia44W4ZGf6Eq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDCriiBh61WF7xzcB2yrcA%2FEBaUcZOYIuyerGaSuhDZW57gYfaTubAP9t1GEQV1VM25vUxs3TBx8bn4XDvA2EdSjCBPlPnf70YCV7HEW2D%2FEVja1pG51prvx2%2B3IOePJQuNN090Oohw60p62n54aBReQ03UXdzcHz3qIrC5V2%2B%2FiB6QlUPtQXTqOlyYQeln5tHfZij%2B4rGVBZjm%2FNiHugEM5NHqgb6kTLdTKl0Lq4ZOcGwrCvnO4TmiBukDaFANtSYliESs%2FFSvtBHtou6LV2S%2BsOkuVOxEzaSU%2FrmChntiVuDGuwZmDdn%2FWsuZgHidqPYycJsbKa2IPaKkNDZKrCn3jVzMutDb5q6Qed2CzZVChVIweo0yCjva1tnSzdFqcC4Y7Ikcv%2B63p7OphuGoF4yElRXdzNUeOU5d2YRMUC%2Fj2FrYXxnrKnF5d0W0uyKFs%2BFPbvl4bDgVLqBBWU7tc%2BUEOIRrtW7D3U7asdooHOoqnCkdmcl1yw06TWPHdd3hvHiYiy9EF6sklKlBxdphiK2xeuWnDwkG8Dlbi8aIyvHQJ71%2F65J%2FOZgcUUvt%2FqmmpbPpkf2bx2kKaFSQG0RXThFIbSOMbQRXhBsWkramrRe7TaW%2BahNST%2FP7ob591dBguZbysIvUkHeVP54dG8MLTJxcwGOqUBsJxV6J4BNJ8b4Rnd1A5cWg8qAAcWM8pYURrTyyJU%2FSmmWwk6i3f6H4axLlzIJ8pZJkTQkIBZHn%2BiwBaW5PMNIO9aRhVULUxgdezzxtOsQQ5viPNMcYGmYQDUEQT9CaWjQgqEjFMtiiqNq6i1OzV0HPB7%2B9%2FcH%2FgWzrx%2FWvq8hLvQ1GzQ7rfoQoQZnUqxN5FX7yitgOD5Fia8HycmIuFKzzbqN8pO&X-Amz-Signature=fe20e233311e96ba4063839f3098d72cc9498605fcf582dc6258eaea05eef7c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YUX4AYV%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T072956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIFNjvty7rLsKRhlYFls9vNmlhGzWM04HIKfFNETSXMJxAiEAg2sid781xlxn%2FYiOvmI3JNN%2FZam5exnnia44W4ZGf6Eq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDCriiBh61WF7xzcB2yrcA%2FEBaUcZOYIuyerGaSuhDZW57gYfaTubAP9t1GEQV1VM25vUxs3TBx8bn4XDvA2EdSjCBPlPnf70YCV7HEW2D%2FEVja1pG51prvx2%2B3IOePJQuNN090Oohw60p62n54aBReQ03UXdzcHz3qIrC5V2%2B%2FiB6QlUPtQXTqOlyYQeln5tHfZij%2B4rGVBZjm%2FNiHugEM5NHqgb6kTLdTKl0Lq4ZOcGwrCvnO4TmiBukDaFANtSYliESs%2FFSvtBHtou6LV2S%2BsOkuVOxEzaSU%2FrmChntiVuDGuwZmDdn%2FWsuZgHidqPYycJsbKa2IPaKkNDZKrCn3jVzMutDb5q6Qed2CzZVChVIweo0yCjva1tnSzdFqcC4Y7Ikcv%2B63p7OphuGoF4yElRXdzNUeOU5d2YRMUC%2Fj2FrYXxnrKnF5d0W0uyKFs%2BFPbvl4bDgVLqBBWU7tc%2BUEOIRrtW7D3U7asdooHOoqnCkdmcl1yw06TWPHdd3hvHiYiy9EF6sklKlBxdphiK2xeuWnDwkG8Dlbi8aIyvHQJ71%2F65J%2FOZgcUUvt%2FqmmpbPpkf2bx2kKaFSQG0RXThFIbSOMbQRXhBsWkramrRe7TaW%2BahNST%2FP7ob591dBguZbysIvUkHeVP54dG8MLTJxcwGOqUBsJxV6J4BNJ8b4Rnd1A5cWg8qAAcWM8pYURrTyyJU%2FSmmWwk6i3f6H4axLlzIJ8pZJkTQkIBZHn%2BiwBaW5PMNIO9aRhVULUxgdezzxtOsQQ5viPNMcYGmYQDUEQT9CaWjQgqEjFMtiiqNq6i1OzV0HPB7%2B9%2FcH%2FgWzrx%2FWvq8hLvQ1GzQ7rfoQoQZnUqxN5FX7yitgOD5Fia8HycmIuFKzzbqN8pO&X-Amz-Signature=14516f003ac954c2e0778deae685dfa1a376f32b9f28468f2b391b42218f41a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZFJR5ZO%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T072957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQD3IyYCfkCe33xAmGa0MFJSoCOw0br%2Bawrp2SwEWn4NmQIgbmvs6%2FiPLApvY2VRFmNggguFm6%2BQ8LWqpsomTEN5aDAq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDD4VherviBK1LR%2F10ircA9mtcBqS5viR2hSPwPNPA40P3Lra2%2BdMjEVrS%2FQau3f5cmA1IFlywcbUnkO8RCe76hVtHomssUUEWvnh5w4kJo7bvYT0vF8HWN%2FI8UJemmdMA4qQD4vmPYacuz0SWrdPBvMMJRvitZKXbb%2BeRUs0ODeBzCOL0pd5S9yjZJK0092puGah5y8OO3dbNdjNiFAmANiOU1K7SwkeVVCE9B5N9p0tCYMSuQLOe2DjhOgRq9esw5LGkaL0ltEX7%2FRh%2FjnT0ycqYH%2F50lSS%2F2sA2X%2BTiEmrx9rUzd5pDi9EMeOsNaGliy5h1NhbTSn7sqDP5Ng631xuPTNU4swGRvKrBcpkbpSIn%2FTqT1YxHxDoncPCMxTujtkqHxLci24swPBzQ3gfnLxWIPDegIjcFID%2BtF4jrU8BLdKmuHArFN7zGBGq2ucIKGK8vjZYugeUGziqIskaipcFWj6CvfLL9JV9ZBA2nTZhmITHdcCGNjx8KTDJnT4KMIQKwID%2BtsI%2B80mEdwDTFGDMX1HBogRYF%2BCTy2hS6Ynd5HbAedabtCNZ4MZC%2FkYX3WNKRR%2Bm2ha3Td30CSCQiT5yTT9Mttb1AsnVUi%2FwfrPbcy9AHDBS%2BPLGeir7eUzLEIWHNwx30gsu%2FNF3MJ3JxcwGOqUBScYuUw23beCe%2B5%2BERCfdSbP3R9%2B0FL3u2AxsAzx8jwP%2Fj8OhkqRvucXAZjuDrXhf%2BmUc9BwVsdIO437gV1kSUwOFsowSjYrND8n4NFERK05NfoLw65xHivDCi%2FItvisS3RyMVsiPiytIx2%2Fn1AozX86Kbw%2FaSwu0VgAiyKIrEhPi2%2BfB1jF%2F6s7b%2BMy5jFJfziOo6un6%2FzeGyDrIj2OuspYCMbRW&X-Amz-Signature=7037e8728d09f36c189c8c75279dc98628e2f43982d4497a640bc8518930134c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XILNDGT7%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T072957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQCHJqqRq9f39A2as7ESZaEO2njgYPawNHykhzU5dkWwbAIgDmFzNz69%2FknSfsWPL7DJLLcRDKnvkM5I9A1tgUbWwYwq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDIzDJ1zcPt%2FhRvDWQyrcA8%2BmhmNJa%2Fiq2zoV3Bg70iVoVy5KNuX8Ozi9kGL1Z6dSyA9puXfI8w18dKuCqgWp4ODrEmpLajw5DkxqRXGVpk%2FOsgN4Tiu5BDupCcbXXTuzcVKrgetMX2K1t58US6P0tAV%2BLDBgv2oi%2FNrZhQJXBYnFlfpRrjBMnaneegfuyW9k11VeBnObQ7pPCxVca4AUpr9cqK2yWonCRgfqiLxY7nDLWLgPVM%2BtzI8euxcZlxu8OjOPT2rAr8Z1aNmCy247glb1hxuf7vwPmLg7HU1dZ6n28XkGj%2FjTHq39q9g6zw4OOD7gLQKehza%2Fd48MrJI8mRfoJshlpa0712NF9mNUyh3CLuzw3jNtoL9u3O%2B7xTjW9bqTEyJMzNfaTyMP9JXPWZr7VzjcigOuN9cnv%2BAxSIlrWtBkuDDeu%2Fi5CT3sZ%2FJj29i6uqC3xH2qS49OHZHx2SbgSzjmgjfsmGYsK2ymBXAnfvj%2Bn%2BsZQ1sH6Hf3hVY%2FtT4UhmDCoJMrZ19VsflAWHzLCPoZKHK2GtuXH6KV%2Fx0QTYea2q4GybnZu6BOltIoqt%2B3yGEVYsfZcsHiECHyVCnf6G0VWb2XolS%2Bt55j4szJASwVEbeDC%2FCCoW4buV5F9G8ifFWe%2BGwnWyLWMLLIxcwGOqUBknqMtqi1YASJaVumFORYoK3ZF6AiDrIsqUg7IxnYoHHE%2BvIqiXbV%2FepYAxIdgnALRVloBSexkdVG70LUCkXMzPrx5pCZJZbOkuVjmngMTMqq7SZFK7m3AfrKTqHsnsw65FkrKotvMbpWVl%2BTxa8ct64DVFnPftECRReTl8E152NWxS6z8rD524IxQwKejueADsw%2BRdUec6pQxVva17OH%2FAbgz86Y&X-Amz-Signature=65e8a9709ef196baae26ffaace45bf65b20d89c0c426fae3df9b4be83ae963c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFAPA4CM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T072958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIGO0wjG7M6x4xZGOPTXJGiDdFphdLBJ2j4ODGmnht4GpAiAKNd4V08viEZfjZl%2FveJk%2FCFfGA%2FOnGmMi%2BqfTBC9bSyr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMaAIsg8IfPmtCTjJEKtwDbl8QuUwSZpeEl2TY6djZpYlBL%2Fvg96KtE7SNfgKXClvIUDZsdpkITMmiT8SppJfDTqHea5p7Mp0EQy9z8NNGVmk8qWAuLMHRFJqEMBC1wk2toV%2BbeXTjGUS83%2FQiXZlaB8UboW8Dp4IDrwq3Ce4qaVdxkpIScGoR2lTg3AowkkR2QL4PHRbOvz%2Bx8qH7j1lNxf4CfqzLnqqDjCFirNaC3VkTwO7exGgBP0tRiJL7utRH6ZpC1YcF6RT5nvzgIA7jnBVnN3%2BvrWSdGAJGq9UkEXteg9M7iX1GlIB9RrHZaTTW%2F31z7%2B7H%2F%2Bt5xNU1UZIXW4iIQcuutBgdens96t1y1NxkG0WmG53oXnB58Kbmb76mIKjC%2BjljhzuLVmHuPfaaLbyd1xYwW%2FKRtaetdpbKZyaS5LadUGnfH8d5MMVtxc94lFiqLqwARW%2F13MTf%2B3MN80UCnk653%2BnMm6nnmHCjjL9cE7HUpBJupqt7izUJo%2FTfJucjUeGhL1nKMRTbuT7b0KYfYEod7EDVuIgYQ8l%2FxRnn6utLjL3TPdROFRIkZi907b%2FEhqfXpmyas6yvgZMUjK2Mqdf8nC%2FrpkvZfE9agCFw01TtO6g8%2Buqi45zkKnf%2BBd2w9nfiOAS6SV0wtMjFzAY6pgFvE9TSABOGZdVhClxGWuSvMB1ZYjxovwyoadeuMoO6wrD3FtZ8xQ%2Fc0QT%2BqYiXx5XASjuhpW0meBTM7TEXYFf90lLszZ6ENuuUN5ovEd5NDsRE65B046vxIRrctNXaIbWuu%2FGn9shDJZY3I0qk%2FqCGJSU7fTT7UNmJqobfcii7dNX%2FpHTTKg0HkX90YEy7zWCj6qeyOdZIxL4QGRHMmnAW%2BeoONCxB&X-Amz-Signature=26101f9a7bd73a97123446ec9e4ccacaebc449308bed53c290990bac283b3397&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZW7UFRJI%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T073004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQC6rE2%2FFrQCt6PyD5LPSwDQ0ogSkOPfqMSJEoCQHyYWjQIhANPbTwar2ApbhoVbjGbkgNTDb%2BrL4Kxnz2r5v3EDIFp7Kv8DCBcQABoMNjM3NDIzMTgzODA1Igzx1McfGZIES1JWy%2Bgq3ANgDYArYa2ExHd4z1I8lYm9kDNG7JS9%2BT2jzfKOPARMDnZ2dhIc5rJ3Sr2OwY2dnqfR7u55oXF3tl2dJSo9K0KNVVfU0CxpOeEAgXqyFY6B9WuX4BFpdrzP79WT8Fjrcpt2gRRLazJgKcB6nuPNr89MjNuHsSAoPew7Z7uoI2kMon85no%2BKZCyB%2FeKpIfa%2Bw82ZDE6UTXHpEqinmHaITNUyclntBvBKuT1Hp7S8FzS0lmnJRnJwUZu1TWJGq5VN9%2FHmC4gMmetXWRfi771PA6ZJHaD8TLhOiIYKVz%2BXs2X%2FYlbRLJQgHK6BeS7hlxrg50LLJFw5BA4oPJuGaw8lMg1cPD9Y2ijg%2FerfpW%2BbPFszOR9jXOe75ujLg12N7B2xRyByeVto64Gi4e3b2UKDxH8YIZNBNNXBnR3tESixH1H4oLKR4JJV%2FQzGfZcdKOqwDACWKOKrXnx74TzWnt2lrPO5%2BIUoGQI5i8uL8BsmdBKWzQmgSkqhaz5SLnZKX89AP5RClSknFDOr2yMszTNM2GDMhqE7btcK7u9stA7LGKxfdmWmGvLETbGM4PfaDd3%2BcQu1tvZOeaVy0IChTFCksvMnwSSNJVbYmWTzJVMMm2vtAnSyv8EWq%2FxqWbHQhTCWycXMBjqkAb5E6A4RtTZyNcOG8lqdJoMVj662hkTrHu8xL%2Bya1QJ3t0A%2F4%2BBESrId8UYIAQ0Ra%2F7t1DCpVnBxj69tY%2Bstz878Z%2Fupqm%2ByAkXkRnUyT21ZHXxblhrZDtbBR8PwYMfIgh%2BVU27uHcJuzyYnCeZ8vorYM2lLYJaVGCDxxvHnjNp11dCIXICGlFIjjsW1BEhFBL%2BTCT9OHDEwyCIe7w9eTmbWj6tE&X-Amz-Signature=19ebe4cc8bc5f4e6751eb6aa4ef2acb305baa998a7c5b4672d41b7b1e2490135&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZW7UFRJI%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T073004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQC6rE2%2FFrQCt6PyD5LPSwDQ0ogSkOPfqMSJEoCQHyYWjQIhANPbTwar2ApbhoVbjGbkgNTDb%2BrL4Kxnz2r5v3EDIFp7Kv8DCBcQABoMNjM3NDIzMTgzODA1Igzx1McfGZIES1JWy%2Bgq3ANgDYArYa2ExHd4z1I8lYm9kDNG7JS9%2BT2jzfKOPARMDnZ2dhIc5rJ3Sr2OwY2dnqfR7u55oXF3tl2dJSo9K0KNVVfU0CxpOeEAgXqyFY6B9WuX4BFpdrzP79WT8Fjrcpt2gRRLazJgKcB6nuPNr89MjNuHsSAoPew7Z7uoI2kMon85no%2BKZCyB%2FeKpIfa%2Bw82ZDE6UTXHpEqinmHaITNUyclntBvBKuT1Hp7S8FzS0lmnJRnJwUZu1TWJGq5VN9%2FHmC4gMmetXWRfi771PA6ZJHaD8TLhOiIYKVz%2BXs2X%2FYlbRLJQgHK6BeS7hlxrg50LLJFw5BA4oPJuGaw8lMg1cPD9Y2ijg%2FerfpW%2BbPFszOR9jXOe75ujLg12N7B2xRyByeVto64Gi4e3b2UKDxH8YIZNBNNXBnR3tESixH1H4oLKR4JJV%2FQzGfZcdKOqwDACWKOKrXnx74TzWnt2lrPO5%2BIUoGQI5i8uL8BsmdBKWzQmgSkqhaz5SLnZKX89AP5RClSknFDOr2yMszTNM2GDMhqE7btcK7u9stA7LGKxfdmWmGvLETbGM4PfaDd3%2BcQu1tvZOeaVy0IChTFCksvMnwSSNJVbYmWTzJVMMm2vtAnSyv8EWq%2FxqWbHQhTCWycXMBjqkAb5E6A4RtTZyNcOG8lqdJoMVj662hkTrHu8xL%2Bya1QJ3t0A%2F4%2BBESrId8UYIAQ0Ra%2F7t1DCpVnBxj69tY%2Bstz878Z%2Fupqm%2ByAkXkRnUyT21ZHXxblhrZDtbBR8PwYMfIgh%2BVU27uHcJuzyYnCeZ8vorYM2lLYJaVGCDxxvHnjNp11dCIXICGlFIjjsW1BEhFBL%2BTCT9OHDEwyCIe7w9eTmbWj6tE&X-Amz-Signature=47c3647e376c85aa6f37d3850469931c5bc2d49bd1efb5adf486b361a954ffb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBVUMU77%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T072951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCICqfze7Dqfva7BdYBJyO5haScTOw6KGVkmnGTUzhEm3pAiA1uCfEgGAYq%2FoVUsHyBoFEVXaixAiG5h%2FxJ6qTVXlAMSr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMKWk%2F9L4j1ErLHIvvKtwDzazQOnFZz4lazbsUwiO%2BIty0ilAf06aeI28b0DYphxR7DjvRFJ472QOaNQ83d%2BMGYhwhqNPmA8sRmw9BkWdn%2BJzOqWAq%2FdliS%2BWz7APlUG3%2Fps9K813710ow4LVhbSmAb%2BZa7pyOOhf3hN5cryQCscGJcOv0qfnbkKLobiI5OTY4Ods5zro%2BlRR8i5hi6oLMr4QBjrsMjargzxdYsDqYqYgdgwEAGqLLgRk7NWrEsS9FMtz1JMrgsD34dPUGUtznQo%2Bapr3tqSCy850YkoiUDGZ0V%2FhWStOMeme2epKNwl8YKk2zorSr2jiVEyzHqSgkNrvLL29mRgHKJnPrGgJlQBf71bhUJW3PHmyAuCTNSTwXlm6PR6rFau2lM8zBJTAGBsIWrTVa6JUWND3QY2jDiTghIYK%2BZaxqdo5nFyzERAL0IpfUZda0BM%2Bm2s7tMWmQkiTuO2kwypfS6ygqOYF81jKq1GjoQHaezJdLeiHR25Q5c3kIXECqmxB51gw4%2BT3pZ6M%2F3V0HYXWKo6Dg0L5vr0yKGot9gbURezmAs3hn20uW4BGsNatKD2oeSQP%2Fs39t5IBO4umWhpIrW91Qu2QmvhZu2Qg0UB1KzPgPEKqfQglHkoZ8LDhQb0%2B%2BMawwh8nFzAY6pgGbZvKbQ43ayCjscvIpnyoh9xHGIfbAgAX9OPf9zq4fZFa9gtQan0czw9dfG7EnVdbIcUhJiRd7d0P8tfdUo4D9hjr4OfwiRvoqwRQ%2F6YVe9Fm1xJtzybHvW4iT%2Bc67qfHzM8ylt%2F2u5ezb0NUIzydAgozyVc7Sz%2BvA0w78yLqETq8Z27DOB1bvGi8PZ0wBsLSM4dEkOlIDYJUPxlHT6g6bsP6p81il&X-Amz-Signature=e860e33afe2c0ccbe0bc91f52d5283473dc94ef354b62ac34faec65184935e61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHTLM2ND%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T073008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQDUtTL%2Bem84GWd5GoUW5E5M4cAVq33KrReGKKhWqDKwXQIhAKiHH1%2FXU%2BhRrhEbd9I37ty3vUd6em8jeQNDvKauWs2dKv8DCBcQABoMNjM3NDIzMTgzODA1IgySqAO9SleSqwOiuxsq3AOu0BGgjGTXPfgHKfVUNVx7ArdTQSzu6iEcKQnMdgYj4fBH7tNHZN7ZXb4f9r4haWvf6%2Fyz1CSNgTI7om23L3VmI24uXLYiBxmODBpzTp2yHnyev5mUsedg59SOfHDa67aWUPkoleOZ%2BfqmYIZjJ8a4nmFPk7ijYVb9BmMKsAGjC1WDaWoqtBGwLKJfWySuIhwQuHNt9RQsHW5WzBAmh207Udk3%2Btzf3U0FEWDt4QLCBGAS1hc4aq4OclTjFjiayNFCDAMHXt2QcziMYGVpIOiqT%2BUoNkLW0ctTutj%2F8aGnHk7u4yKuAT787bvgvwUYkpK2KdYuTDYxFzeBpa7I5uaB9ytXxoXkux1N53uIRoB3gT5DFBJCHs%2BA5h3vH0op2I40K1VTU%2BxPmo6iL986kDXS5K6V23PGgPgNMfg9D1j3o86ps8bapdEWEuzhwpX4fMN6HQr8yRN4VeH5gLN%2FeYVhiJpaJwv7qA0QPEFBYxTbYp%2FxH%2FQ%2FiZTHgahZICnH8w4D%2BeZWa4F9wnlIBKDZN09bAE6W84eRyUuB8BfXj5vO%2BlIFvx5fLVKQDeyQsgrgNdP0YQ5YdJcsxmYfqUWuYQiW6RaHHX3nkyCwLrT7kSMVXZQ%2BrZ9IRCsrmDozUjCTycXMBjqkAauyE6GFiIRR%2BRSyqIpf42K7ko7D%2Bv%2FCMlMuDIIULRtqTsUdKh7lC%2Bnptn6tSNOJWfg4bxgBk8uKsaXOle88A6RBrIeJTaICS7oIDMl8neo0hLdRYPLDzlhbnVWDZ85vPtM0LN%2FIYDQ%2FaKegNAgWN%2Bsqe1K97Y6zcebmY5JPM7xFIH%2FahWj7jNQvUH%2Fsa0v4bQBgJKSzF7K17DScskdZcvhCaZKd&X-Amz-Signature=6565272030c53204e54d16fae9c0a2ace8a96a08c33adaa37d0ff40cc8ed6231&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHTLM2ND%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T073008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQDUtTL%2Bem84GWd5GoUW5E5M4cAVq33KrReGKKhWqDKwXQIhAKiHH1%2FXU%2BhRrhEbd9I37ty3vUd6em8jeQNDvKauWs2dKv8DCBcQABoMNjM3NDIzMTgzODA1IgySqAO9SleSqwOiuxsq3AOu0BGgjGTXPfgHKfVUNVx7ArdTQSzu6iEcKQnMdgYj4fBH7tNHZN7ZXb4f9r4haWvf6%2Fyz1CSNgTI7om23L3VmI24uXLYiBxmODBpzTp2yHnyev5mUsedg59SOfHDa67aWUPkoleOZ%2BfqmYIZjJ8a4nmFPk7ijYVb9BmMKsAGjC1WDaWoqtBGwLKJfWySuIhwQuHNt9RQsHW5WzBAmh207Udk3%2Btzf3U0FEWDt4QLCBGAS1hc4aq4OclTjFjiayNFCDAMHXt2QcziMYGVpIOiqT%2BUoNkLW0ctTutj%2F8aGnHk7u4yKuAT787bvgvwUYkpK2KdYuTDYxFzeBpa7I5uaB9ytXxoXkux1N53uIRoB3gT5DFBJCHs%2BA5h3vH0op2I40K1VTU%2BxPmo6iL986kDXS5K6V23PGgPgNMfg9D1j3o86ps8bapdEWEuzhwpX4fMN6HQr8yRN4VeH5gLN%2FeYVhiJpaJwv7qA0QPEFBYxTbYp%2FxH%2FQ%2FiZTHgahZICnH8w4D%2BeZWa4F9wnlIBKDZN09bAE6W84eRyUuB8BfXj5vO%2BlIFvx5fLVKQDeyQsgrgNdP0YQ5YdJcsxmYfqUWuYQiW6RaHHX3nkyCwLrT7kSMVXZQ%2BrZ9IRCsrmDozUjCTycXMBjqkAauyE6GFiIRR%2BRSyqIpf42K7ko7D%2Bv%2FCMlMuDIIULRtqTsUdKh7lC%2Bnptn6tSNOJWfg4bxgBk8uKsaXOle88A6RBrIeJTaICS7oIDMl8neo0hLdRYPLDzlhbnVWDZ85vPtM0LN%2FIYDQ%2FaKegNAgWN%2Bsqe1K97Y6zcebmY5JPM7xFIH%2FahWj7jNQvUH%2Fsa0v4bQBgJKSzF7K17DScskdZcvhCaZKd&X-Amz-Signature=6565272030c53204e54d16fae9c0a2ace8a96a08c33adaa37d0ff40cc8ed6231&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2XPV57S%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T073008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIEzKIzSCCC4zt2E2qzknd2dy1KwicoBD0R5f%2BRc7nQK9AiEAgsPZFNC2ggGnU4GYXHHHVRjBYowu2MAXvSLjb3AeDy4q%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDKRG3%2FELX8TMtzDsMSrcA73kNVBI2MSB7P0ATU7DOuPV6pgxEKMsqG3QrjtNv9NDEHT98pRABg8dlijAYzr3T0J6Rxj4JJb4DKBac6N0XZo10StMkGt5HujkzvDWenDaveZq4vch%2F75zOcOaAUgg8tI8cdSjBvR0TjqUAjx2Tt0En9c1OAHNidFYSBWeVoR2ruCKfGOAagz0oWfwim5v%2BkQzAFEcJIxt0PvCaR02GNN5O0QvxQHehBVh0OSlpg4oF0FJJHOgjKjcwBlWOey7OTsVTLy1%2FgXE60fsb%2FQYTt8j%2FbBsVE1gnYWYiBCfwu51vFB0UkHIBk4l3H7yfe12Dxr0sWuSZ2%2B9skC%2BVhuVWm2DfszVtToDs%2BB%2Bw%2B1Vd1JMx4s8vGbn7noXkGXYg8fes32OOHAfegkvzYyjj7SCLKKIp1fnTHm3iS3nGO3TsDNH%2BrizQRV1cT7BPgzKz27AouqBnG3qqsSAVtt0eZIrY6vQ%2F7Us2M33Do4c8C0mLw7pndwgOsLQE6IANPEBzGJged7BaxRXpXXQNfsi0HHljjVienyhpzEa9NodcAVnDUBkClJVWuAWLxxDRSLsm5Yw%2B1ATmzSYRDgrIXgbPoF5KWunRETEcB%2Bn66XKRW5FJixuvRe5xkv8J%2BJppjxLMJ3JxcwGOqUBcWv5K%2FSlKStPXANEHbJUz76XHAq8C8VrL4a7iL9I5O%2FNgo1%2BEB3gSps65fKRPNxKtJjElpJpk0yBqiYK1%2FN3fxjQwVK6cs6PT3MoLVLYToM6MnH21IL14GFJ2RO4Uoyx%2BRu4jHXyZO%2FVQa2%2Fzdo6s0fmG0sP5tzA%2FwJ83%2B0qtbBhwOpohQuU%2FZgfVAk0iz%2FqraQaNUg%2BwnVIvefxQHkDmTniuuam&X-Amz-Signature=f5c801981bffc039c7daf3919c3d3677ae482b235c472fe34a4f4a3777c475b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

