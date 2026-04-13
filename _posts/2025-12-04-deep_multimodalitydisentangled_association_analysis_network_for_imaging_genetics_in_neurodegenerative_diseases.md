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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NWG5VZ7%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEtfmlcMeT4IA205chBsMeYSMb6ip%2Fh%2BR%2Fowpo69GPDkAiEAz1Am8Q7XSrJ65DLu6T6k5PDwcAry63Qm3bEQ7Kqw%2B8Uq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDBMGJHDfuwx9hm%2BnwircA7cz8k7teVW3AF801fGiFbJfavEM5USKcOC%2FhZFSuJmXL4Bv33SiAUN0J%2FV7OkgDzyQ5%2BfXQrfEls%2F6%2FAauxdQ9prVGAT2iHAQ47Y477dNLw4uA8dXRdpf0%2FcCz%2FaDJblSDhYDbIjqnRoKKFuBgsdfSop553F53FnDZHj89Cp2PNMLsohoypcv0SN3aPPpzBGw7Up7iYRt%2FKcTKIEsZqmWgdRDGR40QgkYp1GgEyGOpYMI89QOvboM6hF5T8MyvF3mk5LhDjdxS1pGcx8jNYj8iWaWFF81y8%2B2eAZjIIKc0OFlfYB1Rtu1ii8anGsE%2FuNUKTi%2FbsGi6WIn0%2BAZhl31FLKig3xv8pCNZRNu3nWzpuT%2BW0yRYkM%2BeomTU8crDlVntP98WXX2GnHrJpFYt0rEmG1TDlnTy4NkM7hYH64ZwI%2B1AJt7U9P35qfP49z1X0VJwMCL9jRSR6LzKEc738eaRvlqcT2kBcv8RCV1eQQqCBnvap8I2Jm5wqGLY%2F9ARF6jjqGb1ghWfeVAdHJW0kJe%2BY962H%2Fc4zR2bQ0FtPtgbivzNSUuXuVLcSqWH9AzTfey6Ye5gkCPznS3RkRXIyx%2BMQojg%2BKl%2BmuJKjfu%2Fj9TD0xUhOTW0TixBVMBq8MJvV884GOqUB30yyqzMsHqkr6pMG%2Fw%2BpHZm%2F8vJQBHw03ME%2BShCBv%2FwXX2sF1o3iYQTL3jI8K7bwmzOx3MEhc9QG%2Bs3r7sa%2Fy4Z0eDnMCeEfZGOlBl1%2BRclZ25BxHhqFObJN9eatwAkO1WA6QvOQRL2P2cupmnqIDHNRRWFNCHGW%2BCd6TVluD8ppIyl3KlyfO%2Byr8TXbaEmMnRlFTE06xcjp7Dw3k6uNcRHKnAZV&X-Amz-Signature=670f7da87ef1e8d742fc5c2184828083ea00dccd837e4e47750ba90d17db872b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NWG5VZ7%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEtfmlcMeT4IA205chBsMeYSMb6ip%2Fh%2BR%2Fowpo69GPDkAiEAz1Am8Q7XSrJ65DLu6T6k5PDwcAry63Qm3bEQ7Kqw%2B8Uq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDBMGJHDfuwx9hm%2BnwircA7cz8k7teVW3AF801fGiFbJfavEM5USKcOC%2FhZFSuJmXL4Bv33SiAUN0J%2FV7OkgDzyQ5%2BfXQrfEls%2F6%2FAauxdQ9prVGAT2iHAQ47Y477dNLw4uA8dXRdpf0%2FcCz%2FaDJblSDhYDbIjqnRoKKFuBgsdfSop553F53FnDZHj89Cp2PNMLsohoypcv0SN3aPPpzBGw7Up7iYRt%2FKcTKIEsZqmWgdRDGR40QgkYp1GgEyGOpYMI89QOvboM6hF5T8MyvF3mk5LhDjdxS1pGcx8jNYj8iWaWFF81y8%2B2eAZjIIKc0OFlfYB1Rtu1ii8anGsE%2FuNUKTi%2FbsGi6WIn0%2BAZhl31FLKig3xv8pCNZRNu3nWzpuT%2BW0yRYkM%2BeomTU8crDlVntP98WXX2GnHrJpFYt0rEmG1TDlnTy4NkM7hYH64ZwI%2B1AJt7U9P35qfP49z1X0VJwMCL9jRSR6LzKEc738eaRvlqcT2kBcv8RCV1eQQqCBnvap8I2Jm5wqGLY%2F9ARF6jjqGb1ghWfeVAdHJW0kJe%2BY962H%2Fc4zR2bQ0FtPtgbivzNSUuXuVLcSqWH9AzTfey6Ye5gkCPznS3RkRXIyx%2BMQojg%2BKl%2BmuJKjfu%2Fj9TD0xUhOTW0TixBVMBq8MJvV884GOqUB30yyqzMsHqkr6pMG%2Fw%2BpHZm%2F8vJQBHw03ME%2BShCBv%2FwXX2sF1o3iYQTL3jI8K7bwmzOx3MEhc9QG%2Bs3r7sa%2Fy4Z0eDnMCeEfZGOlBl1%2BRclZ25BxHhqFObJN9eatwAkO1WA6QvOQRL2P2cupmnqIDHNRRWFNCHGW%2BCd6TVluD8ppIyl3KlyfO%2Byr8TXbaEmMnRlFTE06xcjp7Dw3k6uNcRHKnAZV&X-Amz-Signature=670f7da87ef1e8d742fc5c2184828083ea00dccd837e4e47750ba90d17db872b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIKJ2KPQ%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDirowy9aGiwhRCBqt9ZWl%2FIKGti%2BLyp627ZuCFftECMwIhALjbzAMNn9hGwpKXpPViudL5dWiI2Bi6UATXfJnVUuaoKv8DCHYQABoMNjM3NDIzMTgzODA1IgwfkVh8DAv9JGF6lFwq3ANJDbQVQIxkitWmqCTZr0wnp54c58uYgm76KUp21HmkzW7KPm1Ord0O2FJVR%2FxbazlBynpqQ%2FP2VFTmUY2pgauXrEtYLCbxFlBvDzgzw%2FNY41VyCp4Hbac5LWO1zH43hpoAshDRbZXwKBO0j2vZEa3kik1LYVwEuzP9fL%2Bt%2FDVvT0iEBkAj8ZiZP5dTa4zy%2Fl8vonystLsXt%2Br7QD%2FGlAdZ9KwfiV58p1yzJ462mCxYFg6Ihrn%2FoR1MW4Uz0mkgNaDb8tMgU%2FqwretJrSV%2F8waRk5eYSdHYtYxwayWyTo4essL7IO26nlRU8uap6VfBoSNBhLKbdrNRdyctrxa5nDZm%2FPrfkhgimNSJh%2Btg%2FY%2FLQxlvaxtCSEzsQrGTY3Egl7tJGi5iblIMlHM40dqBQPjvxwLfHC4bNjIGGhHbHoP74aeHxuOSaCoge25MJZKzSq%2FRHTW%2Bl%2BIaFy9pjqMD8yvGWDIs2MEZlpCsQrjpsEGve2Jx9IgxRpBZdn64pKK9eR9H3sq3ArdLM9krJE9HvLV8MUw0lWgu4kr6y3dvDOf92Sq7Ux9H2h%2BgKbfpbuB2yUqojtnBgOTrLyje6384HHiRLwRzLP8seEc14x5fyv3d0%2B9tfUAhF5LZ8G%2FAzDCe1fPOBjqkAUQ8EJLNNZBYtsT%2B3DsztOhYuDmhBemQJGRv84iDS0tnl9bQEf6mrFuY9RIUtL%2Fmj7D4w8SEgrRZnVzpuQ34goWGcPo9pkHuh8Cow%2BLnPGpw%2FA1fNlZmjfhmcaI%2BqmStpPSGgv0ryUrvvDFSCMLG67XoIUmtIOty7CFlwsbQAKRfLpWo2GA5u25fiywqW%2Fn9RDJqp9pn8%2FCIIYcwMnmYJjipE1h1&X-Amz-Signature=c8076f1f2bf5aa78f9185e5b85aded9ca91609a3d2942974fcf3cf1683383cfa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3UYS7JJ%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCM9HvWPsCNolwmEPX5fr5qby4bVdbD%2FVHuC0LB%2Br62WQIhAJxtqW6dtzyMM5tRUypMkNbQfSfVO1T8IPaiXj5xOIXQKv8DCHYQABoMNjM3NDIzMTgzODA1IgzGfNE3ebeCMmB8AN0q3AM56nBRJ7%2FIyNh69B0TOgPro1uweU9PsKEmZiQ3X54Yq%2F5Jxs2NIPjG3xZadQ4D9og9HeOgkwTy%2BSmhqxD%2FYQudIUK4Cz6%2B7Csi3rbG54BTdUhSY1YEvbr0MqJzzYYDuTNLujUZxTYF%2FnFjbJXoBaJ3hMRnd1r0f9ibvO8L6B%2Fvnk1HO%2FpiGbLGMvRmD%2B8RJBsmNN1ccTIInJoK%2FSRjqdZhz2A1hSUuSQ02YCWxgPV5ITZF5R8PqOSC%2Ft5deuCCU3IiJ%2Bn0XRR%2FRbjgwpYiayXTBhU7rV2MZycIzZT2R5Rax7qKRVHHUV9E9zTS903bwOtOFPv5%2FIqIO9GHZ25urVpPh5igq4cmBZJS%2B8xlj34dNyLMN8xpecpdy904vpEF11UfdEhTI%2BJ432B0X4DvTIObNJnOhbQVep9MPg%2BM8ZfiqSgT%2FTKWfoA4g6H3352m8yv55zLJP2N30sg1%2Bje1HC7YfyZCRC%2FA3KsqpR08F72XKnRx6sYve4iigO6ClOWxlaQQPKaPe6grDBsI0uBzci9gmagXqgMaL7v2pXI9dyEo0YCjbEAyNC%2BfAj298DdMLlMhK1EhN%2BZvBi8rVFS9QmzBypoxj7ljmK0ovrLVq7PcoN2bPZ5K6W6u3p5FKzCJ2PPOBjqkAWg6QbWYkQT3gFPG4SZ%2BgsATOgHYtqcWacxB90egyZ3o0rAD2HxJ6nLasXdSf%2BnCRdC2FGq58HWHJD3J0wpZQmyNnjr1EE%2F85yzjAIo3ccTUenOqui%2BmJxG5tMaCW9tMePeA8QizoZLmvF%2Bfb5D3ubZqndDyii5dKpWxOdPeDNotQyDZA%2FEanUzau9o5lQlszs8YLCf3AclivrY40cuPZTRCTN6x&X-Amz-Signature=09af46e4808b78c99c7f414bb3c5282ea4f0ff674f24de117159c33dc791ab72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3UYS7JJ%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCM9HvWPsCNolwmEPX5fr5qby4bVdbD%2FVHuC0LB%2Br62WQIhAJxtqW6dtzyMM5tRUypMkNbQfSfVO1T8IPaiXj5xOIXQKv8DCHYQABoMNjM3NDIzMTgzODA1IgzGfNE3ebeCMmB8AN0q3AM56nBRJ7%2FIyNh69B0TOgPro1uweU9PsKEmZiQ3X54Yq%2F5Jxs2NIPjG3xZadQ4D9og9HeOgkwTy%2BSmhqxD%2FYQudIUK4Cz6%2B7Csi3rbG54BTdUhSY1YEvbr0MqJzzYYDuTNLujUZxTYF%2FnFjbJXoBaJ3hMRnd1r0f9ibvO8L6B%2Fvnk1HO%2FpiGbLGMvRmD%2B8RJBsmNN1ccTIInJoK%2FSRjqdZhz2A1hSUuSQ02YCWxgPV5ITZF5R8PqOSC%2Ft5deuCCU3IiJ%2Bn0XRR%2FRbjgwpYiayXTBhU7rV2MZycIzZT2R5Rax7qKRVHHUV9E9zTS903bwOtOFPv5%2FIqIO9GHZ25urVpPh5igq4cmBZJS%2B8xlj34dNyLMN8xpecpdy904vpEF11UfdEhTI%2BJ432B0X4DvTIObNJnOhbQVep9MPg%2BM8ZfiqSgT%2FTKWfoA4g6H3352m8yv55zLJP2N30sg1%2Bje1HC7YfyZCRC%2FA3KsqpR08F72XKnRx6sYve4iigO6ClOWxlaQQPKaPe6grDBsI0uBzci9gmagXqgMaL7v2pXI9dyEo0YCjbEAyNC%2BfAj298DdMLlMhK1EhN%2BZvBi8rVFS9QmzBypoxj7ljmK0ovrLVq7PcoN2bPZ5K6W6u3p5FKzCJ2PPOBjqkAWg6QbWYkQT3gFPG4SZ%2BgsATOgHYtqcWacxB90egyZ3o0rAD2HxJ6nLasXdSf%2BnCRdC2FGq58HWHJD3J0wpZQmyNnjr1EE%2F85yzjAIo3ccTUenOqui%2BmJxG5tMaCW9tMePeA8QizoZLmvF%2Bfb5D3ubZqndDyii5dKpWxOdPeDNotQyDZA%2FEanUzau9o5lQlszs8YLCf3AclivrY40cuPZTRCTN6x&X-Amz-Signature=4d2275fcddc0927c22b78197c7613159604f633af6ce1e1b13f3d5c17841d74a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5CXVLV3%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAxwf7mUlG9g%2BBXjXmpudTsrhM8gCfm3L3mPGrucJy7WAiAQGja9XDhlToyB%2BefMUP%2FhlZ0RPkAElSPqK%2FbTSjmV8ir%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIMYTI1f6WtaH9Isv%2BFKtwD1dO3UBmVgEwHlcsOjNWxsjyPB9grjmHqEpqeehrQ4F4d8NunHz2p%2BFaHNdkbBTdX%2FBnqUL8Alh9j2N6w7ZQ26s%2BBdrkneyHEbF%2BO1hVAj%2BNp7vVtoETB2CuB64cT9OE8xUiA3dRFXo7Xa5jCQdLUpiZoeEehKy5jr9O65UvYkI8m%2BZiIMQd%2B5sEVfMBqP%2BO%2FKg7cGCrGiL3k3HrzPZjM7ReKCdKXi3Ymx4LA8nYJJTdcXYW8VmQ2JTE2HTjWTgzJ%2BwXRWhs1tBFd%2BrZtPWIxlw9uynNlimnac90SNhF4ZrScwzIoDQ8DQmKtdI8I5%2F%2B6ynPbCu0cc8aRlxmMkLP2mO7kkHtPzutrcA29jN3vQaJR0QdCRV%2B4QSwoyKcctTuhEgOEzdBX80OsFkFRFyRsZS67miM9Hs%2FIaY%2F5ViwmTM2k%2Fi1%2B6U9672Uk0zLB%2FPVTSNBKx8YycTxFwsLnaqnuMLwMu6I5BdIMT%2Fl4ssE4O1RzvJjfh9HqCLJOHwEgEQgQDQ1iEWmIUAX9M8aQCEPtV9Irn0ME3wIf%2F0lOBqx7PoR423WY3O5PIu91feqCCxjfMgIoecWxP5HOSbVk80QqK4rbG8WfoZnDkAuSbiWnmvSBZuI6p67lg6pTOUswutXzzgY6pgHyFgHIrzmqpuDwvQQ1J%2BqeB%2FOlwkrjD6XhoBgEPmLte7vq95oxpMbQB1w%2FGofIXFqKzBMGdBNrB3gtnn%2FMuUNjxUMLZQusYb8%2FgBK7PRKA0ITl6r48x9sAauMQAg03rb4g3SOytzHOCkLQYPsIUWLZTmDaAE1WJs65QnHutU7nBcvxwKkpky3wE2xJJDTqWg0IKwkPtle9Myxwnx51MVRFhNFbzEs3&X-Amz-Signature=b70813f6b1094cbc12308ad85a52c832f3047bccdd49bc42de0e88917bee535c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SERIV6TQ%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYeevbjWK5OB5y10prAQaNz%2F8VkPmYVnbHmRVb1dnQwAIgWX13jKjooswh1IWfX1p5iMmNQaTwDed1%2FrSZdlktYHYq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDJC%2BqvaZm1Sksf%2BSGyrcA%2FdhkmMqfEz%2FwdHWDVXJuXgEfURTzkICbu45AMDV%2B3t7PPXgmQeGwQqC6z5MJx7ZrxerD8jVRZM8j7qrj6S%2BsuPEdpkfnnUzAkzAAEFhLv0%2BwE3ZMXNbL2KYfYZ4315AVQHiYPYBMNhPoWYw%2FtUKD5jaA3R1FSqEDgx24k5fbcKXPA9oyckHEUEaiaPgGz41d2ZMNhp4GP109JwhaV3WxRHMGVTi9aZKZoReVNAGHUJTPF2VyhBOJhrGB3xopJehBcam%2F2RMDkuJDs9oJJFAE7ChXe8Zof4hauThLxE54AJY6w%2FizPiwlV2p%2Fh5dxMTpa1SaQeazp0qqgkO2Zrg7HETG7f3R5fGLu9EMNULF5IuGDWu8OXPNwS8mWuWufKbBWgGzXT9LCE%2BpdPxq3zv3VrF3XfUKHwNPDpryTtqA2TBUG2wkh0WbeTAaCoZCNLPcsN3Ofj8TMTGRL%2FcBhqeJhVvGeKKXJpRMI72iAz0mM89kOjn5625ew%2F4Gk4k9iuTSOjkO1ms46UPkgi4ucF%2BrQc8FplsTbKwoR3vczvGhW5U4Wo30cWmBln6UgFxscqgcpx53j4S58dEEuQbkj%2FeFcaJpLyJkd6UUzenUuZ9JxrFV50%2BWFSrgw5dTbFoOMPXX884GOqUB7OgLLjhOK9wUhQ6bKEKOrJqiv4umc4rkHtoaUPeXTv1%2FQdj0do7bxZeJdJjo62T4oa8uHU753PNgZwojg7VQ%2BMIlJU%2BnG1ugfR2dI%2FmgXei%2FdtdxIZcjNejGU6ddOcwoBuWrjBKr92pZTB8xnihuRrgDCkMRkqtADQzDjC8%2BBphME4cZLtLHRV%2FJjbCzwCI%2BVFHbZ7F5mqLq8Guhm3XRyecrMhVj&X-Amz-Signature=9cd5c244be44441adac8d9c6a900feb5b80ca41e30de4f1b60760a8ae5a0cb08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KPHXMBK%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG0AGHqLzLSlPgTeo29itymucy0Fuk2DzPSF7KD4kCDEAiEA0KvOtUJPkndoBCzkse2w6BMYmm%2FP1V%2Frz%2FYXBQp%2BlT8q%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDNFuexYlF%2BpQ%2F6obkyrcAwW0VMTmfqy98bft0ov%2FN1a%2B9%2Byrl8D%2Fw4Y4wQS02K8pzPPto3isnj%2FjHPTLDC7t%2B6dOK6sgvHOQEPV%2Bb8rVdt5mkSUMyoXlzc9hcXI5HFWbF7MXiLsEg2yE8GapFKYvsrCwMspeXRVu3l7hd9JcQo6gQv%2FBhDQjTKgYOn8ZUdbVWxjmwQO9I9YQ0nx5%2B8p983GRYjtsMmdbtSNQaV1h%2BLUvK6zx%2FfxwY23lby8xpOr21kpoDkfK569cmcTzC1GB5VziI6Tn94IHXiL7gQ05txu2XQywJ6U0T8ePLL5gEfDi7sgVHWzScthOoVETmQ9EJzGB1jyhNHmv5dEvURNJNioEr%2BQfURWs%2Bfc%2FKl2VaQmy%2B%2FqwXQlVlVucDVMhN94k0%2BpUhk5ljS6brb8grLEGkme9yIQ%2FGgrCeK9dgMWvA4HCPh%2FUbXS0h16lPp187jPW1Cdm4M%2Fw6LTb8SXT8EBWl9iqP2mNIVdBoUVUqvGdjpqo5e%2B2ZabCf8zMTQFE2%2BF5EjWU7Lj8FhrNoZ5xe4p7ABzAjd%2BMCWrQPcHQt0WYyXEk6714T%2FVsh6XqjVZBdyNSTrSE8WC2ZIUX7AlcdSl8kO8uUSDr5JMVRZAbTQtdW70r9b8jqZKo6W8b7oNZMLbW884GOqUB6yDPijjUhXbQWCQ%2FEY4nqLJFJ2ggEd7zMvJ8Mj65ZROHuvVYP%2BIR73y3OrQwLRBR6yKFq5PSm8fJYQFUYn23FsyTvrsQQ7ELx9Smhne71OZQsGUsawWE7gBalh79meRSIgnES6tJssvPbkfSvXQIzC9tt1YX5P41w2QGdGMP928YgD3Ihe%2Bh713gaNpZX%2BhgkOfYMZUnL2yL7iE%2B6DHEIu%2B362nd&X-Amz-Signature=42d16874a54d2132e366839e7a496ba4bcbb30d45391e281def328ca700e47c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSVUEX3W%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDzOhyrVeZyBSDKJkYs%2FFcJ9AFK%2B3TcuOEWkM8pv4pC6wIgFBXkiSm4SFyR%2Fp0NhuZQLCjRJDlRZaiRRphLA7KED%2Bkq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDIDigjekLgC0RLseZircA%2BPN94EXQ60i0aPWdwjEevK02e6GIpCAtIWjIXF0H5BL5FukgF7Qdzs6gjKWoDt7tQ06E7Tk01H24t3JxgfbIoorYR%2FBYrjna9vCpwcVsy25kGU4XK702yiWi3%2FCpxLaFdqWy6Ge1SJFpDtVwvxEk8oHgCHH4gQknVCT5H4Jgf0KxqUA6Dhl0VKV3kjs3CValjyr11z6432J2oZ5tt4%2BITfgivujULZMKxEmiPGMtejFrVS0uP9TFk9Oa3hhHdfwFUVcQYykMKaLnc3DD%2FmmdcXOAm6bCZzzEs%2FHaVgzuCAgeetxe7G7zyQ9UyXO%2FYhd0iX1GHsOm1MEDlUWgfRjfE%2FhQkP50lof3fRae6Y0Q2l%2BeOjzk7BaBiAOOtFgBRePyo%2BvQDRQB5iNuDJHwPgVzZeGVBXgeafPC9c2gBZBJlRbqSdKa4jaFsowaRxdQq4HySZ9t4FLnawMx1pdJFZZIBG%2B8q6H3YMhQI1nv9T4GfywiwVzhjIQWndZjXa8XnPVSG5YTUK02SjTAIA9ScZYwTXfPqPUNu%2BNR29w8dyu2IVjY1o3rpbOL5Ll8JDvsQW7S7hSdfJGIYkbHOCMjquQSpEWavGgxTXW3OsuKlOgH0UdcTQPKngMcU9tjiq%2FMJbX884GOqUBqSFMMHtvPkSKlOnm98BjiAy8crCrjds1R4XOCEOagN%2FEEBevNx2nJU4dAFs47fwlIm8qQwgZ6yZQXeKh8WFjn1efaykwgZp%2FCC8Q9RWlzIMwrb%2FD8pJqB9urS0z2aFEYka4fuP49xGaH74%2FSrYSL%2Bli07L%2FT0kQQGIHI851J7Lepsgi1xYKPynRsJ3YuM1IF1uxWKg18%2Ba6FVpCYIeKGLo0vQX%2FH&X-Amz-Signature=0873b1a20b19b689c10e9aaec5c34030dee95a6e00d54fe7ddf66d82066413d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSVUEX3W%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDzOhyrVeZyBSDKJkYs%2FFcJ9AFK%2B3TcuOEWkM8pv4pC6wIgFBXkiSm4SFyR%2Fp0NhuZQLCjRJDlRZaiRRphLA7KED%2Bkq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDIDigjekLgC0RLseZircA%2BPN94EXQ60i0aPWdwjEevK02e6GIpCAtIWjIXF0H5BL5FukgF7Qdzs6gjKWoDt7tQ06E7Tk01H24t3JxgfbIoorYR%2FBYrjna9vCpwcVsy25kGU4XK702yiWi3%2FCpxLaFdqWy6Ge1SJFpDtVwvxEk8oHgCHH4gQknVCT5H4Jgf0KxqUA6Dhl0VKV3kjs3CValjyr11z6432J2oZ5tt4%2BITfgivujULZMKxEmiPGMtejFrVS0uP9TFk9Oa3hhHdfwFUVcQYykMKaLnc3DD%2FmmdcXOAm6bCZzzEs%2FHaVgzuCAgeetxe7G7zyQ9UyXO%2FYhd0iX1GHsOm1MEDlUWgfRjfE%2FhQkP50lof3fRae6Y0Q2l%2BeOjzk7BaBiAOOtFgBRePyo%2BvQDRQB5iNuDJHwPgVzZeGVBXgeafPC9c2gBZBJlRbqSdKa4jaFsowaRxdQq4HySZ9t4FLnawMx1pdJFZZIBG%2B8q6H3YMhQI1nv9T4GfywiwVzhjIQWndZjXa8XnPVSG5YTUK02SjTAIA9ScZYwTXfPqPUNu%2BNR29w8dyu2IVjY1o3rpbOL5Ll8JDvsQW7S7hSdfJGIYkbHOCMjquQSpEWavGgxTXW3OsuKlOgH0UdcTQPKngMcU9tjiq%2FMJbX884GOqUBqSFMMHtvPkSKlOnm98BjiAy8crCrjds1R4XOCEOagN%2FEEBevNx2nJU4dAFs47fwlIm8qQwgZ6yZQXeKh8WFjn1efaykwgZp%2FCC8Q9RWlzIMwrb%2FD8pJqB9urS0z2aFEYka4fuP49xGaH74%2FSrYSL%2Bli07L%2FT0kQQGIHI851J7Lepsgi1xYKPynRsJ3YuM1IF1uxWKg18%2Ba6FVpCYIeKGLo0vQX%2FH&X-Amz-Signature=f5840fa1df58042d1dd7ffb49f6e6befd5a33944eeb0e9ccdbe565552235e01c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PLATDWJ%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGTw2R8Vb5A0JmktErAy3CvnSB4UOTMbDrDaYCcRpdU7AiEAltppgd6p2L2I2N4qWX9fYl0FowOAze0hWXrwgug1vKoq%2FwMIdhAAGgw2Mzc0MjMxODM4MDUiDC7ultVVPYTl3zL8JSrcA9vopPOIOWtoZzxtkiXYpZgP2UoZ%2BcuJpGDKfWhiU485UmzIW2883EUUmtRzsss8%2BRCFSYqbQBu3vLvTz6CFWpI5EQmzbs9%2Fj5seeXq%2FMzQvhhm4xIrjB3d6SqRofSMhnITqrXxEwye75EgA8o8MT25gi%2BI33Vt6iNljq5F1yDStIzN14oyFxiLtbZJk%2Fj%2FvHvHputgfSPlBG48cUWaPV%2FCZFKLBcfyLGdcOL4EDOCxRcddHIF9pSlnpQeXFSWL%2BEFoOn0DFpjm27sHbvoLtBCwPod%2Fs97pqZwEA0Y58HsdAe1%2BPyeWoKESKUU1t5ANCfRqUgAJr2rxZWYpkLWdXo1Zqell%2B%2BzcYNtogQsOlR0WofsCoJmrxjzMeuCUNP8%2F17Lsf0lN4axEEZnORQEapsKNEVrokEiFM2YpgQNQKWsTg5fKKHnCHwRdULUvVavm13wROQl2DM0FGL2rK8XSMLJbq6BJSZxFE7LqE%2BdA4M7V5eONszZJsHhDrPTsmbQ0Y15tUlcSEODHbiKs5%2BjZDxS0BQ3yqvwPcXn4GxcMJz12jc8YLtug%2BGUMXbZedCvNx8XVqT0ln3YhAUK5007n1UIXGZeol2rweAJPWCcYShWEV7BCAC17wcPSGortuMK7V884GOqUB7%2FzRfly9Wqitf%2Bylh0Tf%2FcRG8658CmudBZ5FYQAV0nMrjiE1fArMcXFmo7d1OGwcknJe8L2eNrFLw4FRZGaeLnckw1W6QdLW42HwXyNfPZ2dEqCnAuYUZsqqVzVZS4GWiuEBva0l1B3fY06UPt5gV5lkruxQuThT9pEwcdlINmV3PWAn4Mh%2B1HAzKycN5Lh4t%2FASLertxwK%2FAaGojNdX7zBp1GfH&X-Amz-Signature=d1b321035dcee3bf1a7385e2097b90fc14d7b8eb27ca5eeedcd17756ba7f3977&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSEOVMLV%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD82RPPTHV%2B5ooBM%2F7vcEVr48ThqEqkHBXVWrDcPxIG1gIhAO3sVSvrNxR%2B4ljMRk3u0KhOUQ3Z3pUs4wFzbw9LapwHKv8DCHYQABoMNjM3NDIzMTgzODA1IgzGxaaUJJNh2keNT40q3ANs3z0pgQ2jKDzac%2FW%2FaRHg3%2BkDBFhEGGxcNHtvvLUYYb0nTYzJDFUzZC0onTUrUiDsk6UxL0Sc%2B56jNKCYo41QysdgsLXz1%2FpVnypGP1vEE9j0sE8WYNszyfvYON3oAfWWIB6g7Rn4VL9dAPB0%2Fk5VP4AqGdiNCIovqJs93onN5qn0PJLwfXr2rEgRHNkG%2BN6GvKLsUGo%2BZwebQnd0fB1zEznvkB2VW1iNsDQC1pnwLHeB%2FGxz9p4767i6N1JCEQ5SxjiP01fVLcKpcvIT%2FqtLZcyV5g9LUJyRQjdAFnybZWlQRX7nIXxuomrjcB%2BAKYCEid25OSwBuS3fcjh8LqFrL3FSudTBmJBGMhoXMbjWKCbW9pmNcc4bAQ%2F4jqzVCUFivw6VA%2F1vbKphZnN%2BCaO3mwG6Nwlz8S%2BBtqULqZFGfuoZbYPog4y%2FC5Mb317x9ZXpWhURDxWkJvJKOh3m1pvM2Np8fGW57XFNzuVH%2Fnh5UxyVDtGjTpAZtumd%2Beu5u0cIxUufnuYb0iwfIcJXc6SH91tRvP6iAr0JXinjaaAFO%2FuXWRvshHMiKShoWj8LDycadIuSn4x5GqPkwTix3etKGlnx5agYh7bJ2zKdL8g0W4xKXgjd878i%2BlvjFTD11%2FPOBjqkAWWfwtmVacoIYkivnRk1tjK326%2FssTdJvoYQTLG6BFMx4%2FGV1whDCgvjaOt7QCOiWWU6bKf%2B2sFHHB6D2Bio1hmGIFs2owASchTLqM6iv2YgaRwX9y3LR5LyPEM7gC%2FQ%2BL8FN%2FyCHSGnPmT5PxXCxmgyLZ9Kfkrf8qnA%2BprPxMOzrEeBVFlCXLHfUg5%2Fe8yHrQcmDOnoax%2BZZSjT2ymjznGn7uwK&X-Amz-Signature=2c1d3ed39d98fc6c9e5ba3164669ca7b8ccbe55fe7256826434c79821cf26637&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSEOVMLV%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD82RPPTHV%2B5ooBM%2F7vcEVr48ThqEqkHBXVWrDcPxIG1gIhAO3sVSvrNxR%2B4ljMRk3u0KhOUQ3Z3pUs4wFzbw9LapwHKv8DCHYQABoMNjM3NDIzMTgzODA1IgzGxaaUJJNh2keNT40q3ANs3z0pgQ2jKDzac%2FW%2FaRHg3%2BkDBFhEGGxcNHtvvLUYYb0nTYzJDFUzZC0onTUrUiDsk6UxL0Sc%2B56jNKCYo41QysdgsLXz1%2FpVnypGP1vEE9j0sE8WYNszyfvYON3oAfWWIB6g7Rn4VL9dAPB0%2Fk5VP4AqGdiNCIovqJs93onN5qn0PJLwfXr2rEgRHNkG%2BN6GvKLsUGo%2BZwebQnd0fB1zEznvkB2VW1iNsDQC1pnwLHeB%2FGxz9p4767i6N1JCEQ5SxjiP01fVLcKpcvIT%2FqtLZcyV5g9LUJyRQjdAFnybZWlQRX7nIXxuomrjcB%2BAKYCEid25OSwBuS3fcjh8LqFrL3FSudTBmJBGMhoXMbjWKCbW9pmNcc4bAQ%2F4jqzVCUFivw6VA%2F1vbKphZnN%2BCaO3mwG6Nwlz8S%2BBtqULqZFGfuoZbYPog4y%2FC5Mb317x9ZXpWhURDxWkJvJKOh3m1pvM2Np8fGW57XFNzuVH%2Fnh5UxyVDtGjTpAZtumd%2Beu5u0cIxUufnuYb0iwfIcJXc6SH91tRvP6iAr0JXinjaaAFO%2FuXWRvshHMiKShoWj8LDycadIuSn4x5GqPkwTix3etKGlnx5agYh7bJ2zKdL8g0W4xKXgjd878i%2BlvjFTD11%2FPOBjqkAWWfwtmVacoIYkivnRk1tjK326%2FssTdJvoYQTLG6BFMx4%2FGV1whDCgvjaOt7QCOiWWU6bKf%2B2sFHHB6D2Bio1hmGIFs2owASchTLqM6iv2YgaRwX9y3LR5LyPEM7gC%2FQ%2BL8FN%2FyCHSGnPmT5PxXCxmgyLZ9Kfkrf8qnA%2BprPxMOzrEeBVFlCXLHfUg5%2Fe8yHrQcmDOnoax%2BZZSjT2ymjznGn7uwK&X-Amz-Signature=2c1d3ed39d98fc6c9e5ba3164669ca7b8ccbe55fe7256826434c79821cf26637&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLYNID4H%2F20260413%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260413T142518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFnEUq%2BVq4GNgHvpz%2BKllCO%2FStUrLn2bzY5c5dqvzueMAiBb5UKP%2FYaEUVB7jB0tuVNaihZIbBSUrUhLlCml%2BLyBWSr%2FAwh2EAAaDDYzNzQyMzE4MzgwNSIM9IWnyVuILvQjItNLKtwDelEbkXvGWzLXE7eGI85XF8ri74V%2BjcXTDU2malBuyHfDg1lh%2By8%2FkR1OLjjHkXUGSGR%2FR3GrCIbUcxJM78Id2yOvKhoS2kVKYDT3b3EHelQeFuw5CpDpMq%2BcbRHMryUupnCbWzLjBifBxJ6wPqbKf2JvRNABbL6pNlkuozvWUcjZ6WMLGgS%2BgD5Y9D9fFBklnY3D3y%2FQFLNJkXfziZC71DJXpc4kKK9vYhoaN%2Bo%2B%2F%2Fv4Ez2tGuDr9z4Odt3tMSYN6MdP3ODGqyZUDN%2Bx6kebnPoNVVBfaUaTrtGWlFkWDCDRKNwlAL2a4SMKww8CbqUnlGa%2BXpzKc%2B22fTFu119PRtpHQ3U7UU5eu9BnutHGZ4h%2BrJ%2FX97iCH6PLKFehu0knY48MbraldKFIFirhWEiN%2Bi%2FZ0MeyMv5N7WlN33CtO58JqVrX9qc6bp%2B8r3GWEa9lXGeBlsDUcy%2BQzZphDCtVt7YuFgwQ7qlvBC%2BJ%2F79BN%2ByRnmLiCpZ%2F%2FVj9k4T1twdL9sIhYcWfe9O6w9sOnJ%2B1eLmIDir7IPa%2FFomx2kMz%2Bzu2hlCBrDYtcbngh%2B4ljrNqMmGcDxYNjVkH5hruIGsWzrldrBoXBeHTrSPAcMVAbj17x4vLACNLUAShN9Awz9bzzgY6pgEyLbl32a2ttCGF%2BhwDKOw%2Bp9iYRIj40PLxgAzc7tG0gOzG86AbHxD9NOVeWhG4lyYyVRiuadkN1NmqUBRzB6WCGeT%2Bx0pLvwJPx%2BVE7GepGSctVofBTi3tkBkBfzYr8xwqSTrlsGGEkGDontiGj6JGLtETb9RIRtWjLpJ7zub%2Bumb8%2Bwe0Ah32Gkh5UVHyo3mmj2vsuHHpuT%2BxSSUyDk8ONRP%2FVtSN&X-Amz-Signature=66ad48f97f6fec4565539f196af5b6164a7d77cfde4d863bf8afec0ab0cc8cff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

