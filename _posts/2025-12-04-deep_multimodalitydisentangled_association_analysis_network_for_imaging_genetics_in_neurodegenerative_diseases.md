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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YZJSR7I%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIESDKZKUYNFZGfwdD8i06nzCGowTdn4LemO0s2ZMfCD5AiEAoqqzHupnygWcVjJGraP9i1P%2FCl0Ex7ztf2mKSGkiKuEq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDKz6x099GPvKLqo%2BKircA%2BDgrBv%2FpCzy%2BmNT1eYygh%2Buc7nmhV%2BzZtIrLDz6Dx6N5lvFLoIlQgx9B%2B1jTGvwxamgbEOoaNw4oO2qOVd1eyjpDJ3LduPDJ2081%2FK5TwcVWi4O9fXJ9mY%2B1jSYUAypiruXEQAKBHRQa%2FbWym4ScufIvhCIlJsxu6HPngkVvuPnQ0BapNi9Lhi0HRBB7vRMGsN39Ty%2B%2B9FV3MrDeJBa13tFxziwKycL48F7MGpf%2FMLSFPSmGQ0JCOTfKlAnEsSLtAPWyHYXw07EAyBruRJ%2FtxgOi7%2FlVldwibTBTnt%2BjeHV0iQY69XfTpe9eX%2BSjhcCl2Pz1vsVnlhZva6C4Hbj4ksCb9f%2Fzppq%2B%2FGVsFeMboPXwPrje139rM17ru8i80V8xTzuO%2F2LDOsM0iBBfMiCfrH4A6h%2FJieGQWNGPaL56B997YX63QkJYknSfkZrAiy2s%2B2X1Z%2BJi8sx20if%2B%2B4BRzXETYhP2rn4i50id4%2Fl0PSN8l7UGCbgYGduwUHnlBBG4%2BiNUcMeXA%2FhSmPwiUVyNFM%2BqQ1wfCEYPT%2FP22%2FeEx4ixtKrCOh07JEfX518UaGMwvW0loQgirN6pqIUYJGQZdCGpKQ4AWmJx%2FklAISA7mo9hWSBU1HCNCFPOKDFMLKsps4GOqUBrrzNCF5HVxs%2FBh0j299dsEointDS8OF%2FZeyk39uEr5674Eh8tqGF4%2BEX08AIhPUcwdr74qoJuwf8LbqvX35HMXvDMhe2nZ82JEVpbHvjpBPCc%2BB3CWyUNnc3Qk3evq7RWRfhEiNqkBcEPfxEbpU9gBInGfLDOMd4Z1oZYX1iSVwp1wD%2FvsROSNoYLUidV4y4kufLh6d%2Fa8cFxbd5bDEcDtf9ZDsT&X-Amz-Signature=a0f6950c7203b4fc8d22e2247489c9d12e59b1954879efd8076d6119e6e8bdbc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YZJSR7I%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIESDKZKUYNFZGfwdD8i06nzCGowTdn4LemO0s2ZMfCD5AiEAoqqzHupnygWcVjJGraP9i1P%2FCl0Ex7ztf2mKSGkiKuEq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDKz6x099GPvKLqo%2BKircA%2BDgrBv%2FpCzy%2BmNT1eYygh%2Buc7nmhV%2BzZtIrLDz6Dx6N5lvFLoIlQgx9B%2B1jTGvwxamgbEOoaNw4oO2qOVd1eyjpDJ3LduPDJ2081%2FK5TwcVWi4O9fXJ9mY%2B1jSYUAypiruXEQAKBHRQa%2FbWym4ScufIvhCIlJsxu6HPngkVvuPnQ0BapNi9Lhi0HRBB7vRMGsN39Ty%2B%2B9FV3MrDeJBa13tFxziwKycL48F7MGpf%2FMLSFPSmGQ0JCOTfKlAnEsSLtAPWyHYXw07EAyBruRJ%2FtxgOi7%2FlVldwibTBTnt%2BjeHV0iQY69XfTpe9eX%2BSjhcCl2Pz1vsVnlhZva6C4Hbj4ksCb9f%2Fzppq%2B%2FGVsFeMboPXwPrje139rM17ru8i80V8xTzuO%2F2LDOsM0iBBfMiCfrH4A6h%2FJieGQWNGPaL56B997YX63QkJYknSfkZrAiy2s%2B2X1Z%2BJi8sx20if%2B%2B4BRzXETYhP2rn4i50id4%2Fl0PSN8l7UGCbgYGduwUHnlBBG4%2BiNUcMeXA%2FhSmPwiUVyNFM%2BqQ1wfCEYPT%2FP22%2FeEx4ixtKrCOh07JEfX518UaGMwvW0loQgirN6pqIUYJGQZdCGpKQ4AWmJx%2FklAISA7mo9hWSBU1HCNCFPOKDFMLKsps4GOqUBrrzNCF5HVxs%2FBh0j299dsEointDS8OF%2FZeyk39uEr5674Eh8tqGF4%2BEX08AIhPUcwdr74qoJuwf8LbqvX35HMXvDMhe2nZ82JEVpbHvjpBPCc%2BB3CWyUNnc3Qk3evq7RWRfhEiNqkBcEPfxEbpU9gBInGfLDOMd4Z1oZYX1iSVwp1wD%2FvsROSNoYLUidV4y4kufLh6d%2Fa8cFxbd5bDEcDtf9ZDsT&X-Amz-Signature=a0f6950c7203b4fc8d22e2247489c9d12e59b1954879efd8076d6119e6e8bdbc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IRSNBCA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIFnvQvWj4OSfHz1g%2F9ZODpf0v1iV%2FhRENyqFhhOHkMvhAiALzOlrqkv1eJFBH7%2BSy83td5HZKnf7a6uXmAlItVE9lir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMxKbQ9ObFtAKTjNkMKtwDghrbn%2B1DrGzXmGdmuCwpazERX136yuJyExwPd6Fbd7NT0J1HnVMbqKpR3q1cisGqYF%2FUAgS2GEdY9QcuDrKO4%2B0XY14B9bYJwVTJ6SMq%2BZ4Kkw1EN0qGxFi2Qme4Xhq%2FLeujJJLGk82qR%2FbRaPxSVn6Qrn6wT3mMdazZAL0yJo4STM8cxN5X5FEPtuJ5Zbde9vFMZ5SFIKW%2BMYOEQukClbFPEYK0lLwaTQ34a01KtTC%2Bee%2Bn586jzbqT1ZVKWUbAIXHyu1K9l7GvZ8oT4qDAkDUPAq%2Fqr5xUxTH1T3r2Pm4gySLiBDMaC1HjWPupXchNPY%2FeXzUF4U2mRhoL8c4akCgkFEOs8R0V9T147bgI6jYoo4N%2BDHVCofhFuCA9RjN8lMdyOC6h7WHspc2%2BARWxUcV3X0xuxYSBmmsU9Ab2r%2FmcEJ8345bzT5FX0KSB74h5q8K5NWpoTg5qLwFTlbSXayRazC2LKWMW0lcU3zRHuAcFnP3ZRXT9NluX3JLFZpKZn1%2FWurqbBkDNT8O4P3HCBsWrclRjBxXuPHwonBWu6X%2BfN1lYOQRt%2B%2BfLiPtZGZ3N%2FAZSJgdSB0UP4My3cl2PWrNQlqG16rmluI7f%2BUxNJ%2F%2BC5GFWYT2QFqJfBdoww6ymzgY6pgG1pGmdZhLkrXR3v7zeATWlv%2BWsJSEfKGPKIGvtgCmustjxb3GPI1nnbKoiaUIkrlaDLUTEFcGNWVaQ27zA1V8mW7rG4bpXhgH4lx1MeINxBVLceFvZi%2BTMQzW9kOJxljXISxJnCcO8yzy6ec7Vp0fWub569S%2FsQDoapej8xDplCYXciwIxifXIWf6xl5J1bcc5XsmA8hDRuyRNPm4wvDvzzcUeKb3Z&X-Amz-Signature=3dcd3dfb6b76a413cf38a547a53780a6d50e3ec306dac253a476e9a95379b119&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCN7M4EJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIHP1v%2BuZIgzVO%2B3qTd878Fql%2FMNj3S7Ngfu3bEpJiw4UAiAVYFTOXYu45mDMNvhf1TWEfECefGhIUPnTcThwFc65Wyr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMiwwn%2BSuCIt00m5QjKtwDupLHxN%2FQyHH3eqRPsdVgwmwu3TzD0CDfXy9aQUbUEvEKLpTCl0jy4OrPp2m5C98dyYAk2bf%2FoAtCaNLoSRHGvF1N0ulSfG2HLY8hwHhqFI38bBFUZTb%2Fkb0kU2d6HAV%2B%2FC1gJj9BokfxtigxdSjeH%2F9XjTSdrepCAzdW2Z2G3KtIEOEP6RPNXnib2XC%2Bm6XQzZiHTcgMFAFfgBW9ir2hkfczXrMHFdrs9ebA9RWgDW4KQJhoduijGnrxMsng3umeEV5lXYTWCD9SSlKjluCzNumQGSEYWYSVpx%2BWkgd6c4J%2FOjhijORxljqkEUwLN%2FEpbPlL6GYWyhdpjHMssvi1oHUwEhC3Oi6L9hRAi66pKuUplT7CWkXXtL6OkhsQDI1jIHAva6O6KI%2F1KMwvGuESh6dstuiB69gGZ3N%2F7HfhaExtHczXSy4uZu9Z38r4MLRNW%2FQIzr4XoTA9Zww7E0OkSise7WlngqGVWgbKhHDyrWxYijxGymrfUagDc2LWC6U7dYLQxfMC5lqlM8SE4I1rxpx2dy53TcVwkZrJp%2BMvQjJ5Dgsm7DYKWp3u5cYDsTUE%2BufBzdDqrxdea2vo1okW6X6DfTZvaqAVd6k%2F9d31EDBsmfpq2gyqDUb1plww%2FKymzgY6pgHrA0prIJ8lKciDX9jQ%2BnqFbyw9iw9MKh32rOy4ew%2BiucTOoXwYdMZSr3%2BkE5erWVGr%2BtFspaW3lBprhP3C2AvGx5a6vLn79%2Ba4VBDk6ZELMN%2By53og84QxUT3beqYt3xcNuHj%2BgRoVv248X2b9mJ2HiViIF6osNN46G2IHypvHxQMCa1lizDnJwvzz077eowEvdflaJ2GNkXFE2yUZWcD1n2ANhrVH&X-Amz-Signature=a1bbf63095f138fd2bc694dc6d784e1089c4f4063757749af7523909ac8f3869&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCN7M4EJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIHP1v%2BuZIgzVO%2B3qTd878Fql%2FMNj3S7Ngfu3bEpJiw4UAiAVYFTOXYu45mDMNvhf1TWEfECefGhIUPnTcThwFc65Wyr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMiwwn%2BSuCIt00m5QjKtwDupLHxN%2FQyHH3eqRPsdVgwmwu3TzD0CDfXy9aQUbUEvEKLpTCl0jy4OrPp2m5C98dyYAk2bf%2FoAtCaNLoSRHGvF1N0ulSfG2HLY8hwHhqFI38bBFUZTb%2Fkb0kU2d6HAV%2B%2FC1gJj9BokfxtigxdSjeH%2F9XjTSdrepCAzdW2Z2G3KtIEOEP6RPNXnib2XC%2Bm6XQzZiHTcgMFAFfgBW9ir2hkfczXrMHFdrs9ebA9RWgDW4KQJhoduijGnrxMsng3umeEV5lXYTWCD9SSlKjluCzNumQGSEYWYSVpx%2BWkgd6c4J%2FOjhijORxljqkEUwLN%2FEpbPlL6GYWyhdpjHMssvi1oHUwEhC3Oi6L9hRAi66pKuUplT7CWkXXtL6OkhsQDI1jIHAva6O6KI%2F1KMwvGuESh6dstuiB69gGZ3N%2F7HfhaExtHczXSy4uZu9Z38r4MLRNW%2FQIzr4XoTA9Zww7E0OkSise7WlngqGVWgbKhHDyrWxYijxGymrfUagDc2LWC6U7dYLQxfMC5lqlM8SE4I1rxpx2dy53TcVwkZrJp%2BMvQjJ5Dgsm7DYKWp3u5cYDsTUE%2BufBzdDqrxdea2vo1okW6X6DfTZvaqAVd6k%2F9d31EDBsmfpq2gyqDUb1plww%2FKymzgY6pgHrA0prIJ8lKciDX9jQ%2BnqFbyw9iw9MKh32rOy4ew%2BiucTOoXwYdMZSr3%2BkE5erWVGr%2BtFspaW3lBprhP3C2AvGx5a6vLn79%2Ba4VBDk6ZELMN%2By53og84QxUT3beqYt3xcNuHj%2BgRoVv248X2b9mJ2HiViIF6osNN46G2IHypvHxQMCa1lizDnJwvzz077eowEvdflaJ2GNkXFE2yUZWcD1n2ANhrVH&X-Amz-Signature=161856a6eacb579e77626942f2ccc60e2a18b1063e650b6e9d3709a26f38ed29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7MRHZXP%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQD3UXoOop9tD%2BMsr3i%2B99qxdxC%2BXJpk8PI8cDXFaP36DgIhAO%2Fv0iJaaWmv8ob7iVDxyfBbUgzKJQaOx6RVb2yYnyNZKv8DCBYQABoMNjM3NDIzMTgzODA1IgycaOqlfZ%2Bo%2FaWrpPEq3AOXjlBgdcZ4D0q3sJJQbMt3A7WdVuox5diNJojMqQ8KXwJLJ%2Bw1mu3qVoSEpS82SMURE2l01G7xfrDVNwKsueqnvw4c6RW7WPFZLqgK51HY8XjzvhbOHx%2BJvDFegKOrMzubLmYasoFfCJwhmbN85wGAuBEUd%2Be%2FMSl62BwkSIZGPjZTC5VyXnxgz1qaUNfBMGW81uM9YwDawT0xXoDsft0okrRhvYfDWMhhU7ITuZHmVMlvzivYmm6m8MAzbjPrrvas3%2FNKXGrkRECcb%2F9io8XXvlvmIRvS66vPgvS9jvRkKV%2B3aV0iNLUcY4wyADmtEDDNya7p%2FbRwNdFqOv2whXr39JxcxFgFts4PFqGu9fgYaqrpYjV7YE5xOnOJ6J%2FrekPP0HLi7%2BUYxNiKcfoGShYBVzz%2BMx6kFNTe52HXkeg2ylhkZCddT8HKZ1IdAE1UgaKIl0n%2BXMMHSdO%2FC3iX8i8se%2Fug%2FTQ6oDC7sfXy%2FKzx4XBWA%2FcrW5WeN%2FJyB%2FZoA40wdrhxUaubSvt8vHiul6GAV7EST%2FtQAny5%2BBHFoZ9gBx56nx0AKV7UFS%2Bd6WeThsZb%2ForMVyBj17MpCeKhiPmz0eX2X6XcijjvWbbX%2BgxqLzATyitq2F4KUQbteTDyrKbOBjqkAVYfebNtUTgfQZG7Tnn7ppvsiHTLOhle%2BzUqztGYz3YyH4jsClNqOiyDBb2prKxvM71J1uMSOHi%2B6Cw91sP4mUbbn2Adzc4MUctDEXTEYL2xLaCjogZ%2B5ULabA2rTDIVk%2Bd2qZLYIVJlWz9%2BujtcP1jiDpm6aUYGvS6LjN0Ju42AOIFKROT8Pqax%2FdjDklaQ2j2NMwOo5Dukwla17F7SaW%2FQiRoG&X-Amz-Signature=47231d9f02e44496ba9ffec7691e060e427185a5506603b76ffc28cb804865d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBEG6ELZ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCICA4PrKsinoka5Au8U4%2Be%2B%2BDTMgmM3Q1XpsjaCXHa%2FPTAiBz3ilPF%2Bx4tUt9GG27JknsHVK0q7gLdLZC1quLdDZs0Cr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIM05h38WooBsPzBw4JKtwDNOo%2BbNn8qLVDLo8I1vLB6SK8lCq7oK2GD%2B%2F5wbF5%2FnI3v5zYAH01w4CT9lKOCU2ZsymzpWkbfXzBmOKIE0MBVrPmFzfnkm9gr41eTPcK6w5sFeqMQlV4shg4%2Bpl0VAUIPixsV4fqnWB1p0sBOybKTinh4E5eXbxq3K02u63hhX1l8MqU%2B7a5FH2m1Hn%2FvcWNrI8jZV3X%2Bs3PypOjzFjUnhy8KtEpC3ET8t0vFOdJcGqeqZnLrGt74rGOUg%2FkuT04C2sLAXv5RdqvqjLhLS0b%2Fc9IhFIezbedDTL6L937Ytu740oU4pSTtzH62WQVw0Pq721UjbcRpkT37QoeTA9E9aEvVc2B6uKBdY9z60h7EBEpj%2BNYbTWqVkcmn4myqLUBAClFm5T1eo3A0P6SGteQpFVSXEi8zN4ZQzDo2ARZ%2BlcW7VcIdTQjhjLVvSJDPse4U46o0TZ9o6zxpz5OAAj%2Bpv30UkGmllHOZ8Y5cN7%2F5opqb0rEdoOBqoJSG%2FYZmyaix1Hf1kh2lOgJmE8XnbvmYvMjkJLDAOhDCxSFR64RozFwNXa8ODexNKcLc9JcSAVsZncPte595IstKPXJenv2Z%2B7ZgpSZAUDs8esUeK5kBWD66lAXZhbzczMEkYIwt6ymzgY6pgFi7C7eLLaHD2lu%2BTZ4pi%2F9eZ0ZkjEpkoDw18FWqdBlwuQ4kfwY7oq%2BJxy0vjINVXE8coioJVkQqee6GROTTf8WjfPy01IqMEARVIQ9gYeHZisux1ErEEo5iW6KTA3YQ58kM3YzJ3Q4WhY2gPBCGzt%2B83LpAw9TIo5nJGObPfhsNPnB4yq%2FCLNgpObJHwwqE20lA6w5J7iosi2wn9e2zIPNgObahDug&X-Amz-Signature=8963218fdba48555bd45a203a2b3fcfd19b65d624c94e0e8a09d863843a79f9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676MXMIIC%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDtmgRHxQOqyqHR7rrbN7xKK5opZASL06jNrU4%2BGBYvhQIhAJ7ZzPdxmkDwLjPPA4dAEuaPkiSA%2FxOoozkfCLuNndTMKv8DCBYQABoMNjM3NDIzMTgzODA1IgwBddBzQ4X6MeuwSNYq3ANB%2B8Q5Gg0sMg7xdYEGRY3xoUZ3sT9FoVUD9F6mKzOjJQyDl4S3YcVo3wy9Q0EPtEERBNo7evw2jIxfb9%2F2qHcsnGYNgOqq4J%2Bi4Iw11Ss0mf8XBJRCbEMUiAZtBTbXlNKMjfHd%2Fkmpq9MMLHXAxRq%2BNTPrYLLl49Sap5gktuj7KBcIrR32KzNcv9OYZ8amAcpII9pKP1kJjktZeY9x8gOioi8wIjtsA7xrdBp2d376tc2M03ZStf8ar5DDlaXAIB7P8TYpk9uliYw6W%2FGXnvioSITkcDiNLWUw2u%2B47ykXTYz4xR5nKKF5Ow0oIcXbNjXdccY2RcT6IIGtXxI298JbWv4%2FmbdkxaX%2B5hhX%2FYvgKC4CiV2iejrFEwh1yLctFWPo1MoeAGDgX8%2BbHa01jr67PedjqT5rIXtVf3l04kRak46tkVV3LxjzB6nEpwdSSsPjEH%2BYsj9rU0hNbIvYzKyuwiNwE2IG2U9vb0sOVMlTSrI0K8YaxsrprKElq14Jo38gS8yqHBptVOT5ssEeoMEbm2NX2lShQVOEsCjPZiWSxLb111mpenfl6T1RydzHDXxfW7gO8dcNtZRFicCcYM7tsBq89rg3g5OQi%2FZBOxHOb3dmOvIUN688Mx5VeTDCrKbOBjqkAd1eFQZcEFvpXwe%2B%2FbA26YNAf0fKSj8fgJ6Y4djmzWiDNFUWiA6aHQ6dd9eGjIBS05b1SpUepnz73Rfr3%2FCnnoU3fwtmjaNs68eUTYTfgjZT0x%2Bssee1%2FZGrQw624E53hFWy4TtbvgIneKxzPTBzDYj7LphXlFYwo2EkWE%2FqFkq1VZcs3tsTbvAMAPT14Qr7pg3kh665sVHdxV55VluaG17U7f5S&X-Amz-Signature=a9e870866654622806521c5947210db42d1a422300ab538210ffbd54815fd5bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PFN5IMU%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221603Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCJiPnUCormNeytKoA%2BqcsACCRaiufcTOg6RrgOdGMxmgIhAMmT6HiELwwJgTomCWfOsenjmFoJhXljCciW3BW1mEMpKv8DCBYQABoMNjM3NDIzMTgzODA1IgwrFgAE0n8jKn0Cqikq3AP2AJ%2BGIaahJWutI5w%2FxqX3%2FDf1fypLYByUMB7cOCISqeXkKddSECzlOqcNArFnliS8RUPMPrtiePQisooWJhsgAZ9iTOp87Lk8IsE5MrsJY1LzioGNj9Gjcjqdfib0CPgujgvHTTcgYedVJVK7yn%2FsaP%2Fmp%2FbarjnY0zFJwd1og3yYt2Kk6ak%2BQi5eIONL95vOvfj%2F5hOEImulx8UXY81cdVwmA4%2FTMX3JINjzyyCAewH5PssXriE0HDCCrFhGBHB4jauoh3F3DIOETsAHxiKkj1RXor1J3CPkJllKwoyusWqF5%2BoV2jDWgPo5P%2BEbUOux6CO%2Fe0edw75gcBzJnKlv4dXInMRLhvRG4CXhIYPgkM8OM5C9ntsAJAX5f7xxbHo%2B24TNv%2FglX3xX4IqLSoPb%2Bhsr6SwLk8DJF40CpQOGrrpWd24US915NiQv7fgNtwisfj0MqyrppPloCTu1a5kfUVkj8Yr58BKMC5LeInnL3153XZoK8vLXIkd6pdbeFMxQP0LdZN9cMfbCUqo37l1F6sIVpLYrexYnIWFouGAcqJejfbUXVLswX%2BNPulFLLcF4PQYB5NaKbLb4QCMDQSDhtXstmxF2qzTnZjgrPkd2R2JcqP%2BZpjwNYFSQnjDxrKbOBjqkAXWZeKEX0pN3dYD7sPyLbMKIS7iI%2FtBcrMqTuH%2FWnqCjHnzL1TVi3P45krfQXQX9SEt%2By%2FZTdIS6J0%2Bgggoa7UeIJ1%2BY2zdn1JqfdSmekpbuQq%2BMGOCXsVAUa2H%2F%2B90STaxkCallJ8AQFOgDNbi4dxsVGNfF9EigDExM8kR1CL5Ua5WNjKbxJtsJmc1wrKcp%2FSQzpLXzQm788nvCKHOno1zbD32e&X-Amz-Signature=fa558eb7b314abc173d5fa169897860f50b0c267638147fddce81b4fc5dd1be9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PFN5IMU%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221603Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCJiPnUCormNeytKoA%2BqcsACCRaiufcTOg6RrgOdGMxmgIhAMmT6HiELwwJgTomCWfOsenjmFoJhXljCciW3BW1mEMpKv8DCBYQABoMNjM3NDIzMTgzODA1IgwrFgAE0n8jKn0Cqikq3AP2AJ%2BGIaahJWutI5w%2FxqX3%2FDf1fypLYByUMB7cOCISqeXkKddSECzlOqcNArFnliS8RUPMPrtiePQisooWJhsgAZ9iTOp87Lk8IsE5MrsJY1LzioGNj9Gjcjqdfib0CPgujgvHTTcgYedVJVK7yn%2FsaP%2Fmp%2FbarjnY0zFJwd1og3yYt2Kk6ak%2BQi5eIONL95vOvfj%2F5hOEImulx8UXY81cdVwmA4%2FTMX3JINjzyyCAewH5PssXriE0HDCCrFhGBHB4jauoh3F3DIOETsAHxiKkj1RXor1J3CPkJllKwoyusWqF5%2BoV2jDWgPo5P%2BEbUOux6CO%2Fe0edw75gcBzJnKlv4dXInMRLhvRG4CXhIYPgkM8OM5C9ntsAJAX5f7xxbHo%2B24TNv%2FglX3xX4IqLSoPb%2Bhsr6SwLk8DJF40CpQOGrrpWd24US915NiQv7fgNtwisfj0MqyrppPloCTu1a5kfUVkj8Yr58BKMC5LeInnL3153XZoK8vLXIkd6pdbeFMxQP0LdZN9cMfbCUqo37l1F6sIVpLYrexYnIWFouGAcqJejfbUXVLswX%2BNPulFLLcF4PQYB5NaKbLb4QCMDQSDhtXstmxF2qzTnZjgrPkd2R2JcqP%2BZpjwNYFSQnjDxrKbOBjqkAXWZeKEX0pN3dYD7sPyLbMKIS7iI%2FtBcrMqTuH%2FWnqCjHnzL1TVi3P45krfQXQX9SEt%2By%2FZTdIS6J0%2Bgggoa7UeIJ1%2BY2zdn1JqfdSmekpbuQq%2BMGOCXsVAUa2H%2F%2B90STaxkCallJ8AQFOgDNbi4dxsVGNfF9EigDExM8kR1CL5Ua5WNjKbxJtsJmc1wrKcp%2FSQzpLXzQm788nvCKHOno1zbD32e&X-Amz-Signature=f9f88158b772d88f3347e3a23dae94f3009524ff3396f0162e6e1a50b7d0409a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AN5DAL7%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCID6afBfOb9AzzHqgwRk1CmUXVrQgLb6fJ2ah9t8lqI%2FRAiEA%2BVYF6L%2Be5HvMa2AmvDxYxNfkmXLvLHbcANG7Zk%2Bch%2Boq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDL7BhXKXRhNXa2ZgpircAymgQFTdtV4m6HxQ9PYkCuVyRmU%2BKYo5TMKEmvdOkppfqeUWglJIcKiko7rQOcDbiAVXVOvXjWnVpvYJyqRGaoGjlEuFK0WCRQ8uXLKJi7S2EgO%2FEZ2QCOOtoTnPKygBp8mDGFSURjHX074M%2BJ5iFDn336zP7uSAAAQHNyY6fqgYjnGJrZPSrkTYp4PxJtL0JzVViFFBvDUjtDOHl5jfWVGQShfV%2FtgqJU2CSX1YNgVFJXk7y4lSaO1ezpKriB2TeAHCEo6Q1fgO%2BGlVvNkgVtxJglinqsy5sJQ4xPXyBgEWkYyAFKhgCFCAyTep3AGd6j6075zIr9tG%2B3stS%2BArf0z1dWB908v5UWgX4aLaUGzVVOfqypI0CZnjF%2F3e97uwjo8i9Jm8zVwodveWI5tzzMrCNDmWkkwrBmQ9E%2ByAqJf4rf9zF25QmZuYftRO52%2B8nVVSUU3ggBnvZ%2BJpgGUbOvUhLiXVNKUCSN24EqwNigDaSF4UVZjuOYFMqSVHgd%2FFcbA30H3MRLmt1OaA9LGEtzZMP3U1%2FbIQFsODBDY1C45vM9TGvVtIJsXeXqilKQJ0odiAHqKyMJjm%2FZeG2CqODfoq9E18zFgLtXAsawTBqVhTLbX7Um3%2FS1CJKy1BMLutps4GOqUB9xqM%2FEA%2Fk2J8hQna9kc2924g84k6eNLMvX7JbPEm4n%2BJSZ9L0mjrsBzrJw6nvHCvNd%2BMd2mZ0GkdVy0M1y222wB6qrdy2tsPHtlBzK%2BBMCr4AaJvfnPCGuPlqHxvzKcj6Krc9Y1GS7r9aqR%2Bcqot6dUHWNfXaFJyBUEnfLG%2BtfBTqks1YLX2hRYGl5tuj1ShLxf2lW3nCQAKHDKMyYHQe7rEZJWo&X-Amz-Signature=919f7dfb9c82dbe5189bd48eeb99ed9d11ce5118d8d68b2dfb28545c15682203&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KCJG44Q%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIBwK7jl%2FaIJw7kD3QAN9i7wy4TSx%2FfphY%2FSYaBlLonSGAiEAttvbnOp0O0vFNU%2FI1uej99MomjfAWb60huYCs055i1oq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDDOiRb05%2BKpuoioAASrcA1JrOne2pebSmCNk3mUV20HnmCW%2BjbMjQjL6skGfiuKVH0rbKhqmMfTXqYaNI6mVcO5iHhajdjnEHJRA%2FGkLhBUmLfxcRo054jnRjo%2BIoK29itmL%2B1wM6iupTucAcdiQqrCwP4fOM7Nwama1C1nX5JcNuKxNZWxTL3OQ7lClcnFtKva2Pc2zbwmMhvb%2FpLd1ZINsp9f4rGsoJOOhSpy2h4YtfcFjX3UT8YrDMpd9GFxxvgkQh3UpuqgUtRx3t%2BIraYwXP8PdyXWixcq931mxMzJ6nKt34vXnxBHN8sa0PIo64huYZ%2FY1awLgKdwZ7VvyWg0rRWaaLgZ9cPjSZ4tL8LMV%2BlKWbU%2BzocQByJ8x4MC1ejxBXURyTddHVLGZ%2FgELAgDk0gHrz2CPqe87%2FJRlhH8CQIk%2FPleP5u3%2FNjCPc%2FSZ4P95MLq8sftHVZ0ArQxJmJqE8ljB0x0NcvtFinxU53mPz5aTDfRG2EUeE2gxXfSoABmMyfZdTuHgJKvhStrX46mXdbQEXSzm0KQVkb0o8vmg2OBogKsjWAgh5Ajhtza8Mj8AhnBTcu6rWahotVXhB9i3ZzIJtSdpkDPLT%2F9GAUTbHwvhBDglnMh%2BI9Qv5KtHXWSqFP%2FZ9miX%2B0kaMOKsps4GOqUB1SmbpACyyw5bqIT906W%2FMli2yIf%2Fq9TdwkxSM9YEVWupRVGQ48QSHjOPpE4%2FWXtB3Geraqn9c255ndlgt646f3DrFFctoc5L08rsVE7mMq5LnFexS8hGeXnqdMtDzJNkJqiy3ItcoaSQuxpdGiTjHujU7dw05Uz57FklqnxVI4cLXb%2BYxi8rhfem7Mu3aWsA2VfXcpBjzX7%2BlUNR%2F6zrUnMPSfgv&X-Amz-Signature=abed139c77524ac6717b54307cbc37d23971d3e7382d5e45c2f4a3e3ed106f86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KCJG44Q%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIBwK7jl%2FaIJw7kD3QAN9i7wy4TSx%2FfphY%2FSYaBlLonSGAiEAttvbnOp0O0vFNU%2FI1uej99MomjfAWb60huYCs055i1oq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDDOiRb05%2BKpuoioAASrcA1JrOne2pebSmCNk3mUV20HnmCW%2BjbMjQjL6skGfiuKVH0rbKhqmMfTXqYaNI6mVcO5iHhajdjnEHJRA%2FGkLhBUmLfxcRo054jnRjo%2BIoK29itmL%2B1wM6iupTucAcdiQqrCwP4fOM7Nwama1C1nX5JcNuKxNZWxTL3OQ7lClcnFtKva2Pc2zbwmMhvb%2FpLd1ZINsp9f4rGsoJOOhSpy2h4YtfcFjX3UT8YrDMpd9GFxxvgkQh3UpuqgUtRx3t%2BIraYwXP8PdyXWixcq931mxMzJ6nKt34vXnxBHN8sa0PIo64huYZ%2FY1awLgKdwZ7VvyWg0rRWaaLgZ9cPjSZ4tL8LMV%2BlKWbU%2BzocQByJ8x4MC1ejxBXURyTddHVLGZ%2FgELAgDk0gHrz2CPqe87%2FJRlhH8CQIk%2FPleP5u3%2FNjCPc%2FSZ4P95MLq8sftHVZ0ArQxJmJqE8ljB0x0NcvtFinxU53mPz5aTDfRG2EUeE2gxXfSoABmMyfZdTuHgJKvhStrX46mXdbQEXSzm0KQVkb0o8vmg2OBogKsjWAgh5Ajhtza8Mj8AhnBTcu6rWahotVXhB9i3ZzIJtSdpkDPLT%2F9GAUTbHwvhBDglnMh%2BI9Qv5KtHXWSqFP%2FZ9miX%2B0kaMOKsps4GOqUB1SmbpACyyw5bqIT906W%2FMli2yIf%2Fq9TdwkxSM9YEVWupRVGQ48QSHjOPpE4%2FWXtB3Geraqn9c255ndlgt646f3DrFFctoc5L08rsVE7mMq5LnFexS8hGeXnqdMtDzJNkJqiy3ItcoaSQuxpdGiTjHujU7dw05Uz57FklqnxVI4cLXb%2BYxi8rhfem7Mu3aWsA2VfXcpBjzX7%2BlUNR%2F6zrUnMPSfgv&X-Amz-Signature=abed139c77524ac6717b54307cbc37d23971d3e7382d5e45c2f4a3e3ed106f86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XN4S6F3E%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T221606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQDvrcxDoQ13h2UNd4DtA8U79zeJ5%2F5fCyEtu3xKxIRBhgIgQS5um8uobdVYjV3U5aWyxbMW6xshBz%2F%2FNVY3YONd3cMq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDH4JQA9KCExzPmfOKCrcAxg7qQ77r%2BGWja%2FnxvNhrYc5yikW8hqpkZNj15l7ttIIUYHFrQp8%2FEan34%2FXEnbS4%2FjR2tXTz5I6gUSWup7P6LphnS6jehsQ3NWhXcVmu0EDVqQ2krfBEaIz%2BP4G1bOQqsMY5ZK571flIWqmWoE8MpGH4jznJ10GQ%2B4x9b56nvnbMNjZpjsOQtf9Q2Nu1NbTu5nX7zvnfswrUVPr57iy9G0lBhptc%2BGNlYkrSaPYL7lF9NK715ibPVB92xMvxQon4vJTSRuhPLaRqeV7CvEHroarg86DrnmnEgoiVL338Hb5zOdYooGEhWe45qjYob%2FluMeEnrmWy6IfZSVSg4X03crUOMwUdarlkkLiAwL7enuzKhVAJuxquRaF%2Bx%2FZ0VmHDRcPec0fbTDGQ%2B%2Fhj3WF%2FNGta%2BvZfgGWGIDOPOzM6pQUp564lWKIyFlhu1AWsCgECDIDoC%2BkcwhchaiGhYGZLUfWhZlyArKpgY%2F7H7cmOzT1Uh18t%2BNRekA0cDBjV%2BO54XJ2WNJOWVBgI8957M27g%2BKeaYxNbBwauSKMUKQhVxG8iyHoYIEBCMO%2F9oZIW8EH6KtTNUpJYt49xmGoeC9Ye1YEd6Na5AoB59mxa%2F2UN4DcFkgPCjjuEt3lNZu4MJ%2Btps4GOqUBh52YfriLsqiJ22VEMRFV5H08XYdiV0O8hZLFYAFnmR4fI8ug6v4j6I4pVsRd6V47X8khSY%2Frj6Zu7HkKEyHCoF%2FGt4%2F1C%2FjqMpQnOvZztSn61CFumGibBdZm5%2BevX4MQw%2B7tdnTewITjCiYdkRHxw835pxwC5gLy%2Bg9MeNaFxAl%2BsyN6brAbCO%2FzO5FRzzf8%2BABjEHO0iO5nupgjZ8fv6BhsjtJq&X-Amz-Signature=3f177b3dff48cf3e9317d014620d72c1b8a51519cc5ca47f54738123cd294609&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

