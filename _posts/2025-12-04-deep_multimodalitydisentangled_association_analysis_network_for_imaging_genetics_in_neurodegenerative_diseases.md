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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MWDUEJD%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCPlZdRbazo%2FtGKCfpQvkI88t0O7Ce4IRRNNRArsxZqlgIgFNI0ltMHoyVd0ZBm2lOvhXG7BMzmCfNC6%2F%2BXuw4qVSwq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDPQKwZUyHCkYjnOglSrcA44A9c4N1eZPVp5B4G4kVy8MzIrALDligop%2FlcIBknfHxdIzEbildvbGdRnlCp4bdWjOmOBjTBWrcdaxifsfY0v32QzHf3uRKbUvOpB6UL555%2BfGjWvZHCr7rkbs8vlH2vjYOpf9OK1ImI5p4J3r7ksvuAMc745XcSKm0nsSxDGhr9PKIAjnMIDRYGoJ9PHjDWBpF2chkqHmLiUUv3956CNUqksTBYCJW8aoFtOnv7CGGg9FxEaPmRm8wQ4o0DhCOqzpGyjplMbQ4LHG%2BGGwNt0IyLBpxD8pWpnb%2BW6lQPMehQaF%2BZEOxLb%2B%2BPk%2FkN28C4m5zlrShD5SULcoc3PqohaqAblREZWAx8cohlABDmDfWZxGZXrtSnLKb56zjZSzEcFMgFuSsOjvSgA1oNANGZEPoMzIKoog4MBoWrDm0uU%2FN68XuEF8Glghj5iNZ5LuaIsDQfKeOavAIQgtfyZ3CHVKfzCYzsu6HZfoWlO3w3UB6rAB63AfmFh2DST%2BolQFKc6ODSkAidCg5JBpqhgG%2FkM9gqpT1RP13dQ9dipEYJcO8ShpnQmxxc0ZxlrtDqHBGoE46FxkbUunOgYWW0n0kosKqtAL50%2FXJP%2B7RYVsOGwHBiXXri0xb9UevVKAMLSTxM0GOqUBijd%2F5qOcWG9hLRuL4gdEdeJY81F5UT4K5pnftb%2B8xI9ddUqBtugvuwT6tvMKBW%2FxW8%2BIsfMlrEhOHH3tJohDtyDggC0Dp1bDNohdluL%2FRc4CWyq9CsRT4gIKEEFsbhgWCmbvPO%2FFD3dr7mPEyhm8StCiwTVbNSC0PBavzqhU3fo4AbIHCw0x4WiwOFdCnf6W%2BPk%2BRXEe2l%2FAxZ7K9wtT2%2FXVabJ2&X-Amz-Signature=17dd53a335d248660df62b1c30993cfffb3d0503be98e76803468defb6ef535b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MWDUEJD%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCPlZdRbazo%2FtGKCfpQvkI88t0O7Ce4IRRNNRArsxZqlgIgFNI0ltMHoyVd0ZBm2lOvhXG7BMzmCfNC6%2F%2BXuw4qVSwq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDPQKwZUyHCkYjnOglSrcA44A9c4N1eZPVp5B4G4kVy8MzIrALDligop%2FlcIBknfHxdIzEbildvbGdRnlCp4bdWjOmOBjTBWrcdaxifsfY0v32QzHf3uRKbUvOpB6UL555%2BfGjWvZHCr7rkbs8vlH2vjYOpf9OK1ImI5p4J3r7ksvuAMc745XcSKm0nsSxDGhr9PKIAjnMIDRYGoJ9PHjDWBpF2chkqHmLiUUv3956CNUqksTBYCJW8aoFtOnv7CGGg9FxEaPmRm8wQ4o0DhCOqzpGyjplMbQ4LHG%2BGGwNt0IyLBpxD8pWpnb%2BW6lQPMehQaF%2BZEOxLb%2B%2BPk%2FkN28C4m5zlrShD5SULcoc3PqohaqAblREZWAx8cohlABDmDfWZxGZXrtSnLKb56zjZSzEcFMgFuSsOjvSgA1oNANGZEPoMzIKoog4MBoWrDm0uU%2FN68XuEF8Glghj5iNZ5LuaIsDQfKeOavAIQgtfyZ3CHVKfzCYzsu6HZfoWlO3w3UB6rAB63AfmFh2DST%2BolQFKc6ODSkAidCg5JBpqhgG%2FkM9gqpT1RP13dQ9dipEYJcO8ShpnQmxxc0ZxlrtDqHBGoE46FxkbUunOgYWW0n0kosKqtAL50%2FXJP%2B7RYVsOGwHBiXXri0xb9UevVKAMLSTxM0GOqUBijd%2F5qOcWG9hLRuL4gdEdeJY81F5UT4K5pnftb%2B8xI9ddUqBtugvuwT6tvMKBW%2FxW8%2BIsfMlrEhOHH3tJohDtyDggC0Dp1bDNohdluL%2FRc4CWyq9CsRT4gIKEEFsbhgWCmbvPO%2FFD3dr7mPEyhm8StCiwTVbNSC0PBavzqhU3fo4AbIHCw0x4WiwOFdCnf6W%2BPk%2BRXEe2l%2FAxZ7K9wtT2%2FXVabJ2&X-Amz-Signature=17dd53a335d248660df62b1c30993cfffb3d0503be98e76803468defb6ef535b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UILGQ2NQ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCgzh5nZRrO4SrjVtYsNVAPXS0Mj6H15SHWJHf0HEWmsgIgZc05jJfIZQcAcAy2ipWKx2nJsYuk4zx3geCEhjA1iqQq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDPpZ1lf4cO4qNyDVTSrcAy2Zv9qvOso93B8%2BsZ2yEC1DEkSuTwZ9M33BcofSshNhjn9Ew2v3ToAWYxnVx7tK1rV%2FPoFRjCBKNr9Rf5sFAhJn87eCE9p59yisjySGenE%2FtJOSCOjky1dOc4OKAXWFPJv77lw61Go3%2Ft0t%2Fz%2FQflC7ol58b0LCI2Ppm1aUdItrXypNH0gk1aIW3t7LXK0toKovnx%2FhL82GHQ%2FfgQoRcscRRz%2BYLYzv%2Fq40xhHeBhuf0SeVQzSg0QJwEUQnitRAPu%2FQ5U0nfrl6ClZ98rQmWju2JX%2BxrD%2B3ivRNabtMv0JTcezYqlXT7VTBL%2Fgu1BKIP5qAogww00kpku5zOgRhSAc3TNvpHhaGP173nuLdrl29i57Xat5E6fkZg59f01XDhy0lL%2B36bnvhel620yGTpxV7RGhF4MrgY9GIQIEHKOM7DYNJY8KCQEx9KSUuCSYoo4PcTUVv18r92ECJaiwOHF4uu6WfWBCGzm1dsTvmgBP4umhR05nsgsoQoCs3Qeq6NZgbsPlf7Enp7qftW3%2Bn4BBSThSzHl3jzWsienqA6qS%2FgGzAKSQOLlmhWW8RSi9RwiRnIY%2BDJ936Fc6YkceBp7qX8HF%2Fzq7CYcUTC%2FmJuyulhKnP6SSqiix2mdgSMOyTxM0GOqUBDid11OLZh9EGq6LMUBUn7TZ%2BykUcn14KQqMi%2FIK8fnIaeBUXkTuf5QWsTYAzDbNiCV03plLy9XsxQGcdLfjS9rZL9Gb6H9EgdDT5Nx4Hyv91QNJw9xnOG7pkGUVfWXG853fHGr%2B5KkvyA3wy6da0Mdr3VoGMe2cvcih4TF7Y4rPRKDWr35sPe5q9SxFMK84zwl3i94tPgg5dVa17QoN0ByyKkZCR&X-Amz-Signature=41d2cc454027d6bc20b0770e13f83c5e7983b71f416d3f95a32a2d5e2d9812f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5ZIG2OQ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFtA0EPnmJqQlKMwoTnroC2fHhKgc4R%2B9wz9IIwrHSSMAiAnyiT3ZuRuZjpk8z4qEbumAMuLjqnj1PVGcgwgmgY7qir%2FAwhXEAAaDDYzNzQyMzE4MzgwNSIMGwCv0qjlBsPwyzJzKtwDBBAXaXyzfzFoDGq3ziXBcTSoM7junvyTzOuqxQHRwADnwUpbW79f0jY2ndRDC5chfqBYdqq3r2tQTuwCavRoGv1EcIeYjANrjLNYa8r1ZrM9yXyaijONptFAmEfQ2%2Fxkp70QCCWU3yFhiaV29E%2FWSh0SR5xiy66HFVSTqmgBb9YdPHPc5xDcUj0YrPjk86R6hiqYkj%2F2FDIbR5EAttpgat9E6KUBQRVRPysl9JaCe7Fjs%2FzUG02onguuORHy%2F3qWrmWlmKD06amORi9tx%2BgZ0LOjJv6FlFQbKoUEcydT68YjRLJd0xWlhDusZAmXiTvPebVLDM7ebMSlfLAnlTllMs2V1C160VS6Zkjt5PMo5jLcHYmXveZd5jLllV4OZf62WXDgbW%2Ftj86XaFdBh96urWzbNrFGMEj5U2xGYO3Rr0lxxX%2FK5BxMFMQMT7TWJkflrH5HSOBBUil%2BfpmZ02MEsc9n3IQqTaYQk5gALsvYgdhUtDHOJaGRk1gcLHK%2B6C5mFeiE0vr98gYXeCvRTOOvntkoRHGM5L3KPeNM30NckWpVCK0qR%2FL6bOEjLbNNijolTInjYY52zN7iAT%2BPaztRIrFpVHbqPc3U7TsGo9Lm38KIIlNVBPN2bOgZ8G0w7pLEzQY6pgEMdvznkMWA2eycPGr93kIE9jVMepyx2HVaF9ympLUc92Kbh78PP%2FnQyQVun0Gon%2FxmYw3%2BD6e%2Bgw8Df%2F1EcO61e%2BPH%2BJVJ2N0gl9adeRItHlDpesjPSElpVKquYRD7PXJE6P8JpjhPzb03jkLtpIN4Qd%2BIsZVwoufGJMeJ5lCLqW%2B252yBX2svFbihORaGqWw2Y28YPbslKu48fnKL0TrHNnScy8Gs&X-Amz-Signature=4ae80ce07e88f312037098d6c9fe24c2398b41ccc97367d77ad1fa3dbdc46d81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5ZIG2OQ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFtA0EPnmJqQlKMwoTnroC2fHhKgc4R%2B9wz9IIwrHSSMAiAnyiT3ZuRuZjpk8z4qEbumAMuLjqnj1PVGcgwgmgY7qir%2FAwhXEAAaDDYzNzQyMzE4MzgwNSIMGwCv0qjlBsPwyzJzKtwDBBAXaXyzfzFoDGq3ziXBcTSoM7junvyTzOuqxQHRwADnwUpbW79f0jY2ndRDC5chfqBYdqq3r2tQTuwCavRoGv1EcIeYjANrjLNYa8r1ZrM9yXyaijONptFAmEfQ2%2Fxkp70QCCWU3yFhiaV29E%2FWSh0SR5xiy66HFVSTqmgBb9YdPHPc5xDcUj0YrPjk86R6hiqYkj%2F2FDIbR5EAttpgat9E6KUBQRVRPysl9JaCe7Fjs%2FzUG02onguuORHy%2F3qWrmWlmKD06amORi9tx%2BgZ0LOjJv6FlFQbKoUEcydT68YjRLJd0xWlhDusZAmXiTvPebVLDM7ebMSlfLAnlTllMs2V1C160VS6Zkjt5PMo5jLcHYmXveZd5jLllV4OZf62WXDgbW%2Ftj86XaFdBh96urWzbNrFGMEj5U2xGYO3Rr0lxxX%2FK5BxMFMQMT7TWJkflrH5HSOBBUil%2BfpmZ02MEsc9n3IQqTaYQk5gALsvYgdhUtDHOJaGRk1gcLHK%2B6C5mFeiE0vr98gYXeCvRTOOvntkoRHGM5L3KPeNM30NckWpVCK0qR%2FL6bOEjLbNNijolTInjYY52zN7iAT%2BPaztRIrFpVHbqPc3U7TsGo9Lm38KIIlNVBPN2bOgZ8G0w7pLEzQY6pgEMdvznkMWA2eycPGr93kIE9jVMepyx2HVaF9ympLUc92Kbh78PP%2FnQyQVun0Gon%2FxmYw3%2BD6e%2Bgw8Df%2F1EcO61e%2BPH%2BJVJ2N0gl9adeRItHlDpesjPSElpVKquYRD7PXJE6P8JpjhPzb03jkLtpIN4Qd%2BIsZVwoufGJMeJ5lCLqW%2B252yBX2svFbihORaGqWw2Y28YPbslKu48fnKL0TrHNnScy8Gs&X-Amz-Signature=e7f369c2702d4fad4812d52292d8a10f638be825ddc3d61072a678235f387a4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUM72QRF%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCJGJgwYxaFfB8PiJ%2BkswJOgd7awCJq34hRN9ZMAtUNGQIgMrafmijN490h9eGLnuQhuCCwuQKBlgYIUdGzWlZE%2FbYq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDN7%2BxtbjvwwqLOwcLyrcA8j%2B5aQkGujT4RrASO1%2FkAIS4dEstUfdtRlY%2BPMBdHM5jikNBXZ9UpQJgELN6zgvxWygbvFjjveUMa%2FpUwFePweR5%2Bq5ovesqvbM8TeFEjBFb8UKtE64SOkusp3KC6pIxalDYCfvdBNtmKZx3nJ0cRcJIC4aO12KyjdIlij%2BIea8RQOGsI7i3R%2BxMppEKUHt68DYavUnSfH0hCRQqkxBKFtqZIEUsKTcctZf%2BvoywWyCFU2O6DXZfEao8jiV9tReZjHJIZrEpGXEdw%2B0yg3smpFJNepjnq2GzroSDz69vdIN%2FBjG5cIKgoe6iduGoo07DRvkViQUlItEem9ebTj1sa4i4zIQQXNw8oX0Y7J18KxgCupHSQVvvVWQu5XJT9VEaowAIBtJTEZ41FWrOm%2F5wivXsE1qPf1TMwFj1fc5wt0PglPvzm2UoNEbjXC8%2FU1WgbPXeiqfaUO9ijOX%2B7Wvvz6bPm%2FjQhEnB02P0rXntwlmNDWunjOMwLgne0jYjH%2Bpm1nuthaXt%2FbehKP52gj4Ym%2BLF80oc7ASpEVgCASs5C%2BhGrU3Vr3KDhMim91O7Bvr1jngUXBoKlOyTYzRhpJjxDoQlWzOjtZYNMzljtpZ4n%2Fjyp%2B72t6EEoSCXZ7AMMaTxM0GOqUBUzQ5XcoDX11EO%2F3jikkeVoL9h0fEwiHtbSN%2BN3vNUtTAP6JWnbWFtm7x3TaQwZ6INdjLPNBJIEB%2BsBKsm0qCQWNDMMt0lh2c1A7yN8IQdMgcMfpwZGWIIKXc1oH2CT7SjMI7LuMyx3AX%2F%2BImnFTu38Xx6zkVHWuQwiJAsb6%2BZYf8NncWpw1HXFMWaQ7SKAuMY484rQGFJxjWpan4lCTUKj9mNV14&X-Amz-Signature=ee425a7bebf01ad996033d167588dffc4170ee1f6019f07e1bd30a89a8a61071&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHGP6YZH%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDrrpO5Cwi4T9TuwLfYI%2FUQRmEp3ws4xm9Sk%2BxxnFndZgIgGXvShgRMZ4IwOZ4KW9p5%2Fn5lcdfzeJOuPooE8Fv0pA0q%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDI0ETqTQ7UGlFZ%2FFzCrcA6xXrlFTjjspDlC9V1DCYUQrwowWIi1S%2FSt%2F4b1eVvDxWCm%2BvqBFFW2j47Csn4UfhFMsEQcsJl2zCn%2FpsmLvDQt7RxcFzwAWz34OoBK3ixqDpNJnKNX9DiIfscVpJ21JZeUVgXigXwAScLgGIebr5XuZhCN6pZBpWsoV%2B6RSmonNErlU84CM1ARhLqA%2Fxfp90zuYCv5i3yK8PJPkBcEKZs8%2FUH8gG4hi7f7Aj5Z7M3OrxSC1z3KN0Gm9GHQqLA7YPpf9SaMLaqjqCJUsMVxkkEQUL6q1nTOKruQbE36esl0hZdeX0iUswv2yBrpzlVjK2StqtODMCRNLGfRzQrAqVkNdcRueZT0rct1luUm%2BOiBaPg2XqRKDxPPq4dToKAI%2FcQi%2FfNFzxICk7DrbjdnAiKhhfbccIIPPd6kDf%2BuZSRGdqA9V6tfCVXztjztWjT139Iwo3A3OnsGQsPgjWmvxu2egIrti7MqsTsCbyOxCVNP%2FtgLIcWDQRbp9Yu0jxpdfI%2FVfL2U5MC3t87vFfdw19fKjYIBP5HcTckiNsEodYmPTReSu%2FC6R5YHlmpN1e3uugnUD8MNaUV8kAxR1r92mCKRwjJvwle%2FG5Rj%2FaE0iT4wQM0T9H73MbNwrt5GKMNGUxM0GOqUBhOp80%2BPmR%2F0Ey70hiX5cCrAMBPT5kJEHlQc6%2Be9caHB980sfiM1hDiszWBs5eJd8xYQptvGt8dJbk1qTwUSdDkRrf3ypVuoxsrQYFxtZJ1X0NmLICjVoo%2BIVqhI1FilDfg9k8DKsAScVBftN8e2odcBfOD8VibOCjBPtjmID5IYzCZgL7KD31jCkko421uP6kTByenwAqBe%2BeVIfYZd4Okz2vT7%2B&X-Amz-Signature=ba6d3ad8435108b49bb7da4ff00f6d2c8d77ceccf2f0f1036a0b7c1d22ab08ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USVNK2MV%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAJ6EOcGCYVJp4Vga4WRbWrc1DE0y2l571K8wTofotciAiEAnO8LROeN%2F8JcI0Albvyd%2Fedm0%2FRhsPqnP8CfvDMXWfQq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDHROtn3gqQvRDP5t1yrcA2J1aiKbJbFkc2G4mHiwuXzGFVGQAeGbv7%2FFrg%2BX1bhGC6jJPSLxdUKWUOITME%2BaeO9KS1bUFdVx8FnUkT1VruQZg8kc%2Bw5gBIEOPZCAntkV0lHKUpLFCm2cbkwzfFM5i428MTZCxdd4tO%2BrPYtCBHqqBvLbaPJFY%2FZMpFkyMbuRDWnRjrx9LEGwabRZygP3ayEsWuL2%2FWIqzbyonvy%2FJuL1rtXuNPN32IkLpSr3SHWcnVhKsYqx6tOaNcXSGnif%2FMAPL%2FLhgow2RlGWssxRZqv1zaOZ1%2FTIXpG%2FPJlz2jESCnnoTZZ4qvFxRZYgBrq6IIw5fk5mWTNP4BdP2nJ0mpvOVdV2kusp6rfFo14p38X78EaCD%2F9hJlbaccDvoIWa9Y7mqNnkGtJnVoYrfiPOdWYSk4tA6L29ibW%2BnafTgUCU4ovWQy3AmwfktuGykn8CbtK4s2s67V6qqEVSjg%2F0aucTi8SD4f%2FGGFr7WgugKQb2rabOsC%2F10jD0BNF2YnBn3unKQRbaajvnZWXHSnt25aboLRY%2FbzXlMGJHzjXyMtiJsiBA6wrt6A8qBPpSzRGPC900wwv%2BeTzG736bbaD8gmM01wr%2B5AAVH3J2eV8arC6Fi8wGdrOCT%2B8TpFt9MLeTxM0GOqUBM9OieC0g1RyO%2BwlTYxsnzGDpstMD4E00gUTEXEPWcBR6VswjR3hQXqtvHniscRndXkf9LwQoQ7IT7Ne9snur2JMK6AMsQ8ii6BFVJI8tXC6pXM9mbOib412x98rc%2Bdp7BVKgSwTrOQyUoc1uPAV64a8o%2B2vgfDBOfBSoGNh1geaKwZHeH0XtJmKheGLpneOFWbVmEgTjO9%2B6CHxOSi1%2B4dymUMiS&X-Amz-Signature=666b07bbd71fb6b4c7c409ebc22f362757c254e4ceea2cce0c4dbf40603fb037&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YM7IWVPI%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCkCuia7Z8SpFg7Vcco5q4fvqidKHSuhOzDKB9NDMA%2BLgIhAPXaQMdH0CZHwFhO%2BearnCF1XX1xu0zXphgRu%2FqNbG6VKv8DCFcQABoMNjM3NDIzMTgzODA1Igz98u%2BaLPOXNjnY838q3AO368YRNv1OJCwGtbQgwW0PIIZ9uzDr7L%2BaZoNC96EwP1mp258L8MvcximjV5Inl5P9h%2FYODWjEpdclTMtG%2FiLSTcuFXqWZwW7T3eEZa%2BnJ0Jv2P83Ai0IO6LCTkvfk8U8qPucDfGSeq8e%2F%2BkK7S5PPvk%2FjHjyO5j6r%2Fp4B3e9cMnXCfVEvLatgYtnVdnngrORT%2B18QwsndJRGJNY4%2BnmifELQp%2B331kIR4AKpu8ytA33eFkNFWvPzh9%2FO5hK3NxBUnJU%2BmW0A9bxXxkjqbuqdnpHg0fm7HuHknRl9Bvr%2B7cS%2B3n2JDYgghItpwVxbkyYRqgBqv%2FJyVV3VuHhMAUEvAhwcGOm5LobNm6NhwKxLTDKFkLxXRYnbnU19sHLLK1MrSkUtNkDL48DiofojE8czqauisChHdCmHkqTJGkJi1FidATnoLYbs0qG5up7zo7HfV536NSnA10xQWwxXlElPx7JZ4j%2BoTxOFbUCPClqWx%2BfeRXf5%2F68ZWVaqxgZC4t8YAjYLIIMPJobSHRws1dIcf%2F70%2FKfLUdyEuJAj6LfXZcuJxSTq7CTd3obsInoEwy5IZGK5DyuYhoPs2BPZ6S0Y4L39t9nrhNw9Xds5XpH0TEtRr3JPYSBF3LMtstTDZlMTNBjqkARqa8oXKdMq9iEy7ECZvfrU7qJWvdfFBflyz9Mg0UBypcpsGrD60N6mAE9jzQhP%2FQki%2FHmqAgHp2AoqWW7eh1hiLjCtFnfX0%2BMNR1dGWT58s2l6pQLeeZyyKM3MVDDSGJjIgVDqXyJRCcwk43Go7eE%2FGljy8bht58MLKjsol%2BbdL2mLsBZvFvQkeK3jE1IiWBq8CHfkfT1D4JG0PmlEWffZY%2FF5Z&X-Amz-Signature=2285e61c38ae0d44fc3657cea9bbdcff7e4816be66cd507a9bd71bca0ad9305c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YM7IWVPI%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCkCuia7Z8SpFg7Vcco5q4fvqidKHSuhOzDKB9NDMA%2BLgIhAPXaQMdH0CZHwFhO%2BearnCF1XX1xu0zXphgRu%2FqNbG6VKv8DCFcQABoMNjM3NDIzMTgzODA1Igz98u%2BaLPOXNjnY838q3AO368YRNv1OJCwGtbQgwW0PIIZ9uzDr7L%2BaZoNC96EwP1mp258L8MvcximjV5Inl5P9h%2FYODWjEpdclTMtG%2FiLSTcuFXqWZwW7T3eEZa%2BnJ0Jv2P83Ai0IO6LCTkvfk8U8qPucDfGSeq8e%2F%2BkK7S5PPvk%2FjHjyO5j6r%2Fp4B3e9cMnXCfVEvLatgYtnVdnngrORT%2B18QwsndJRGJNY4%2BnmifELQp%2B331kIR4AKpu8ytA33eFkNFWvPzh9%2FO5hK3NxBUnJU%2BmW0A9bxXxkjqbuqdnpHg0fm7HuHknRl9Bvr%2B7cS%2B3n2JDYgghItpwVxbkyYRqgBqv%2FJyVV3VuHhMAUEvAhwcGOm5LobNm6NhwKxLTDKFkLxXRYnbnU19sHLLK1MrSkUtNkDL48DiofojE8czqauisChHdCmHkqTJGkJi1FidATnoLYbs0qG5up7zo7HfV536NSnA10xQWwxXlElPx7JZ4j%2BoTxOFbUCPClqWx%2BfeRXf5%2F68ZWVaqxgZC4t8YAjYLIIMPJobSHRws1dIcf%2F70%2FKfLUdyEuJAj6LfXZcuJxSTq7CTd3obsInoEwy5IZGK5DyuYhoPs2BPZ6S0Y4L39t9nrhNw9Xds5XpH0TEtRr3JPYSBF3LMtstTDZlMTNBjqkARqa8oXKdMq9iEy7ECZvfrU7qJWvdfFBflyz9Mg0UBypcpsGrD60N6mAE9jzQhP%2FQki%2FHmqAgHp2AoqWW7eh1hiLjCtFnfX0%2BMNR1dGWT58s2l6pQLeeZyyKM3MVDDSGJjIgVDqXyJRCcwk43Go7eE%2FGljy8bht58MLKjsol%2BbdL2mLsBZvFvQkeK3jE1IiWBq8CHfkfT1D4JG0PmlEWffZY%2FF5Z&X-Amz-Signature=c55e61577d0c4112baa499dca428db16bce2c3430ad2017b80811509c64d971c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EROFGMI%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDm%2F28rGoee2xrJlOq5DUdZdmpx7ew34kvgyFqpX6HxswIhAO2g%2Bi02b4O4QrU0Qafxqwdh0i9hiwXfSTOvlBdjgYU8Kv8DCFcQABoMNjM3NDIzMTgzODA1IgzS%2ByLL0a1GjFqzbjEq3AOlsdDqsXdEfcFH%2BUB4Yajck%2BLeGD7laDH1QysCKuFFABaxPx3Qih382fVGwyf0qDgkCc%2Bkjw4km6rAY3bh5VdibbQu5lt7SNUr9tp7jMNFvjh0cNFVwwZxVBubirsFmpwt6%2F6wCuTarygrf2PZHK10S4ZV%2BQiqyh3bP%2BOQu27HtJ2QULRpIVbPAm%2Bm%2BsD1Tn4D1%2BNWbxky7xtIlvAnzgJ1pzPF%2FpJYsyenKnlZkEdbsI5830clvEPjbtvRmbSaD0nIZ2t7Ec2MdsCh6U6RuWZHpB7n7BhjUDIdyxYIXP0jT2Q0S9qmIl%2B8E79nrAppwG5ka5%2FEgPMe03G0Sood91gL9Cdb6k0Alc44JatzaBm311MiosZqL4OCUvH0AB%2FcYQOKQgNGb8AIE60u%2FQ5VJXQ1jDka2pzZa4GpqcYUq7qPogfXs7vx0uozHHSA8NfufYAgNtB4YSHDTmlZdcZCuqhwTYRikpwx8v%2FCBPakEN5C63wNBgs3ymp2zyqK1gftQJSD4svpOa8l5XN1CGXEF6P39cbGQZXLjjxX4abkyM3MRcPGU3N4EaB6QLE4Xbe3Gj793B6dpVwpw1di%2Fthc8%2B5sXJ%2B3rbVIW8F48ZePBwnEaXSGGyENRYgB7SMzoDDjksTNBjqkAeejDD%2Fo1upw2MCgn5xN9IJyJsQuuK2R6Bq6nZL%2BzPAnp%2B9AV%2BPlui8u1ozdLhUgardWAJiC3bjLjS5gUx9M27EKx0U3EYD%2BI1lvAyoUARLM78Nc6BnC8DUV7b3jfzIGKseqvDFooEJ7PCNOMuU%2BAAP%2B%2BKafZbHWzaoDlo9O%2FNTUgcLz%2FvxHH0Xp0s5uoO%2BPMocxhJULD%2B%2FLF6Kapi9jC9EwHv%2Fq&X-Amz-Signature=4c4b8c99d85ff1b17a4eeafe84a494e9387a564c110280b94908562e932c38ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665M2Z3IVT%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCQbflJYLHwHEduWphHON0Ldc%2FeNvTz5PTknO%2FDLWIs7QIhAP26QsfZneSmYRPD42HbSTSmmsBX3Lc5dhqlywbLbnA4Kv8DCFcQABoMNjM3NDIzMTgzODA1IgxDawRHrg6vPzihfpQq3AOxMt4WJEDqvys8rnE30olqFSQdYlY9rUpp%2BJq%2F60IxBlRrOqCBhKZyKZtaDpBzK7%2F8UGL9o8yApx%2FjVbevfPUd7N9wMpbyrgBtSR5YXAnTkbVLuZsrDX2pvovuCXc9hwCWGiZO3WyWnAp9FoqHgug2M%2BXMeQ5ASdW66VSF2NoU5MTfPdX5Wipljg25Kc6D3ulWJm9azLE7HNaCvP6R5Zy5vH%2FxN762vy7tWGjRH5qrvOq0QiptLgyvij6wYYhgIWL6ypJ2s%2Fz1c8C6s6yCcEQ%2BF3yqKeW%2B9ifhJ1yQCriiC41Mvks%2BEXUvCHtrVl3CIlnXUYvk9wk%2BQG3YRyP7qtYGPnFCBMgQp82HaqfuYb93h7Ms09qH7esK69%2Fs%2F1dH3Gv0TNsdmlgH8Ql8ON6ln0ivVp5RuLXUQhxnsjyzrcYzcbQSQ%2F51NoAT%2BQ7T5ypdzYiFxYVy2QIUGeJ9R0GqhmEhYy4THCRfPKuHRkPyVx6Cql0zgkagymOAtUjDn6B3A0DQNJkorjUBVG1qEutB75kaDUGgpHmc4u6Dib%2BluCCC7VIpd%2FrXtrVmu3eykFRUOT96IpUNpX8YF%2F3LvdAxYFqT0JQbIxUIplt1THil1ZeRBJSpiIzPuWaJzc7UfjCZk8TNBjqkAYDTgQvSA2J4Aa9G0G8b7kJdY9babz9D4GWmXcNDF%2FVPYT9sMLnJv4F5l%2FexWSu5rWOObFYjT5hvPqrpuWH4qapEne931cp%2FdYTr%2BZ3ICurawAgFQSWg4QOVhQ%2Ff6rb5sdrGfPZUfSL1%2BaTevmTArjXKNEzb1MfaRrpdNnOPJ%2FmWD1dXVjcOwgbJJxWgqySG7vE1D4SmgEBWsdWAzaIDyAhZs%2Bar&X-Amz-Signature=f8b25d95c5b972863ad8fa9d2dc47a4daa4cb879f8812657c2da2f6f1ca5cc89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665M2Z3IVT%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCQbflJYLHwHEduWphHON0Ldc%2FeNvTz5PTknO%2FDLWIs7QIhAP26QsfZneSmYRPD42HbSTSmmsBX3Lc5dhqlywbLbnA4Kv8DCFcQABoMNjM3NDIzMTgzODA1IgxDawRHrg6vPzihfpQq3AOxMt4WJEDqvys8rnE30olqFSQdYlY9rUpp%2BJq%2F60IxBlRrOqCBhKZyKZtaDpBzK7%2F8UGL9o8yApx%2FjVbevfPUd7N9wMpbyrgBtSR5YXAnTkbVLuZsrDX2pvovuCXc9hwCWGiZO3WyWnAp9FoqHgug2M%2BXMeQ5ASdW66VSF2NoU5MTfPdX5Wipljg25Kc6D3ulWJm9azLE7HNaCvP6R5Zy5vH%2FxN762vy7tWGjRH5qrvOq0QiptLgyvij6wYYhgIWL6ypJ2s%2Fz1c8C6s6yCcEQ%2BF3yqKeW%2B9ifhJ1yQCriiC41Mvks%2BEXUvCHtrVl3CIlnXUYvk9wk%2BQG3YRyP7qtYGPnFCBMgQp82HaqfuYb93h7Ms09qH7esK69%2Fs%2F1dH3Gv0TNsdmlgH8Ql8ON6ln0ivVp5RuLXUQhxnsjyzrcYzcbQSQ%2F51NoAT%2BQ7T5ypdzYiFxYVy2QIUGeJ9R0GqhmEhYy4THCRfPKuHRkPyVx6Cql0zgkagymOAtUjDn6B3A0DQNJkorjUBVG1qEutB75kaDUGgpHmc4u6Dib%2BluCCC7VIpd%2FrXtrVmu3eykFRUOT96IpUNpX8YF%2F3LvdAxYFqT0JQbIxUIplt1THil1ZeRBJSpiIzPuWaJzc7UfjCZk8TNBjqkAYDTgQvSA2J4Aa9G0G8b7kJdY9babz9D4GWmXcNDF%2FVPYT9sMLnJv4F5l%2FexWSu5rWOObFYjT5hvPqrpuWH4qapEne931cp%2FdYTr%2BZ3ICurawAgFQSWg4QOVhQ%2Ff6rb5sdrGfPZUfSL1%2BaTevmTArjXKNEzb1MfaRrpdNnOPJ%2FmWD1dXVjcOwgbJJxWgqySG7vE1D4SmgEBWsdWAzaIDyAhZs%2Bar&X-Amz-Signature=f8b25d95c5b972863ad8fa9d2dc47a4daa4cb879f8812657c2da2f6f1ca5cc89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWM6ZQAQ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T063505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUOHo2un8yMnVo02TKxozLCIwrL3Pd2xASkJCTGPAFTAIhANcXPvls33T5amu8oqxlFP35dwbEyMKqVstdY4Mvn4a3Kv8DCFcQABoMNjM3NDIzMTgzODA1IgwPSk17iqNiTNkoD%2Bgq3APpxXZ54vbtppV44%2Bnl9Xwp6ScPieS1ToRwtoKgdbnlDxyAXVy9vwgkEzcq3OEQpSvjqrKG3odr50sshdJwq8GYWLvtN5MORAlsEpqPh5LPh3NVDwTph3F0Dss2QgFR4p851uQcAh0GiRmZCyJMG2px9zF%2FL8b3OoRf%2B%2FFnuY0jT6fVRvyQejjkHjIOY%2FtR5Vu09C0mhubjCR5PbEoXzfZpOEpjKyw3Gw0Zv19cFJGYWtWCjGCTBHhRNL93YGeH6ocasGSDMoheArkol%2FFnSnLU4KPuuhB35lDPhJtFtNrFgnj8e13b5f8VR81B7j3UHEcxDrWObHQ0REjj1FpkauV5JI2TLn6NdeVUmYi2ftiUR4L3kp5zbm%2BsMC%2BEjJK50sWh2z8moWOfKr3N1yEPuq%2BNNcgoVjMq8009p1XViZPBWzbydxZM6hpL2XTOETQe2EpO5jaKlxYIi0oJS7yzdQDen8VL97aI4tFbMY0AGgJuf5dSQQWWNHlPLloTISW6BhvBuRY9V5ruaH2qkdisOLwrkVkGYoQvsjbh%2FhCeVZnrpRuLY2lzL2%2BxKjMpjuyD5gFG%2BK9AsBNwpDfWUCSviEvj%2FvWEpxvXWujT2y4iE4LQeUdzuJSGMdeXhsoiMDCrk8TNBjqkAWyUGcTbUbAxMO2gmnP2ot7CFI0enCCQb8jh6s7C5zs9XmnZ5lmkopYozGd5YTGxtgKPUDGFlTfa2UXOk6sW5BwM8h4zEFS0jEIYO5tqUMx02BqodRyIV2CO8SkFXiGrC2AmMtDtxD5PNtxXBY9mZahCkOMXj2859UaPIobF9RyN%2FK2hR2afMqsPXL2%2FGES7AlhpBem3CKBoWhoY%2Fvh5BgZkNjT%2B&X-Amz-Signature=bc760068c78f16bb407d4003659953acb6cacd24bcb4fae75865920e5de0e447&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

