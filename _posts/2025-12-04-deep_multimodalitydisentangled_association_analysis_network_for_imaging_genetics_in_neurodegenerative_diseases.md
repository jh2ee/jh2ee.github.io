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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTB5JLGL%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQD7JSiio09qfjl%2BH0bfKhORTnuGw3%2F9VigvMIQmdlo92gIhAPFmjAENfvH1qc75C3VLlbym67s1km95OhUuKKVYJQ1jKv8DCBgQABoMNjM3NDIzMTgzODA1IgwMCtVsbVaQrV3Tgm8q3AMFFKbRTjtVCcpxW3ON5T4aSfYx8qj%2BHtbZL2F8kIig4pGa1dcRdwgiGXiZ5rY7mqLxGciqEkOR2aegw2bS0t3vSYnBY%2FRbE7z4mRuq0Bu5OH8Qt4IvlPO5GAYTojPNK4fyaxDXZ%2Fo3208l8ImW5m3noljGjf4I6ZeNZxpn%2FJvZJJpiLBaOd6Ttp3CPTzpgcEbVApCARZefwEmI754Y2rv%2FvYhkfIjSp34tTXNGx6lEKJ6YIuuAVYeaqdXOAvawI1TE5lLV6%2FB6G%2FkBUZ%2FdkyXiiyQ6wmZE2QAKRIHZZkcYvt267L6tZ50bbnxuGyYtKY4RT5s2iwDjuNAf3btaz7YIUgASnEuvb6QBjkOj7D1tFxk72KodhhUMydflnh0WzTgqAK78QsHzhb4SdYIL5pvzmUMUFDfrx23xUqs6WNa9%2Bq3psRJsvawSfdcAYpPvmDmD%2FCcQ%2Fp4qxfmBPnGlUKVGBvq0kiEWNOj0IrJCMT1K0Om17UwNmx5YNa%2BPi17OnWsM2K54ypyhwipsAcTylaiW6kU3fWT0o13N7kVPrFGg54lIgj1aCR9RvkLVXYLs1qrZeVdUB4J7dRWK2RPez4hLxPFdLcMHZ3PkXpFpbYrkxv4Ng2In3SEFeG%2F%2FiDCJ4%2BTKBjqkAZWIJ1PeC6TVdwj6mseIXf%2BITZTFcUQfUITSmEXDlQk7vzH9Y9DFez4zK4I8nRFroxlN1byXNu%2FnNrpqvwyB0MQVOErwHlZ%2BuBFgVQvqzcdXNOwip7feeOiTMVxXBQw3hYOogWNNKpG5BYczkvPNjFZ7TKVITygUNFm%2Fcje%2F3e5wA97LYZHusjzwVGDbrcWYVB4yq91vJoQ03EqUFD6hfjmvU13x&X-Amz-Signature=c6dde5c62b5408ac70cbaca52029279eebb485556ab9c98f56d76c707e96e916&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTB5JLGL%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQD7JSiio09qfjl%2BH0bfKhORTnuGw3%2F9VigvMIQmdlo92gIhAPFmjAENfvH1qc75C3VLlbym67s1km95OhUuKKVYJQ1jKv8DCBgQABoMNjM3NDIzMTgzODA1IgwMCtVsbVaQrV3Tgm8q3AMFFKbRTjtVCcpxW3ON5T4aSfYx8qj%2BHtbZL2F8kIig4pGa1dcRdwgiGXiZ5rY7mqLxGciqEkOR2aegw2bS0t3vSYnBY%2FRbE7z4mRuq0Bu5OH8Qt4IvlPO5GAYTojPNK4fyaxDXZ%2Fo3208l8ImW5m3noljGjf4I6ZeNZxpn%2FJvZJJpiLBaOd6Ttp3CPTzpgcEbVApCARZefwEmI754Y2rv%2FvYhkfIjSp34tTXNGx6lEKJ6YIuuAVYeaqdXOAvawI1TE5lLV6%2FB6G%2FkBUZ%2FdkyXiiyQ6wmZE2QAKRIHZZkcYvt267L6tZ50bbnxuGyYtKY4RT5s2iwDjuNAf3btaz7YIUgASnEuvb6QBjkOj7D1tFxk72KodhhUMydflnh0WzTgqAK78QsHzhb4SdYIL5pvzmUMUFDfrx23xUqs6WNa9%2Bq3psRJsvawSfdcAYpPvmDmD%2FCcQ%2Fp4qxfmBPnGlUKVGBvq0kiEWNOj0IrJCMT1K0Om17UwNmx5YNa%2BPi17OnWsM2K54ypyhwipsAcTylaiW6kU3fWT0o13N7kVPrFGg54lIgj1aCR9RvkLVXYLs1qrZeVdUB4J7dRWK2RPez4hLxPFdLcMHZ3PkXpFpbYrkxv4Ng2In3SEFeG%2F%2FiDCJ4%2BTKBjqkAZWIJ1PeC6TVdwj6mseIXf%2BITZTFcUQfUITSmEXDlQk7vzH9Y9DFez4zK4I8nRFroxlN1byXNu%2FnNrpqvwyB0MQVOErwHlZ%2BuBFgVQvqzcdXNOwip7feeOiTMVxXBQw3hYOogWNNKpG5BYczkvPNjFZ7TKVITygUNFm%2Fcje%2F3e5wA97LYZHusjzwVGDbrcWYVB4yq91vJoQ03EqUFD6hfjmvU13x&X-Amz-Signature=c6dde5c62b5408ac70cbaca52029279eebb485556ab9c98f56d76c707e96e916&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBBJRWDJ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDSdUoLig2NJrrG4nzyRJxLrApg2STFRFN7AEDKI1jOtQIhAK8hGEyjSUdwBbATjQ0AnNpWK8rF852fyjzTpsnBaR7%2FKv8DCBkQABoMNjM3NDIzMTgzODA1IgyQ455SOE3dSGQjXWwq3ANKtGeGrxqxWomXYq0T2VgbcLGWJ%2Fi6sXifwTPrPwxkyz%2F8cq06b5SIk6tIM1AAg2bYcmLqrUZ21hN7qe7OhMqdl7BG0NmTHSL%2F1yCC%2BMbpLTFe3EjuNcMWrykDLjGxSJ2OhqBMmSdY1sJ9h30K6D6QannB4hGO0fGjetOKc3BNpiOmcPlm8L8zCALNxBaHMu%2BhsPdCaEZzoTDaPMz0kWu42gZVlRh56g4nAkMfIdZpmADSwDl29kxGgbgaI4q7FsWcvENnE2ZUzGhwXAgVlbkF7kw1fnz7jzEXVaL90ElRlRBJxhK34H5w0TrhBmcBuWfCe3bb06r6n5KsMLxFKadhXsP14CPEOehqXCdm9WuOB1iYrkOhFUCWekLEdLeymVLgH056r3gId80lzYDaGg5jKdFvGM4V5%2FNUoIcAYkGSEu8IMXr6gUTqd5UaAHVNKfMxlA%2F5dsavH%2B3UzYTwCrVlUXfyTLhzAYlkeocvwSjDaByesHcGyCK7oRwUx22rVn2bV8GR2kbCTUMLtbUoymsNv64ZmvVsqUnuKDBpyBfFzhE2xDXyVeZe8CcszYDor2b4b%2BWIgQTtbIRczbqEUBkc5NVgzmVuOQJq%2F8mQImqx8Wl3Eg6BbedbhOh3ZTDh7eTKBjqkAc8kWY7UsV05tllokSL0HKkLXjgYLrw1NOaplASBNg8bh9vvWy8fTyrFuWpttWH5gYsI54goZt2JTKOifaEKkUqFYwnP28PWV3u5%2BoDYbZMcsB82G6w7Ts06X%2BQEw9gzlrVM%2BwgePGhGz2dSuBm5fdCUdlVkZdtSpSI43vHMk5nAnvdO4uZtTMwVApr%2Fbd5vMiWCMZdhoAoqFWvOw5xgVjxQWuWx&X-Amz-Signature=fd82da458348e8971ebbca85b8e0af45f0b5c0533d4b46a003461b37ff9ef2ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WM6SS6FX%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDZd9yxu8nlIhItV2ukhz41asxTv1TCAvfwtdoaxK2XrQIhAI0hB3xhxPOlyUk1T3riOjDcW0eEDr5q9CVb84gZfxlUKv8DCBkQABoMNjM3NDIzMTgzODA1IgyaiJRB2EbeN%2BvkUO0q3APvgOgG7QP5Y%2BtCH462SVR96ebClqmpzjEo3AN4iDSpSypA2mOK9i%2FBCUppPvI1dkNw8S90mZLAgKU1%2FH%2BpRE8dUepp7PJVcQUy%2Bo9KJZsMn%2B2Km3AkU%2Bjmtt%2BmAj9ch751M10MvOhUSEpFkNGhKzFG8UFEhZloSWytDNaiIs%2B8KK%2FmkDmSWR3Um4ZmVfNDBo2Gi5Sj5Wr2FqMF%2BME%2F%2B%2Fr5EHIUzF9x2%2Bq3KpAMjm5YYGmKIsWDeKe69CdNklkQaC2%2B5z1D8BSNvJys3HVmhNpLNHzMLOFAT8NRCpAFOArQguxLEi3rVaB0Tb953UwYmLL5mKRJIyL5vehKxvySEWetcQZVW%2BwDPCAU0zq0Bh8O1M3%2FLdke5JGkH2c05rTrm071Fpx%2Bj1w7X82hVdP4P%2BjIPuzRzzgHzVHJjJv4SlAMEIfdMlE3ZmUo%2BXz6VqRRFmSBaGs8Kccd2kdsVsSSTf%2Bkmt3RFMiLnUX8row%2FBrmAQ8x4b67ff4q%2BRqlL%2BIqr0YJszTl2QPoBS1gkdRGoAA4EaIXa%2B0CB96v9o6h%2B6twE3RJ8xPQbdBNQ0Nrb9KxhGoBqVaWWQvRSL7SrHxM0VQWB%2FfpqH1kHVHWCIDrLW%2FatQnYoV%2Fc9bN8TdVasXjCe6eTKBjqkAeXiWqljq2zUW2k2tq8bvwcOFp14WFQ3YTXQ5cypLHL0fiZ9HCDNRhN73kYg4NDAzmcS3qXJe9IRmLe6EHYZQTQI4%2FEFPSUMcYMHBoTS7xuW0J30plpNE87t26UPrPeUCv%2BvG6cREqax3PbR30iZxoFCAX6PNJndmlVo1SLtSql5U3gcktMfOqx0qiIpSHaMAlZ%2Bkx6aICqeRz6ywHG1BuCWGAf2&X-Amz-Signature=eebdb624f25eb4a232bb59eb3206234567ef20845d96b17593e67d0b1670c8b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WM6SS6FX%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDZd9yxu8nlIhItV2ukhz41asxTv1TCAvfwtdoaxK2XrQIhAI0hB3xhxPOlyUk1T3riOjDcW0eEDr5q9CVb84gZfxlUKv8DCBkQABoMNjM3NDIzMTgzODA1IgyaiJRB2EbeN%2BvkUO0q3APvgOgG7QP5Y%2BtCH462SVR96ebClqmpzjEo3AN4iDSpSypA2mOK9i%2FBCUppPvI1dkNw8S90mZLAgKU1%2FH%2BpRE8dUepp7PJVcQUy%2Bo9KJZsMn%2B2Km3AkU%2Bjmtt%2BmAj9ch751M10MvOhUSEpFkNGhKzFG8UFEhZloSWytDNaiIs%2B8KK%2FmkDmSWR3Um4ZmVfNDBo2Gi5Sj5Wr2FqMF%2BME%2F%2B%2Fr5EHIUzF9x2%2Bq3KpAMjm5YYGmKIsWDeKe69CdNklkQaC2%2B5z1D8BSNvJys3HVmhNpLNHzMLOFAT8NRCpAFOArQguxLEi3rVaB0Tb953UwYmLL5mKRJIyL5vehKxvySEWetcQZVW%2BwDPCAU0zq0Bh8O1M3%2FLdke5JGkH2c05rTrm071Fpx%2Bj1w7X82hVdP4P%2BjIPuzRzzgHzVHJjJv4SlAMEIfdMlE3ZmUo%2BXz6VqRRFmSBaGs8Kccd2kdsVsSSTf%2Bkmt3RFMiLnUX8row%2FBrmAQ8x4b67ff4q%2BRqlL%2BIqr0YJszTl2QPoBS1gkdRGoAA4EaIXa%2B0CB96v9o6h%2B6twE3RJ8xPQbdBNQ0Nrb9KxhGoBqVaWWQvRSL7SrHxM0VQWB%2FfpqH1kHVHWCIDrLW%2FatQnYoV%2Fc9bN8TdVasXjCe6eTKBjqkAeXiWqljq2zUW2k2tq8bvwcOFp14WFQ3YTXQ5cypLHL0fiZ9HCDNRhN73kYg4NDAzmcS3qXJe9IRmLe6EHYZQTQI4%2FEFPSUMcYMHBoTS7xuW0J30plpNE87t26UPrPeUCv%2BvG6cREqax3PbR30iZxoFCAX6PNJndmlVo1SLtSql5U3gcktMfOqx0qiIpSHaMAlZ%2Bkx6aICqeRz6ywHG1BuCWGAf2&X-Amz-Signature=17cc70c7c099ee7165b8002f9e41a5a806b9b83c1baf60cd234bcbb0cc8ddacd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KPEHT3I%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIDdC1d90xPIxqbE3HCoohqnFWi6ej6xFnyQ4YhRwrt0NAiEAwycEQB8KUr5FZLSLyZiatDYhgxFomcbLNe7DTiGZ1L8q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDHM79fBI9TfFt0p39yrcA7FZ6d8UY7mwqHJGACu3xQxcCciLfS2aPl5C56hwY%2FLrznpS%2BOtClA008G5GOS4PocsKqUQMl1cX1c0cLY5WUghykJ0G9%2BFTQFeNMGcQo%2Fj7ffDmZ2f%2BRYJArLULtuENNzfdweq2Nwy%2F%2F36DXeJb3Wo4E5wqxNgMalur%2B5CLFKimQPNawsmznRMvN4FWLLyAaj%2Bjjx6fVZjO2zalP%2FVskrRVAU2rbxR%2BUedsD8ebiiEKBP6LM7azDlQY6YYG5QV7TyghdSuVqqurAStZDEVugkmL0WU2AUYm3JB2ujqSZxeMV0A4Yftqa%2BO6jD3MS1OdF9Lq8Lu7O0lzmDlx7aHNTdtCqXd3U%2BBU9r3grtE1pPapxM%2FA0ebtjrWWho2RGa8k%2FKRnRv63Eb%2FZ392Fc4%2Bza%2Fc1dDDr5lGmEP6Aw2liV79HG0C9nE%2FI2oIjHuPezfnFgpZi4b1IbZmeTe7LKV0grDuccfQCHpr0vVD4rIxL8DI%2F5VXUiWCWftI5L5fEQNanuaVYtsDpQ99dmI57aE4vpJvUVIXknoeaCalPdNHMWgP7sGfjl4piJjzFjnP7srEHfxYWsYmYNmXMiuOGLolM4%2BpYJ7OicEsAFIUzJO2u25TOu8lVOHh0LUUHpF54MO7x5MoGOqUBWattZ9sNMuT7fuU1PohgBhHWPBaMFYtqe%2FjKMZlhUAifRZFqQu49HwHXOef6BkYARHorFivuw%2BL%2FS2RkLQcS2dLU78ANGtA6E1RhOAn0uzZVrBhcJED57yjPE3A2OJQpFK277SrpOTk3KXygd6BsLVVSB%2BboeD8Wg8nA4bXohrHPFsunKBCezqzK0LfXOZ9liz8Wj3bGCedBnOjt%2BYs9GW7ypJtu&X-Amz-Signature=8f6fc9d3d4dc6f3c53841ceeae7c6b0e65992747241e81afc9a0cc9bb45636b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDD6A724%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQDcmesOpEPlTeOeczpGaPfJXgrhic6k9%2BdXRW0S5FaLIQIgX7WRW9x8dt9WN6X6RuVImVaMUmA0KJoc1aAQEtfi3DMq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDHyPGxJ40Vn0ERZCoircA0LVQmf47Ci1sUTk3vfSoE1CbqdH%2Fc2H4nmNsXypIxbcHDAsKLXaAZx2gkLKR%2BA34sr8o%2F%2FzyJF%2BdOkGl%2BTeuYbigsv8Ilu9p9Dei7MfX5g5RBNNRZQV68a7D0SjSXaRTJ%2B8HkXFYvoYXCt9LPbdo0BrxwquApOeXOAX0JGqyMMPwUL1HTvRbkx6lwFVjRxaz1Y8SnhxZreV1G2J7bYzBsCCz65pxhw4LrqotG%2Fqw7IfOX3vzRSVvoYB9VySRqvLPWC5qtpfBQ17XgwmzFLai%2B%2BBsKD2NDlHtGo6AHKE8a5rC6OXfpOn8dMcc6zoXHj2Rhi1LJNhyYmuBoI36TInfc65G6tUEKEqJjcsVUD%2BuFrBxZyPPAjCQXEqgdCOXLH%2B2F1A0w5jkXdkTufFG%2FE6xtS4bE3bHp3CYgJwA6JGnXQeo6JfPWrthgDOcVSVUfMbtDDSAjKrRKHOxRSwCapRCTHa0tutwPF1Hq8j7B%2BGbwfCpCpgr9S%2BQ1RFKcFTXwKQOx8IM6mCM%2FYxIYTl4kcj4zaR4ImIm4iwU8VNkrIDI0tbEsraLZfEHSaJU5MDYCBVaNM35kzhsCV8bxcTGZR%2BG5vM05TxT%2B6esiEqUnx9QI1A%2BaYeGd4EiW0mDNAqMKPs5MoGOqUBQYe%2FfAumHvRcoGyCKgZaejOCC0Nq3b0qBjtvoBLVWHzX2kwkdQMZcGDOiBhhXFRZ2u8WIsFHSZ99iUXjWQbfNN846RJEOKFJ3PWCeToqFUZigdlpWi3G9EhWTTbC1VDPq9dRTU1aB2Pq9rX1y9JOEqt%2F80o6OTsFVTxSpvA9z6anp44PqfwYc6vUjHDaigwHAzFiN6TKesEjVO%2F8WRA6XfBshPb0&X-Amz-Signature=8f91a37c58504bc6a47303064b21e0960feb95a18fcb53f530e974e52828ce49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYMSCU27%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCOtZxtKQxkxgdhGthMzAc62XHEKMn6zzxeHHtAl5hTowIgU%2BjFfHM%2B8PI3Kq9SDLZm5d9DDgSWE4QWryNHpgBqklMq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDO2HNGdaUQo4thVDjircA5TgtamJZ%2Bc6OQCm81wMzu1EoDUs05D0l4xwzUUpaGej4DO%2BJ5C0R27UzV61SQ0zi2l8y%2ByK1v4%2Bct%2Fss3CSJDipT%2FgLYAdZ09Ry7zJGExvbGFwaoBC4gEuYkTZpK8%2BjixzxjSaAEmoAVGfB48ahosM9%2BOjmqBEBSy5PHtuSoHJew3QG3i6nHhW0HaSJeRsJ03NCQGN8UyVMR7rZ6y9FLePU6A1Kw1DMdlrYPJQnrHC7OmQn0olXpJKMs25%2B3TSa9SFxpdGWL1ECq0PqivMYXENumP8gGsuA98XFg%2BMwz0KoUlVPddXUU2qMkuZx%2Brqd4EHJReHp7csyM7NgQhU1eRHq13V%2FwJP1HVO3sU7py0ZRgV%2BPd0Mk2bX6l6QciBMu80sXQHnSu6YzyvymJ4hUDP%2FI2%2BAR4wePdPYKh7gi1SF7ChChZtbIJMAijAVHrG%2Fsg3FXTw73GKvENHf2BPlYrhLzTVlezReFR0zNriwqMp5%2BdJEl7MwXfb0yY0nyHlPkFVfS3M2jd%2B2iqTUmwVi7FYgJ7i8saec7sJOPOWqvzI6R4rpY6Y9Ta%2BlEbFqL5TWT%2BETLNNFN%2F84CHNEQTTAFQErc3RKhlVB%2BCnqspU7xU7EKRc3w0WIzwYVm78%2FrMLju5MoGOqUB%2BQ3xgb%2BS5WjksdSJLRuIGmEyrC8rnTkIUheARZdgLPtkU%2BtVhAR5I187s%2Fzuqv579k%2BdHKJ3kf%2BQlXK8pycbf9zqpcOG2YvGPbvOTqQPRu8xlGtUBlX6u3z7v4JCHmZtEf16TPeACTFerNaUgUrZ9dy%2FlG4SKE%2FeEY%2B6ktACUMZb%2FIE37ObSn0YmMrZxn2KzPQgozWKFODrhk0AhrMDa6Y%2BoL1hb&X-Amz-Signature=98db1675ecce973823067f51aac65d43c61ae2f37eb4506ecf909f0dcabc4693&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667R3XHH3G%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCTPj1aXXBdPv83FdFhSu9%2FhjFHSxawLbJe33gZZmGYKgIhAOAYS9uTG7VZ30fFrl%2BBeIKWoi6iSDMOdCAXNbzLh%2BZOKv8DCBgQABoMNjM3NDIzMTgzODA1IgwkT9vTxtkBD1sVLdAq3APDfX31Pujm74V7szoekT42fn8cN2d9Nd5sUDJxFIqJIsWopU5nMOjJuCRuxVxyEn9GvX23%2BVXmJHIdr4QDdbkwidd05Csx14TIqedW70CIdhpZk4lW%2B22F%2BUhRLkBPDkjj2vHoQL3U1AKkKAuroE7LRJSak53PASQ%2Bs%2BP8T2pGnaqPpACg63dhQbSdybKPPCpmSxH74s3k6MYwxyA%2FIhFt2cXin2FJEXgr3JSYP7JoQqrORNVKIQYQ4qKMgS8NDv2e9JgRYlqairPAO3D3VRRhl0R7x%2BivA6ihUpXAQm7W0ASW4nch9ACkY9LICyZTr8pi39QUefeDPnK43R1MXULIXHvzo90QnhSbpb0Pv9lOxP2n1c%2FgvvwLK7%2BHkYv4tmQQg5X7UT6sp89cnrk%2BxZzAjdSeaFO6PcaKQWXVt85V0faWNYrUOu5o%2FTEE8oF%2BWSHcBkltnBUL5eWo9S8UWOQIrDGFtp0o78iKniFdQ6ze0fYk0vpbQERmRnCB4GtKMAX1UBKe1VaWWBGGDwfaPg2FxBg%2Bfr1VZFMQmha2rwIGYQ2pfZNwcoFg%2BJr%2F8VxSHMhpCVZ9wIpUhiYle3uUMencqgxgBBPqlCKVsq1290%2BX7GchOkdrL2JAEa5Y3TDz4OTKBjqkAR5cU2t%2B83dSl1%2BtK46HEARIUdSYjcwaTZse5Z4yrn9xxsulwFX4YElavpo%2FUnGmsbLJg8yidQ1gKL%2B9Fyl5aAJsIQAZSaJvz2zJrTKNABD%2Bxqxm%2BGEWu1rdCSfNGrS%2FYLTn%2BC8R1KSatPaMgmqHzt6Hjw%2BVnke04kxetGPAgVoCGBdtoSIfVAIr5Jk89E8qlJH7RK8ZDjiW3OMkg8AzCQS%2FkJL8&X-Amz-Signature=5ed4d67a361f50fc490b2dbf8e974fc16fa0767f4320c03c8bb1bb825df2d596&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667R3XHH3G%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCTPj1aXXBdPv83FdFhSu9%2FhjFHSxawLbJe33gZZmGYKgIhAOAYS9uTG7VZ30fFrl%2BBeIKWoi6iSDMOdCAXNbzLh%2BZOKv8DCBgQABoMNjM3NDIzMTgzODA1IgwkT9vTxtkBD1sVLdAq3APDfX31Pujm74V7szoekT42fn8cN2d9Nd5sUDJxFIqJIsWopU5nMOjJuCRuxVxyEn9GvX23%2BVXmJHIdr4QDdbkwidd05Csx14TIqedW70CIdhpZk4lW%2B22F%2BUhRLkBPDkjj2vHoQL3U1AKkKAuroE7LRJSak53PASQ%2Bs%2BP8T2pGnaqPpACg63dhQbSdybKPPCpmSxH74s3k6MYwxyA%2FIhFt2cXin2FJEXgr3JSYP7JoQqrORNVKIQYQ4qKMgS8NDv2e9JgRYlqairPAO3D3VRRhl0R7x%2BivA6ihUpXAQm7W0ASW4nch9ACkY9LICyZTr8pi39QUefeDPnK43R1MXULIXHvzo90QnhSbpb0Pv9lOxP2n1c%2FgvvwLK7%2BHkYv4tmQQg5X7UT6sp89cnrk%2BxZzAjdSeaFO6PcaKQWXVt85V0faWNYrUOu5o%2FTEE8oF%2BWSHcBkltnBUL5eWo9S8UWOQIrDGFtp0o78iKniFdQ6ze0fYk0vpbQERmRnCB4GtKMAX1UBKe1VaWWBGGDwfaPg2FxBg%2Bfr1VZFMQmha2rwIGYQ2pfZNwcoFg%2BJr%2F8VxSHMhpCVZ9wIpUhiYle3uUMencqgxgBBPqlCKVsq1290%2BX7GchOkdrL2JAEa5Y3TDz4OTKBjqkAR5cU2t%2B83dSl1%2BtK46HEARIUdSYjcwaTZse5Z4yrn9xxsulwFX4YElavpo%2FUnGmsbLJg8yidQ1gKL%2B9Fyl5aAJsIQAZSaJvz2zJrTKNABD%2Bxqxm%2BGEWu1rdCSfNGrS%2FYLTn%2BC8R1KSatPaMgmqHzt6Hjw%2BVnke04kxetGPAgVoCGBdtoSIfVAIr5Jk89E8qlJH7RK8ZDjiW3OMkg8AzCQS%2FkJL8&X-Amz-Signature=2ed67cc45ef97fdc54916db5a948ac7159a2e9dd6941ef2383b9a0f9253ee63c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RE3GHU4%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIEZCmtg5aZjbMEjCB4hzDehBt4OgjShysRfsTzqMK0tyAiEAjUbk35OV3BDD4q5OXHcJVjh50pXDxP2iaGFz1dUNU%2BAq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDGQclRVFHt8uXkkCgircA2nIU566AHePo60c8YgQMNOWWAHaa83xo97FGkTQQ9unrU%2Ff7ujFEHhm9dVq0pNXBYltIqPRASRZd4POp4cglJI%2FEZOEaelHi9O4H9hps%2FXXi4TOvtKccdsOXyTmCNej3PTwwTsZGnvg8xehHhIKcmehawjHUME4n3bKWymi%2BE7E0M7cKdUU3m%2BqIQ5%2BTvZ7OJhNm%2FP%2FTTFdPHTdp3Pw3CIglSpIECW5KmKjTWwcKrJ6hOQoPL5tRCMyb0x9eSUQ3uYUHpjR3MFncx1emyhJOwOeC5uBWixsBsxUd9WGN0yWAU04ZDaDMRhna0K%2B2%2FuHR9UIeBXLEnTXwgsbvJ9TF%2BGGyYVntEzzoWWYusuBoYSAjLMXwxCMEf9lg3n8VkgskCSvAclSFo7rkfgp%2B9vO8ob%2FBt4rS6OKXVeHBeZPFw%2F4LI%2FcQ4VszeFHfFmFLOhmlJYtJgrM9Lyu%2BObTSy2DrgSXRzDZAKUdy0u2377N%2FwijQ0xDnTyRTCspgj7zfR01XORdGddcFok5FK6Dx3K1cHbr6qKToOxlzT0flU9tdiO4uvtBpv3xFT9s5Pxp9gPI1Lo1gs7rp5kYxCMcXVvxgen%2FFaTSxRb2TRjTPifGpSN09cu9PShoeedDB6urMPDn5MoGOqUBm22I7NksDo%2BjPmYVQV6bbTpLeyoQ7uYxy5jQN%2BF3zQtTvAeM6skKtk2uOHu%2FnigQg1vOvBKXSKVpxjNkFLq1x7z7KprDqHHcKDUw%2Fyv1Q%2Fm3LkyBBC9I1MDqPMTity1yPAAqzx%2F0VRbqSfKg28nW4mMGWDrnaQwdD7%2B%2BamC9J3ugp5jNMYkndxLhsFXtqxQq%2FJpn7xjtRAdbQj9zldWzNTI3V4Gt&X-Amz-Signature=de5ece8d844020cc020e7e4015e704131a944acb8cb6df78e91a49c599af213f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCAHTSX2%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQDm5Dn7EkIDHkJrHvZi0z5iik17WFYLVEz2MF%2FfLCvvrQIgO5%2BNT%2FglRT4rl6vYogSv3o%2B3%2BAFLRQUqbU%2B7UXGnBS0q%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDCKOxNX5dUkyQtowASrcA7EH%2Fc62rEgnrHcfJLt04ppSsQ1d7vBfTOsr7frK43dYrB6zedbNX37SHooJs%2FGoYR8JmIlFcTHvofhciY1XrP%2FG1aEMbUsr60lf%2B2SUIKaVc2EfXoM8xiqM%2FehQM0zFNx6SU7r4pbdO439YiKYTFQFqFQTh6s3ijIpzocO%2FcLy%2BqY%2FtjYDpBosdO7UmyI5gt1oy5xkc4%2FVrJTvvrZQ65qnVJkZFnkzeY1VNmlrtPsNaS9Q4quDFaq%2Fx9GvacuVf0R1cin4PgyQizrs4wQ9hCiSlDzYmFT39F1tiPiJee5GHZdSoaXy07Xn0WOxzpgwl5UjFbWXSL7KKvqTxC%2Bfpg%2BOF4IjEEE1Yupwl4iOsxvz6o5DF2qdNoFO6B%2BeeR6Isa6P7pDxKD2UcY19SscMtRaYi9kBYxVdfw8gayHO5mhqQsRmEmmtq8JbgvXeJd2lIxtpK5c6gFdPpWQD78fgWzXSObbHz%2Bg7AXeFjbFOfqtd3lp9cfiTnHehpi0R%2B2%2FcKh85RhtuY%2B8fphv4iEVSNs%2Bzu4JXExoju2uLAqhWpCTWPx3OsGKdesI8Fpvu%2BdwHwv3Kki5hxio8HOc6Gs33knkS7SSQPvcL%2BHwHyARILdDKsreZowahZdvxBlvyvMKLn5MoGOqUBLZqjsHdTjIiw4obxGAn8PTaMopaPXwFP%2FFwRbci9k2dc56Q69c%2BC3KpOD8U5UdxLlexrbBLniJuWW%2BLdXnBb9I2dOPn5AeSeUDtw%2BbXj4RWMT88IwJM%2F0w4oKMIcjrRq5faAO0V9Kb9ILDF8pThgnQoHNMq8foXC08LH6LsRFGll%2B4KZ4ytCTq4yoF4DqF1%2F3kiVxXqSvqaSV6FxPx6Ec1chf%2FNC&X-Amz-Signature=42877382c885b7362f50e03fe6a6e529e39f6f3b3369ab5cd2ae67260e7b72ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCAHTSX2%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQDm5Dn7EkIDHkJrHvZi0z5iik17WFYLVEz2MF%2FfLCvvrQIgO5%2BNT%2FglRT4rl6vYogSv3o%2B3%2BAFLRQUqbU%2B7UXGnBS0q%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDCKOxNX5dUkyQtowASrcA7EH%2Fc62rEgnrHcfJLt04ppSsQ1d7vBfTOsr7frK43dYrB6zedbNX37SHooJs%2FGoYR8JmIlFcTHvofhciY1XrP%2FG1aEMbUsr60lf%2B2SUIKaVc2EfXoM8xiqM%2FehQM0zFNx6SU7r4pbdO439YiKYTFQFqFQTh6s3ijIpzocO%2FcLy%2BqY%2FtjYDpBosdO7UmyI5gt1oy5xkc4%2FVrJTvvrZQ65qnVJkZFnkzeY1VNmlrtPsNaS9Q4quDFaq%2Fx9GvacuVf0R1cin4PgyQizrs4wQ9hCiSlDzYmFT39F1tiPiJee5GHZdSoaXy07Xn0WOxzpgwl5UjFbWXSL7KKvqTxC%2Bfpg%2BOF4IjEEE1Yupwl4iOsxvz6o5DF2qdNoFO6B%2BeeR6Isa6P7pDxKD2UcY19SscMtRaYi9kBYxVdfw8gayHO5mhqQsRmEmmtq8JbgvXeJd2lIxtpK5c6gFdPpWQD78fgWzXSObbHz%2Bg7AXeFjbFOfqtd3lp9cfiTnHehpi0R%2B2%2FcKh85RhtuY%2B8fphv4iEVSNs%2Bzu4JXExoju2uLAqhWpCTWPx3OsGKdesI8Fpvu%2BdwHwv3Kki5hxio8HOc6Gs33knkS7SSQPvcL%2BHwHyARILdDKsreZowahZdvxBlvyvMKLn5MoGOqUBLZqjsHdTjIiw4obxGAn8PTaMopaPXwFP%2FFwRbci9k2dc56Q69c%2BC3KpOD8U5UdxLlexrbBLniJuWW%2BLdXnBb9I2dOPn5AeSeUDtw%2BbXj4RWMT88IwJM%2F0w4oKMIcjrRq5faAO0V9Kb9ILDF8pThgnQoHNMq8foXC08LH6LsRFGll%2B4KZ4ytCTq4yoF4DqF1%2F3kiVxXqSvqaSV6FxPx6Ec1chf%2FNC&X-Amz-Signature=42877382c885b7362f50e03fe6a6e529e39f6f3b3369ab5cd2ae67260e7b72ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HKRVBSN%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T170107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIBKZ1nzJdq7p9VvcHsCuGhPpvkGnuTlFpWzNuEIB8JhqAiEA%2BD4XiKF5wU6B%2FP44NHozme9FFmRvWMskIc8NTUWj8Gcq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDN%2Ba1w1eHLUHkIJ5EyrcA1o9ILww%2B8DMLi34G8EUn8a6S1rZcqqwUMjUpbOSOkoKGJpNPn%2BAb1o8heQfYZPeAQRpMaK%2BZ9B6VQFJ9Bdxg30EkhneClU1fHkVSdSXdngaQ37GyKk8t13Mz3eZ77Z6HayBAsvabtXOMPqJYn2GD6Qrqu5PdhYdwn58mgkA2ofs61Nc0ZCFwJMByN4UeNv%2BZ2O32XREWmxIdNN1GWuv0pc%2BoDl%2FJt3vJYv%2FRjfv8e7yOvkCalsbsxM%2Fk1Wc4yXkF0CkvCbBKq0sKu7AF%2FcjPBcrKp1tLkhgK5HkuYyrxxeaDMDHDE%2BQrpKhXGvD%2BRhQntMau3JwRuijwgFseR9A6L7N%2BDf1WlsH6Q%2Bl0hOWixmzYlAN5pmpLNGpvJOdYMJHESQd20vVXytnJp7snf9r5yfxaQuYvSu%2B633LuIlQLdy2P0wUlCl6Z0C8WebbBLdsGiYVLVjhxoCfdS06goY7WQIjN07ZbCx6QfdpiRaRPwYHoGhTVMPimL3FOiY2fIFSITEJAdLohVTdrudmw%2B7IwYHHJgQrtKX%2B0tu3aatu%2FTyOmgNsbzoNRPGS3sRpWOjgU%2B8DoP2hGAJ1DaasU7HW4kWwiuxQdKA%2Bb9vkV5CG8olaNaD08nPeaURykm53MMHp5MoGOqUBNed1gLQOs6NwY6GWO8Mk6IJuonF8TvT95hADLeFTDXX7T%2BqX%2FeDShBhPdlMxJRvMYRI3XCSy4FoUF2t8yIIjBC2ANN6Mnjo1exu5V5Bl3JlcnFbFdbb%2FM5xlHYRWYdSMgJfdM%2FFUXiONL9TEPVoHtbSrDzLtMYVQJUTOH0JG%2Fn6HfIajLwazu1rrs3sVETrQRSQKFdiVLb1%2BZ12%2Bivsq4elwT7QA&X-Amz-Signature=df66317ea57262727976faf2c8ec42ade537840e23c3ba26b8d0584e00309396&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

