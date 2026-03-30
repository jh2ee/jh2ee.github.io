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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWDPBEBL%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIERUeqbbKzmAmTMAkIO56%2BYHcmqxdJy0J8CsO3CmkWxeAiA3H%2FPmgkVSmjFW7PBb5naH4oRLK0uGArJ7VLjD%2B22NLCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMX%2BWkSbyiU%2Fe%2Fo6r2KtwDeqGMDEYxTXV4Zs%2FO33DVgn0uCg7EfJ9cuFQldLt3yyIkpejFGrAYg25rH%2BtHG84Y2ehZvRZAFGNTFAaLXnsl5RjZCOJyEghththbPBMm5cPwZIJa9vlTvIk2RYWRjYWokvoSk0UhCumBeFdlU%2FdVnsibxLIcs6EwH4bdS3mKq7W8XntWz4npsVQrDOk0wPEIrdnnaQu1NktI%2F%2BO5DWnosARtXs%2Bd0DIbav%2FHl7tauiuz5PawMBGdkS4x84NkmBmXZhjCpQzHNPVLeCFDVlBW%2Fktq63VVLiA2h98Ifao4Yyq6st9ilVHahKacTfyVb6a82vV%2BV2G29oXlC57%2Bq8GV2Z5y1scKCM670buUlawlm%2Fl7pqrcmK6qA31B%2B02VWVdHF4eMwOZmq8j%2Fk6crMgm5%2FHyw9lZWY%2F2EgWB7GopJnR1cibP2oguNfiVzZIK77xAafvthU0pzQRpFvd%2BJLn9SxDXbyvxPdEc5vQHcipzim3qK631O%2FqnbTlq5oxGtr0ybvJdH047ajje7QPaPxIsa710ZiJLFXq%2BZsbPRByN61SLTFjuv0tK1A8bQcbuckH2NaCyzgYlUBmhDKocHFjvAXqwkyxaVsamZuZV4QV3TyGyoT6NsEJzyp2gXd%2BAw1pKrzgY6pgH95dfbA6qvg9qjprRLVO%2Bu7nNzcdiAEQx7sEOVImkgt0NvQm6E3yS7XT7M%2B04zR7%2Fv%2B2qC6JxtC29HK2zXq%2Flk4%2B7CvGOjDxUUD%2Bpf3mVElchouT9DgJx5ewBQ%2BcU0Cko24jzyc2TiarHwFkU2%2F%2FlmHTQdnjfs0wquEHrCXRZtj8EC5sijPVDv46YrwT3Tw5dygjhzuoW3hp5bqsBtJ%2FESr0tkTCcP&X-Amz-Signature=f31b626a9b1c8d628f7c4981ecfac92c71086627ad9230cd9d57b2f6b20d4ca5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWDPBEBL%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIERUeqbbKzmAmTMAkIO56%2BYHcmqxdJy0J8CsO3CmkWxeAiA3H%2FPmgkVSmjFW7PBb5naH4oRLK0uGArJ7VLjD%2B22NLCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMX%2BWkSbyiU%2Fe%2Fo6r2KtwDeqGMDEYxTXV4Zs%2FO33DVgn0uCg7EfJ9cuFQldLt3yyIkpejFGrAYg25rH%2BtHG84Y2ehZvRZAFGNTFAaLXnsl5RjZCOJyEghththbPBMm5cPwZIJa9vlTvIk2RYWRjYWokvoSk0UhCumBeFdlU%2FdVnsibxLIcs6EwH4bdS3mKq7W8XntWz4npsVQrDOk0wPEIrdnnaQu1NktI%2F%2BO5DWnosARtXs%2Bd0DIbav%2FHl7tauiuz5PawMBGdkS4x84NkmBmXZhjCpQzHNPVLeCFDVlBW%2Fktq63VVLiA2h98Ifao4Yyq6st9ilVHahKacTfyVb6a82vV%2BV2G29oXlC57%2Bq8GV2Z5y1scKCM670buUlawlm%2Fl7pqrcmK6qA31B%2B02VWVdHF4eMwOZmq8j%2Fk6crMgm5%2FHyw9lZWY%2F2EgWB7GopJnR1cibP2oguNfiVzZIK77xAafvthU0pzQRpFvd%2BJLn9SxDXbyvxPdEc5vQHcipzim3qK631O%2FqnbTlq5oxGtr0ybvJdH047ajje7QPaPxIsa710ZiJLFXq%2BZsbPRByN61SLTFjuv0tK1A8bQcbuckH2NaCyzgYlUBmhDKocHFjvAXqwkyxaVsamZuZV4QV3TyGyoT6NsEJzyp2gXd%2BAw1pKrzgY6pgH95dfbA6qvg9qjprRLVO%2Bu7nNzcdiAEQx7sEOVImkgt0NvQm6E3yS7XT7M%2B04zR7%2Fv%2B2qC6JxtC29HK2zXq%2Flk4%2B7CvGOjDxUUD%2Bpf3mVElchouT9DgJx5ewBQ%2BcU0Cko24jzyc2TiarHwFkU2%2F%2FlmHTQdnjfs0wquEHrCXRZtj8EC5sijPVDv46YrwT3Tw5dygjhzuoW3hp5bqsBtJ%2FESr0tkTCcP&X-Amz-Signature=f31b626a9b1c8d628f7c4981ecfac92c71086627ad9230cd9d57b2f6b20d4ca5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIP45UMZ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCAgskYefdAafx6uu8Dc7v7aCczHM6ESmKMM0%2BDtIa3TQIgPV06wexaeMDnx9zF5aEfpI3ncTfYw4gB4Zr0pPe9vFUq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDGdkVBCNy2TSM5cj5CrcA24QAf2tKhMdLjd3re4BNObecj0IDL0vUeP3%2FXVonc%2FoDZEG%2FmXhmUYiecd4FebUBFcukVjy7yGOKfNqjUrYeyXw1ZTlbfxshGD30sW6ZWHqWhj5Q6iwqj7p5vUIrUGtdwhulwzHjKs98t%2FCUhsvCXjJp%2FJlycq%2BsblsPtxam%2FjW3ifGFbEq3ebiQEuQTDNT70gApytctKKlSuwlxqiWBx2Ap1bWBBv2qLIaAGpXwBPa8yTmdJU9SvSqKBKoN1hiDCEixBuyAvMf7TO0gebW%2BZ2B6X1JOjoV%2BCSAbBjjwtlFPJNdvem%2BDaRxYKgoD7P01qiZ75XayPjW4Pr4OjthjtLJSu9eAlhVw3OlfOKV7AKkkpsgC6ANcQy932BszO23mD429USh4Xs%2BhLcM6A0faH%2FHRTEQAHYqmWZ%2FeWnne01jWgI31uafY%2FG8OJQLnlerfh06GRFRxFRtMOsbj1ZrmtrNC92n7qeXV8rWWCEZlmSRulhB%2FXg%2BvbLJ0idi0FsND86GVN0PavQTPhGh0nia5AWOd3A0GRMJwRu5qnflM5XgIpT0SJZLsimKe%2FXdqAsdRhH9qkAHfmP3TbYfH%2BHMsmp7u104AVeBgbjpMxBD3gCqeb6jPJyMS5OUIukaMJGTq84GOqUByIQyhNV%2BNp4sK5GxdVzLDoZtEtpST931EBlNIvuQrhHNXGNW%2BllRTIdXlCtDvOqiJQRe7kfpy0yldGNK503X63KklpJgD5AAqiuCim3T9YW8KEziOkYnr9yCgL49rgPcy%2B0b7t%2Fg4rvQEfmabblb%2FjyVpL5qgEmS8NpScyzJZrTr2bqOiOoT8jiU%2BjlkdZmqY%2Br9qTyMXOjd%2FKepAwDZ2vZc1uhq&X-Amz-Signature=ff4de869fc026a61c3c31ef9a6bb6b504e504b64a5b4e58fe6a6b598619cd56d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTE7RY2K%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIAoGH%2F7ZH5MHi%2F%2FvjoysnQy1rCeSHxBXc%2Bvh9EeIR%2F0oAiBvMnV2Ytq1UvSUDbACUafggF9plCcyxbo1vANyZsg0nir%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMAQR0U1orqCvJzeanKtwDva3l3Q4oEiaU%2B%2BtW6MJagqgv6CPye2y9MHfwNaG2xnHtYPy816mvGhw39X%2FFQZgJimXradXeHvyxoPbmivQfyexAfcD%2FFup3lYUlBPTQxH%2B8sIcm2iXGq1z2dg%2F7t9ui2Pebo552Bwntk2N0re7BMr8Tj1KzRxappvr%2BD9ufmOZswpz19D%2BEf9r8qfNWt3WtJJguNxdUA3tusKINRJsHHqDPVLcoGisPXWhkYTID3IHlGcRAZO%2BVlwRCmeR%2BEJnYgwrXA5NPMNfGtjLDNbOG5lLAyGAXlvJGgeUPOjpb0MzOgXRmYWn4m%2BIxY97EsUJwghim7yumI%2FvitidxuqQeOiv16yH2rixxDJNFufxYheR%2BuH75KuNvG8hlERAo%2Fk6t0CzANYdbUZ3b2JKeZv%2FFDYXWqKOqF3gjCvrHHhacFrjCd%2FR%2FUHV3ju4p4v6uPvZa1As%2B2BAPSMjAS6oSH9hX6GE6bWeTaSPLb8YvgQrSry9ghi2mhuIFds24av0aO9zQLPYyB9Mq7h2NmAl%2FVlCP%2BL0ok5UZkYyKqu70UxsaNxeDj0LsL8I9o2MF%2FBNw6SR2OUG9k9cdQdX44TZ7KoPvxB%2BfbRWSr8nL2KrV0OzBQm6a8swjXfheQV1bwj8w65OrzgY6pgHF9zx7pfBC4uUc4TgtdZLhPd9PxamYmdSA2X8aYV5EcED3Op39wfyNPNF7dWQGxOzSJVJo9CWUZHuWMiUYZw3iorhXy8g6rg0w0gTL6A6kHoHz387t%2FIkJB5zz5TjIflAB9YCv70ClARI4x4NkNKoc8cMUntzWUPtsfBA02lHixj29AqvjvnI3qI6ivQTYabRRZGQM86CnYctsFkxrO%2F5OOAb3x%2B%2B6&X-Amz-Signature=c8f8635370439018d89bb20535d275f2fbfa3a352894309e099b645860f4ed65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTE7RY2K%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIAoGH%2F7ZH5MHi%2F%2FvjoysnQy1rCeSHxBXc%2Bvh9EeIR%2F0oAiBvMnV2Ytq1UvSUDbACUafggF9plCcyxbo1vANyZsg0nir%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMAQR0U1orqCvJzeanKtwDva3l3Q4oEiaU%2B%2BtW6MJagqgv6CPye2y9MHfwNaG2xnHtYPy816mvGhw39X%2FFQZgJimXradXeHvyxoPbmivQfyexAfcD%2FFup3lYUlBPTQxH%2B8sIcm2iXGq1z2dg%2F7t9ui2Pebo552Bwntk2N0re7BMr8Tj1KzRxappvr%2BD9ufmOZswpz19D%2BEf9r8qfNWt3WtJJguNxdUA3tusKINRJsHHqDPVLcoGisPXWhkYTID3IHlGcRAZO%2BVlwRCmeR%2BEJnYgwrXA5NPMNfGtjLDNbOG5lLAyGAXlvJGgeUPOjpb0MzOgXRmYWn4m%2BIxY97EsUJwghim7yumI%2FvitidxuqQeOiv16yH2rixxDJNFufxYheR%2BuH75KuNvG8hlERAo%2Fk6t0CzANYdbUZ3b2JKeZv%2FFDYXWqKOqF3gjCvrHHhacFrjCd%2FR%2FUHV3ju4p4v6uPvZa1As%2B2BAPSMjAS6oSH9hX6GE6bWeTaSPLb8YvgQrSry9ghi2mhuIFds24av0aO9zQLPYyB9Mq7h2NmAl%2FVlCP%2BL0ok5UZkYyKqu70UxsaNxeDj0LsL8I9o2MF%2FBNw6SR2OUG9k9cdQdX44TZ7KoPvxB%2BfbRWSr8nL2KrV0OzBQm6a8swjXfheQV1bwj8w65OrzgY6pgHF9zx7pfBC4uUc4TgtdZLhPd9PxamYmdSA2X8aYV5EcED3Op39wfyNPNF7dWQGxOzSJVJo9CWUZHuWMiUYZw3iorhXy8g6rg0w0gTL6A6kHoHz387t%2FIkJB5zz5TjIflAB9YCv70ClARI4x4NkNKoc8cMUntzWUPtsfBA02lHixj29AqvjvnI3qI6ivQTYabRRZGQM86CnYctsFkxrO%2F5OOAb3x%2B%2B6&X-Amz-Signature=9d85f6cd9121d1d71363391a888f13151c1bd9659c813e3d21a46eb1991331f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675MKCYE5%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIEXIOr57wvNCfAvZ4p8JPswoa%2FkA4GJAN48Ncv5kocIkAiEAnieyKvU3rXRBOMIt4RlvwqRwdJkP1pDllLYX6u4Ly4kq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDHlxTzn%2Ff9uX%2FCY7PSrcAz7siTyP6%2FXw7WxoXQbIBDF3vdTsqtQv44aqxl9emitKXK%2F6NaD%2FM2hYMBb%2FWmD7is2AAApC6D9spvHjMKsm%2BugUTRnupvA0tpsZtUbc1%2F7767QaULY3ymPH5dEuck%2BNdp4R3PaNtba7Xfm94sFYYsLGmKq0LK9%2Bu9WyIh6ZOzeD%2B7IIsJCJVvglwY4rNthEdpimqLdeEc6lXK%2FuxdxUNvSt9A7T0oJ4Mr%2FCBJxl76Hl2zhlhZHDhBW%2F9HJr%2BtNt0mFUVTBpzw%2FiYL%2BRhU2PO8ljZk6Qci1UecvqnmgQXZFKhpRPpRcvv1R3keudjk7%2Fx5Kz%2BmQw02uQYwfuM4DgxkQer3iT7y%2B4XcHtfcMArLgi4nagf7BsHFXVgriA9HbEUZMUFqjtThzG7q7vP6Qw0cK8xWFZqXbZ1KOpNOCcAlPvqJvfUHMhXh%2BEewlzJNk9wHZZOMNyRKC%2BvlexxBU4zpm8608rR0e%2FBEZEsDbdi2V8QzYXGozUNsMLRTMTz1pGccwL4KFi4QCV1yXVEJptmiZpzBYrWb%2BARM6XuECQKChFB1W4u%2BunwPhVgUDoQIYX42wnnz%2BYJPUL8fdlhNHkNVIQDJSU5aYcJGpPa15Wh2u36GdUmY%2B3j%2FJq4n8aMM%2BTq84GOqUBIOFECtMmD9mGd4UoOmkm5K1kzp74AOTzsVdhNniPm%2FDI4SXN00J6frfxhiNk3WtL5HuG54%2BB%2FGQgnPc%2BGJhAE5rhb0urx%2Fh%2BwAl%2BbC6BJyfSpu3GW6RA%2Bqq60WgRzjcak5iTDiU%2BMspEKvYMzo%2BGf9ArLPo7uOyzvVVJfyYvSswVNouW96UzlV%2FoBJRLaSlvJjU8ii03Z65RmNVBP5ZIHnp%2BeY79&X-Amz-Signature=8a4034298d67305d06c5331b9e13dd77a04536c8115d249b1fdf5134e73933b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635YMYIJ4%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIA7kxpFJQjwVHUgLRkrc3oz4TdpwLdQuPbgia6XxSfPtAiA11TUVNdKDK1hRVWSEJx3JJzcK15GnlG%2F9qLPQ0bMaMSr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMo1kvrKwPQ%2FQhVqcNKtwDL%2FAKEVgpaL5F5ZxCOjnkMLiTyD9x7RtFUyJwre77iJznL2067lqFhlPGiUwAew8NTY0xIPFjtgvL1w%2FJk9Vmiz0SVC53J4bJ%2B7wFVZbgE8PqnNoZrN7U41FJU7aM9gZj1k%2BQtiPjVVjYnJJOEjkTQ2Kx%2F7ZLvb1NPaJV9sdCRP%2Fxgy0fzQ4Fyk970HKgDJ85%2FRpCs0W3FQGO06rs83rZSo2FWrB%2FiQML7Kq5NhF7AgZmXcCd2x8p4lPPoqTp%2BbHZfhZ24x3SQINc68EF8wK7VRYociiz7Zv05eftTe5%2BG85ccHr2oStj13AFu0%2BqYNvrZdcJkvOrISxjvG40GYACr4m%2FbuRtfnysIuiXSZpKzDJqm7bdNgeGRRM4%2FrCzSgbLjsUpAJlCIOsPQw%2F55KU9%2B44lO9SWbAHyfFUKNTRYDG%2F8ZG1D2pPYsXVpkpuP91Z%2B20WYvIBz7lVoJo%2Bjiy158n7OSt%2FJBqWz1%2FU8IAKtORZVRFCEdZDcGRrqGCcHYWmudyi3c3OljbQOeqqasAAGpL6K4Xo0pXje4osODNmf5wx0KsQLxkBrpF%2F5OhHD6cUoEVJENgHK6wqRaUtOmqpiX6NdOCUTIxDn6Pi5%2BW6TZ%2FVc%2FOf6qJ3%2FNHeCPw4w9pOrzgY6pgH0rTC%2F6NKJRgFevZeYw9ULc0Wruwo095zo1M6AVp2%2BQkiszbekdioQSHmtdyN8SlJhIuGqmMmnsgV20p0LE5CCTpTKoY3wCXh5CzAg%2Fbefsn6a4%2Fmf3DutScnd7MhbfErHYmTCCESqxh7XP1mpIC%2BoN%2FOs5TNFrJNO1kvsX13IG96ccY8CT9T2miA926I9z%2BDOvprI%2Bzzpw5tg1Smk5f%2BlqB4LaFeX&X-Amz-Signature=1ebae9dc8dbd51a9350b1f2d55fb044cc9062815427bea8f62ee51c6c8212052&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DMTA7O6%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCX4Qvs9XywPFE57aN3bQXO%2FyX8%2F71ERXBQlgEknMC8bQIgLyX%2BHfmrGvuTMgfWYWPHzdTFfmcow0I4XUGi63aQK%2Fgq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDNl%2B%2B9eEVxilGwypPCrcA%2F1g1VohbCtQZ1humNrW%2FzEhekenHhhbsZG3GDdOeskrlDBXfX7S8b54gCo1AycgZHfvKjdXdhDKqAxyFBeYoXzZq7VGUPP4N5eY5nexZMXByUGBlOGpDkbguB4VhvkUKBlGgzV3ha8t1IqDrdAUcMGhAOZKeqjcSfXEMzgh4vIKYSbjBzXl2IXybwd0MwIJt0jKxaZ6Qmgx%2BIrD%2FMtxzgpLkNrQZ5gsH6WKu9hTL3sWNz9PLb5hdMBImM9gHpz73PaIiXtIG9H3HXoGn5tHusw5dzw8fPMZv6aA4v1JY9nqjj%2F%2FlJ9KzMxJ3czWCeFApYCl8jnMrHKmArn931pVDoYzK2E3Nd346DwPLMwkvc4uqZWJrAWfLb8NR%2BLTzWfVoVeMsiyyEQrIrpHtxgl0m3H5AvW3xdEyEwa5v2aCitWicc8f%2FkYTL2%2FFft2V%2FC%2FnlOinlhAUsf2o6GXAOw1Cw31TpkgEx%2BqVpN5EwpApStS7IP7WlVxhBQ1f7EalNTIJc7Oi82FoXytLo2KqbchXrPmYVuXQ63lt091XPrQDIdYQ9p4A%2F2teM5T1fL6shM3nbWr2AHYpjifhkt4QRRHS6Rr9Tr6dk4XsQ2Qsv7RoNMjbXZ19xKakjykcRaErMOySq84GOqUBQAQp06x26lcDH%2B8HH2IUXJu7wHPJQctuIsdtHcZf%2BlbSeBqrnRLpeEaHcghfCO%2Bqi60vtAn9v95sdx4yYK6Zvjb2%2FXIq3iDZj6CDj%2FeAwOggsEzlaMcRHw1KM4DtNXEV37TVFaVmeNw3uG0n0mBp05q1u%2FmcDGsZYAxmxSkfcyyKDjjdVdL4L%2BjedS4%2FQQfDSl0TewRsKrHkac0B5WnximkIYCdX&X-Amz-Signature=fad53317399a5df6f7df899ca0b62336c5b09c5d0241972c19cd134e28d1e715&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6AYH63Q%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDNHJJTiTUTu%2BHUeEV5SL3yshGF1kFAzZOGkzrJcDCZVwIhALDi3dp7PzXY1mBKQRHS0itkzwbe6R2xaVKxfnlEbAIhKv8DCCwQABoMNjM3NDIzMTgzODA1Igy9xYYgStVvuHZrd0wq3AMUUg%2Btwqnc%2BGVy%2BpU5peRGnmJ1yJXYHkfXGki608MiXN1uWz5YzkTCtB2akHtwiJTLrSInsDe5JX591SRq65FpUQqocjDYdf%2Bia%2FACvPEjy%2FOiBUVst9NKeibrNXHToGbhhajFH9Fq4%2BGKvnrRdsSpENeJB%2BRxRUH48yWiaVnVDD3rLn2L6xKTI24Ux9Ssx9S%2BAJHuJbm4D1vmX%2FhbhutSoiKM6hcrbDS5aG0zkWASbsfwpbXcTrwhw450GpUXZxIVMbSv5LRhqglcPVng7nZ%2BgHvPGGwHfbRb1hRBQSjmpH976Awgztidjj6hSdKlmUBCxt4dLhsB6o%2Fpz3zeFfLiCqDkAlP6iNeBijRt1MEGB3hNLHpbK4VMQ3Kz3%2FY8iuF02IIcrDm7NTYJLYfN%2FzUsynajkQ1XCJ42PZU20kGcG4e7Uc5YOZmB%2ByoFOykiRVRwCMd4m2kHUN%2BiomYSVMaVgQxrkDPZsKC6zOtPnp%2FKs%2F3wNj1WhbSaNwmMfc8tiwv6EjhqFwtTXK3UlZ0%2FD2sODr%2Fa%2FMS32ioYpanU2miPShD1V7xN83uCgMaNbdJgnjEBRJ0rk26QfbAyTU%2Bua3TkT%2F%2Fri1bkZ0Ip35lsBM8ZMHur4wOGqZSXk9mtQzCvk6vOBjqkAcyOYna0ALOXBwdDXw0n0xs7SpErNLxKOuzzso7%2F%2BGkIVEdUYXbjWo%2FxQBuYB7Y%2BLGWSp99%2FCB%2BXX3re%2BFsXNBgSp4Mh4QDUgQgpmKenDpGJVA%2FkWnjiva84ona4sZ4Ojvu9pULNNQwGtiTv0Fv7PKZpZ4MmNiwM5YSI6FF%2FctjfYVIebEsVwijOwEmeUJsgjeRSyl2K2DzDNrNGsxsFxnMjATQJ&X-Amz-Signature=f9e0d4888cc8bb0801a962c721e61d1fbb7d874832f3a7a34b7be2dd7f8408ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6AYH63Q%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDNHJJTiTUTu%2BHUeEV5SL3yshGF1kFAzZOGkzrJcDCZVwIhALDi3dp7PzXY1mBKQRHS0itkzwbe6R2xaVKxfnlEbAIhKv8DCCwQABoMNjM3NDIzMTgzODA1Igy9xYYgStVvuHZrd0wq3AMUUg%2Btwqnc%2BGVy%2BpU5peRGnmJ1yJXYHkfXGki608MiXN1uWz5YzkTCtB2akHtwiJTLrSInsDe5JX591SRq65FpUQqocjDYdf%2Bia%2FACvPEjy%2FOiBUVst9NKeibrNXHToGbhhajFH9Fq4%2BGKvnrRdsSpENeJB%2BRxRUH48yWiaVnVDD3rLn2L6xKTI24Ux9Ssx9S%2BAJHuJbm4D1vmX%2FhbhutSoiKM6hcrbDS5aG0zkWASbsfwpbXcTrwhw450GpUXZxIVMbSv5LRhqglcPVng7nZ%2BgHvPGGwHfbRb1hRBQSjmpH976Awgztidjj6hSdKlmUBCxt4dLhsB6o%2Fpz3zeFfLiCqDkAlP6iNeBijRt1MEGB3hNLHpbK4VMQ3Kz3%2FY8iuF02IIcrDm7NTYJLYfN%2FzUsynajkQ1XCJ42PZU20kGcG4e7Uc5YOZmB%2ByoFOykiRVRwCMd4m2kHUN%2BiomYSVMaVgQxrkDPZsKC6zOtPnp%2FKs%2F3wNj1WhbSaNwmMfc8tiwv6EjhqFwtTXK3UlZ0%2FD2sODr%2Fa%2FMS32ioYpanU2miPShD1V7xN83uCgMaNbdJgnjEBRJ0rk26QfbAyTU%2Bua3TkT%2F%2Fri1bkZ0Ip35lsBM8ZMHur4wOGqZSXk9mtQzCvk6vOBjqkAcyOYna0ALOXBwdDXw0n0xs7SpErNLxKOuzzso7%2F%2BGkIVEdUYXbjWo%2FxQBuYB7Y%2BLGWSp99%2FCB%2BXX3re%2BFsXNBgSp4Mh4QDUgQgpmKenDpGJVA%2FkWnjiva84ona4sZ4Ojvu9pULNNQwGtiTv0Fv7PKZpZ4MmNiwM5YSI6FF%2FctjfYVIebEsVwijOwEmeUJsgjeRSyl2K2DzDNrNGsxsFxnMjATQJ&X-Amz-Signature=558cb1b39d895ca980246615b83e9109b1691efa7b8b6813d8da40e2ef9ee040&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NYR3KOE%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIHDmANkktGmDPo7mVQBLiVAXrPV683ZCwiSHr186ahWXAiBYUqqVIBKD9QlpOMeIMz8%2BhOJiXd9NQCyNfnPRwL6F3ir%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMQMiDdXznCKlmzm0GKtwDzcjhb8ZaLtgeLEIL76edNpzjKBhb5ruyt5dgBho0laaQmwKnQ1qNj4bRqRGNbgM%2FxJ9b61IQwCYYb8bEeYyn5oRuiB14u2QkXRgM3A88GF6CTvFEr4cQAYhDpxCKa1VGw0LhXBPd%2Bv3SnKytft3CM%2BZnMoI1Qw%2FYUs7pl4kkUenL8ZQpzRBiB33zwFxTUoFpXdQhAxDBxCr6EzZN65U8toUjYHG0AmD8rhuQqmuzp2FRUDV9y1I1F2%2F51wShTsdt%2FxrZYhsBAdLl%2By%2BU7GGjA6ohUnAL4%2BiyzuLbg5aG6tlSICL%2BNL4mL3Kvg1SEENSNtgZWmP6l2%2BMAQ6k2fGlZcDPSzhc7b71MjvTmdt6tZtiGNg8NAP6jIfFmHk9bRQ05IY8JmqoPKkJLJhm3HgPjAGoR4WkMU9G02MSp9x9DTBXPjnEHpHEX0QC6FR6zuoaHTX477astvSAVsXK66g59uyhaTaAMyUKEBXfscgRqgZd%2B3W1QfpqXaqDnJbOz9jymVdIlisB%2FaVRmlerDF9WBQ3se7YH0jM5NzUbIfGbj%2BWg8ZpwzOEUFJzgF%2FmjFRbLsVRTcg%2FrwllJzF10FFMUp9xylugoFSu2cqv2KhTTfgy5zv3LIjkjPf61LUPwwu5KrzgY6pgHCIFuZwvKnlGafAR8RTA0H7lhR3FRXUY3TVb6j8fTKgIl3MX4Rs36bVO%2FIYKufbI43m3dUbYvvl0XHNkJIFeDXrzCFtVn9TWvTKwaCyc5oo5QsVdfoZguPNEfh0jePQKVPKiv1xvl3fdUV%2By6rQ7aw5vix6gYHnREOzAESoMYkQFJ2pl9wTCZRzpxedaDDku2zpFITi7Atrm8SpdgGZtCm3r9EaxG2&X-Amz-Signature=9f87d4ccae1a2cf3be079889580e9cb8c2cc1faf94b9244cca5ed217c7cbee16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662M4KOHS4%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIEpfCdn8AQNRYsWYMUen04v7qPV9bzKP3yYTHIzLnDXWAiBYXNRTX6AIyjs%2FUCCAbQRfIwhjbL2MjLrZQuusI2eZOSr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMf1idNnTWIB9RYVYkKtwDeOCujl6DswL46aeA9DFn3NwhGsfeDX0kbu%2BgKBkWZXJqOS2WxncVdSjs6NrXPAquIwxPQbtEOBqyGFjRrKw0S5O9KqDC0TgLdmbWZw0jCKvQjFI46%2FIbV0cYb9%2Bkv5KJEJv4WcH%2ByaIamZ2FWEDCTnMC8dLngKoil%2B%2FPTP9LWVkxrhZuS6sQ1H5qk6gMjGub%2FJCjug39Jo5zzEzGUiiRn3cTJIKtpYwWW%2B3vypjoGfihzwQrUfpaj0BstQ5l5jGq6tE%2Fgfe3ubOWrFysE%2FJafR3ia1s%2B5K%2Fw29TtHEeyBz7qZ5HEd%2F7CCP1z6zovkwXpu2ZsVnTsG79R6vHJroB0ihwVszLc29AWxNdK1W%2FmQWywfmErDB3WGYqaz29%2FMAqq6Vw2TPjxG21b3l3cTtL12%2BwtQixxnO7a9FanKlralBfKZgmNdunglILV0DYWvTwQVgr%2F%2Bc55Wz9bbn7Jkj12F72v2dGj8Pb43Jml%2BIqny19M%2F0sZk8K1yozrv0MG2xEr5fL%2FYU%2BU%2Fhj1E9zsF7IfQhumORUYqi%2FKLR7nUpf2fF1yurMyrxYChZuslvBWqoWKvtbD90el1%2BaQhoaI9nt%2F6yhOXXimJ5HH4aIpPBAI7TBa2fkV8B4URPESGvAw%2B5KrzgY6pgEtcTAQ68OrxdIh2xlhjEVocfl8gShm0gPH630WwWqe%2FKsn1xUI1pcPV5s6CIsB9TKruy%2Br2J%2FyooF8PbTZRWAwmTVpYnw0dqJ0HvuKFuFjP4PrpEYyEjtIbjjAn0vQG48yr6Qfrdh0jp1MaE%2ByLcqel%2BP753%2BGGZ5QyGIFfIsUIoWjfI%2BDiUwLnV3ACJ0U5iiy0uqPsc7t2qz%2FY18IoGFpEwzYvV74&X-Amz-Signature=526d30534e17721ced1717496cfa10de5a0261ed76056a0ece661f5570ea00b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662M4KOHS4%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIEpfCdn8AQNRYsWYMUen04v7qPV9bzKP3yYTHIzLnDXWAiBYXNRTX6AIyjs%2FUCCAbQRfIwhjbL2MjLrZQuusI2eZOSr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMf1idNnTWIB9RYVYkKtwDeOCujl6DswL46aeA9DFn3NwhGsfeDX0kbu%2BgKBkWZXJqOS2WxncVdSjs6NrXPAquIwxPQbtEOBqyGFjRrKw0S5O9KqDC0TgLdmbWZw0jCKvQjFI46%2FIbV0cYb9%2Bkv5KJEJv4WcH%2ByaIamZ2FWEDCTnMC8dLngKoil%2B%2FPTP9LWVkxrhZuS6sQ1H5qk6gMjGub%2FJCjug39Jo5zzEzGUiiRn3cTJIKtpYwWW%2B3vypjoGfihzwQrUfpaj0BstQ5l5jGq6tE%2Fgfe3ubOWrFysE%2FJafR3ia1s%2B5K%2Fw29TtHEeyBz7qZ5HEd%2F7CCP1z6zovkwXpu2ZsVnTsG79R6vHJroB0ihwVszLc29AWxNdK1W%2FmQWywfmErDB3WGYqaz29%2FMAqq6Vw2TPjxG21b3l3cTtL12%2BwtQixxnO7a9FanKlralBfKZgmNdunglILV0DYWvTwQVgr%2F%2Bc55Wz9bbn7Jkj12F72v2dGj8Pb43Jml%2BIqny19M%2F0sZk8K1yozrv0MG2xEr5fL%2FYU%2BU%2Fhj1E9zsF7IfQhumORUYqi%2FKLR7nUpf2fF1yurMyrxYChZuslvBWqoWKvtbD90el1%2BaQhoaI9nt%2F6yhOXXimJ5HH4aIpPBAI7TBa2fkV8B4URPESGvAw%2B5KrzgY6pgEtcTAQ68OrxdIh2xlhjEVocfl8gShm0gPH630WwWqe%2FKsn1xUI1pcPV5s6CIsB9TKruy%2Br2J%2FyooF8PbTZRWAwmTVpYnw0dqJ0HvuKFuFjP4PrpEYyEjtIbjjAn0vQG48yr6Qfrdh0jp1MaE%2ByLcqel%2BP753%2BGGZ5QyGIFfIsUIoWjfI%2BDiUwLnV3ACJ0U5iiy0uqPsc7t2qz%2FY18IoGFpEwzYvV74&X-Amz-Signature=526d30534e17721ced1717496cfa10de5a0261ed76056a0ece661f5570ea00b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJBRR73B%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T194440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDI%2BM%2Btb5FGmVXndSRuhn9fpj74Zk%2BA48TSH5rI0a6mQwIgQIVoJjcl%2BfTeHb5S%2FmV%2F9ptkSok5bEHkEJd73kQ9e2cq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCsYMFCSnJZNgtLY7SrcA61qYV7Rc2z6fpEery4XjJuLVVkt2EdStewgkWH9xToKE264l96PpfXzVXHVqsaHc4vzz1T8ah2ZzW%2BgkYVwSRVbu3yYsWPF%2Bvc7Aq9artniEeBy4E60jooErrawk5oTzeic6TDpZpyooM1zlx%2ByuBnBzaWol4qqDRWeStWCwxmul4p62Mv%2BakPmznbCYNQkM3zViRm5NwNI13IQC0%2BHtZt7UVaUki%2Bo9HjSBt%2BSfW6hmXTWair5nOQ04%2Fix5eDresDKzTEM2i5yardB4Lt0qtUd48T66ZOPB7kI5VUGpYPwVzExm3W5PglSqMoxfbtowDbONabLb2%2BeRwqt%2FGgeMr%2FAfA499u6CgeXZzSC822X7aEEakiXp13diRnwjmZ8uYi1BIS3YyycyFZHmY90yi6OTjNIFF39hGHgYeVMs%2BnNTMZ0gjZJcywcDUUKo5rQOwAczxFNnTITdVfvw1JEmi0Sz9vllX9eoM0s0kgYicH1DFnwtrg5v5iVHtYJodZRpUKpCFaOOYREjH0MDlWMsuTTPkCM25Br3fB3M6DLrkO2viTTU5vKEypPKFveE12kTyJ9itPSnoerUO5k7e52UwSzKWEeLUtIe24HF8AkUTaf%2BVaZhh1I%2FQHiMUR3wMLiSq84GOqUB17C8ObJYN%2FQouJTqEbtWKQOfbiN%2FD8XLPUo8haldtBsJUTXpQ5xN4A5gQ%2FUmWCo%2F8FO54LBysLSHrSLvfQPl7oKSi1QpAcfb4qt9hLI0OODjtXQjKqc8fSdclnC94FW3IDmlnCZAVO7OWWs3HJRZM3ITNg4c1gHD2X0TWoVz1i2ERbroot2VIx62QmlWZnbmhOjJdBoFDymTTGn2us62yfvPzCtw&X-Amz-Signature=1b04c76ca9798d9d2292abacd47b541053b046a22c4be73672db1b649b7ec1a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

