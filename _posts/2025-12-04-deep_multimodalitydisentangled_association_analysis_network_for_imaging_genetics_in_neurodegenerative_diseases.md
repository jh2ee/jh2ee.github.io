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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4JZQIFQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQClun9Wdj%2FKrvlZbNxIEO3Fa9agf0Cb0vZn3yAlD4RRqQIhALnYbknYxruTuWvh6%2FusnybXbOhGhJQWXQOYXBwIOLJ%2BKv8DCAEQABoMNjM3NDIzMTgzODA1Igwg8WtBxMPLkRQZuK8q3AMhgbItuDK3eAamvkgmLNuRSj7pkUZD62icWCuY1d%2FAMh0NEU2XjGMCwBwPeVVzHd8dyID0iqq%2BLcJzwaIKxrynRzmJ%2B0G5l3UVsLKum%2FjRw3ECBoT6badG3v6L1e4YscmTt0z9tMMX6b2ySsD8b%2B2RZ9CqCWCE4V1BeI2w3wN2szXymqMWgV42cNT59gBfae7L%2B81HOUl%2F6EMUTb%2BxBHy4M%2FGTGLa1FJccTE6MKG2b5%2FIvFH2f1V1Q8DrP1fPIunNwboSODA%2BfnIiJQBOXswMuSN7iSRuyDCwhT4J3q0%2FN%2FkZYi9%2Bd%2FQrbRuJR3zSNb74VuruQPVpNDL%2FiaoMBKgHzsjFEmpm2Z02aOVnK3qF55joT4BF3uE8CA%2Fslz7rCCvsR%2Br4a2xypEqeww2ldNHr%2FG41C242bLJbsVIsYRpb334KLEi%2BA9amRZkLPn7FusTC5dlpAFmKZD6LZVAiRYoXrXYtbpJSzkP0%2FwB5USPComMBwFuaNLhutKoFfv%2FZpyk9T0Y%2FU0u0mE%2Bgz191%2FwKW4sZYJbJsYPggb4GYlmCfm8PjeRdjMgfRHhPhSQUC0vj4yUNBpX55%2BrviKcDOJfMaYTravh4okYf%2BUF9q4xSmJt4SC7uznufKgK8GoZDD2lZLPBjqkAdidMgQYhcQcb36VcRXPMV%2FWZEnCUPea75JbGBro3Q5QoMsrny6HaWixWPIiuKhvL3TROVWZgReb76AQ7s1U6JB4wFTvuCBknMaRBcyzJ0PehmsmQRwLkzn32U0AzqXxKv3Je1nWjROaGboAT%2Bg0V82FrbJ%2BJBwTjaXY3d0hqQv36FN7ZvAzQXv8UcqENhtTn%2B8AJX0yrsri%2FSK5B8NArUA1Cfxk&X-Amz-Signature=ff320d70d601584a99f1ee3309ab221d7ad1fb00d7a3c9973caa00a0874ae9e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4JZQIFQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQClun9Wdj%2FKrvlZbNxIEO3Fa9agf0Cb0vZn3yAlD4RRqQIhALnYbknYxruTuWvh6%2FusnybXbOhGhJQWXQOYXBwIOLJ%2BKv8DCAEQABoMNjM3NDIzMTgzODA1Igwg8WtBxMPLkRQZuK8q3AMhgbItuDK3eAamvkgmLNuRSj7pkUZD62icWCuY1d%2FAMh0NEU2XjGMCwBwPeVVzHd8dyID0iqq%2BLcJzwaIKxrynRzmJ%2B0G5l3UVsLKum%2FjRw3ECBoT6badG3v6L1e4YscmTt0z9tMMX6b2ySsD8b%2B2RZ9CqCWCE4V1BeI2w3wN2szXymqMWgV42cNT59gBfae7L%2B81HOUl%2F6EMUTb%2BxBHy4M%2FGTGLa1FJccTE6MKG2b5%2FIvFH2f1V1Q8DrP1fPIunNwboSODA%2BfnIiJQBOXswMuSN7iSRuyDCwhT4J3q0%2FN%2FkZYi9%2Bd%2FQrbRuJR3zSNb74VuruQPVpNDL%2FiaoMBKgHzsjFEmpm2Z02aOVnK3qF55joT4BF3uE8CA%2Fslz7rCCvsR%2Br4a2xypEqeww2ldNHr%2FG41C242bLJbsVIsYRpb334KLEi%2BA9amRZkLPn7FusTC5dlpAFmKZD6LZVAiRYoXrXYtbpJSzkP0%2FwB5USPComMBwFuaNLhutKoFfv%2FZpyk9T0Y%2FU0u0mE%2Bgz191%2FwKW4sZYJbJsYPggb4GYlmCfm8PjeRdjMgfRHhPhSQUC0vj4yUNBpX55%2BrviKcDOJfMaYTravh4okYf%2BUF9q4xSmJt4SC7uznufKgK8GoZDD2lZLPBjqkAdidMgQYhcQcb36VcRXPMV%2FWZEnCUPea75JbGBro3Q5QoMsrny6HaWixWPIiuKhvL3TROVWZgReb76AQ7s1U6JB4wFTvuCBknMaRBcyzJ0PehmsmQRwLkzn32U0AzqXxKv3Je1nWjROaGboAT%2Bg0V82FrbJ%2BJBwTjaXY3d0hqQv36FN7ZvAzQXv8UcqENhtTn%2B8AJX0yrsri%2FSK5B8NArUA1Cfxk&X-Amz-Signature=ff320d70d601584a99f1ee3309ab221d7ad1fb00d7a3c9973caa00a0874ae9e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W32NRLKV%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIDYJJX0wRRMJsHFHdI86AL95UYEyVSwahmiQiPNzmbTsAiEAltCIDr%2FDttk7g3x5xU%2BnNksrpt%2F1SwGOCglXc%2BZuCWwq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDJEdMcc3isxCzCypwSrcAxRBk31dZdgai%2BchS2rOSVxDOnw9k59bm2Sij77HEh75izOf1tu1%2BNedNmQCehBiFU0DszUK5AxR8yo2IN9vzKAEKE3CswK5wClvDP0896CR4QQKDxGMOrPq0T4lPAhpm6fxEYNUjXjJ6lMiI2A8kN07o%2B4J1hUpfz%2BnZQ7ZfF8eJi3mhYi%2FWvV9INT3UVWsYqvNTz25a9H5l1kSaSLERTNBOdD17iTrwi0clRvYHe0wNusbc4xjJm5CaAkcT7iRVuzTVbcfxfM4r95Byxh3gicVbx9KMqY3nEPSu82hKCPDEJYdKwSfEDQip6sVhlG0%2FW62aNo3yZkJe%2FoaQVeZIGh%2FyBroQOQul4sZJktZv%2Fl7ohVLz%2FCY7q5%2Bibnl5m9HRqK04qMbNWdjVxSQLl5bkYX6mCdvOnU5Sndn9pVE4C4ICAUpB%2B8BUyfE1RdctBwVB81AU3LunS3FjKfSP5CinF%2Bm9qJJ4JOJIvFOQRCGoTg0nSIn6W0pxiLr9bqVWNEySmVGBQv8MBQGKpbpgBjFf07mE%2FhFwguGk1F3SZaM5k%2Bkb%2FHXtP%2FZkO9n0H3DNnjI7wUqbVdgbVNI0NToYH1pzWKMpYefmNF36Q5bDJX8SDHApn14n4dnE%2F3wXtdqMN6Vks8GOqUBztvlvknUBS%2BnxmDR1X8RnzBoPWm3sHmrqY6go2kOVhf0PFGPIW1n1NAO3efsehfR1se%2BosYgObMa0rCACbO%2Fq8dGYRe9CYT1554cWkfKa939mLdbeKoTd4dkiW6IwhPwJdlcO8W%2FoHt1eWa3OUguFzqGcpo3YqJnz4a6grY79rt86QIqMm8J6%2Fk23TJywoF8nyYOcFhN3VpYCZlPWJD0JtnIuwHH&X-Amz-Signature=46542b2c759d189736ae6172210d7667464f8aebb2038b523b3910ed0a891a87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UMB3BC4%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQCf2%2FT6nvZB3nPl41bIkGhYJ2XPEY%2BnfD9QqKOXqsHIqQIhANu9gEG2qvKF3tzi2A5889vizFYUVz9t%2BNXI%2B%2B03wO3tKv8DCAEQABoMNjM3NDIzMTgzODA1IgzVhAQCqOcb04GfEIwq3ANduJXxK4d6mK3%2F6F57nKHr%2FF9siHHq5Cz7psEs9goM3r4wHtbCr5EqbRD0SDnToXEzZNpgbZ6lDkZqS7uykpmneWQngpM%2BaKrn%2FXVz9DyIdZM%2Bu12eZ2skfvvFVIzoVgBuPwukDANA7vVXpC2ui%2B%2FtuleB8nz92H6fEMUhft%2BkqXPQpwZ%2BHX9g6G8oq%2BL1qF651fd%2BifEk%2FxbTfsqQx8GN6HA3IGAZxtWsGsPMApfW69jabAHLYFbUE%2BSRigYasy9c1jsOeJv4vEN52vf2Z7Z2h4nRemGqDHMrv4zavQjG38Sy%2B%2FAd6WM5bDYl%2Fg14US6VK9ffFY0%2FXThpxAu%2BBFyxNB4CxuSUoaXPWd6ONHcT7kqeF4qJhxP8okLk%2FQJm%2FOq8VrCVnCtLGutPcBoURgEi4nOv0t6LupemUit%2FOPnPTZj5ZNOLv4NtalZ2cQ9pqB5lVmfvHRum2cfg2TM7Npnk3S%2F%2FdpWuHFh9t2e0k%2FkhuOVICSs%2BOLg%2FPTd%2BJH9nFLY3rXNxVZzKTGRRTUNasansBB2wL0oDJaaW58J3sDLN%2BAwVMwN3zK9%2FnwTkKI7VCWNneqDgKPksH9DuVpCwhE0somo0i9UkJVEJ%2B0GESfqlG6bdRNisR8hmAd91QzDWl5LPBjqkATEpbBIfaZ5qax0dtw%2BtJo3%2F6pI4pYkxB4G4gVj9D6qnBokkaD%2ByDU1jwZVdcYV1VSbsY6%2BX9EjZafP6nijpa%2BOpZ29GrO%2BeGgM0tocvN%2B85KDC4AxQfKGplIlBiaJWaSIZVSQOhZ0DDIqi7RTgwQuoqw6FYBWrLg8cAdrwINmc2zb1HPxAlAA9DqPMv2%2FWYNRppfj1EYYaYPhOArv%2BbY%2FcqldXU&X-Amz-Signature=70403e346cd17d65eff991ac43f91a397de380f216641902c95b037d893ba309&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UMB3BC4%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQCf2%2FT6nvZB3nPl41bIkGhYJ2XPEY%2BnfD9QqKOXqsHIqQIhANu9gEG2qvKF3tzi2A5889vizFYUVz9t%2BNXI%2B%2B03wO3tKv8DCAEQABoMNjM3NDIzMTgzODA1IgzVhAQCqOcb04GfEIwq3ANduJXxK4d6mK3%2F6F57nKHr%2FF9siHHq5Cz7psEs9goM3r4wHtbCr5EqbRD0SDnToXEzZNpgbZ6lDkZqS7uykpmneWQngpM%2BaKrn%2FXVz9DyIdZM%2Bu12eZ2skfvvFVIzoVgBuPwukDANA7vVXpC2ui%2B%2FtuleB8nz92H6fEMUhft%2BkqXPQpwZ%2BHX9g6G8oq%2BL1qF651fd%2BifEk%2FxbTfsqQx8GN6HA3IGAZxtWsGsPMApfW69jabAHLYFbUE%2BSRigYasy9c1jsOeJv4vEN52vf2Z7Z2h4nRemGqDHMrv4zavQjG38Sy%2B%2FAd6WM5bDYl%2Fg14US6VK9ffFY0%2FXThpxAu%2BBFyxNB4CxuSUoaXPWd6ONHcT7kqeF4qJhxP8okLk%2FQJm%2FOq8VrCVnCtLGutPcBoURgEi4nOv0t6LupemUit%2FOPnPTZj5ZNOLv4NtalZ2cQ9pqB5lVmfvHRum2cfg2TM7Npnk3S%2F%2FdpWuHFh9t2e0k%2FkhuOVICSs%2BOLg%2FPTd%2BJH9nFLY3rXNxVZzKTGRRTUNasansBB2wL0oDJaaW58J3sDLN%2BAwVMwN3zK9%2FnwTkKI7VCWNneqDgKPksH9DuVpCwhE0somo0i9UkJVEJ%2B0GESfqlG6bdRNisR8hmAd91QzDWl5LPBjqkATEpbBIfaZ5qax0dtw%2BtJo3%2F6pI4pYkxB4G4gVj9D6qnBokkaD%2ByDU1jwZVdcYV1VSbsY6%2BX9EjZafP6nijpa%2BOpZ29GrO%2BeGgM0tocvN%2B85KDC4AxQfKGplIlBiaJWaSIZVSQOhZ0DDIqi7RTgwQuoqw6FYBWrLg8cAdrwINmc2zb1HPxAlAA9DqPMv2%2FWYNRppfj1EYYaYPhOArv%2BbY%2FcqldXU&X-Amz-Signature=3ee79f971139ce827fc7a6aa530b4563dcbe84f405cf200c1916e1612f171731&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5WZHCVV%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIExoCXIyS9XtEtZifIqsD9VepSpCj67sCug22EOXgt9WAiEA0rUl38QfpG8IPK%2FyV6oSChn%2Br29Up8FlZJpW0Blts1gq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDPZYRlJUUUP8J88fdCrcA%2B38X4qzS2Nh51G1%2Fxv0mNZMqfPWVGvAixiHVaK1Nj8Q2%2FC0DKn%2Bhe8f87ENuebCDXg2hv1q9Ln2o%2F%2B0w%2F3wNHW9LYQmeHFIstB3SNSu3bR4wQ2mluaAx%2BtUDfnmXuiodS5KW71igQWKnaNQZADqlqGODi8rTv2fqg2ovWFdSr0l5u%2BjhmjB8nb96V65raWqzfszK9pHu848QqJjtIEMkEpxhj0UisAEWJFpGYMhwHEpsTTmfDox4Ukg0ptWWXrUao3RjFyH0R3kJMTQCamqQuFI2WWtfYrfhpW7vvHU6zdyNp7eVaDEa01Nu9E1ZcyL3yXfbY1fo2uKecjCu7MdcPx8rQg0dFAowgC5Hrp5N7nXU%2BftN%2BsnVqVl2B3XhI591nEi2syNPCri2xzKfp%2B0ZrnM8XCHznYPntxvcHtK8jFEx8Be3N16Kfw4Hr8UcDGa5bu8ooJSByHNrEDWajHhRJUWs3N7Xc8RRpF4EUe31Z2KraDCN9LkMDzqBxQcEeShitUhsQYS7nnO4auKdAOLtaZdhWyR13T%2F6gTHo5zSEUaadw87xhUPS1DofajQ%2Bjq0gfA8oOBHhLyIA1EmPNBsxO3aDRo2P9XLu%2BCArQhVx0p405cwMPvxMvF835VSMNGRk88GOqUBxv8wb8sh0gArKFzcLv1c5tl9%2FK0%2BAfPeRzzk9Q974kBc737ZUAXBOPJGCZ3%2BkmBW5rUjTxHrG7pw%2B%2BP%2Bn7OhfsXNdTxfqD9Ztdl3mcRzXLjHmVt25JfIzOe3IWz%2B1Jcvd2lJl%2Fz51v8B5h0zMytkFNpckAq2VqQ7Fg8LtnVlL7y4No0nOU1Tb93Byk2NYH2F5C3zwDFAAn4ttcWbAxMEoLpidvdh&X-Amz-Signature=99e6d20caa79eb6a1d9473d76e6f5fe33d92c4a4c4bfd59513467ee091723af1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6MQLCFA%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQCq8nLkDL6T6fAGMk5GNXd13O0Ho3OqfjtBzzhkDp9T%2BwIhAJTEGzzqj3x7BzIEiK1BwFs8DmS69%2FAmgCItat%2BK0krYKv8DCAEQABoMNjM3NDIzMTgzODA1IgxVJnPtdXIkt5roZzgq3AOqCa%2FxLqLro6eM7ZFBLRuDg5lMObCHONwiN%2BS286s5noQp8q3GJFej8SKbxB%2FdX4k7djUgmGfaL0Xj56lCsMeY%2BRqOfVEgTMcwDo74wOmHFyeRcDfyNtoN4n3XFZOIGXe3ngHTpEUk53r5HCpv5FdqDF4ntVZUc46jNobq%2BNB30kjkl3QxXEdRMsdgS94mK7Q6ioivhFJd46WAoxzmK1hvj927Yb%2B6Oxi1PhjYOBlhPVrU0Mu4lxypEPzHbvCLynPlHjVAKUToc%2B%2BRS%2F9U7TShPoztRkdJgh9p16TX1GTQHPYzbDb8PNU%2BVcSw7%2Fy6xdNobFytSlE1Pv5sOhp5RPB7VQh3TeRB7J7hEEswUy5cgag9Mz0l0slvrmaU1OG135%2FHRj24VjK20L85MzVKu4gX2%2BHvr3yLEZZSzLOYcMMVK8amdAEM%2FWYBGjye8nJPmTDueiUwtXf5Hr1YLGAoyyICxWX4eXRsTBCmZJ6MjeXsTT6dtomNUvPnMIzGZJwMxADs1Ok64%2B9OjMJBYw3npq6YQ%2F2bgjSlcE4Fi%2Bd767e%2F8BALoq%2FGlcbMPagVxANzv6rkwhrupQmCJDqet4d7PvI9ajo3W3RsVoes2LCB3AF2s%2B5R6%2FjxjCsSHOZYGTDUlpLPBjqkASH7LsZaS9Iy78Vdnu9cBC1cNHEOy3DPpoXG%2FvW%2BZivkB4p1cPDOVfP0nIL%2FHDox1TcXZ5IJ4t5MuiYj6QkyVdbA11JQ0fnBLYgB1wKD7pksYMKyzHco4eoO1tAR32cezxy2IpCaEnpDL5RQVNV%2B4w%2FnlvPU3Ly%2BgwM9mIUZwmGmuHsKCDUhGZ%2BUvv81Au7qNEj%2FHl4Vac%2FOq0fFcrUlFZxlpoVu&X-Amz-Signature=217e354841eb33159bb82685ddea63b6014482f7e10d98978853f0aa576c74a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PLHBD5P%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCOkdxh6kLHv6WiWgp4qeDtuaekz1%2BP6b5PZ5nzhhhXGgIgfOcnwXT%2FuikvnmLfBLxD7%2Bhcntp2k0IZ2rCkxwmQMSUq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDL5%2F1JN9NE9TRlRfVCrcA7UuW3VsoAnX5BCnzLEt%2FSU4V5SA%2Fz%2BU6S11kP7IuBkkdHlOsCLjx7ckrVAOEXgVWfCyZeCEg81A5gbj3ZxBd3RjciXg3zvFTiEapOjMhWKBeiAZTF3w2Sv4McIE5aBMrqHL80zX0zs%2B2i5iod5q4OFuXDER7XibTpQR4CERpiWxeXolwkMWu7xkXwbSt0%2FJ1N1%2BzltbiobR2wj8O2yT9q0MlhMnfn5SXgZjBojFmklbEONfBw%2BANhA%2FydFM6rESUD%2B6zJ9nS%2BmI%2B85tKXdJRE4vOGFiwwTHDcha5U1TUhZi3Ta3vBprHVgJWTYQBmL3%2FlpVFXc8g%2BphA2n9c8frfCwHubgIcSJ7lmZkyoBfi4jkgPpPCnYQmOLyK8wjPX9V0FEmx%2B4umpAJOOr2k%2BVyFhwQte4crR9eOKJdf2oRyETpF1Tnch04l8sX%2Bvu3qshqISl8NDKWoIJOiUocNO4PMUFUTOslAxRrgp8Lqi3V8L54UNz%2B3csgDQj4Bby76JMz32OBwtF5O165cO7wK59hSLF%2BSdIqogwM1bl1VypMY%2ByEbdWL%2BUkYLjbV3peyZK0IHQhoeLpx15cnsw7AfcgCCvkzaWrS51BUMfixquXhdfvdDpzhAkBNgQ%2F6Yln%2FMMSXks8GOqUBdfOV86dSa9u%2F%2Bug2bC1OeT9eYZWjQ0rTUPSyk%2B06X7SXgHdIKEgyomlBaUaGMqnDhg04ADZ7QaerNM%2BFG7d3sqL2f0GTeoQWojOzLjPVi6D%2BsmU01LmiQnysCesP4tm03FqsNQLR60lWoDR2LSuVrxPi648llDAkQW4oIwop3ZvAAEsCjlytU2Znkm4pwb4H98Dinn8AQLeMj%2BTbNa%2Fa%2F6Y%2Fa4%2Fe&X-Amz-Signature=cc87ed7ddb03ebc4d2a3e7b4e45f6f35caf96a48214bc0ffbd7f7fc625431890&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4DRMZA2%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCID5bu9xoK3ftF7ZR4pjEF%2BPaOPNuIE11YPLalHX8lGwwAiEA4YHtsaXNTroogQyh2IACvMKE%2F23Zt7gOnrzAWXIdD5Aq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDF7LDigI4kPZ2e%2FdrSrcA1RaUOvF53lvCDenjlwp43dUtBLoc5MBQORZK0yM7jvgtFNGwuOZ5j5%2FmTvVztsHSGKiJ8eKxeASXf72diD%2Bit6tkY1QJ%2BE8VHB%2FI5DzqBLyDtqJwJa%2F0tjC52aGP87oBbMsUVADGD4Mam%2BLAuPu0M9g4CV%2B23s%2BuxqbkH0eftEh7l6i29pTsZn2sfAOl1GCjWC6Ug%2FtQH7qBhdoohsVdWz6lV0Kla6m4CzutIMpoV7t%2BUSTr%2BewFEg75XqzsaC%2FgkItD0pqMiv0X5O05iBbX8S8zHUWRWB%2FtGWEQ1iwmHjOdFKIGJ9i1rWFKl7D4SxDHXmZicic8%2Fny0FuuiEdilFURJZtB7iPYrWpdSGrOJ%2BaQow4Qiw1EBUdMQRN9DQqWmVwlNdhqJze1WweFR%2FhZ6AiZSzcbFJeVKdCEulZc2%2BYWEmd2v077P8QLPlTlTpuNTZBbTxkXy3eVpS3i9tx9eMYIgQFpaOJdpwtNlD4iKVWXC1dL6STl3OFfLARM5hy7zJCXm9b5i%2FL0ycR57ZV21Lp6Vh0sDF3Vlf%2FA9P7lgA8NKPD6nrY%2BATv4A2Ec70bJ1%2F7qFm6GgLp0lALKbSzzEHa6%2FxrqAEp7d5nKu%2BrGbAUEdK8FHQdQivqGRTxqMLGYks8GOqUBtzHZpppxFEZ8S3d6tE%2FOZEjn%2FdCUqiqczYLnu08ifnbYEKco%2F%2FGQt2025s5BKoptP21rPcnqaZ6GTqn9ROGdckiWDlwg0gN%2FEZR7aJWvjZANPLxI8PWu8Mfoyz37cYdoSVdNsJUrGSiQwzYI0eWZeKaZJkoXvynJBTLY3Lc0kwzwf2%2FR%2B9wvSy5q%2Bq2Cg0GmaMVFyO6kEdEhh%2BMn5bQRJuOrVxII&X-Amz-Signature=3eb3708c98881c7abb8f4956051ca6f7f6643a839f4bf0ff206e88966d2b0015&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4DRMZA2%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCID5bu9xoK3ftF7ZR4pjEF%2BPaOPNuIE11YPLalHX8lGwwAiEA4YHtsaXNTroogQyh2IACvMKE%2F23Zt7gOnrzAWXIdD5Aq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDF7LDigI4kPZ2e%2FdrSrcA1RaUOvF53lvCDenjlwp43dUtBLoc5MBQORZK0yM7jvgtFNGwuOZ5j5%2FmTvVztsHSGKiJ8eKxeASXf72diD%2Bit6tkY1QJ%2BE8VHB%2FI5DzqBLyDtqJwJa%2F0tjC52aGP87oBbMsUVADGD4Mam%2BLAuPu0M9g4CV%2B23s%2BuxqbkH0eftEh7l6i29pTsZn2sfAOl1GCjWC6Ug%2FtQH7qBhdoohsVdWz6lV0Kla6m4CzutIMpoV7t%2BUSTr%2BewFEg75XqzsaC%2FgkItD0pqMiv0X5O05iBbX8S8zHUWRWB%2FtGWEQ1iwmHjOdFKIGJ9i1rWFKl7D4SxDHXmZicic8%2Fny0FuuiEdilFURJZtB7iPYrWpdSGrOJ%2BaQow4Qiw1EBUdMQRN9DQqWmVwlNdhqJze1WweFR%2FhZ6AiZSzcbFJeVKdCEulZc2%2BYWEmd2v077P8QLPlTlTpuNTZBbTxkXy3eVpS3i9tx9eMYIgQFpaOJdpwtNlD4iKVWXC1dL6STl3OFfLARM5hy7zJCXm9b5i%2FL0ycR57ZV21Lp6Vh0sDF3Vlf%2FA9P7lgA8NKPD6nrY%2BATv4A2Ec70bJ1%2F7qFm6GgLp0lALKbSzzEHa6%2FxrqAEp7d5nKu%2BrGbAUEdK8FHQdQivqGRTxqMLGYks8GOqUBtzHZpppxFEZ8S3d6tE%2FOZEjn%2FdCUqiqczYLnu08ifnbYEKco%2F%2FGQt2025s5BKoptP21rPcnqaZ6GTqn9ROGdckiWDlwg0gN%2FEZR7aJWvjZANPLxI8PWu8Mfoyz37cYdoSVdNsJUrGSiQwzYI0eWZeKaZJkoXvynJBTLY3Lc0kwzwf2%2FR%2B9wvSy5q%2Bq2Cg0GmaMVFyO6kEdEhh%2BMn5bQRJuOrVxII&X-Amz-Signature=7a002cddba19708126782589d589530e443bf4124c628fe677806337c36c2a17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CEQF7NX%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIEFQ3tiMj6PMmP9dBJntgOlRDz25d9MxkAKgHtrOGQ2nAiAjPTzA5LRUiOEbd3F6WePkWFv8upiBFg4W9E%2Fl92f8Lyr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMZIiHZSnZeN4h0cwwKtwDmqk9cjEqMTQx5K4wu7%2FipX2%2B4nqQyODieWHvnBX%2FJr%2BX4%2BoVpz9BLeC7ELz6vzWWIV6urwYWPLyswrpH52%2BM5KVE3x90KfHsODp%2F%2BOdrxo74hxb9gv7gdng4TJvfy26p1gis1S%2BBnRoGryYWWAuuonSPKHszSdwZwN7YnWwCxBaxaWA4BzNGxveR43DxHYDl5FxsvwxuhqtCvSQZM%2BSVMZEygu2Tq%2FILi%2BeDE5AJKJqnjPbD3fVUjOVd%2BQI4lG%2BeNrL3vgaTYwYg7C%2BF0%2FxauDqbaB7qLyTooAQKhSIo5sypSNhk%2FwlwqtBt8bai%2FUYhl6LGuZcKt1feTQfxLuykmhB%2BjKi7wVFP7hdZtqvf2SBBa2snG%2FRJNh5lbYvQLG9lS4DOMX91fjTBeyDyAHzuRYwRGl417RudmJz6Uq3Qwbfr0pzGezcLhKFTMOEAB78UiYrjyFD1AzopjvBIGjgwtqaaSgA6cQJ2KWNqcaAaioDvJQyuKbH5rgd6j2vj2f4ozKJNN9XtM9IbyTNCX6QFwyT3Eo%2FiGobVx%2B0OqsLbuPyy%2FXIQQAXvQpVi7xmpotCGod0tY%2FcB9lAuFtYNUivTGorZqvZ%2FUG0Awbfsi%2FgGQgxmBMF1FsnumGBmS%2FEw35WSzwY6pgEwelsqCay8sa1dF8mNsfap%2BpNOiRuCEZ%2Bx0nMdTor%2Fmo9eTFXtrPxpBQ%2FjbQUfFfVp8wWdaXumNg3oA5VAwLGMBLPktAWu%2FbOjb111mtEjSGJiC5ugD7ws6gpqJhzDfVX00JmJ69SrkdNmwG1Q3Zm7ORl76PRqeSadxRXG04DCh8i0XFlFCZPNjC0kS0%2BAK5XVVkyyKACl5PIkuchCnhEQHfw2IhbG&X-Amz-Signature=fbdcc72decc7d1fe0124edb8b146cd2b05c06ccd060fb22328607fd537d814bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PFUDKFS%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQDDfYMvsyYST7xfXunMe23GKPI%2FNTqJO1qX4rFFXxldqgIgGOBDSluE37SZylzJPh%2BQ%2FXYV7ZXwlnyFp0qph6WADhIq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDGrslLq4t7vsfp7lHircA1pnUIm6noCRvJf9RFJeyENTweuiswfO1jjYUEV9RTdBgDnLYJus9vKHe3jrfuPImSQajbFT1Gip1A9BLl5lyuuK%2FP1r2jK6fJW109wVQVhG%2B8oDZNY6t2po66V%2BQ1JHV9vreeEAzSbSNXw8SR71itblC7QHOLSsbxmpapYjRIiTX4Urtza9RNiN%2FR8PXiZtTcALrXbk0twQU80MEdx5LeSaOEEjApVXgHtIYUR0tsFBeyLP%2FT3MD2dLK2iLysKl1FkCs8BmckdoatEozMMgpv4snVSUzJ0gL81xXYrMIDrtJMl81CWvT8b4B9pAH%2FdbQ5f9f1WBHTVNEAFOPUB1fiJM6jxy%2F%2BiCEBjTWhi8bWaQB0jVw%2BDEQtbJhsubhaIHmRPhifh2Su86Vv0NBuHMDKLp0cLmg3pZ5ETBAa1zTNrVnFSnltB5%2F7R7TvROl5gKcVruHT9M%2FqAdB8TWYN3F5Rbz8MFq2qO6SIijkTGKXu3%2FsGr4%2FnLy5%2Fi08yh4ttdKXcMRY57r6L%2Fc7B5xXlvMCWR8rUzWIDCxVYP7FpGJ%2FHyfTGem2fUC0%2B5vNFHgLf0YNFyC73%2BgC768JEuDcfoIkbQbdpgJ3mi743sBFpKqNIeAaAl7tJ4GvFjdA%2BJOMO2Xks8GOqUBfZhfRPjtUvUxGDxHvgpHZxcpECF1NuhKeDfVV55VUCBoBJTFSr%2F1BrTVGaeND0xe1s0DBYNFRoOgO1q8tD4yM61%2FLTGjxu2L%2BmL5AGJAdyVQw19r54sbsyOo4yEYF7jwKgtPhIMd1zVNbkC2UAc0QMqBexfVxlhFnbZWqux%2FE%2BTAewJpLseQ6AcvfmDBFWfpU%2FPF8ESFWroDUpu1CPQP%2FYqwyxwp&X-Amz-Signature=7771dbbb85e431600968a7a4efbcdae7b52e7cd5e2d20ba95109d392f7d85cd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PFUDKFS%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQDDfYMvsyYST7xfXunMe23GKPI%2FNTqJO1qX4rFFXxldqgIgGOBDSluE37SZylzJPh%2BQ%2FXYV7ZXwlnyFp0qph6WADhIq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDGrslLq4t7vsfp7lHircA1pnUIm6noCRvJf9RFJeyENTweuiswfO1jjYUEV9RTdBgDnLYJus9vKHe3jrfuPImSQajbFT1Gip1A9BLl5lyuuK%2FP1r2jK6fJW109wVQVhG%2B8oDZNY6t2po66V%2BQ1JHV9vreeEAzSbSNXw8SR71itblC7QHOLSsbxmpapYjRIiTX4Urtza9RNiN%2FR8PXiZtTcALrXbk0twQU80MEdx5LeSaOEEjApVXgHtIYUR0tsFBeyLP%2FT3MD2dLK2iLysKl1FkCs8BmckdoatEozMMgpv4snVSUzJ0gL81xXYrMIDrtJMl81CWvT8b4B9pAH%2FdbQ5f9f1WBHTVNEAFOPUB1fiJM6jxy%2F%2BiCEBjTWhi8bWaQB0jVw%2BDEQtbJhsubhaIHmRPhifh2Su86Vv0NBuHMDKLp0cLmg3pZ5ETBAa1zTNrVnFSnltB5%2F7R7TvROl5gKcVruHT9M%2FqAdB8TWYN3F5Rbz8MFq2qO6SIijkTGKXu3%2FsGr4%2FnLy5%2Fi08yh4ttdKXcMRY57r6L%2Fc7B5xXlvMCWR8rUzWIDCxVYP7FpGJ%2FHyfTGem2fUC0%2B5vNFHgLf0YNFyC73%2BgC768JEuDcfoIkbQbdpgJ3mi743sBFpKqNIeAaAl7tJ4GvFjdA%2BJOMO2Xks8GOqUBfZhfRPjtUvUxGDxHvgpHZxcpECF1NuhKeDfVV55VUCBoBJTFSr%2F1BrTVGaeND0xe1s0DBYNFRoOgO1q8tD4yM61%2FLTGjxu2L%2BmL5AGJAdyVQw19r54sbsyOo4yEYF7jwKgtPhIMd1zVNbkC2UAc0QMqBexfVxlhFnbZWqux%2FE%2BTAewJpLseQ6AcvfmDBFWfpU%2FPF8ESFWroDUpu1CPQP%2FYqwyxwp&X-Amz-Signature=7771dbbb85e431600968a7a4efbcdae7b52e7cd5e2d20ba95109d392f7d85cd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSPFKPXN%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T122932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQC138343hGqhNpdFf798WlHkkEET4gZcE5iBbeD2ZdXegIhAPmZjMxNs0b6Kjz8%2Frw58MZJWVBZLjsnxq9aR8%2F5G6HyKv8DCAEQABoMNjM3NDIzMTgzODA1IgxA%2ByePlIwL6Sbpb4Mq3APyed%2Fb0VvOKnbHZ9UXAP7YAV1bWcRMSBfqyxlWO%2F77DSK5VIPeW8eo3pNr1rnNHFqwlKVy8KnPzWa9NK8d0gV18Y9x6rSqh4897sqwiIbaUtWHRQIy%2F%2F3YA0iQRR5lPYXH3o%2F1782I0mXf4rRJpocBJSf0B4Ru5Qr3wkXI0KhWAEeGU3XcrT7wUmory1kpFasU1No7QaVYEEfK%2B3LphEv6AD25%2FcVlOVq5d7L3JvazcIgC7SbdzEMMlYPwK7ReREWgbHPZG%2Bj8yt8VCR16yWYCl3np%2FtBWiX4GRXznI5JfXIQ%2Bm8DHKVLnKPYCjNPYGM3HUFlguTucj8SBlcmWoeiYIQulzJL3R%2FP9%2BJul8i0juX77760VVe2E0o3LCY9M%2BnBKoaINgZkS7nctVvuv5IhYKF3SKPEseGlLvUDQ9GKzuICkvu9LlqzImsJQ02iave097Qi3EBJzIiwQU%2FbfIFDoAShzhdI78kwSAGDrochVTFjlftHajiqxKObxRO40nBG7cI%2BEJ%2B5ABoRxgyr5e%2BNsJZTEunoVXczxI8CnCYPSsIB%2FMpDqH9WVdfsVh3wsNAiiGbDwTgKhgTcTKJsDtrvTCaMUYsL5vPt20NoWXFjDvZ0O4qaaAq7Q28YWOjCalpLPBjqkAWq0NWC6ZSBS9xybbZbiYCWHrRpIY5%2BzFTv5wOE%2Bwro1RqB6KKquqLNH3P44d6N%2FZpOuKnHlimUNclXRVnhLNlRv9Gt81IsjkG0DLS%2B9i65dfBgt%2BFGqNqjUX26JNdZgEHtb55NfWoiUDug3y9gHCvopTSGOBCDyaAm1rhXhZzYppRhswe7rw%2Bc9Qiq%2BR0pKb7adh81zPm%2FQ5gqDWOUgZddPNu7t&X-Amz-Signature=1114a29cbdcea417677d013c9cc9172a0609f8ce2d2dbd329acb52713be639e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

